/* global WebImporter */
import { cleanupImageSrc } from '../utils/image-utils.js';

// eslint-disable-next-line no-unused-vars
const createMetadata = (main, document, html, params, urlStr) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.textContent.replace(/[\n\t]/gm, '');
  }

  const desc = document.querySelector('head > meta[property="og:description"]');
  if (desc) {
    meta.Description = desc.getAttribute('content').replace(/[\n\t]/gm, '');
  }

  const twitter = document.querySelector('head > meta[name="twitter:card"]');
  if (twitter) {
    meta['twitter:card'] = twitter.getAttribute('content').replace(/[\n\t]/gm, '');
  }

  const img = document.querySelector('head > [property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    el.src = cleanupImageSrc(img.content);
    meta.Image = el;
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  main.append(block);

  return meta;
};

export default createMetadata;
