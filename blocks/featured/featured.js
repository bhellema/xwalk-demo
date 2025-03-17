import { createOptimizedPicture } from '../../scripts/aem.js';
import {
  a, div, h3, li, p, span, ul,
} from '../../scripts/dom.js';

async function getFeatured() {
  const featured = await fetch('/query-index.json');
  return featured.json();
}

function getFeaturedItemByPath(path, items) {
  return items.find((item) => path.endsWith(item.path));
}

export default async function decorate(block) {
  const { data: items } = await getFeatured();

  /* change to ul, li */
  const ulEl = ul();
  [...block.children].forEach((row) => {
    const liEl = li({ class: 'featured-card' });
    [...row.children].forEach((child) => {
      const anchor = child.querySelector('a');
      const link = anchor.href;
      anchor.remove();
      const item = getFeaturedItemByPath(link, items);
      const pic = createOptimizedPicture(
        item.image,
        item.title,
        false,
        [{ width: '750' }],
      );
      pic.querySelector('img').classList.add('featured-card-image');
      const category = p({ class: 'featured-card-callout' }, item.category);
      const title = h3(item.title);
      const divider = div({ class: 'featured-card-divider' });
      const body = div({ class: 'featured-card-body' }, category, title);
      const action = a(
        { class: 'button outlined', href: link },
        span('View Details'),
      );
      liEl.append(pic, body, divider, action);
    });
    ulEl.append(liEl);
  });
  block.textContent = '';
  block.append(ulEl);
}
