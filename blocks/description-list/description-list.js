import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // given a dom structure of key value pairs, create a description list
  const descriptionList = document.createElement('dl');
  descriptionList.classList.add('description-list');
  [...block.children].forEach((row) => {
    const dt = document.createElement('dt');
    dt.textContent = row.querySelector(':scope > div:first-child').textContent;
    const dd = document.createElement('dd');
    dd.textContent = row.querySelector(':scope > div:last-child').textContent;
    descriptionList.appendChild(dt);
    descriptionList.appendChild(dd);
  });
  block.textContent = '';

  moveInstrumentation(block, descriptionList);

  block.append(descriptionList);
}
