// @ts-nocheck
import { authInitialState } from "@sb/auth";
import { withCallManagerDefaultState } from "@sb/call-manager";
import { getRouterInitialState } from "@sb/router";
import { type History } from "@sb/react-router-compat";
import { getBannerInitialState } from "../../common/Store/Banner/BannerInitialState";
import { wsAuthState } from "../../common/Store/WsAuth/WsAuthState";
import { modalState } from "../../common/Store/Modal/ModalState";
import { configInitialState } from "../../common/Store/Config/ConfigInitialState";
import { playerInitialState } from "../../common/Store/Player/InitialState/PlayerInitialState";
import { themeState } from "../../common/Store/Theme/ThemeState";
import { createFeedState, feedState } from "./Feed/FeedState";
import { betStrategyState } from "./BetStrategy/BetStrategyState";
import { liveState } from "./Live/LiveState";
import { localeState } from "./Locale/LocaleState";
import { sportMenuState } from "./SportMenu/SportMenuState";
import { preLiveState } from "./PreLive/PreLiveState";
import { betSlipState } from "./BetSlip/BetSlipState";
import { debugModeState } from "./DebugMode/DebugModeState";
import { couponState } from "./Coupon/CouponState";
import { myBetsState } from "./MyBets/MyBetsState";
import { oddsBoostState } from "./OddsBoost/OddsBoostState";
import { cashOutState } from "./CashOut/CashOutState";
import { appState } from "./App/AppState";
import { marketFilterState } from "./MarketFilter/MarketFilterState";
import { statisticState } from "./Statistics/StatisticState";
import { favouritesState } from "./Favourites/FavouritesState";
import { widgetState } from "./Widget/WidgetState";
import { translateState } from "./Translate/TranslateState";
import { finishedEventsState } from "./FinishedEvents/FinishedEventsState";
import { streamingChannelsState } from "./StreamingChannels/StreamingChannelsState";

const initialState = {
  ...feedState,
  ...betStrategyState,
  ...liveState,
  ...localeState,
  ...modalState,
  ...sportMenuState,
  ...preLiveState,
  ...betSlipState,
  ...debugModeState,
  ...couponState,
  ...myBetsState,
  ...oddsBoostState,
  ...cashOutState,
  ...appState,
  ...marketFilterState,
  ...statisticState,
  ...favouritesState,
  ...widgetState,
  ...translateState,
  ...themeState,
  ...finishedEventsState,
  ...streamingChannelsState,
  ...withCallManagerDefaultState,
  ...wsAuthState,
  ...configInitialState,
  ...playerInitialState,
};

const createInitialState = (history: History, initialValues = {}) => ({
  ...initialState,
  ...getBannerInitialState(),
  app: {
    ...initialState.app,
    pathNamespace: initialValues.pathNamespace || initialState.app.pathNamespace,
  },
  feed: createFeedState(initialValues.feed),
  locale: initialValues.locale || initialState.locale,
  theme: initialValues.theme || initialState.theme,
  auth: authInitialState,
  router: getRouterInitialState(history),
});

type TAppState = ReturnType<typeof createInitialState>;

export { initialState, createInitialState };

export type { TAppState };
