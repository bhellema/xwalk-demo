/* global WebImporter */

const createFeatured = (main, document, params) => {
  const featured = main.querySelector('.featured');

  const h1 = document.createElement('h1');
  h1.textContent = 'Ben';
  const p = document.createElement('p');
  p.appendChild(h1);

  const cells = [
    ['Featured'],
    [p],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  featured.innerHTML = '';
  featured.append(block);
};

export default createFeatured;
