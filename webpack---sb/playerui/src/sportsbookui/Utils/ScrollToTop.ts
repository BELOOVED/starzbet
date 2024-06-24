import { scrollToTop as platformUiScrollToTop } from "../../platformui/Utils/ScrollToTop";

const scrollToTop = platformUiScrollToTop;

const virtualScrollToTop = () => {
  scrollToTop();

  const element = document.getElementById("virtual__scroll");

  if (element) {
    element.scroll(0, 0);
  }
};

export {
  scrollToTop,
  virtualScrollToTop,
};
