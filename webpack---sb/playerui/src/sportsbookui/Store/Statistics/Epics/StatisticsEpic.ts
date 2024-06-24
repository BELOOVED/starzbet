import { merge, mergeMap, of, switchMap } from "rxjs";
import { catchError, filter } from "rxjs/operators";
import { getNotNil, isCreator, isNotNil } from "@sb/utils";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { type TEventStatistics } from "@sb/statistics-core";
import { routerEpic } from "@sb/router";
import { type TExtractRouteParams, type TMatch } from "@sb/react-router-compat";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { type IWithEventId } from "../../../../common/IWith";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type IAppEpicDependencies, type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import {
  setExpandedStatisticsAction,
  statisticsLoadedAction,
  statisticsLoadFailedAction,
  statisticViewMountedAction,
  virtualRacingLoadStatisticsAction,
} from "../StatisticsActions";
import { STATISTIC_PARSER_LOAD_SYMBOL, VIRTUAL_PARSER_LOAD_SYMBOL } from "../Model/Variables";

const loadStatisticsOnPageEpic = routerEpic({
  name: "loadStatisticsOnPage",
  match: getMatch(routeMap.statistics.root),
  onStart: ({ params: { eventId } }: TMatch<TExtractRouteParams<typeof routeMap.statistics.root, string>>): TAppEpic => (
    _,
    __,
    dependencies,
  ) => callWithAbort(dependencies.sportsbookHttpApi.callGetStatistics, eventId).pipe(
    switchMap((statistics) => {
      if (!statistics) {
        return of(statisticsLoadFailedAction(eventId));
      }

      return of(statisticsLoadedAction(
        eventId,
{
  ...statistics,
  headToHead: statistics.headToHead || [],
} as TEventStatistics,
      ));
    }),
    catchError(
      (err) => merge(
        of(statisticsLoadFailedAction(eventId)),
        of(callManagerFailedAction(STATISTIC_PARSER_LOAD_SYMBOL, err, eventId)),
      ),
    ),
  ),
  shouldRestart: restartOnParamsChanged,
});

const loadStatistics = (eventId: string, dependencies: IAppEpicDependencies) => merge(
  of(callManagerStartAction(STATISTIC_PARSER_LOAD_SYMBOL, eventId)),
  callWithAbort(dependencies.sportsbookHttpApi.callGetStatistics, eventId).pipe(
    switchMap((statistics) => {
      if (!statistics) {
        return merge(
          of(statisticsLoadFailedAction(eventId)),
          of(callManagerFailedAction(STATISTIC_PARSER_LOAD_SYMBOL, new Error(`Hasn't statistics for event: ${eventId}`), eventId)),
        );
      }

      return merge(
        of(callManagerSucceededAction(STATISTIC_PARSER_LOAD_SYMBOL, eventId)),
        of(statisticsLoadedAction(
          eventId,
{
  ...statistics,
  headToHead: statistics.headToHead || [],
} as TEventStatistics,
        )),
      );
    }),
    catchError(
      (err) => merge(
        of(statisticsLoadFailedAction(eventId)),
        of(callManagerFailedAction(STATISTIC_PARSER_LOAD_SYMBOL, err, eventId)),
      ),
    ),
  ),
);

const loadStatisticsEpic: TAppEpic = (action$, _, dependencies) => action$.pipe(
  isCreator(statisticViewMountedAction, setExpandedStatisticsAction),
  mergeMap(
    ({ payload: { eventId } }) => loadStatistics(eventId, dependencies),
  ),
);

interface IModalData {
  payload: {
    data: IWithEventId;
  };
}

const openStatisticsModalEpic: TAppEpic = (action$, _, dependencies) => action$.pipe(
  isCreator(modalOpenAction),
  filter(({ payload: { type, data } }) => type === EModal.statistics && isNotNil(data)),
  switchMap(
    ({ payload: { data } }: IModalData) => loadStatistics(data.eventId, dependencies),
  ),
);

const loadVirtualStatisticsEpic: TAppEpic = (action$, _, dependencies) => action$.pipe(
  isCreator(virtualRacingLoadStatisticsAction),
  switchMap(
    ({ payload: { eventId } }) => merge(
      of(callManagerStartAction(VIRTUAL_PARSER_LOAD_SYMBOL, eventId)),
      callWithAbort(dependencies.sportsbookHttpApi.callGetVirtualRacingStatistics, { eventIds: [eventId] }).pipe(
        switchMap((statistics) => merge(
          of(callManagerSucceededAction(VIRTUAL_PARSER_LOAD_SYMBOL, eventId)),
          of(statisticsLoadedAction(eventId, getNotNil(statistics[eventId], ["Virtual statistics"], "No Statistics"))),
        )),
      ),
    ).pipe(
      catchError((err) => of(callManagerFailedAction(VIRTUAL_PARSER_LOAD_SYMBOL, err, eventId))),
    ),
  ),
);

export {
  loadStatisticsEpic,
  loadVirtualStatisticsEpic,
  loadStatisticsOnPageEpic,
  openStatisticsModalEpic,
};
