try {
  new Date().toLocaleString("en-US", { timeZone: "CET" });
} catch (e) {
  void import(/* webpackChunkName: "polyfill-date-time-format-timezone" */"date-time-format-timezone");
}
