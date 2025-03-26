/* global WebImporter */
import { cleanUpSrcUrl } from '../utils/image-utils.js';

const createTeaser = (main, document, params) => {
  const { originalURL } = params;
  const crosswalk = params.components !== undefined;
  const teaser = main.querySelector('.teaser');

  if (teaser) {
    const img = teaser.querySelector(':scope .background picture > img');
    img.src = cleanUpSrcUrl(img.src, originalURL, crosswalk);

    const heading = teaser.querySelector(':scope div:nth-of-type(2)');
    const eyebrow = teaser.querySelector(':scope .eyebrow');
    const longDesc = teaser.querySelector(':scope .long-description');
    const shortDesc = teaser.querySelector(':scope .short-description');
    const cta1 = teaser.querySelector(':scope .cta');
    const cta2 = teaser.querySelector(':scope .cat-2');

    const rows = [
      ['Teaser'],
      [img],
      [eyebrow?.textContent.trim() || ''],
      [heading?.textContent.trim() || ''],
      [longDesc?.textContent.trim() || ''],
      [shortDesc?.textContent.trim() || ''],
      [cta1 || ''],
      [cta2 || ''],
    ];

    const block = WebImporter.DOMUtils.createTable(rows, document);
    teaser.innerHTML = '';
    teaser.append(block);
  }
};
export default createTeaser;
