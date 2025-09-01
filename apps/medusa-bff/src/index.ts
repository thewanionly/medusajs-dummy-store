import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schemas';
import { MedusaAPI } from './services';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async () => {
        return {
          medusaAPI: new MedusaAPI(),
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`Server ready at http://localhost:4000/graphql`);
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
