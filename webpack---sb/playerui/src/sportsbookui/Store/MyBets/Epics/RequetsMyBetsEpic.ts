import { catchError, map, repeat, switchMap } from "rxjs/operators";
import { concat, from, of } from "rxjs";
import { isArray, isCreator } from "@sb/utils";
import { EWhere_Predicate } from "@sb/graphql-client";
import { Logger } from "../../../../common/Utils/Logger";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { pendingMyBetsAction, receiveMyBetsAction, requestMyBetsAction } from "../MyBetsActions";
import { type TTimeRange, type TWhere } from "../Model/TBet";
import { getCreatedAtBetWhereExtension, getTypeFilterBetWhereExtension } from "../Model/BetWhereExtension";
import { type TBetTypeFilter } from "../Model/BetTypeFilter";
import { updateMyBetsPerIntervalEpic } from "./UpdateMyBetsEpic";
import { fetchPlayerBetHistory } from "./FetchPlayerBetHistory";

const requestMyBetsAndUpdatePerIntervalEpic: TAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(requestMyBetsAction),
  switchMap(({ payload: { timeRange, typeFilters } }) => {
    const requestMyBetsEpic = requestMyBetsEpicFactory(timeRange, typeFilters);

    return concat(
      requestMyBetsEpic(action$, state$, dependencies),
      updateMyBetsPerIntervalEpic(action$, state$, dependencies),
    );
  }),
  catchError((e) => {
    Logger.warn.epic("[MyBets]", "Request failed", e);

    return of(pendingMyBetsAction(false));
  }),
  repeat(),
);

function requestMyBetsEpicFactory(timeRange: TTimeRange | null, typeFilters: TBetTypeFilter[]): TAppEpic {
  return (action$, state$, { sportsbookHttpApi }) => concat(
    of(pendingMyBetsAction(true)),
    from(typeFilters).pipe(
      switchMap((typeFilter) => {
        const where = getWhere(typeFilter, timeRange);

        return fetchPlayerBetHistory(where, state$.value, sportsbookHttpApi).pipe(
          map(({ bets, pageInfo }) => ({
            bets,
            pageInfo,
            filter: typeFilter,
            where,
          })),
        );
      }),
      switchMap((data) => {
        if (!isArray(data.bets)) {
          throw new Error(`[requestMyBetsEpicFactory]: received invalid bets: ${JSON.stringify(data.bets)}`);
        }

        return concat(
          of(receiveMyBetsAction(data)),
          of(pendingMyBetsAction(false)),
        );
      }),
    ),
  );
}

function getWhere(type: TBetTypeFilter, timeRange: TTimeRange | null) {
  const operands: TWhere[] = [getTypeFilterBetWhereExtension(type)];

  if (timeRange) {
    operands.push(
      getCreatedAtBetWhereExtension(timeRange.gte, EWhere_Predicate.gte),
      getCreatedAtBetWhereExtension(timeRange.lte, EWhere_Predicate.lte),
    );
  }

  return {
    predicate: EWhere_Predicate.and,
    operands,
  };
}

export { requestMyBetsAndUpdatePerIntervalEpic };
