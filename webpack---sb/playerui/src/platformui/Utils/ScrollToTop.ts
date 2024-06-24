// @ts-nocheck
import { IS_SERVER, type TVoidFn } from "@sb/utils";
import { gainThemeContext } from "../../common/Utils/ThemeContext";

const INNER_SCROLL_CONTAINER_ID = "inner_scroll_container";
const SPORTSBOOK_INNER_SCROLL_CONTAINER_ID = "sportsbook-center-scroll";

const getInnerScrollContainer = () => {
  let innerContainer = document.getElementById(SPORTSBOOK_INNER_SCROLL_CONTAINER_ID);
  if (!innerContainer) {
    innerContainer = document.getElementById(INNER_SCROLL_CONTAINER_ID);
  }

  return innerContainer;
};

const getScrollContainer = () => {
  const needInnerContainer = gainThemeContext().static.find("withInnerScroll") === true;
  const innerContainer = needInnerContainer ? getInnerScrollContainer() : null;
  const globalContainer = window.safari ? document.body : document.documentElement;

  return innerContainer ?? globalContainer;
};

const scrollToTop = () => {
  if (IS_SERVER) {
    return;
  }

  const element = getScrollContainer();
  element.scrollTop = 0;
};

const smoothScrollToTop = () => {
  if (IS_SERVER) {
    return;
  }

  const element = getScrollContainer();
  element.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const withScrollToTop = (callback?: TVoidFn) => () => {
  callback && callback();
  scrollToTop();
};

export {
  scrollToTop,
  smoothScrollToTop,
  withScrollToTop,
  INNER_SCROLL_CONTAINER_ID,
  SPORTSBOOK_INNER_SCROLL_CONTAINER_ID,
};
