import { createOptimizedPicture } from '../../scripts/aem.js';
import {
  a, div, h3, li, p, span, ul,
} from '../../scripts/dom.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  /* change to ul, li */
  const ulEl = ul();
  [...block.children].forEach((row) => {
    const liEl = li({ class: 'featured-card' });
    moveInstrumentation(row, liEl);
    const anchor = row.querySelector('a');
    const pic = row.querySelector('picture > img');
    const title = row.querySelector('div:nth-child(3)');
    const category = row.querySelector('div:nth-child(4)');

    let picEl;
    if (pic) {
      picEl = createOptimizedPicture(
        pic.src,
        pic.title,
        false,
        [{ width: '750' }],
      );
      picEl.querySelector('img').classList.add('featured-card-image');
    }

    const categoryEl = p({ class: 'featured-card-callout' }, category.textContent);
    const titleEl = h3(title.textContent);
    const divider = div({ class: 'featured-card-divider' });
    const body = div({ class: 'featured-card-body' }, categoryEl, titleEl);
    const action = a(
      { class: 'button outlined', href: anchor?.href },
      span('View Details'),
    );
    liEl.append(picEl || '', body, divider, action);
    ulEl.append(liEl);
  });
  block.textContent = '';
  block.append(ulEl);
}
