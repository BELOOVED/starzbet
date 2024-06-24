import { type TGameManagerPage } from "../../../../platformui/Store/Games/Model/Games";

enum EModal {
  additionalMarkets = "additionalMarkets",
  topWinner = "topWinner",
  betSlip = "betSlip",
  maxPicks = "maxPicks",
  betHistory = "betHistory",
  follow = "follow",
  betConflict = "betConflict",
  betSettings = "betSettings",
  autoCashout = "autoCashout",
  editBetTutorial = "editBetTutorial",
  multiViewTutorial = "multiViewTutorial",
  addSelectionTip = "skipAddSelectionTip",
  coupon = "coupon",
  search = "search",
  myBets = "myBets",
  login = "login",
  notSupportedCurrency = "notSupportedCurrency",
  cancelBonus = "cancelBonus",
  statistics = "statistics",

  /* Platform Modal */

  auth = "auth",

  chatRules = "chatRules",
  chatBanInfo = "chatBanInfo",
  chatNameForm = "chatNameForm",
  chatTimeLimit = "chatTimeLimit",

  gameInfo = "gameInfo",
  removeDevice = "removeDevice",
  verifyDevice = "verifyDevice",
  invalidFile = "invalidFile",
  recentlyPlayed = "recentlyPlayed",
  paymentAccountRemove = "paymentAccountRemove",

  /* VIP CLUB */
  vipClubWelcome = "vipClubWelcome",
  vipClubLevelUp = "vipClubLevelUp",
  vipClubEmpty = "vipClubEmpty",

  /* Cms Modal */

  cmsPromo = "cmsPromo",

  comingSoon = "comingSoon",
  changePasswordFormSuccess = "changePasswordFormSuccess",
  changePasswordFormError = "changePasswordFormError",

  updateEmail = "updateEmail",
  updatePhoneNumber = "updatePhoneNumber",

  claimBonusFailed = "claimBonusFailed",
  activateBonusFailed = "activateBonusFailed",
  cancelBonusFailed = "cancelBonusFailed",
  bonusNoLongerAvailable = "bonusNoLongerAvailable",
}

enum EAuthModal {
  login,
  registration,
  forgotPassword,
  updatePassword,
  privateRegistration
}

interface IAuthData {
  authType: EAuthModal;
}

interface ICouponData {
  couponId?: string;
}

const defaultAuthData: IAuthData = {
  authType: EAuthModal.login,
};

type TGameInfo = { page: TGameManagerPage; id: string; }

export {
  EModal,
  type IAuthData,
  type ICouponData,
  defaultAuthData,
  EAuthModal,
  type TGameInfo,
};
