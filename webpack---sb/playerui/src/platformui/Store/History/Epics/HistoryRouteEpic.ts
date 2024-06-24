import { switchMap } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { of } from "rxjs";
import { routerEpic } from "@sb/router";
import { type TMatch } from "@sb/react-router-compat";
import { isCreator } from "@sb/utils";
import { EProductCode } from "@sb/betting-core/EProductCode";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { historyMatchOptions } from "../../PlatformMatchOptions";
import {
  historyChangeDurationAction,
  historyChangeIntervalAction,
  historyClearAction,
  historyNextPageAction,
  historyPrevPageAction,
} from "../HistoryActions";
import { EHistoryProduct } from "../Model/EHistoryProduct";
import { createRequestHistoryEpic } from "./RequestHistoryEpic";

const handlers: Record<EHistoryProduct, TMixAppEpic> = {
  [EHistoryProduct.account]: createRequestHistoryEpic(
    EProductCode.PAYMENT,
    EHistoryProduct.account,
  ),
  [EHistoryProduct.casino]: createRequestHistoryEpic(
    EProductCode.CASINO,
    EHistoryProduct.casino,
  ),
  [EHistoryProduct.sports]: createRequestHistoryEpic(
    EProductCode.SPORTS,
    EHistoryProduct.sports,
  ),
  [EHistoryProduct.liveCasino]: createRequestHistoryEpic(
    EProductCode.LIVE_CASINO,
    EHistoryProduct.liveCasino,
  ),
  [EHistoryProduct.games]: createRequestHistoryEpic(
    EProductCode.GAMES,
    EHistoryProduct.games,
  ),
  [EHistoryProduct.virtual]: createRequestHistoryEpic(
    EProductCode.VIRTUAL,
    EHistoryProduct.virtual,
  ),
  [EHistoryProduct.vipClub]: createRequestHistoryEpic(
    EProductCode.VIP_CLUB,
    EHistoryProduct.vipClub,
  ),
};

const requestByProductEpic = (product: EHistoryProduct): TMixAppEpic => (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(
    historyChangeIntervalAction,
    historyChangeDurationAction,
    historyNextPageAction,
    historyPrevPageAction,
  ),
  switchMap(() => handlers[product](action$, state$, deps)),
);

const historyRouteEpic = routerEpic({
  name: "history",
  match: getMatch<{ product: EHistoryProduct; }>(historyMatchOptions),
  onStart: ({ params: { product } }: TMatch<{ product: EHistoryProduct; }>) => combineEpics(
    handlers[product],
    requestByProductEpic(product),
  ),
  onStop: () => () => of(historyClearAction()),
  shouldRestart: restartOnParamsChanged,
});

export { historyRouteEpic };
