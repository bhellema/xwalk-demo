import hero from './hero.js';
import metadata from './metadata.js';

// eslint-disable-next-line import/prefer-default-export
export const transformers = [
  hero,
];

export const postTransformers = [
  metadata,
];
