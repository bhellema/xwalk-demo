/* global WebImporter */
const createCards = (main, document, params) => {
  const { originalURL } = params;
  const cardContainer = main.querySelector('.cards');
  const cards = main.querySelectorAll('.cards > div');

  const cellItems = [];
  if (cards) {
    cards.forEach((cardItem) => {
      const picture = cardItem.querySelector(':scope > div:nth-of-type(1) > picture');
      const body = cardItem.querySelector(':scope > div:nth-of-type(2)');
      cellItems.push([picture, body]);
    });

    const cells = [['Cards'], ...cellItems];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    cardContainer.innerHTML = '';
    cardContainer.append(block);
  }
};
export default createCards;
