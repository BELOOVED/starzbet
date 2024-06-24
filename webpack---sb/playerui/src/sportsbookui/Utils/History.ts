
const scrollRestorationAuto = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "auto";
  }
};

const scrollRestorationManual = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
};

export { scrollRestorationAuto, scrollRestorationManual };
