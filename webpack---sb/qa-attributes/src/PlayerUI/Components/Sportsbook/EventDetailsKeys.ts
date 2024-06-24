import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__outright_details");

class EventDetailsKeys {
  static EventDetails_Container = withAttr("event_details", "container");
  static Favourite_Button = withAttr("favourite", "button");
  static MarketFilter_Tab = withAttr("market_filter", "tab");

  static OutrightMarketOdds = withAttr("outright", "market_odds");

  static EventMarketsContainer = withAttr("event", "markets_container");
  static EventMarketsHead = withAttr("event", "markets_header");
  static EventMarketOdds = withAttr("event", "market_odds");
}

export { EventDetailsKeys };
