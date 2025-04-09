/* global WebImporter */
import { cleanUpSrcUrl } from '../utils/image-utils.js';

const createCarousel = async (main, document, params) => {
  const { originalURL } = params;
  const carousel = main.querySelector('.carousel');
  if (!carousel) {
    return;
  }

  // Extract all slides from the carousel
  const slides = carousel.querySelectorAll(':scope > div');

  // Create rows array with header
  const rows = [['Carousel']];

  // Process each slide
  slides.forEach((slide) => {
    // Get the picture element
    const picture = slide.querySelector('picture');
    if (!picture) return;

    // Get the image and clean up its URL
    const img = picture.querySelector('img');
    if (img) {
      img.src = cleanUpSrcUrl(img.src, originalURL);
    }

    // Get the heading if it exists
    const heading = slide.querySelector('h2');

    // Add the slide to the rows array
    rows.push([img || '', heading ? heading.textContent.trim() : '']);
  });

  // Create the table and replace the carousel content
  const block = WebImporter.DOMUtils.createTable(rows, document);
  carousel.innerHTML = '';
  carousel.append(block);
};

export default createCarousel;
