/* global WebImporter */
import { cleanupImageSrc } from '../utils/image-utils.js';

const createHero = (main, document) => {
  const hero = main.querySelector('.hero');

  if (hero) {
    const picImg = hero.querySelector('picture > img');
    picImg.src = cleanupImageSrc(picImg.src);
    picImg.alt = picImg.alt || 'Hero image';
    const title = hero.querySelector('p:nth-child(2)');

    const div = document.createElement('div');

    div.append(title);

    const cells = [
      ['Hero'],
      [picImg, div],
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    hero.append(block);
  }
};
export default createHero;
