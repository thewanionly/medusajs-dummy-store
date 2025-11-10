import { PluginOptions, defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { structureTool } from 'sanity/structure';

import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemas';
import structure from './structure';

const env =
  (typeof process !== 'undefined' ? process.env : undefined) ??
  (import.meta as ImportMeta & {
    env?: Record<string, string | undefined>;
  }).env ??
  {};

const requireEnv = (keys: string[], fallback?: string) => {
  for (const key of keys) {
    const value = env[key];
    if (value) {
      return value;
    }
  }

  if (typeof fallback !== 'undefined') {
    return fallback;
  }

  throw new Error(
    `Missing Sanity environment variable. Please set one of: ${keys.join(', ')}`
  );
};

const projectId = requireEnv(['SANITY_STUDIO_PROJECT_ID', 'SANITY_PROJECT_ID']);
const dataset = requireEnv(['SANITY_STUDIO_DATASET', 'SANITY_DATASET']);
const apiVersion = requireEnv(
  ['SANITY_STUDIO_API_VERSION', 'SANITY_API_VERSION'],
  '2023-05-03'
);

export default defineConfig({
  name: 'Medusa_Dummy_Store',
  title: 'Medusa Dummy Store',

  projectId,
  dataset,
  apiVersion,

  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
  ] as PluginOptions[],

  schema: {
    types: schemaTypes,
  },
});
