// eslint-disable-next-line import/prefer-default-export
export function cleanUpSrcUrl(src, origin) {
  let imgUrl;
  try {
    imgUrl = new URL(src);
  } catch (e) {
    imgUrl = new URL(src, origin);
  }

  if (imgUrl.host.startsWith('localhost')) {
    return `${origin}${imgUrl.pathname}`;
  }

  return `${imgUrl.protocol}//${imgUrl.host}${imgUrl.pathname}`;
}
