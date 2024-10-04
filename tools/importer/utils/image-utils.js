// eslint-disable-next-line import/prefer-default-export
export function cleanupImageSrc(src) {
  let imgUrl;
  try {
    imgUrl = new URL(src);
  } catch (e) {
    imgUrl = new URL(src, 'https://main--stini--bhellema.hlx.page');
  }

  if (imgUrl.host.startsWith('localhost')) {
    return `https://main--stini--bhellema.hlx.page${imgUrl.pathname}`;
  }

  return `${imgUrl.protocol}//${imgUrl.host}${imgUrl.pathname}`;
}
