import { IS_SERVER } from "@sb/utils";

// todo @Bond check support SSR
const SCROLLBAR_WIDTH = IS_SERVER ? 0 : (window.innerWidth - document.documentElement.clientWidth);

const getViewportDimensions = () => {
  // todo @Bond check support SSR
  const width = IS_SERVER
    ? 0
    : Math.min(document.documentElement.clientWidth, window.innerWidth) || 0;

  return { width, innerScrollWidth: 0 };
};

const isScrollbarGutterSupported = () => {
  // todo @Bond check support SSR
  if (IS_SERVER) {
    return false;
  }

  const element = document.createElement("div");
  element.style.cssText = `
    overflow-y: auto;
    scrollbar-gutter: stable;
  `;

  document.body.appendChild(element);
  const isSupported = element.clientWidth < element.offsetWidth;

  element.remove();

  return isSupported;
};

const IS_SCROLLBAR_GUTTER_SUPPORTED = isScrollbarGutterSupported();

export {
  getViewportDimensions,
  SCROLLBAR_WIDTH,
  IS_SCROLLBAR_GUTTER_SUPPORTED,
};
