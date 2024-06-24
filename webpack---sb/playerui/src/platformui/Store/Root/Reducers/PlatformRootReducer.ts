// @ts-nocheck
import { callManagerRootReducer } from "@sb/call-manager";
import { formsRootReducer } from "@sb/form-new";
import { fileServiceRootReducer } from "@sb/file-service";
import { bannerRootReducer } from "../../../../common/Store/Banner/Reducers/BannerRootReducer";
import { localeRootReducer } from "../../Locale/Reducers/LocaleRootReducer";
import { platformFormRootReducer } from "../../Form/Reducers/PlatformFormRootReducer";
import { playerKycRootReducer } from "../../Kyc/Reducers/PlayerKycRootReducer";
import { selfProtectionRootReducer } from "../../SelfProtection/Reducers/SelfProtectionRootReducer";
import { platformTransactionRequestsRootReducer } from "../../TransactionRequests/Reducers/PlatformTransactionRequestsRootReducer";
import { platformBonusesRootReducer } from "../../Bonuses/Reducers/PlatformBonusesRootReducer";
import { casinoRootReducer } from "../../Casino/Reducers/CasinoRootReducer";
import { cmsContentRootReducer } from "../../CMS/Reducers/CmsContentRootReducer";
import { liveCasinoRootReducer } from "../../LiveCasino/Reducers/LiveCasinoRootReducer";
import { historyRootReducer } from "../../History/Reducers/HistoryRootReducer";
import { gamesRootReducer } from "../../Games/Reducers/GamesRootReducer";
import { liveGamesRootReducer } from "../../LiveGames/Reducers/LiveGamesRootReducer";
import { virtualRootReducer } from "../../Virtual/Reducers/VirtualRootReducer";
import { ticketRootReducer } from "../../Ticket/Reducers/TicketRootReducer";
import { pragmaticDgaRootReducer } from "../../PragmaticDga/Reducers/PragmaticDgaRootReducer";
import { platformBetStatesRootReducer } from "../../BetStates/BetStatesReducers";
import { callRequestsRootReducer } from "../../CallRequests/Reducers/CallRequestsRootReducer";
import { platformBankingRootReducer } from "../../Banking/Reducers/PlatformBankingRootReducer";
import { gameInfoDrawerRootReducer } from "../../GameInfoDrawer/Reducers/GameInfoDrawerRootReducer";
import { viewportRootReducer } from "../../Viewport/ViewportReducers";
import { playGameRootReducer } from "../../PlayGame/PlayGameReducers";
import { landingRootReducer } from "../../Landing/Reducers/LandingRootReducer";
import { userMessageRootReducer } from "../../UserMessage/Reducers/UserMessageRootReducer";
import { topWinnersRootReducer } from "../../TopWinners/Reducers/TopWinnersRootReducer";
import { vipClubRootReducer } from "../../VipClub/Reducers/VipClubRootReducer";
import { chatRootReducer } from "../../Chat/Reducer";
import { liveStreamsRootReducer } from "../../LiveSpins/Reducer/RootLiveSpinsReducer";
import { verifyDeviceRootReducer } from "../../VerifyDevice/Reducers/VerifyDeviceRootReducer";
import { domainRootReducer } from "../../Domain/Reducer/DomainRootReducer";
import { authRootReducer } from "../../Auth/Reducers/AuthRootReducer";
import { bonusEventsRootReducer } from "../../BonusEvents/Reducers/BonusEventsRootReducer";
import { playGameRootReducerNew } from "../../PlayGamePage/Reducers/PlayGameReducers";
import { twoFactorAuthRootReducer } from "../../TwoFactorAuth/TwoFactorAuthReducers";

const platformRootReducers = [
  viewportRootReducer,
  platformBankingRootReducer,
  platformFormRootReducer,
  verifyDeviceRootReducer,
  twoFactorAuthRootReducer,
  authRootReducer,
  domainRootReducer,
  platformTransactionRequestsRootReducer,
  localeRootReducer,
  playerKycRootReducer,
  selfProtectionRootReducer,
  platformBonusesRootReducer,
  platformBetStatesRootReducer,
  casinoRootReducer,
  liveCasinoRootReducer,
  historyRootReducer,
  gamesRootReducer,
  playGameRootReducer,
  playGameRootReducerNew,
  gameInfoDrawerRootReducer,
  pragmaticDgaRootReducer,
  liveGamesRootReducer,
  virtualRootReducer,
  ticketRootReducer,
  bannerRootReducer,
  cmsContentRootReducer,
  liveStreamsRootReducer,
  callRequestsRootReducer,
  callManagerRootReducer,
  landingRootReducer,
  formsRootReducer,
  userMessageRootReducer,
  topWinnersRootReducer,
  vipClubRootReducer,
  fileServiceRootReducer,
  chatRootReducer,
  bonusEventsRootReducer,
];

export { platformRootReducers };
