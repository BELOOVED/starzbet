import { withProps } from "@sb/utils";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { EAuthModal } from "../../../../../common/Store/Modal/Model/EModal";
import { RedirectLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { IS_STARZBET_KG } from "../../../../../ServerEnvironment";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { WhenAllowedBonusPage } from "../../../../Components/WhenAllowedBonusPage/WhenAllowedBonusPage";
import { STARZBET_VERIFY_DEVICE_ENABLE } from "../../../../Store/VerifyDevice/EnableFlags";
import { Bingo } from "../../Components/Bingo/Bingo";
import { ParlayBay } from "../../Components/ParlayBay/ParlayBay";
import { VerifyPlayer } from "../../Components/VerifyPlayer/VerifyPlayer";
import { VIP_CLUB_PAGE_ROUTE } from "../../Pages/VipClubPage/VipClubPage";
import { ContactUsWrapper } from "../Pages/ContactUs/ContactUs";
import { Register } from "../Pages/Register/Register";
import { Login } from "../Pages/Login/Login";
import { ForgotPassword } from "../Pages/ForgotPassword/ForgotPassword";
import { MyAccount } from "../Pages/MyAccount/MyAccount";
import { History } from "../Pages/History/History";
import { Deposit } from "../Pages/Deposit/Deposit";
import { MyDetails } from "../Pages/MyDetails/MyDetails";
import { DepositLimit } from "../Pages/DepositLimit/DepositLimit";
import { TimeOut } from "../Pages/TimeOut/TimeOut";
import { SelfExclusion } from "../Pages/SelfExclusion/SelfExclusion";
import { Withdraw } from "../Pages/Withdraw/Withdraw";
import { Password } from "../Pages/Password/Password";
import { AccountVerification } from "../Pages/AccountVerification/AccountVerification";
import { AccountClosure } from "../Pages/AccountClosure/AccountClosure";
import { RealityCheck } from "../Pages/RealityCheck/RealityCheck";
import { GamblingControl } from "../Pages/GamblingControl/GamblingControl";
import { PlayLimit } from "../Pages/PlayLimit/PlayLimit";
import { AvailableBonuses } from "../Pages/BonusPages/AvailableBonuses/AvailableBonuses";
import { PlayerBonuses } from "../Pages/BonusPages/PlayerBonuses/PlayerBonuses";
import { HistoryBonuses } from "../Pages/BonusPages/HistoryBonuses/HistoryBonuses";
import { TicketMain } from "../Pages/TicketMain/TicketMain";
import { Tickets } from "../Pages/Tickets/Tickets";
import { TicketDetail } from "../Pages/TicketDetail/TicketDetail";
import { SportHistory } from "../Pages/SportHistory/SportHistory";
import { CallRequests } from "../Pages/CallRequests/CallRequests";
import { CasinoSearch, GamesSearch, LiveCasinoSearch } from "../Pages/CasinoSearch/CasinoSearch";
import { WithdrawPaymentMethod } from "../Pages/WithdrawPaymentMethod/WithdrawPaymentMethod";
import { BankingHistory } from "../Pages/BankingHistory/BankingHistory";
import { CMSPageWrapper } from "../Pages/CMSPage/CMSWrapper";
import { DepositPaymentMethod } from "../Pages/DepositPaymentMethod/DepositPaymentMethod";
import { PaymentAccounts } from "../Pages/PaymentAccounts/PaymentAccounts";
import { PaymentAccountCreate } from "../Pages/PaymentAccountCreate/PaymentAccountCreate";
import { GamesPage } from "../Pages/GamesPage/GamesPage";
import { AllGames } from "../Pages/AllGames/AllGames";
import { PaymentAccountEdit } from "../Pages/PaymentAccountEdit/PaymentAccountEdit";
import { UpdatePasswordByEmail } from "../Pages/UpdatePasswordByEmail/UpdatePasswordByEmail";
import { TransactionList } from "../Pages/TransactionHistory/TransactionHistory";
import { UserMessageDetails } from "../Pages/UserMessageDetails/UserMessageDetails";
import { UserMessages } from "../Pages/UserMessages/UserMessages";
import { UserMessagesMain } from "../Pages/UserMessagesMain/UserMessagesMain";
import { Devices } from "../Pages/Devices/Devices";
import { TwoFactorAuth } from "../Pages/TwoFactorAuth/TwoFactorAuth";

const historyRoutes = [
  {
    path: routeMap.sportsHistoryRoute,
    component: IS_STARZBET_KG ? withProps(RedirectLocalized)({ to: routeMap.accountHistoryRoute }) : SportHistory,
  },
  {
    path: routeMap.casinoHistoryRoute,
    component: TransactionList,
  },
  {
    path: routeMap.accountHistoryRoute,
    component: TransactionList,
  },
  {
    path: routeMap.liveCasinoHistoryRoute,
    component: TransactionList,
  },
  {
    path: routeMap.gamesHistoryRoute,
    component: TransactionList,
  },
  {
    path: routeMap.virtualHistoryRoute,
    component: TransactionList,
  },
];

const ticketRoutes = [
  {
    path: routeMap.ticketDetail,
    component: TicketDetail,
    exact: true,
  },
  {
    path: routeMap.tickets,
    component: Tickets,
  },
];

const userMessagesRoutes = [
  {
    path: routeMap.userMessageDetails,
    component: UserMessageDetails,
    exact: true,
  },
  {
    path: routeMap.userMessages,
    component: UserMessages,
  },
];

const routes = {
  availableBonuses: {
    path: [routeMap.bonusesRoute, routeMap.availableBonusesRoute],
    component: withProps(WhenAllowedBonusPage)({ page: AvailableBonuses }),
    exact: true,
  },
  myBonuses: {
    path: routeMap.myBonusesRoute,
    component: withProps(WhenAllowedBonusPage)({ page: PlayerBonuses }),
    exact: true,
  },
  historyBonuses: {
    path: routeMap.historyBonusesRoute,
    component: withProps(WhenAllowedBonusPage)({ page: HistoryBonuses }),
    exact: true,
  },
  register: {
    path: routeMap.registrationRoute,
    component: withProps(Register)({ type: EAuthModal.registration }),
  },
  privateRegistration: {
    path: routeMap.privateRegistrationRoute,
    component: IS_STARZBET_KG
      ? withProps(RedirectLocalized)({ to: routeMap.registrationRoute })
      : withProps(Register)({ type: EAuthModal.privateRegistration }),
  },
  login: {
    path: routeMap.loginRoute,
    component: Login,
  },
  forgotPassword: {
    path: routeMap.forgotPasswordRoute,
    component: ForgotPassword,
  },
  updatePassword: {
    path: routeMap.updatePasswordByEmailRoute,
    component: UpdatePasswordByEmail,
  },
  verifyPlayer: {
    path: routeMap.verifyPlayer,
    component: VerifyPlayer,
  },
  myAccount: {
    exact: true,
    path: routeMap.myAccountRoute,
    component: MyAccount,
  },
  gamblingControl: {
    exact: true,
    path: routeMap.gamblingControl,
    component: GamblingControl,
  },
  myDetails: {
    path: routeMap.myDetailsRoute,
    component: MyDetails,
  },
  password: {
    path: routeMap.passwordRoute,
    component: Password,
  },
  twoFactorAuth: {
    path: routeMap.twoFactorAuthenticationRoute,
    component: TwoFactorAuth,
  },
  devices: {
    path: routeMap.devices,
    component: STARZBET_VERIFY_DEVICE_ENABLE ? Devices : withProps(RedirectLocalized)({ to: routeMap.root }),
  },
  accountVerification: {
    path: routeMap.accountVVerificationRoute,
    component: AccountVerification,
  },
  depositLimit: {
    path: routeMap.depositLimitRoute,
    component: DepositLimit,
  },
  playLimit: {
    path: routeMap.playLimitRoute,
    component: PlayLimit,
  },
  timeOut: {
    path: routeMap.timeOutRoute,
    component: TimeOut,
  },
  selfExclusion: {
    path: routeMap.selfExclusionRoute,
    component: SelfExclusion,
  },
  accountClosure: {
    path: routeMap.accountClosureRoute,
    component: AccountClosure,
  },
  realityChecks: {
    path: routeMap.realityChecksRoute,
    component: RealityCheck,
  },
  contactUs: {
    path: routeMap.contactUs,
    component: ContactUsWrapper,
  },
  deposit: {
    path: routeMap.depositRoute,
    exact: true,
    component: Deposit,
  },
  depositPaymentMethod: {
    path: routeMap.depositPaymentMethodRoute,
    exact: true,
    component: DepositPaymentMethod,
  },
  withdrawPaymentMethod: {
    path: routeMap.withdrawPaymentMethodRoute,
    component: WithdrawPaymentMethod,
  },
  withdraw: {
    path: routeMap.withdrawRoute,
    component: Withdraw,
  },
  paymentAccounts: {
    path: routeMap.bankingPaymentAccountsRoute,
    component: PaymentAccounts,
    exact: true,
  },
  paymentAccountCreate: {
    path: routeMap.bankingPaymentAccountCreateRoute,
    component: PaymentAccountCreate,
  },
  paymentAccountEdit: {
    path: routeMap.bankingPaymentAccountEditRoute,
    component: PaymentAccountEdit,
  },
  bankingHistory: {
    path: routeMap.bankingHistoryRoute,
    component: BankingHistory,
  },
  history: {
    path: routeMap.historyRoute,
    component: withProps(History)({ routes: historyRoutes }),
  },
  tickets: {
    path: routeMap.tickets,
    component: withProps(TicketMain)({ routes: ticketRoutes }),
  },
  cms: {
    path: routeMap.cms,
    component: CMSPageWrapper,
  },
  casino: {
    path: routeMap.casino,
    component: withProps(GamesPage)({ page: EGamePage.CASINO }),
  },
  liveCasino: {
    path: routeMap.liveCasino,
    component: withProps(GamesPage)({ page: EGamePage.LIVE_CASINO }),
  },
  games: {
    path: routeMap.games,
    component: withProps(GamesPage)({ page: EGamePage.GAMES }),
  },
  callRequests: {
    path: routeMap.callRequestsRoute,
    component: CallRequests,
  },
  casinoList: {
    path: routeMap.casinoAllSports,
    component: withProps(AllGames)({ page: EGamePage.CASINO, closePath: routeMap.casino }),
  },
  liveCasinoList: {
    path: routeMap.liveCasinoAllSports,
    component: withProps(AllGames)({ page: EGamePage.LIVE_CASINO, closePath: routeMap.liveCasino }),
  },
  gameList: {
    path: routeMap.gamesAllSports,
    component: withProps(AllGames)({ page: EGamePage.GAMES, closePath: routeMap.games }),
  },
  casinoSearch: {
    path: routeMap.casinoSearch,
    component: CasinoSearch,
  },
  liveCasinoSearch: {
    path: routeMap.liveCasinoSearch,
    component: LiveCasinoSearch,
  },
  gamesSearch: {
    path: routeMap.gamesSearch,
    component: GamesSearch,
  },
  bingo: {
    path: routeMap.bingo,
    component: Bingo,
  },
  parlayBay: {
    path: routeMap.parlayBay,
    component: IS_STARZBET_KG ? withProps(RedirectLocalized)({ to: routeMap.root }) : ParlayBay,
  },
  userMessage: {
    path: routeMap.userMessages,
    component: withProps(UserMessagesMain)({ routes: userMessagesRoutes }),
  },
  ...VIP_CLUB_PAGE_ROUTE,
};

export { routes };
