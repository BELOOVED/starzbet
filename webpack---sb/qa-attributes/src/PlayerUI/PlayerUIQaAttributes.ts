import { withAttrPrefixFactory } from "../Utils/WithAttrPrefixFactory";
import { SignUpPageKeys } from "./Pages/Auth/SignUpPageKeys";
import { ForgotPasswordPageKeys } from "./Pages/Auth/ForgotPasswordPageKeys";
import { AccountModalKeys } from "./Components/AccountModalKeys";
import { EmailModalKeys } from "./Components/EmailModalKeys";
import { HeaderKeys } from "./Components/HeaderKeys";
import { SecurityPageKeys } from "./Pages/MyAccount/SecurityPageKeys";
import { PasswordInputKeys } from "./Components/PasswordInputKeys";
import { ModalKeys } from "./Components/ModalKeys";
import { RequestCallBackPageKeys } from "./Pages/MyAccount/RequestCallBackPageKeys";
import { ResponsibleGamblingPagesKeys } from "./Pages/MyAccount/ResponsibleGamblingPagesKeys";
import { SideMenuKeys } from "./Components/Menu/SideMenuKeys";
import { VerificationPageKeys } from "./Pages/MyAccount/VerificationPageKeys";
import { PaginationKeys } from "./Components/Pagination/PaginationKeys";
import { PaymentAccountsPageKeys } from "./Pages/MyAccount/PaymentAccountsPageKeys";
import { SignInPageKeys } from "./Pages/Auth/SignInPageKeys";
import { AuthPageKeys } from "./Pages/Auth/AuthPageKeys";
import { MyAccountMenuKeys } from "./Components/Menu/MyAccountMenuKeys";
import { DetailsPageKeys } from "./Pages/MyAccount/DetailsPageKeys";
import { BalanceMenuKeys } from "./Components/BalanceMenuKeys";
import { NotificationsPageKeys } from "./Pages/MyAccount/NotificationsPageKeys";
import { BaseGameKeys } from "./Components/BaseGameKeys";
import { AllCasinoLabelsKeys } from "./Components/AllCasinoLabelsKeys";
import { CasinoMenuKeys } from "./Components/CasinoMenuKeys";
import { CasinoBottomMenuKeys } from "./Components/CasinoBottomMenuKeys";
import { ProvidersModalKeys } from "./Components/ProvidersModalKeys";
import { CasinoSearchKeys } from "./Components/CasinoSearchKeys";
import { TopWinnersKeys } from "./Components/TopWinnersKeys";
import { GameInfoModalKeys } from "./Components/GameInfoModalKeys";
import { CasinoPageKeys } from "./Pages/CasinoPage/CasinoPageKeys";
import { CmsKeys } from "./Components/CmsKeys";
import { BetSlipKeys } from "./Components/Sportsbook/BetSlipKeys";
import { MainLineKeys } from "./Components/Sportsbook/MainLineKeys";
import { SportsbookNavigationMenuKeys } from "./Components/Sportsbook/SportsbookNavigationMenuKeys";
import { EventDetailsKeys } from "./Components/Sportsbook/EventDetailsKeys";
import { SportsbookKeys } from "./Components/Sportsbook/SportsbookKeys";
import { CustomCouponKeys } from "./Components/Sportsbook/CustomCouponKeys";
import { BottomNavBar } from "./Components/BottomSheet/BottomSheetFooterKeys";
import { BonusesPageKeys } from "./Pages/MyAccount/BonusesPageKeys";
import { BankingPageKeys } from "./Pages/MyAccount/BankingPageKeys";
import { TwoFactorAuthPageKeys } from "./Pages/MyAccount/TwoFactorAuthPageKeys";
import { PromoPageKeys } from "./Pages/MyAccount/PromoPage/PromoPageKeys";
import { VipClubPageKeys } from "./Pages/VipClub/VipClubPageKeys";

const withAttr = withAttrPrefixFactory("player_ui");

class PlayerUIQaAttributes {
  static CasinoPage = CasinoPageKeys;

  // Auth
  static AuthPage = AuthPageKeys; // Parent of 'Sign In', 'Sign Up', 'Forgot Password' pages
  static SignInPage = SignInPageKeys;
  static SignUpPage = SignUpPageKeys;
  static ForgotPasswordPage = ForgotPasswordPageKeys;

  // My Account - Details
  static DetailsPage = DetailsPageKeys;

  // My Account - Security
  static SecurityPage = SecurityPageKeys;

  // My Account - 2FA
  static TwoFactorAuthPage = TwoFactorAuthPageKeys;

  // My Account - Verification
  static VerificationPage = VerificationPageKeys;

  // Notifications
  static NotificationsPage = NotificationsPageKeys;

  // Bonuses
  static BonusesPage = BonusesPageKeys;

  // Banking
  static BankingPage = BankingPageKeys;

  // My Account - Banking - Payment Accounts
  static PaymentAccountsPage = PaymentAccountsPageKeys;

  // My Account - Help - Request a Call Back
  static RequestCallBackPage = RequestCallBackPageKeys;

  static PromoPage = PromoPageKeys;

  // My Account - Responsible Gambling
  static ResponsibleGamblingPages = ResponsibleGamblingPagesKeys;

  // VIP Club
  static VipClubPage = VipClubPageKeys;

  // Sportsbook Components
  static SportsbookKeys = SportsbookKeys;
  static MainLineKeys = MainLineKeys;
  static EventDetailsKeys = EventDetailsKeys;
  static BetSlipKeys = BetSlipKeys;
  static SportsbookNavigationMenuKeys = SportsbookNavigationMenuKeys;
  static CustomCouponKeys = CustomCouponKeys;

  // Components
  static Header = HeaderKeys;
  static BalanceMenu = BalanceMenuKeys;
  static SideMenu = SideMenuKeys;
  static MyAccountMenu = MyAccountMenuKeys;
  static Modal = ModalKeys;
  static BaseGame = BaseGameKeys;
  static AllCasinoLabels = AllCasinoLabelsKeys;
  static CasinoMenu = CasinoMenuKeys;
  static CasinoBottomMenu = CasinoBottomMenuKeys;
  static ProvidersModal = ProvidersModalKeys;
  static CasinoSearch = CasinoSearchKeys;
  static TopWinners = TopWinnersKeys;
  static GameInfoModal = GameInfoModalKeys;
  static BottomNavBar = BottomNavBar;

  // General
  static NavCarousel = withAttr("page", "navCarousel");
  static PageTitle = withAttr("page", "title");
  static PageContent = withAttr("page", "content");
  public static EmptyContainer = withAttr("page", "empty");
  static Loader = withAttr("page", "loader");
  static ChatlineIcon = withAttr("page", "chatline_icon");
  static BottomSheetContainer = withAttr("page", "bottom_sheet__container");
  static LeftMenu = withAttr("page", "left_menu");

  // Refactor
  static AccountModal = AccountModalKeys;
  static EmailModal = EmailModalKeys;
  static PasswordInput = PasswordInputKeys;
  static Cms = CmsKeys;

  public static Pagination = PaginationKeys;
}

export { PlayerUIQaAttributes };
