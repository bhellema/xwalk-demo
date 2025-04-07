/* global WebImporter */
import { cleanUpSrcUrl } from '../utils/image-utils.js';

function getFeaturedItemByPath(path, items) {
  return items.find((item) => path.endsWith(item.path));
}

const createFeatured = async (main, document, params) => {
  const { sitePath } = params;

  const queryJson = await fetch('/query-index.json');
  const queryIndex = await queryJson.json();

  const featured = main.querySelector('.featured');
  const featuredItems = featured.querySelectorAll('.featured a');

  const rows = [['Featured']];
  featuredItems.forEach((featuredItem) => {
    const data = getFeaturedItemByPath(featuredItem.href, queryIndex.data);
    const src = cleanUpSrcUrl(data.image, params.originalURL);
    const img = document.createElement('img');
    img.src = src;
    img.alt = data.title;

    const titleEl = document.createElement('span');
    titleEl.textContent = data.title;

    const categoryEl = document.createElement('span');
    categoryEl.textContent = data.category;

    rows.push([
      img,
      `${sitePath}${data.path}`,
      titleEl,
      categoryEl,
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  featured.innerHTML = '';
  featured.append(block);
};

export default createFeatured;
