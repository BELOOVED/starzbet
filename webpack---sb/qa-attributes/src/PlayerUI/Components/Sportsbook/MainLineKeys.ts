import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__main_line");

class MainLineKeys {
  static Container = withAttr("container");
  static Search_Container = withAttr("search", "container");

  static FoundEvents_Tab = withAttr("found_events", "tab");
  static FoundTournaments_Tab = withAttr("found_tournaments", "tab");
  static FoundTournament_Container = withAttr("found_tournament", "container");

  static Sport_Container = withAttr("sport", "container");
  static Sport_CollapseButton = withAttr("sport", "collapse", "button");

  static Tournament_Container = withAttr("tournament", "container");
  static Tournament_CollapseButton = withAttr("tournament", "collapse", "button");
  static Tournament_FavouriteButton = withAttr("tournament", "favourite", "button");

  static EventRow_Container = withAttr("event_row", "container");
  static EventRow_FavouriteButton = withAttr("event_row", "favourite", "button");
  static OutrightRow_Container = withAttr("outright_row", "container");

  static EventRow_MarketsContainer = withAttr("event_row", "markets", "container");
  static EventRow_FirstMarket = withAttr("event_row", "markets", "first");
  static EventRow_LastMarket = withAttr("event_row", "markets", "last");
}

export { MainLineKeys };
