import { combineEpics } from "redux-observable";
import { retry, tap } from "rxjs";
import { rootRouterEpic } from "@sb/router";
import { notOnPlayGameRoute } from "../../../../platformui/Utils/NotOnPlayGameRoute";
import { finishedEventsEpic } from "../../../../sportsbookui/Store/FinishedEvents/Epics/FinishedEventsEpic";
import { couponEntryRouterEpic } from "../../../../sportsbookui/Store/Coupon/Epics/CouponEntryRouterEpic";
import { debugModeRootEpic } from "../../../../sportsbookui/Store/DebugMode/Epics/DebugModeRootEpic";
import { streamingChannelsRouterEpic } from "../../../../sportsbookui/Store/StreamingChannels/Epics/StreamingChannelsRouterEpic";
import { preLiveEpic } from "../../../../sportsbookui/Store/PreLive/Epics/PreLiveEpic";
import {
  loadStatisticsEpic,
  loadStatisticsOnPageEpic,
  loadVirtualStatisticsEpic,
  openStatisticsModalEpic,
} from "../../../../sportsbookui/Store/Statistics/Epics/StatisticsEpic";
import { favouritesRootEpic } from "../../../../sportsbookui/Store/Favourites/Epics/FavouritesRootEpic";
import { multiViewRootEpic } from "../../../../sportsbookui/Store/Live/Epics/MultiViewRootEpic";
import { liveFavouriteEpic } from "../../../../sportsbookui/Store/Live/Epics/LiveFavouriteEpic";
import { couponRootEpic } from "../../../../sportsbookui/Store/Coupon/Epics/CouponRootEpic";
import { sportMenuRootEpic } from "../../../../sportsbookui/Store/SportMenu/Epics/SportMenuRootEpic";
import { appRootEpic } from "../../../../sportsbookui/Store/App/Epics/AppRootEpic";
import { createMyBetsRootEpic } from "../../../../sportsbookui/Store/MyBets/Epics/CreateMyBetsRootEpic";
import { eventSubRootEpic } from "../../../../sportsbookui/Store/Feed/Epics/EventSubRootEpic";
import { cashOutRootEpic } from "../../../../sportsbookui/Store/CashOut/Epics/CashOutRootEpic";
import { betSlipRootEpic } from "../../../../sportsbookui/Store/BetSlip/Epics/BetSlipRootEpic";
import { Logger } from "../../../Utils/Logger";
import { SPORTS_BOOK_ROUTES_WITH_BONUSES } from "../../../Model/SportsBookRoutesWithBonuses";
import { wsAuthEpic } from "../../WsAuth/WsAuthEpic";
import { authSubjectUpdateEpic } from "../../Auth/AuthSubjectUpdateEpic";
import { updatePlayerDetailsRouterEpic } from "../../Player/Epics/Form/UpdatePlayerDetailsRouterEpic";
import { sportsbookLocalStorageEpic } from "../../LocalStorage/Epics/SportsbookLocalStorageEpic";
import { type TAppEpic } from "./TAppEpic";

const myBetsRootEpic = createMyBetsRootEpic(SPORTS_BOOK_ROUTES_WITH_BONUSES);

const rootEpic: TAppEpic = (action$, state$, dependencies) => combineEpics(
  // todo review, mb some of them should be moved in 'notOnPlayGameRoute'
  appRootEpic,
  debugModeRootEpic,
  sportsbookLocalStorageEpic,
  rootRouterEpic,
  wsAuthEpic,
  authSubjectUpdateEpic,
  /**
   * list of epics that shouldn't be started on playGame route
   */
  notOnPlayGameRoute(
    updatePlayerDetailsRouterEpic,
    finishedEventsEpic,
    couponEntryRouterEpic,
    streamingChannelsRouterEpic,
    preLiveEpic,
    loadVirtualStatisticsEpic,
    loadStatisticsOnPageEpic,
    loadStatisticsEpic,
    openStatisticsModalEpic,
    couponRootEpic,
    multiViewRootEpic,
    liveFavouriteEpic,
    favouritesRootEpic,
    sportMenuRootEpic,
    betSlipRootEpic,
    myBetsRootEpic,
    cashOutRootEpic,
    eventSubRootEpic,
  ),
)(action$, state$, dependencies).pipe(
  tap({
    error: (error) => Logger.warn.epic("rootEpic", error),
  }),
  retry({ delay: 1000 }),
);

export { rootEpic };
