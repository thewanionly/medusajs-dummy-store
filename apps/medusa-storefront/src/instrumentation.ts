export async function register() {
  if (process.env.NODE_ENV === 'development' && 'nodejs') {
    const { server } = await import('./mocks/msw/node');

    server.listen();
  }
}
