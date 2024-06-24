import { pragmaticplaydga_location } from "@sb/sdk/SDKClient/ProxyLocations";
import { baseUrlMap } from "../sportsbookui/Constants/BaseUrlMap";

const clientUrl = process.env.CLIENT_URL || "";

const playerUiStaticUrl = process.env.PLAYER_UI_STATIC_URL || "";

const uiWebsocketUrl = process.env.UI_WEBSOCKET_URL || "";

const sharedProxyUrl = process.env.SHARED_PROXY_URL || "";

const ipServiceUrl = `${clientUrl}${baseUrlMap.IP_SERVICE_URL_PREFIX}/ip`;

const kironParserUrl = `${sharedProxyUrl}${baseUrlMap.KIRON_PARSER_URL_PREFIX}/rpc`;

const betradarStatisticUrl = `${sharedProxyUrl}${baseUrlMap.BETRADAR_STATISTIC_URL_PREFIX}/rpc`;

const pragmaticDgaUrl = `${clientUrl}${pragmaticplaydga_location}`;

export {
  clientUrl,
  playerUiStaticUrl,
  ipServiceUrl,
  kironParserUrl,
  sharedProxyUrl,
  betradarStatisticUrl,
  pragmaticDgaUrl,
  uiWebsocketUrl,
};
