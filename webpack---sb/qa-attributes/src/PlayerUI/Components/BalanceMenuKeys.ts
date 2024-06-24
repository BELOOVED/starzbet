import { withAttrPrefixFactory } from "../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__balance_menu");

class BalanceMenuKeys {
  static Container = withAttr("container");

  static UpdateBalanceButton = withAttr("button", "update_balance");
  static ShowHideBalanceButton = withAttr("button", "show_hide_balance");

  static MainBalance = withAttr("main_balance");
  static BonusBalance = withAttr("bonus_balance");
  static FreeBetBalance = withAttr("free_bet_balance");
}

export { BalanceMenuKeys };
