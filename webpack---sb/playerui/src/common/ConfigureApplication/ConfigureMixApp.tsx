import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import type { ComponentType, FC, PropsWithChildren } from "react";
import { createBrowserHistory, matchPath, Router } from "@sb/react-router-compat";
import { TranslateProvider } from "@sb/translator";
import { allEntityTranslateKeys } from "@sb/betting-core/TranslateEntity/LineTranslates";
import { getNotNil } from "@sb/utils";
import { initCaptcha } from "@sb/captcha";
import { enableSentryBrowser } from "@sb/logger";
import { Auth } from "@sb/adminui-auth-form";
import { cmsContextFactory, CMSContextProvider, CMSEditorProvider } from "@sb/cms-on-site-editor";
import { FileServerApiContext } from "../../platformui/Api/FileServerApi";
import { routeMap } from "../../platformui/RouteMap/RouteMap";
import { IS_STARZBET_KG, isProdServerEnv } from "../../ServerEnvironment";
import { CatchComponent } from "../../sportsbookui/Components/CatchComponent";
import { createTranslateControl, type TPredefinedTranslates } from "../../sportsbookui/Store/Locale/CreateTranslateControl";
import { translateFetchedAction } from "../../sportsbookui/Store/Translate/TranslateActions";
import { firstMeasure } from "../../sportsbookui/LogMeasure";
import { localeSelector } from "../../sportsbookui/Store/Locale/LocaleSelector";
import { type TMixConfigureStore } from "../../sportsbookui/Store/ConfigureStore/MixConfigureStore";
import { type TMixAppState } from "../../sportsbookui/Store/CreateMixInitialState";
import { IS_MOBILE_CLIENT_SIDE } from "../Store/DeviceInfo/DeviceInfoConstant";
import { Logger, SENTRY_IGNORE_ERRORS } from "../Utils/Logger";
import { getTranslateTheme } from "../GetTranslateTheme";
import { inIframe } from "../Utils/IsIframe";
import { IS_TOUCH_DEVICE } from "../Constants/IsTouchDevice";
import { sharedProxyUrl } from "../Urls";
import { IS_WEBP_SUPPORTED } from "../Utils/GetImageFormatParam";
import { createCMSControlFactory } from "../CMSOnSiteEditor/CreateCMSControlFactory";
import { platformConfigSystemLocaleSelector } from "../Store/Config/Selectors/ConfigSelectors";
import { BASE_INTERNAL_LOCALE_LIST } from "../Store/Locale/Model/TSupportedLocale";
import { CMS_THEME_POSTFIX } from "../Utils/CmsThemePostfix";

const PLAY_ROUTES = [routeMap.play, routeMap.playDemo];
const GAME_PAGE_ROUTES = [routeMap.playGame, routeMap.playDemoGame];

const isPage = (path: string | string[]) => !!matchPath(
  window.top?.location.pathname || "",
  { path, exact: true },
);

if (inIframe()) {
  const isTopPlayGameRoute = isPage(PLAY_ROUTES);

  if (isTopPlayGameRoute) {
    window.top?.close();
  }

  const isGamePage = isPage(GAME_PAGE_ROUTES);

  if (isGamePage) {
    window.top?.location.reload();
  }
}

firstMeasure();

initCaptcha();

const createCmsContext = (getState: () => TMixAppState) => cmsContextFactory({
  appServiceLocaleSelector: () => localeSelector(getState()),
  appServiceScaleSelector: () => "1",
  configServiceSystemLocaleSelector: () => platformConfigSystemLocaleSelector(getState()),
  configServiceSupportedLocalesSelector: () => BASE_INTERNAL_LOCALE_LIST,
  cmsThemeSelector: () => CMS_THEME_POSTFIX,
});

const TRANSLATE_THEME = getTranslateTheme();

const clientNsList = ["sportsbookui", "platformui", "shared"]
  .map((c) => `${c}.${TRANSLATE_THEME}`);

type TPlatformAppProps = PropsWithChildren & { isSportsbookHaveBonuses?: boolean; }

const configureMixApp = (
  PlatformApp: ComponentType<TPlatformAppProps>,
  SportsBookApp: FC,
  configureStore: TMixConfigureStore,
  messages: TPredefinedTranslates[],
) => {
  const tControl = createTranslateControl(messages, clientNsList);

  const mountNode = getNotNil(document.getElementById("root"), ["configureMixApp"], "getElementById(\"root\")");

  const root = createRoot(mountNode);

  const history = createBrowserHistory();

  const getState = () => store.getState();

  const context = createCmsContext(getState);

  const cmsControlFactory = createCMSControlFactory(context, tControl);

  const [
    store,
    fileServerApi,
    cmsControl,
  ] = configureStore(history, tControl, cmsControlFactory);

  tControl.addTranslateListener(
    allEntityTranslateKeys,
    (translates) =>
      store.dispatch(translateFetchedAction(translates)),
  );

  document.body.dataset.mobile = IS_MOBILE_CLIENT_SIDE.toString();
  document.body.dataset.touch = IS_TOUCH_DEVICE.toString();
  document.body.dataset.webp = IS_WEBP_SUPPORTED.toString();
  if (IS_STARZBET_KG) {
    document.body.dataset.kgEnv = "true";
  }

  if (process.env.SENTRY_DSN) {
    enableSentryBrowser({
      dsn: process.env.SENTRY_DSN,
      release: process.env.RELEASE_VERSION,
      environment: process.env.SERVER_ENVIRONMENT_CODE,
      ignoreErrors: SENTRY_IGNORE_ERRORS,
      shouldCollectWebVitals: isProdServerEnv,
      tracesSampleRate: 0.1,
      sampleRate: 0.1,
    });
  } else {
    Logger.error.app("Sentry DSN not specified");
  }

  const controls = [
    {
      mode: tControl.translateMode,
      configure: tControl.configure,
    },
    {
      mode: cmsControl.editMode,
      configure: cmsControl.configure,
    },
  ];

  root.render(
    <TranslateProvider control={tControl}>
      <CMSContextProvider value={context}>
        <CMSEditorProvider control={cmsControl} />
      </CMSContextProvider>

      <Provider store={store}>
        <Router history={history}>
          <CatchComponent>
            <>
              <Auth proxyUrl={sharedProxyUrl} controls={controls} />

              <FileServerApiContext.Provider value={fileServerApi}>
                <PlatformApp>
                  <SportsBookApp />
                </PlatformApp>
              </FileServerApiContext.Provider>
            </>
          </CatchComponent>
        </Router>
      </Provider>
    </TranslateProvider>,
  );
};

export { configureMixApp, type TPlatformAppProps };
