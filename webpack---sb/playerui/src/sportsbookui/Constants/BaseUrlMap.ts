/**
 * COPY-PASTE .webpack/base-url-map
 */
// url prefixes for UI
const baseUrlMap = {
  // statics for ui prefix this prefix will be routed by nginx to image with ui build
  STATIC_RELATIVE_URL_PREFIX: "/sportsbook__static",

  // Service that resolve ip address
  IP_SERVICE_URL_PREFIX: "/ipservice__api",

  KIRON_PARSER_URL_PREFIX: "/kiron_parser__api",

  BETRADAR_STATISTIC_URL_PREFIX: "/betradar_statistic__api",

};

export { baseUrlMap };
