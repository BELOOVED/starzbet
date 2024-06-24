// @ts-nocheck
import { deepEqual } from "fast-equals";
import { combineMaps, mergeReducer, rootSymbol } from "@sb/utils";
import { authReducer } from "@sb/auth";
import { messagesReducer } from "@sb/messages";
import { callManagerRootReducer } from "@sb/call-manager";
import { routerReducer } from "@sb/router";
import { sportMenuRootReducer } from "../../../../sportsbookui/Store/SportMenu/Reducers/SportMenuRootReducer";
import { feedRootReducer } from "../../../../sportsbookui/Store/Feed/Reducers/FeedRootReducer";
import { preLiveRootReducer } from "../../../../sportsbookui/Store/PreLive/Reducers/PreLiveRootReducer";
import { betStrategyRootReducer } from "../../../../sportsbookui/Store/BetStrategy/Reducers/BetStrategyRootReducer";
import { liveRootReducer } from "../../../../sportsbookui/Store/Live/Reducers/LiveRootReducer";
import { betSlipRootReducer } from "../../../../sportsbookui/Store/BetSlip/Reducers/BetSlipRootReducer";
import { debugModeRootReducer } from "../../../../sportsbookui/Store/DebugMode/Reducers/DebugModeRootReducer";
import { appRootReducer } from "../../../../sportsbookui/Store/App/Reducers/AppRootReducer";
import { couponRootReducer } from "../../../../sportsbookui/Store/Coupon/Reducers/CouponRootReducer";
import { myBetsRootReducer } from "../../../../sportsbookui/Store/MyBets/Reducers/MyBetsRootReducer";
import { oddsBoostRootReducer } from "../../../../sportsbookui/Store/OddsBoost/OddsBoostRootReducer";
import { cashOutRootReducer } from "../../../../sportsbookui/Store/CashOut/CashOutReducer";
import { marketFilterRootReducer } from "../../../../sportsbookui/Store/MarketFilter/Reducers/MarketFilterRootReducer";
import { statisticRootReducer } from "../../../../sportsbookui/Store/Statistics/Reducers/StatisticsRootReducer";
import { localeRootReducer } from "../../../../sportsbookui/Store/Locale/Reducers/LocaleRootReducer";
import { favouritesRootReducer } from "../../../../sportsbookui/Store/Favourites/Reducers/FavouritesRootReducer";
import { widgetRootReducer } from "../../../../sportsbookui/Store/Widget/Reducers/WidgetRootReducer";
import { translateRootReducer } from "../../../../sportsbookui/Store/Translate/Reducers/TranslateRootReducer";
import { finishedEventsRootReducer } from "../../../../sportsbookui/Store/FinishedEvents/Reducers/FinishedEventsRootReducer";
import { streamingChannelsRootReducer } from "../../../../sportsbookui/Store/StreamingChannels/Reducers/StreamingChannelsRootReducer";
import { Logger } from "../../../Utils/Logger";
import { production } from "../../../Constants/Production";
import { bannerRootReducer } from "../../Banner/Reducers/BannerRootReducer";
import { wsAuthRootReducer } from "../../WsAuth/WsAuthRootReducer";
import { modalRootReducer } from "../../Modal/Reducers/ModalRootReducer";
import { configRootReducer } from "../../Config/Reducers/ConfigRootReducer";
import { playerRootReducer } from "../../Player/Reducers/PlayerRootReducer";
import { themeRootReducer } from "../../Theme/Reducers/ThemeRootReducer";
import { sharedBetRootReducer } from "../../SharedBets/SharedBetsReducers";

const shallowEqual = (a, b) => a === b;

const compare = (prev, next, key, action) => {
  if (!deepEqual(prev, next) && shallowEqual(prev, next)) {
    Logger.warn.reducer("State is mutated: invalid reference", key, prev, next, action);
  }
};

const check = (prev, next, action) => {
  prev && Object.entries(prev).forEach(([key, value]) => {
    if (!["object", "function"].includes(typeof value)) {
      return;
    }

    if (!next[key]) {
      return;
    }

    compare(value, next[key], key, action);

    if (typeof value === "function") {
      return;
    }

    check(value, next[key], action);
  });
};

const memoReducer = (wrapped) => (production
  ? wrapped
  : (state, action) => {
    const next = wrapped(state, action);

    check(state, next, action);

    return next;
  });

const rootReducers = [
  sportMenuRootReducer,
  statisticRootReducer,
  feedRootReducer,
  preLiveRootReducer,
  modalRootReducer,
  betStrategyRootReducer,
  liveRootReducer,
  betSlipRootReducer,
  debugModeRootReducer,
  appRootReducer,
  couponRootReducer,
  myBetsRootReducer,
  oddsBoostRootReducer,
  cashOutRootReducer,
  marketFilterRootReducer,
  localeRootReducer,
  favouritesRootReducer,
  widgetRootReducer,
  translateRootReducer,
  themeRootReducer,
  finishedEventsRootReducer,
  streamingChannelsRootReducer,
  callManagerRootReducer,
  wsAuthRootReducer,
  configRootReducer,
  playerRootReducer,
  sharedBetRootReducer,
];

const rootReducer = () => memoReducer(
  combineMaps({
    router: routerReducer,
    messages: messagesReducer,
    [rootSymbol]: mergeReducer(...rootReducers, authReducer, bannerRootReducer),
  }),
);

export { rootReducers, rootReducer };
