import hero from './hero.js';
import metadata from './metadata.js';
import cards from './cards.js';
import teaser from './teaser.js';
import featured from './featured.js';

// eslint-disable-next-line import/prefer-default-export
export const transformers = [
  hero,
  featured,
  cards,
  teaser,
];

export const postTransformers = [
  metadata,
];
