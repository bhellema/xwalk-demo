/* global WebImporter */
import { cleanUpSrcUrl } from '../utils/image-utils.js';

const createCards = (main, document, params) => {
  const { originalURL } = params;
  const cards = main.querySelector('.cards ul');

  const cellItems = [];
  if (cards) {
    for (let i = 0; i < cards.children.length; i += 1) {
      const cardItem = cards.children[i];
      const picImg = cardItem.querySelector('picture > img');
      picImg.src = cleanUpSrcUrl(picImg.src, originalURL);
      picImg.alt = picImg.alt || 'Plush Item';

      const title = cardItem.querySelector(':scope div:nth-of-type(2) > p');
      const body = cardItem.querySelector(':scope div:nth-of-type(2) > p:nth-child(2)');

      const p = document.createElement('p');
      p.appendChild(title);
      p.appendChild(body);
      cellItems.push([picImg, p]);
    }

    const cells = [['Cards'], ...cellItems];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    cards.append(block);
  }
};
export default createCards;
