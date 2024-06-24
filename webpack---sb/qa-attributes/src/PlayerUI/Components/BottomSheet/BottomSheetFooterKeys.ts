import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui");

class BottomNavBar {
  //not logged
  static LogIn = withAttr("component", "bottom_sheet__log_in");
  static SignUp = withAttr("component", "bottom_sheet__sign_up");
  static PrivateMembership = withAttr("component", "bottom_sheet__private_membership");
  static ForgotPassword = withAttr("component", "bottom_sheet__forgot_password");

  //logged
  static Deposit = withAttr("component", "bottom_sheet__deposit");
  static Withdraw = withAttr("component", "bottom_sheet__withdraw");
  static Bonuses = withAttr("component", "bottom_sheet__bonuses");

  //notifications pop-up
  static Notifications = withAttr("component", "bottom_sheet__notifications");
  static NotificationsContainer = withAttr("component", "bottom_sheet__notifications_container");
  static NotificationsDate = withAttr("component", "bottom_sheet__notifications_date");
}

export { BottomNavBar };
