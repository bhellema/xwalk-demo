/* global WebImporter */
import { cleanupImageSrc } from '../utils/image-utils.js';

const createTeaser = (main, document, params) => {
  const { originalURL } = params;
  const teaser = main.querySelector('.teaser');

  if (teaser) {
    const img = teaser.querySelector('picture > img');
    img.src = cleanupImageSrc(img.src, originalURL);

    const eyebrow = teaser.querySelector('h5');
    const discount = teaser.querySelector(':scope div:nth-of-type(3)').textContent.trim();
    const urgent = teaser.querySelector(':scope div:nth-of-type(4)').textContent.trim();
    const cta1 = teaser.querySelector(':scope div:nth-of-type(6) a');
    const cta2 = teaser.querySelector(':scope div:nth-of-type(7) a');

    const rows = [
      ['Teaser'],
      [img],
      [eyebrow.textContent.trim()],
      [discount],
      [urgent],
      [cta1],
      [cta2],
    ];

    const block = WebImporter.DOMUtils.createTable(rows, document);
    teaser.innerHTML = '';
    teaser.append(block);
  }
};
export default createTeaser;
