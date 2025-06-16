/* global WebImporter */
import { cleanUpSrcUrl } from '../utils/image-utils.js';

const createTeaser = (main, document, params) => {
  const { originalURL } = params;
  const teaser = main.querySelector('.teaser');

  if (teaser) {
    const div1 = teaser.querySelector(':scope div:nth-of-type(1)');
    const img = div1.querySelector('picture > img');
    img.src = cleanUpSrcUrl(img.src, originalURL);

    const eyebrow = teaser.querySelector('.eyebrow');
    const title = teaser.querySelector('.title h5');
    const longDesc = teaser.querySelector('.long-description');
    const cta1 = teaser.querySelector('.cta a');
    const cta2 = teaser.querySelector('.cta2 a');

    const rows = [
      ['Teaser'],
      [img || ''],
      [eyebrow?.textContent.trim() || ''],
      [title?.textContent.trim() || ''],
      [longDesc?.textContent.trim() || ''],
      [cta1 || ''],
      [cta2 || ''],
    ];

    const block = WebImporter.DOMUtils.createTable(rows, document);
    teaser.innerHTML = '';
    teaser.append(block);
  }
};
export default createTeaser;
