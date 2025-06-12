/* global WebImporter */
import { cleanUpSrcUrl } from '../utils/image-utils.js';

const createCards = (main, document, params) => {
  const { originalURL } = params;
  const cards = main.querySelector('.cards');

  const cellItems = [];
  if (cards) {
    const ul = cards.querySelector('ul');
    for (let i = 0; i < ul.children.length; i += 1) {
      const cardItem = ul.children[i];
      const picImg = cardItem.querySelector('picture > img');
      picImg.src = cleanUpSrcUrl(picImg.src, originalURL);
      picImg.alt = picImg.alt || 'Plush Item';

      const title = cardItem.querySelector('.cards-card-body > p > strong');
      const body = cardItem.querySelector('.cards-card-body > p:nth-of-type(2)');

      const p = document.createElement('p');
      p.appendChild(title);
      p.appendChild(body);
      cellItems.push([picImg, p]);
    }

    const cells = [['Cards'], ...cellItems];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    cards.innerHTML = '';
    cards.append(block);
  }
};
export default createCards;
