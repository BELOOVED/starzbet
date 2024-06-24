import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__sportsbook__navigation_menu");

class SportsbookNavigationMenuKeys {
  static Container = withAttr("container");
  static Open_Button = withAttr("open", "button");
  static Close_Button = withAttr("close", "button");

  static CommonItems_Container = withAttr("common_items", "container");
  static CreateCustomCoupon_Button = withAttr("create_custom_coupon", "button");
  static CreateCustomCoupon_Menu = withAttr("create_custom_coupon", "menu");
  static CreateCustomCoupon_MenuItem = withAttr("create_custom_coupon", "menu_item");
  static CreateCustomCoupon_MenuItem_Toolbar = withAttr("create_custom_coupon", "menu_item", "toolbar");
  static CreateCustomCoupon_MenuItem_Edit = withAttr("create_custom_coupon", "menu_item", "edit");
  static CreateCustomCoupon_MenuItem_Delete = withAttr("create_custom_coupon", "menu_item", "delete");

  static LiveSwitch = withAttr("live_switch");
  static Search = withAttr("search");

  static PeriodSelect_Option = withAttr("period_select", "option");

  static FavouriteEvents_Button = withAttr("favourite_events", "button");
  static FavouriteTournaments_Menu = withAttr("favourite_tournaments", "menu");
  static FavouriteTournament_Container = withAttr("favourite_tournament", "container");

  static OutrightsMenu_Container = withAttr("outrights_menu", "container");
  static SportsMenu_Container = withAttr("pre_live", "sports_menu", "container");
  static Menu_Sport = withAttr("menu", "sport");
  static Menu_Category = withAttr("menu", "category");
  static Menu_Tournament = withAttr("menu", "tournament");
}

export { SportsbookNavigationMenuKeys };
