import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__my_account_menu");

class MyAccountMenuKeys {
  static MenuContainer = withAttr("container", "menu");

  static CloseButton = withAttr("button", "close");
  static GoBackButton = withAttr("button", "go_back");

  // Profile Section
  static ProfileContainer = withAttr("container", "profile");

  static Username = withAttr("value", "username");

  static WithdrawButton = withAttr("button", "withdraw");
  static DepositButton = withAttr("button", "deposit");

  static UpdateBalanceButton = withAttr("button", "update_balance");
  static ShowHideBalanceButton = withAttr("button", "show_hide_balance");

  static MainBalanceValue = withAttr("value", "main_balance");

  // Navigation Section
  static NavigationContainer = withAttr("container", "navigation");

  static VerifyAccountMenuElement = withAttr("menu_element", "verify_account");
  static VerifyEmailMenuElement = withAttr("menu_element", "verify_email");

  static MyAccountNode = withAttr("node", "my_account");
  static DetailsMenuElement = withAttr("menu_element", "details");
  static VerificationMenuElement = withAttr("menu_element", "verification");

  static SecurityNode = withAttr("node", "security");
  static SecurityMenuElement = withAttr("menu_element", "security");
  static TwoFactorAuthMenuElement = withAttr("menu_element", "2fa");

  static NotificationsMenuElement = withAttr("menu_element", "notifications");

  static MessagesMenuElement = withAttr("menu_element", "messages");
  static MessagesCounter = withAttr("counter", "messages");

  static OffersMenuElement = withAttr("menu_element", "offers");
  static VipClubMenuElement = withAttr("menu_element", "vip_club");
  static HistoryMenuElement = withAttr("menu_element", "history");

  static BankingNode = withAttr("node", "banking");
  static DepositMenuElement = withAttr("menu_element", "deposit");
  static WithdrawMenuElement = withAttr("menu_element", "withdraw");
  static PaymentAccountsMenuElement = withAttr("menu_element", "payment_accounts");
  static BankingHistoryMenuElement = withAttr("menu_element", "banking_history");

  static HelpNode = withAttr("node", "help");
  static ContactUsMenuElement = withAttr("menu_element", "contact_us");
  static RequestCallBackMenuElement = withAttr("menu_element", "request_call_back");

  static ResponsibleGamblingNode = withAttr("node", "responsible_gambling");
  static PlayLimitMenuElement = withAttr("menu_element", "play_limit");
  static DepositLimitMenuElement = withAttr("menu_element", "deposit_limit");
  static TimeOutMenuElement = withAttr("menu_element", "time_out");
  static SelfExclusionMenuElement = withAttr("menu_element", "self_exclusion");
  static AccountClosureMenuElement = withAttr("menu_element", "account_closure");
  static RealityChecksMenuElement = withAttr("menu_element", "reality_checks");

  static LogoutButton = withAttr("button", "logout");
}

export { MyAccountMenuKeys };
