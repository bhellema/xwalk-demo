/* global WebImporter */
const createMyColumnsBen = (main, document) => {
  const container = main.querySelector('.columns-ben');

  if (container) {
    const rows = [...container.children];
    const cellItems = rows.map((row) => [...row.children]);

    const cells = [['MyColumns Ben'], ...cellItems];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    container.innerHTML = '';
    container.append(block);
  }
};
export default createMyColumnsBen;
