import { withAttrPrefixFactory } from "../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__header");

class HeaderKeys {
  static Container = withAttr("container");

  static Logo = withAttr("logo");

  static Links_Sports = withAttr("links__sports");
  static Links_Casino = withAttr("links__casino");
  static Links_LiveCasino = withAttr("links__liveCasino");
  static Links_Games = withAttr("links__games");
  static Links_VipClub = withAttr("links__vipClub");

  static LanguageSelect = withAttr("select", "language");

  static LoginButton = withAttr("button", "login");
  static JoinNowButton = withAttr("button", "join_now");

  static AccountButton = withAttr("button", "account");
  static BalanceButton = withAttr("button", "balance");

  static NotificationsButton = withAttr("button", "notifications");

  static MainBalance = withAttr("main_balance");
  static PlayerUsername = withAttr("player_username");
}

export { HeaderKeys };
