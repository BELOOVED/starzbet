declare module "abortcontroller-polyfill";

if (window.AbortController === undefined) {
  void import(/* webpackChunkName: "polyfill-abort-controller" */"abortcontroller-polyfill");
}
