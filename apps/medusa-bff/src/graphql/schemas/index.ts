import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { glob } from 'glob';

import { baseTypeDefs } from '@graphql/schemas/base';

const path = __dirname;
const files = glob.sync('*.graphql', {
  cwd: path,
});

const schemas = files.map((file) => readFileSync(join(path, file), 'utf8'));

export const typeDefs = mergeTypeDefs([baseTypeDefs, ...schemas]);
