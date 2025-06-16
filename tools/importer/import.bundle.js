var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // tools/importer/import.js
  var import_exports = {};
  __export(import_exports, {
    default: () => import_default
  });

  // tools/importer/utils/image-utils.js
  function cleanUpSrcUrl(src, origin) {
    let imgUrl;
    try {
      imgUrl = new URL(src);
    } catch (e) {
      imgUrl = new URL(src, origin);
    }
    if (imgUrl.host.startsWith("localhost")) {
      return `${origin}${imgUrl.pathname}`;
    }
    return `${imgUrl.protocol}//${imgUrl.host}${imgUrl.pathname}`;
  }

  // tools/importer/transformers/hero.js
  var createHero = (main, document, params) => {
    const { originalURL } = params;
    const hero = main.querySelector(".hero");
    if (hero) {
      const picImg = hero.querySelector("picture > img");
      picImg.src = cleanUpSrcUrl(picImg.src, originalURL);
      picImg.alt = picImg.alt || "Hero image";
      const title = hero.querySelector("p:nth-child(2)");
      const h1 = document.createElement("h1");
      h1.textContent = title.textContent;
      title.remove();
      const p = document.createElement("p");
      p.appendChild(h1);
      p.appendChild(picImg);
      const cells = [
        ["Hero"],
        [p]
      ];
      const block = WebImporter.DOMUtils.createTable(cells, document);
      hero.append(block);
    }
  };
  var hero_default = createHero;

  // tools/importer/transformers/metadata.js
  var createMetadata = (main, document, html, params, urlStr) => {
    const meta = {};
    const title = document.querySelector("title");
    if (title) {
      meta.title = title.textContent.replace(/[\n\t]/gm, "");
    }
    const desc = document.querySelector('head > meta[property="og:description"]');
    if (desc) {
      meta.description = desc.getAttribute("content").replace(/[\n\t]/gm, "");
    }
    const twitter = document.querySelector('head > meta[name="twitter:card"]');
    if (twitter) {
      meta.twitter = twitter.getAttribute("content").replace(/[\n\t]/gm, "");
    }
    const img = document.querySelector('head > [property="og:image"]');
    if (img && img.content) {
      const el = document.createElement("img");
      el.src = cleanUpSrcUrl(img.content);
      meta.image = el;
    }
    const block = WebImporter.Blocks.getMetadataBlock(document, meta);
    main.append(block);
    return meta;
  };
  var metadata_default = createMetadata;

  // tools/importer/transformers/cards.js
  var createCards = (main, document, params) => {
    const { originalURL } = params;
    const cards = main.querySelector(".cards");
    const cellItems = [];
    if (cards) {
      const ul = cards.querySelector("ul");
      for (let i = 0; i < ul.children.length; i += 1) {
        const cardItem = ul.children[i];
        const picImg = cardItem.querySelector("picture > img");
        picImg.src = cleanUpSrcUrl(picImg.src, originalURL);
        picImg.alt = picImg.alt || "Plush Item";
        const title = cardItem.querySelector(".cards-card-body > p > strong");
        const body = cardItem.querySelector(".cards-card-body > p:nth-of-type(2)");
        const p = document.createElement("p");
        p.appendChild(title);
        p.appendChild(body);
        cellItems.push([picImg, p]);
      }
      const cells = [["Cards"], ...cellItems];
      const block = WebImporter.DOMUtils.createTable(cells, document);
      cards.innerHTML = "";
      cards.append(block);
    }
  };
  var cards_default = createCards;

  // tools/importer/transformers/teaser.js
  var createTeaser = (main, document, params) => {
    const { originalURL } = params;
    const teaser = main.querySelector(".teaser");
    if (teaser) {
      const div1 = teaser.querySelector(":scope div:nth-of-type(1)");
      const img = div1.querySelector("picture > img");
      img.src = cleanUpSrcUrl(img.src, originalURL);
      const heading = teaser.querySelector(":scope div:nth-of-type(2)");
      const eyebrow = teaser.querySelector(".eyebrow");
      const longDesc = teaser.querySelector(".long-description");
      const shortDesc = teaser.querySelector("h5");
      const cta1 = teaser.querySelector(".cta a");
      const cta2 = teaser.querySelector(".cta2 a");
      const rows = [
        ["Teaser"],
        [img || ""],
        [(eyebrow == null ? void 0 : eyebrow.textContent.trim()) || ""],
        [(heading == null ? void 0 : heading.textContent.trim()) || ""],
        [(longDesc == null ? void 0 : longDesc.textContent.trim()) || ""],
        [(shortDesc == null ? void 0 : shortDesc.textContent.trim()) || ""],
        [cta1 || ""],
        [cta2 || ""]
      ];
      const block = WebImporter.DOMUtils.createTable(rows, document);
      teaser.innerHTML = "";
      teaser.append(block);
    }
  };
  var teaser_default = createTeaser;

  // tools/importer/transformers/featured.js
  function getFeaturedItemByPath(path, items) {
    return items.find((item) => path.endsWith(item.path));
  }
  var createFeatured = (main, document, params) => __async(void 0, null, function* () {
    const { sitePath } = params;
    const queryJson = yield fetch("/query-index.json");
    const queryIndex = yield queryJson.json();
    const featured = main.querySelector(".featured");
    if (!featured) {
      return;
    }
    const featuredItems = featured.querySelectorAll(".featured a");
    const rows = [["Featured"]];
    featuredItems.forEach((featuredItem) => {
      const data = getFeaturedItemByPath(featuredItem.href, queryIndex.data);
      const src = cleanUpSrcUrl(data.image, params.originalURL);
      const img = document.createElement("img");
      img.src = src;
      img.alt = data.title;
      const titleEl = document.createElement("span");
      titleEl.textContent = data.title;
      const categoryEl = document.createElement("span");
      categoryEl.textContent = data.category;
      rows.push([
        img,
        `${sitePath}${data.path}`,
        titleEl,
        categoryEl
      ]);
    });
    const block = WebImporter.DOMUtils.createTable(rows, document);
    featured.innerHTML = "";
    featured.append(block);
  });
  var featured_default = createFeatured;

  // tools/importer/transformers/carousel.js
  var createCarousel = (main, document, params) => __async(void 0, null, function* () {
    const { originalURL } = params;
    const carousel = main.querySelector(".carousel");
    if (!carousel) {
      return;
    }
    const slides = carousel.querySelectorAll(":scope > div");
    const rows = [["Carousel"]];
    slides.forEach((slide) => {
      const picture = slide.querySelector("picture");
      if (!picture) return;
      const img = picture.querySelector("img");
      if (img) {
        img.src = cleanUpSrcUrl(img.src, originalURL);
      }
      const heading = slide.querySelector("h2");
      const subText = slide.querySelector("p");
      const subTextValue = subText === null ? "" : subText.textContent.trim();
      rows.push([
        img || "",
        heading ? heading.textContent.trim() : "",
        subTextValue
      ]);
    });
    const block = WebImporter.DOMUtils.createTable(rows, document);
    carousel.innerHTML = "";
    carousel.append(block);
  });
  var carousel_default = createCarousel;

  // tools/importer/transformers/index.js
  var transformers = [
    hero_default,
    featured_default,
    cards_default,
    teaser_default,
    carousel_default
  ];
  var postTransformers = [
    metadata_default
  ];

  // tools/importer/import.js
  var import_default = {
    /**
     * Apply DOM operations to the provided document and return
     * the root element to be then transformed to Markdown.
     * @param {HTMLDocument} document The document
     * @param {string} url The url of the page imported
     * @param {string} html The raw html (the document is cleaned up during preprocessing)
     * @param {object} params Object containing some parameters given by the import process.
     * @returns {HTMLElement} The root element to be transformed
     */
    transformDOM: (_0) => __async(void 0, [_0], function* ({
      // eslint-disable-next-line no-unused-vars
      document,
      url,
      html,
      params
    }) {
      const main = document.body;
      const p = transformers.map(
        (fn) => __async(void 0, null, function* () {
          return fn.call(void 0, main, document, params, url);
        })
      );
      yield Promise.all(p);
      WebImporter.DOMUtils.remove(main, [
        "header",
        "footer"
      ]);
      postTransformers.forEach(
        (fn) => fn.call(void 0, main, document, html, params, url)
      );
      return main;
    })
  };
  return __toCommonJS(import_exports);
})();
