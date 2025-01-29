/* global WebImporter */
import { cleanupImageSrc } from '../utils/image-utils.js';

const createCards = (main, document) => {
  const cards = main.querySelector('.cards');

  const cellItems = [];
  if (cards) {
    for (let i = 0; i < cards.children.length; i += 1) {
      const cardItem = cards.children[i];
      const picImg = cardItem.querySelector('picture > img');
      picImg.src = cleanupImageSrc(picImg.src);
      picImg.alt = picImg.alt || 'Plush Item';

      const title = cardItem.querySelector(':scope div:nth-of-type(2) > p');
      const body = cardItem.querySelector(':scope div:nth-of-type(2) > p:nth-child(2)');

      const p = document.createElement('p');
      p.appendChild(title);
      p.appendChild(body);
      cellItems.push([picImg, p]);
    }

   // add the new row into the cells array
    const cells = [['Cards'], ...cellItems];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    cards.append(block);
  }
};
export default createCards;
