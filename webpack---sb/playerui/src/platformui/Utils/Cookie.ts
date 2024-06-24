// @ts-nocheck
const getCookie = (name) => {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, "\\$1") + "=([^;]*)",
  ));

  return matches
    ? decodeURIComponent(matches[1])
    : undefined;
};

const setCookie = (name, value, options = {}) => {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const optionKey in options) {
    updatedCookie += "; " + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export { getCookie, setCookie };
