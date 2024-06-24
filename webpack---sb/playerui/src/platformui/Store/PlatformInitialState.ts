import { withCallManagerDefaultState } from "@sb/call-manager";
import { type IWithAuthState } from "@sb/auth";
import { getMessagesInitialState } from "@sb/messages";
import { type IWithRouterState } from "@sb/router";
import { FORMS_STATE, formsInitialState } from "@sb/form-new";
import { getWithInitialFileServiceState, type TWithFileServiceState } from "@sb/file-service";
import { createChatInitialState } from "@sb/chat";
import { type IWithPlayerState, playerInitialState } from "../../common/Store/Player/InitialState/PlayerInitialState";
import { configInitialState, type IWithConfigState } from "../../common/Store/Config/ConfigInitialState";
import { type IWithModalState } from "../../common/Store/Modal/ModalState";
import { getBannerInitialState, type IWithBannerPreloadedState } from "../../common/Store/Banner/BannerInitialState";
import { sharedBetsInitialState } from "../../common/Store/SharedBets/SharedBetsState";
import { getDeviceInfoState, type IWithDeviceInfoState } from "../../common/Store/DeviceInfo/DeviceInfoState";
import { isMobileSelector } from "../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { getLocaleState, type TLocalePreloadedState } from "./Locale/LocaleState";
import { formInitialState } from "./Form/FormInitialState";
import { type IWithSelfProtectionState, selfProtectionState } from "./SelfProtection/SelfProtectionState";
import { transactionRequestsInitialState } from "./TransactionRequests/TransactionRequestsInitialState";
import { bonusesInitialState } from "./Bonuses/BonusesInitialState";
import { resetPasswordInitialState } from "./ResetPassword/ResetPasswordInitialState";
import { casinoInitialState } from "./Casino/CasinoInitialState";
import { liveCasinoInitialState } from "./LiveCasino/LiveCasinoInitialState";
import { historyInitialState } from "./History/HistoryInitialState";
import { getGamesInitialState, type TWithGamesPreloadedState } from "./Games/GamesInitialState";
import { liveGamesInitialState } from "./LiveGames/LiveGamesInitialState";
import { virtualInitialState } from "./Virtual/VirtualInitialState";
import { ticketInitialState } from "./Ticket/TicketInitialState";
import { pragmaticDgaInitialState } from "./PragmaticDga/PragmaticDgaInitialState";
import { betStatesInitialState } from "./BetStates/BetStatesInitialState";
import { getCmsInitialState } from "./CMS/CmsInitialState";
import { callRequestsInitialState } from "./CallRequests/CallRequestsInitialState";
import { bankingInitialState } from "./Banking/PlatformBankingInitialState";
import { gameInfoDrawerInitialState } from "./GameInfoDrawer/GameInfoDrawerInitialState";
import { viewportInitialState } from "./Viewport/ViewportState";
import { playGameInitialState } from "./PlayGame/PlayGameState";
import { landingInitialState } from "./Landing/LandingInitialState";
import { userMessageInitialState } from "./UserMessage/UserMessageInitialState";
import { getTopWinnersInitialState, type IWithTopWinnersPreloadedState } from "./TopWinners/TopWinnersInitialState";
import { vipClubInitialState } from "./VipClub/VipClubInitialState";
import { liveSpinsInitialState } from "./LiveSpins/LiveSpinsInitialState";
import { chatInitialState } from "./Chat/ChatInitialState";
import { verifyDeviceInitialState } from "./VerifyDevice/VerifyDeviceInitialState";
import { domainInitialState } from "./Domain/DomainInitialState";
import { AuthInitialState } from "./Auth/AuthInitialState";
import { bonusEventsInitialState } from "./BonusEvents/BonusEventsInitialState";
import { playGameInitialStateNew } from "./PlayGamePage/PlayGameState";
import { type ICmsPreloadedState, type TContent } from "./CMS/Model/CmsModel";
import { twoFactorAuthInitialState } from "./TwoFactorAuth/TwoFactorAuthInitialState";

const fileServiceInitialState = getWithInitialFileServiceState({
  uploadEndpoint: `${process.env.FILESERVER_PRIVATE_API_URL}/file/upload`,
  privateEndpoint: `${process.env.FILESERVER_PRIVATE_API_URL}/file`,
  publicEndpoint: `${process.env.FILESERVER_PUBLIC_API_URL}`,
  sharedUploadEndpoint: `${process.env.FILESERVER_PRIVATE_API_URL}/file/upload`,
  sharedPrivateEndpoint: `${process.env.FILESERVER_PRIVATE_API_URL}/file`,
});

type TPlatformAppPreloadedState<CmsContent extends TContent> = Partial<
  IWithTopWinnersPreloadedState &
  TWithGamesPreloadedState &
  ICmsPreloadedState<CmsContent> &
  TLocalePreloadedState &
  IWithBannerPreloadedState &
  IWithDeviceInfoState
>

const getPlatformInitialState = <CmsContent extends TContent>(preloadedState: TPlatformAppPreloadedState<CmsContent>) => {
  const deviceInfoState = getDeviceInfoState(preloadedState.deviceInfo);

  return ({
    messages: getMessagesInitialState(),
    ...viewportInitialState,
    ...domainInitialState,
    ...gameInfoDrawerInitialState,
    ...playerInitialState,
    ...verifyDeviceInitialState,
    ...twoFactorAuthInitialState,
    ...AuthInitialState,
    ...transactionRequestsInitialState,
    ...formInitialState,
    ...getLocaleState(preloadedState.locale),
    ...selfProtectionState,
    ...bonusesInitialState,
    ...betStatesInitialState,
    ...resetPasswordInitialState,
    ...configInitialState,
    ...casinoInitialState,
    ...liveCasinoInitialState,
    ...historyInitialState,
    ...getGamesInitialState(preloadedState.games, isMobileSelector(deviceInfoState)),
    ...playGameInitialState,
    ...playGameInitialStateNew,
    ...pragmaticDgaInitialState,
    ...liveGamesInitialState,
    ...virtualInitialState,
    ...ticketInitialState,
    ...getBannerInitialState(preloadedState.banner),
    ...getCmsInitialState(preloadedState.CMS),
    ...liveSpinsInitialState,
    ...callRequestsInitialState,
    ...bankingInitialState,
    ...withCallManagerDefaultState,
    ...landingInitialState,
    ...userMessageInitialState,
    ...getTopWinnersInitialState(preloadedState.topWinners),
    ...vipClubInitialState,
    [FORMS_STATE]: formsInitialState,
    ...createChatInitialState(),
    ...fileServiceInitialState,
    ...chatInitialState,
    ...sharedBetsInitialState,
    ...bonusEventsInitialState,
    ...deviceInfoState,
  });
};

//todo wrong type
type TPlatformAppState = ReturnType<typeof getPlatformInitialState> &
  IWithRouterState &
  IWithSelfProtectionState &
  IWithPlayerState &
  IWithConfigState &
  TWithFileServiceState &
  IWithModalState &
  IWithAuthState

export type { TPlatformAppPreloadedState, TPlatformAppState };
export { getPlatformInitialState, fileServiceInitialState };
