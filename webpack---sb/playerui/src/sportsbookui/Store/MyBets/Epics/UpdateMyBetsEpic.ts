import { concat, filter, interval, of, switchMap, takeUntil, tap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isArray, isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { cashOutCompleteAction } from "../../CashOut/CashOutAction";
import { cannotUpdateMyBetsSelector, whereMyBetsSelector } from "../Selectors/MyBetsSelectors";
import {
  changeCountPerPageMyBetsAction,
  changeFilterMyBetsAction,
  changeTimeRangeMyBetsAction,
  loadMoreMyBetsAction,
  nextPageMyBetsAction,
  pendingMyBetsAction,
  prevPageMyBetsAction,
  resetMyBetsAction,
  saveEditingBetDoneAction,
  updateMyBetsAction,
} from "../MyBetsActions";
import { type TWhere } from "../Model/TBet";
import { fetchPlayerBetHistory } from "./FetchPlayerBetHistory";

const updateInterval = 1000 * 60;

const updateMyBetsEpicFactory = (where: TWhere | null): TAppEpic => (action$, state$, { sportsbookHttpApi }) => (
  fetchPlayerBetHistory(where, state$.value, sportsbookHttpApi).pipe(
    map((res) => {
      if (!isArray(res.bets)) {
        throw new Error(`[updateMyBetsEpicFactory]: received invalid bets: ${JSON.stringify(res.bets)}`);
      }

      return updateMyBetsAction(res.bets, res.pageInfo);
    }),
    catchError((e) => {
      Logger.warn.epic("[MyBets]", "update bets failed", e);

      return of(pendingMyBetsAction(false));
    }),
  )
);

const updateMyBetsPerIntervalEpic: TAppEpic = (action$, state$, dependencies) => {
  Logger.info.epic("[MyBets]", "start pullBetsLoop");

  return interval(updateInterval).pipe(
    takeUntil(
      action$.pipe(
        isCreator(resetMyBetsAction),
        tap(() => Logger.info.epic("[MyBets]", "stop pullBetsLoop")),
      ),
    ),
    switchMap(() => {
      const where = whereMyBetsSelector(state$.value);
      const updateMyBetsEpic = updateMyBetsEpicFactory(where);

      return updateMyBetsEpic(action$, state$, dependencies);
    }),
  );
};

const affectUpdateMyBets = [
  changeFilterMyBetsAction,
  loadMoreMyBetsAction,
  saveEditingBetDoneAction,
  cashOutCompleteAction,
  changeTimeRangeMyBetsAction,
  prevPageMyBetsAction,
  nextPageMyBetsAction,
  changeCountPerPageMyBetsAction,
];

const updateMyBetsIfEffectedEpic: TAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(...affectUpdateMyBets),
  filter(() => !cannotUpdateMyBetsSelector(state$.value)),
  switchMap(() => {
    const where = whereMyBetsSelector(state$.value);
    const updateMyBetsEpic = updateMyBetsEpicFactory(where);

    return concat(
      of(pendingMyBetsAction(true)),
      concat(
        updateMyBetsEpic(action$, state$, dependencies),
        of(pendingMyBetsAction(false)),
      ),
    );
  }),
);

export { updateMyBetsPerIntervalEpic, updateMyBetsIfEffectedEpic };
