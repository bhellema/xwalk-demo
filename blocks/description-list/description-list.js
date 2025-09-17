import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // given a dom structure of key value pairs, create a description list
  const descriptionList = document.createElement('dl');
  descriptionList.classList.add('description-list');
  [...block.children].forEach((row) => {
    const rowItem = document.createElement('div');
    rowItem.classList.add('description-list-item');
    moveInstrumentation(row, rowItem);

    const dt = document.createElement('dt');
    moveInstrumentation(row.querySelector(':scope > div:first-child > div'), dt);
    dt.textContent = row.querySelector(':scope > div:first-child').textContent;
    const dd = document.createElement('dd');
    moveInstrumentation(row.querySelector(':scope > div:last-child > div'), dd);
    dd.textContent = row.querySelector(':scope > div:last-child').textContent;

    rowItem.appendChild(dt);
    rowItem.appendChild(dd);
    descriptionList.appendChild(rowItem);
  });
  block.textContent = '';

  block.append(descriptionList);
}
