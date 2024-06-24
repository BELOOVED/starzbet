
if(window.ResizeObserver === undefined){
  void import(/* webpackChunkName: "polyfill-resize-observer" */"@juggle/resize-observer").then((polyfill) => {
    window["ResizeObserver"] = polyfill.ResizeObserver;

    window["ResizeObserverEntry"] = polyfill.ResizeObserverEntry as typeof ResizeObserverEntry;

    window["ResizeObserverSize"] = polyfill.ResizeObserverSize as typeof ResizeObserverSize;
  });
}
