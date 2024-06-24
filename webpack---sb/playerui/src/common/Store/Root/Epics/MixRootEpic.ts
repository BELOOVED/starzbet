import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { formsRootEpic } from "@sb/form-new";
import { extractExport } from "@sb/utils";
import { platformBonusesRootEpic } from "../../../../platformui/Store/Bonuses/PlatformBonusesRootEpic";
import { platformConnectedEpics } from "../../../../platformui/Store/Root/Epic/PlatformConnectedEpics";
import { authorizedEpics } from "../../../../platformui/Store/Root/Epic/AuthorizedEpics";
import { platformGameManagerRootEpic } from "../../../../platformui/Store/Games/Epics/PlatformGameManagerRootEpic";
import { passwordResetRouterEpic } from "../../../../platformui/Store/ResetPassword/Epics/PasswordResetRootEpic";
import { localeEpic } from "../../../../platformui/Store/Locale/Epics/LocaleEpic";
import { configRootEpic } from "../../../../platformui/Store/Config/Epics/ConfigRootEpic";
import { betStatesRootEpic } from "../../../../platformui/Store/BetStates/BetStatesRootEpic";
import { referenceRootEpic } from "../../../../platformui/Store/Reference/ReferenceRootEpic";
import { notOnPlayGameRoute } from "../../../../platformui/Utils/NotOnPlayGameRoute";
import { authEpic } from "../../../../platformui/Store/Auth/AuthEpic";
import { registrationBonusesEpic } from "../../../../platformui/Store/Bonuses/Epics/RegistrationBonusesEpic";
import { fileServiceEpic } from "../../../../platformui/Api/FileServiceEpic";
import { liveSpinsRouterEpic } from "../../../../platformui/Store/LiveSpins/Epics/LiveSpinsEpic";
import { removeDeviceEpic } from "../../../../platformui/Store/VerifyDevice/Epics/RemoveDeviceEpic";
import { authFormsRootEpic } from "../../../../platformui/Store/Auth/Forms/AuthFormsRootEpic";
import { verifyCodeFormEpic } from "../../../../platformui/Store/VerifyCode/Epics/VerifyCodeFormEpic";
import { changePasswordFormEpic } from "../../../../platformui/Store/Password/Epics/ChangePasswordFormEpic";
import { Logger } from "../../../Utils/Logger";
import { gainThemeContext, type IThemeContextVariant2 } from "../../../Utils/ThemeContext";
import { runEpicLazy } from "../../../Utils/EpicUtils/RunEpicLazy";
import { platformLocalStorageEpic } from "../../LocalStorage/Epics/PlatformLocalStorageEpic";
import { bannerRootEpic } from "../../Banner/BannerRootEpic";
import { impersonatedLoginEpic } from "../../Player/Epics/ImpersonatedLoginEpic";
import { testPlayerEpic } from "../../Player/Epics/TestPlayerEpic";
import { verifyEmailRouteEpic } from "../../Player/Epics/VerifyEmailRouteEpic";
import { onLogoutEpic } from "../../Player/Epics/OnLogoutEpic";
import { syncWalletConnectedEpic } from "../../Player/Epics/SyncWalletConnectedEpic";
import { syncPlayerConnectedEpic } from "../../Player/Epics/SyncPlayerConnectedEpic";
import { sharedBetsRootEpic } from "../../SharedBets/SharedBetsRootEpic";
import { type TMixAppEpic } from "./TMixAppEpic";
import { rootEpic } from "./RootEpic";
import { getConnectedSportsbookEpics } from "./GetConnectedSportsbookEpics";

const mixRootEpic: TMixAppEpic = (action$, state$, dependencies$) => {
  const themeContext = gainThemeContext<IThemeContextVariant2>().static;

  const themeEpics = themeContext.find("themeEpics") ?? [];
  const notOnPlayGameRouteThemeEpics = themeContext.find("notOnPlayGameRouteThemeEpics") ?? [];

  return combineEpics(
    authEpic,
    rootEpic,
    verifyEmailRouteEpic,
    formsRootEpic,
    getConnectedSportsbookEpics(false),

    syncPlayerConnectedEpic,

    // todo review, mb some of them should be moved in 'notOnPlayGameRoute'
    platformConnectedEpics,
    platformLocalStorageEpic,
    fileServiceEpic,
    syncWalletConnectedEpic,
    authorizedEpics,
    onLogoutEpic,
    localeEpic,
    configRootEpic,
    referenceRootEpic,
    testPlayerEpic,
    removeDeviceEpic,
    /**
     * list of epics that shouldn't be started on playGame route
     */
    notOnPlayGameRoute(
      //platform epics:
      registrationBonusesEpic,
      platformBonusesRootEpic,
      platformGameManagerRootEpic,
      runEpicLazy(() => import("../../../../platformui/Store/Viewport/WatchViewportEpic").then(extractExport("watchViewportEpic"))),
      passwordResetRouterEpic,
      authFormsRootEpic,
      verifyCodeFormEpic,
      runEpicLazy(() => import("../../../../platformui/Store/CMS/Epic/CmsRootEpic").then(extractExport("cmsRootEpic"))),
      liveSpinsRouterEpic,
      betStatesRootEpic,
      bannerRootEpic,
      impersonatedLoginEpic,
      sharedBetsRootEpic,
      changePasswordFormEpic,
      ...notOnPlayGameRouteThemeEpics,
    ),
    ...themeEpics,
  )(action$, state$, dependencies$).pipe(
    catchError((error) => {
      Logger.warn.epic("mixRootEpic", error);

      return EMPTY;
    }),
  );
};

export { mixRootEpic };
