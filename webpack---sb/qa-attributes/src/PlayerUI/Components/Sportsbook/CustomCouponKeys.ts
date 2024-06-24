import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__sportsbook__custom_coupon");

class CustomCouponKeys {
  static StartBuildingCoupon_Button = withAttr("start_building_coupon", "button");

  static Search_Input = withAttr("search", "input");
  static Back_Button = withAttr("back", "button");
  static Sport_Container = withAttr("sport", "container");
  static Category_Container = withAttr("category", "container");
  static Tournament_Container = withAttr("tournament", "container");
  static SelectedTournaments_Continue = withAttr("selected_tournaments", "container");

  static CouponName_Input = withAttr("coupon_name", "input");
  static AddMoreEvents_Button = withAttr("add_more_events", "button");
  static Save_Button = withAttr("save", "button");
}

export { CustomCouponKeys };
