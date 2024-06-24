import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__side_menu");

class SideMenuKeys {
  static Container = withAttr("container", "full");
  static DrawerButton = withAttr("drawer", "button");

  static CloseButton = withAttr("button", "close");

  // Profile Section
  static ProfileContainer = withAttr("container", "profile");

  static Username = withAttr("value", "username");

  static WithdrawButton = withAttr("button", "withdraw");
  static DepositButton = withAttr("button", "deposit");
  static PaymentAccountsButton = withAttr("button", "payment");

  static UpdateBalanceButton = withAttr("button", "update_balance");
  static ShowHideBalanceButton = withAttr("button", "show_hide_balance");

  static MainBalanceValue = withAttr("value", "main_balance");

  static VerifyAccountButton = withAttr("button", "verify_account");
  static VerifyEmailButton = withAttr("button", "verify_email");

  // Navigation Section
  static NavigationContainer = withAttr("container", "navigation");

  static MyAccountMenuElement = withAttr("menu_element", "my_account");

  static SecurityMenuNode = withAttr("menu_node", "security");
  static BankingMenuNode = withAttr("menu_node", "banking");

  static SecurityMenuElement = withAttr("menu_element", "security");
  static TwoFactorAuthMenuElement = withAttr("menu_element", "2fa");

  static NotificationsMenuElement = withAttr("menu_element", "notifications");

  static MessagesMenuElement = withAttr("menu_element", "messages");
  static MessagesCounter = withAttr("counter", "messages");

  static OffersMenuElement = withAttr("menu_element", "offers");
  static VipClubMenuElement = withAttr("menu_element", "vip_club");
  static HistoryMenuElement = withAttr("menu_element", "history");
  static RequestCallBackMenuElement = withAttr("menu_element", "request_call_back");
  static ResponsibleGamblingMenuElement = withAttr("menu_element", "responsible_gambling");

  static LogoutButton = withAttr("button", "logout");
}

export { SideMenuKeys };
