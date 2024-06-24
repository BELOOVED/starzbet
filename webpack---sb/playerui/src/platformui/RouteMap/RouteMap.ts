import { getLocalizedRouteMap } from "../../common/Client/Core/Services/RouterService/Utils/GetLocalizedRouteMap";
import { EHistoryProduct } from "../Store/History/Model/EHistoryProduct";

const myAccountRoute = "/my_account" as const;
const bankingRoute = "/banking" as const;
const authenticationRoute = "/(registration|login|forgot_username|forgot_password|update_password_by_email|update_password_by_phone)/" as const;
const registrationRoute = "/registration" as const;
const privateRegistrationRoute = "/private_registration" as const;
const loginRoute = "/login" as const;
const forgotUsernameRoute = "/forgot_username" as const;
const forgotPasswordRoute = "/forgot_password" as const;
const updatePasswordByEmailRoute = "/update_password_by_email/:token" as const;
const updatePasswordByPhoneRoute = "/update_password_by_phone" as const;
const profileRoute = "/profile" as const;

const myDetailsRoute = `${myAccountRoute}/my_details` as const;
const preferencesRoute = `${myAccountRoute}/preferences` as const;
const securityRoute = "/security" as const;
const passwordRoute = `${myAccountRoute}/password` as const;
const twoFactorAuthenticationRoute = `${myAccountRoute}/2_fa` as const;
const accountVVerificationRoute = `${myAccountRoute}/account_verification` as const;
const bonusesRoute = `${myAccountRoute}/bonuses` as const;

const depositLimitRoute = `${myAccountRoute}/deposit_limit` as const;
const timeOutRoute = `${myAccountRoute}/time_out` as const;
const selfExclusionRoute = `${myAccountRoute}/self_exclusion` as const;
const accountClosureRoute = `${myAccountRoute}/account_closure` as const;
const realityChecksRoute = `${myAccountRoute}/reality_checks` as const;
const playLimitRoute = `${myAccountRoute}/play_limit` as const;
const callRequestsRoute = `${myAccountRoute}/call_requests` as const;
const historyRoute = "/history" as const;
const historyRouteWithParam = `${historyRoute}/:product` as const;

const sportsHistoryRoute = `${historyRoute}/${EHistoryProduct.sports}` as const;
const casinoHistoryRoute = `${historyRoute}/${EHistoryProduct.casino}` as const;
const liveCasinoHistoryRoute = `${historyRoute}/${EHistoryProduct.liveCasino}` as const;
const virtualHistoryRoute = `${historyRoute}/${EHistoryProduct.virtual}` as const;
const vipClubHistoryRoute = `${historyRoute}/${EHistoryProduct.vipClub}` as const;
const gamesHistoryRoute = `${historyRoute}/${EHistoryProduct.games}` as const;
const accountHistoryRoute = `${historyRoute}/${EHistoryProduct.account}` as const;

const depositRoute = `${bankingRoute}/deposit` as const;
const depositPaymentMethodRoute = `${depositRoute}/:paymentMethodId` as const;
const withdrawRoute = `${bankingRoute}/withdraw` as const;
const withdrawPaymentMethodRoute = `${withdrawRoute}/:paymentMethodId` as const;
const bankingHistoryRoute = `${bankingRoute}/history` as const;
const bankingHistoryWithdrawalsRoute = `${bankingHistoryRoute}/withdrawals` as const;
const bankingHistoryDepositsRoute = `${bankingHistoryRoute}/deposits` as const;
const bankingPaymentAccountsRoute = `${bankingRoute}/payment_accounts` as const;
const bankingPaymentAccountCreateRoute = `${bankingPaymentAccountsRoute}/create/:accountType` as const;
const bankingPaymentAccountCreateKindRoute = `${bankingPaymentAccountsRoute}/create/:accountType/:accountKind` as const;
const bankingPaymentAccountEditRoute = `${bankingPaymentAccountsRoute}/edit/:id` as const;

const availableBonusesRoute = `${bonusesRoute}/available` as const;
const availableBonusRoute = `${availableBonusesRoute}/:id` as const;
const myBonusesRoute = `${bonusesRoute}/my_bonuses` as const;
const myBonusRoute = `${myBonusesRoute}/:id` as const;
const historyBonusesRoute = `${bonusesRoute}/history` as const;
const historyBonusRoute = `${historyBonusesRoute}/:id` as const;

const tickets = "/tickets" as const;
const ticketDetail = `${tickets}/:id` as const;

const cmsGeneral = "/cms" as const;

const cms = `${cmsGeneral}/:path(.*?)` as const;

const cmsSearch = `${cms}/search` as const;

const cmsSearchText = `${cmsSearch}/:searchText` as const;

const preLiveRoute = "/prelive" as const;

const contactUs = "/contactUs" as const;
const helpCenter = "/helpCenter" as const;

const casino = "/casino" as const;
const casinoLabel = `${casino}/label/:labelId` as const;
const casinoProvider = `${casino}/:provider` as const;
const casinoCombineProviders = `${casino}/combineProviders/:providers` as const;
const casinoSearch = `${casino}/casino_search` as const;
const casinoSearchText = `${casinoSearch}/:searchText` as const;

const liveCasino = "/live_casino" as const;
const liveCasinoLabel = `${liveCasino}/label/:labelId` as const;
const liveCasinoProvider = `${liveCasino}/:provider` as const;
const liveCasinoCombineProviders = `${liveCasino}/combineProviders/:providers` as const;
const liveCasinoSearch = `${liveCasino}/live_casino_search` as const;
const liveCasinoSearchText = `${liveCasinoSearch}/:searchText` as const;

const games = "/games" as const;
const gamesLabel = `${games}/label/:labelId` as const;
const gamesProvider = `${games}/:provider` as const;
const gamesCombineProviders = `${games}/combineProviders/:providers` as const;
const gamesSearch = `${games}/games_search` as const;
const gamesSearchText = `${gamesSearch}/:searchText` as const;

const gamePreview = "/game_preview/:gameId" as const;
const playGame = "/play_game/:gameId" as const;
const playDemoGame = "/play_demo_game/:gameId" as const;

const bingo = "/bingo" as const;
const parlayBay = "/parlay_bay" as const;

const userMessages = "/notifications" as const;
const userMessageDetails = `${userMessages}/:id` as const;

const virtualRoot = "/virtual" as const;
const virtualProvider = `${virtualRoot}/:provider` as const;
const virtualGame = `${virtualProvider}/game/:id` as const;

const vipClubRoute = "/vip_club" as const;

const vipClubOverviewRoute = `${vipClubRoute}/overview` as const;
const vipClubOverviewPlayerStateRoute = `${vipClubOverviewRoute}/player_state` as const;
const vipClubOverviewLevelRulesRoute = `${vipClubOverviewRoute}/level_rules` as const;
const vipClubOverviewBonusRoute = `${vipClubOverviewRoute}/bonus` as const;
const vipClubOverviewCommissionRefundRoute = `${vipClubOverviewRoute}/commission_refund` as const;
const vipClubOverviewContributionTableRoute = `${vipClubOverviewRoute}/contribution_table` as const;
const vipClubOverviewBenefitsRoute = `${vipClubOverviewRoute}/benefits` as const;

const vipClubLeadersRoute = `${vipClubRoute}/leaders` as const;
const vipClubLeadersPeriodRoute = `${vipClubLeadersRoute}/:period` as const;
const vipClubLeadersDailyPeriodRoute = `${vipClubLeadersRoute}/daily` as const;
const vipClubLeadersWeeklyPeriodRoute = `${vipClubLeadersRoute}/weekly` as const;
const vipClubLeadersMonthlyPeriodRoute = `${vipClubLeadersRoute}/monthly` as const;
const vipClubLeadersAllTimePeriodRoute = `${vipClubLeadersRoute}/all-time` as const;
const vipClubLeadersPeriodPageRoute = `${vipClubLeadersPeriodRoute}/:page` as const;

const vipClubTournamentsRoute = `${vipClubRoute}/tournaments` as const;
const vipClubTournamentsIdRoute = `${vipClubTournamentsRoute}/:selectedTournamentId` as const;
const vipClubTournamentsIdPeriodPageRoute = `${vipClubTournamentsIdRoute}/:period/:page` as const;

const betExchange = "/bet_exchange" as const;

const baseRouteMap = {
  root: "/",
  all: "/all",
  sport: "/sport",
  betSlip: "/bet-slip",
  myBets: "/mybets",
  preLive: preLiveRoute,
  tournament: "/tournament",
  category: "/category",
  coupons: `${preLiveRoute}/coupons`,
  live: "/live",
  statistics: "/statistics",
  search: "/search",
  favourites: "/favourites",
  impersonatedLogin: "/impersonated-login",
  chat: "/chat",
  devices: `${myAccountRoute}/devices`,
  myAccountRoute,
  bankingRoute,
  historyRouteWithParam,
  historyRoute,
  authenticationRoute,
  registrationRoute,
  privateRegistrationRoute,
  loginRoute,
  forgotUsernameRoute,
  forgotPasswordRoute,
  updatePasswordByEmailRoute,
  updatePasswordByPhoneRoute,
  myDetailsRoute,
  preferencesRoute,
  securityRoute,
  passwordRoute,
  twoFactorAuthenticationRoute,
  accountVVerificationRoute,
  bonusesRoute,
  availableBonusesRoute,
  availableBonusRoute,
  myBonusesRoute,
  myBonusRoute,
  historyBonusesRoute,
  historyBonusRoute,
  depositLimitRoute,
  timeOutRoute,
  selfExclusionRoute,
  accountClosureRoute,
  realityChecksRoute,
  playLimitRoute,
  depositRoute,
  depositPaymentMethodRoute,
  withdrawRoute,
  withdrawPaymentMethodRoute,
  bankingHistoryRoute,
  bankingHistoryWithdrawalsRoute,
  bankingHistoryDepositsRoute,
  bankingPaymentAccountsRoute,
  bankingPaymentAccountCreateRoute,
  bankingPaymentAccountCreateKindRoute,
  bankingPaymentAccountEditRoute,
  profileRoute,
  sportsHistoryRoute,
  casinoHistoryRoute,
  gamesHistoryRoute,
  accountHistoryRoute,
  liveCasinoHistoryRoute,
  virtualHistoryRoute,
  vipClubHistoryRoute,
  verifyPlayer: "/verify_player/:token",
  promotions: "/promotions",
  casino,
  casinoLabel,
  casinoProvider,
  casinoCombineProviders,
  liveCasinoCombineProviders,
  gamesCombineProviders,
  casinoSearch,
  casinoSearchText,
  liveCasino,
  liveCasinoLabel,
  liveCasinoProvider,
  liveCasinoSearch,
  liveCasinoSearchText,
  games,
  gamesLabel,
  gamesProvider,
  gamesSearch,
  gamesSearchText,
  gamePreview,
  playGame,
  playDemoGame,
  bingo,
  parlayBay,
  play: "/play/:gameId",
  playDemo: "/play/demo/:gameId",
  gamesAllSports: `${games}/all-sports`,
  virtual: virtualRoot,
  virtualProvider: virtualProvider,
  virtualGame,
  esport: "/esport",
  esportLive: "/esport/live",
  gamblingControl: "/gambling_control",
  casinoAllSports: `${casino}/all-sports`,
  liveCasinoAllSports: `${liveCasino}/all-sports`,
  tickets,
  ticketDetail,
  cmsGeneral,
  cms,
  cmsSearchText,
  cmsSearch,
  callRequestsRoute,
  contactUs,
  helpCenter,
  userMessages,
  userMessageDetails,
  vipClubRoute,
  vipClubOverviewRoute,
  vipClubOverviewPlayerStateRoute,
  vipClubOverviewLevelRulesRoute,
  vipClubOverviewBonusRoute,
  vipClubOverviewCommissionRefundRoute,
  vipClubOverviewContributionTableRoute,
  vipClubOverviewBenefitsRoute,
  vipClubLeadersRoute,
  vipClubLeadersPeriodRoute,
  vipClubLeadersDailyPeriodRoute,
  vipClubLeadersWeeklyPeriodRoute,
  vipClubLeadersMonthlyPeriodRoute,
  vipClubLeadersAllTimePeriodRoute,
  vipClubLeadersPeriodPageRoute,
  vipClubTournamentsRoute,
  vipClubTournamentsIdRoute,
  vipClubTournamentsIdPeriodPageRoute,
  betExchange,
} as const;

const routeMap = getLocalizedRouteMap(baseRouteMap);

const getSportsbookRoutes = (isMobile?: boolean) => ([
  isMobile ? routeMap.betSlip : routeMap.all,
  routeMap.preLive,
  routeMap.live,
  routeMap.search,
  routeMap.esport,
  routeMap.statistics,
  routeMap.all,
  routeMap.tournament,
  routeMap.category,
]);

type TRoutePath = typeof routeMap extends Record<string, infer I> ? I : never

export type { TRoutePath };

export { baseRouteMap, routeMap, getSportsbookRoutes };
