import isEqual from "lodash/fp/isEqual";
import { combineEpics, type Epic } from "redux-observable";
import { defer, EMPTY, of, switchMap } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { matchPath } from "@sb/react-router-compat";
import { extractNodesFromEdges, withParams } from "@sb/utils";
import { EOrderDirection, ESportsbook_EventOrderByFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { EEventStatus } from "@sb/betting-core/EEventStatus";
import {
  query_Sportsbook_Events,
  sportsbookEventsQueryOptionalFields,
  type TSportsbook_Events_QueryVariables,
} from "@sb/graphql-client/PlayerUI";
import { ESportsbookread_EventWhereFieldPaths } from "@sb/sdk/Where/sportsbookread";
import { routerLocationPathnameSelector } from "@sb/router";
import { retryWithLog } from "../../../../common/Utils/EpicUtils/RetryWithLog";
import { Logger } from "../../../../common/Utils/Logger";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { categoryByIdSelector, liveEventIdListByCategoryIdSelector, selectEventById } from "../../Feed/Selectors/FeedSelectors";
import { isLeague } from "../../Virtual/Common/Model/CategorySlugWithLeague";
import { finishedEventsCountSelector } from "../Selectors/FinishedEventsSelectors";
import { FinishedEventsBatchLoadAction, FinishedEventsBatchUploadAction } from "../FinishedEventsActions";
import { finishedEventsNormalizer } from "../Model/FinishedEventsNormalizer";

const createVariablesSingleMatch = (categoryId: string): TSportsbook_Events_QueryVariables => ({
  where: {
    predicate: EWhere_Predicate.and,
    operands: [
      {
        predicate: EWhere_Predicate.eq,
        value: categoryId,
        fieldPath: ESportsbookread_EventWhereFieldPaths.eventCategoryId,
      },
      {
        predicate: EWhere_Predicate.eq,
        fieldPath: ESportsbookread_EventWhereFieldPaths.eventStatus,
        value: EEventStatus.finished,
      },
    ],
  },
  orderBy: [
    {
      fieldPath: ESportsbook_EventOrderByFieldPaths.eventStartTime,
      direction: EOrderDirection.desc,
    },
  ],
  cursor: { first: 1 },
});

const createVariablesLeague = (categoryId: string): TSportsbook_Events_QueryVariables => ({
  where: {
    predicate: EWhere_Predicate.and,
    operands: [
      {
        predicate: EWhere_Predicate.eq,
        value: categoryId,
        fieldPath: ESportsbookread_EventWhereFieldPaths.eventCategoryId,
      },
      {
        predicate: EWhere_Predicate.eq,
        fieldPath: ESportsbookread_EventWhereFieldPaths.eventStatus,
        value: EEventStatus.finished,
      },
    ],
  },
  orderBy: [
    {
      fieldPath: ESportsbook_EventOrderByFieldPaths.eventStartTime,
      direction: EOrderDirection.desc,
    },
  ],
  cursor: { first: 10 },
});

const loadBatchFinishedEventsEpic: (categoryId: string) => TMixAppEpic = (categoryId) => (action$, state$, deps) => {
  Logger.info.epic("[loadBatchFinishedEventsEpic]", "Load finished events epic");
  const category = categoryByIdSelector(state$.value, categoryId);

  const variables = category && isLeague(category.slug)
    ? createVariablesLeague(categoryId)
    : createVariablesSingleMatch(categoryId);

  return defer(() => query_Sportsbook_Events(
    deps.graphQLClient,
    {
      optionalFields: sportsbookEventsQueryOptionalFields,
      variables,
    },
  )).pipe(
    map(({ sportsbook: { Events } }) => {
      const nodes = extractNodesFromEdges(Events);

      return FinishedEventsBatchLoadAction(finishedEventsNormalizer(nodes));
    }),
    retryWithLog("Fetch failed finished events"),
  );
};

const routeEpic: TMixAppEpic = (action$, state$, deps) =>
  state$.pipe(
    map(routerLocationPathnameSelector),
    distinctUntilChanged(),
    switchMap((path: string) => {
      const eventsCount = finishedEventsCountSelector(state$.value);

      const match = matchPath<{
        categoryId: string;
      }>(
        path,
        {
          path: routeMap.virtual.category,
          exact: true,
        },
      );

      // after category
      if (!match && eventsCount) {
        return of(FinishedEventsBatchUploadAction());
      }

      if (match && match.params.categoryId) {
        return state$.pipe(
          map(withParams(categoryByIdSelector, match.params.categoryId)),
          filter((category) => !!category),
          distinctUntilChanged(),
          switchMap(() => {
            // after other route
            if (!eventsCount) {
              return combineEpics(
                loadBatchFinishedEventsEpic(match.params.categoryId),
                checkLoadMoreEventsEpic(match.params.categoryId),
              )(action$, state$, deps);
            }

            // after prev category
            return combineEpics(
              () => of(FinishedEventsBatchUploadAction()),
              loadBatchFinishedEventsEpic(match.params.categoryId),
              checkLoadMoreEventsEpic(match.params.categoryId),
            )(action$, state$, deps);
          }),
        );
      }

      return EMPTY;
    }),
  );

const checkLoadMoreEventsEpic: (categoryId: string) => TMixAppEpic = (categoryId) => (action$, state$, deps) =>
  state$.pipe(
    map(withParams(liveEventIdListByCategoryIdSelector, categoryId)),
    filter((ids) => !!ids.length),
    distinctUntilChanged(isEqual),
    switchMap((liveEventIds: string[]) => state$.pipe(
      map((state) => liveEventIds.some((liveEventId) => !selectEventById(state, liveEventId))),
      filter((destroyed) => destroyed),
      distinctUntilChanged(),
      switchMap(() => combineEpics(
        loadBatchFinishedEventsEpic(categoryId),
        () => of(FinishedEventsBatchUploadAction()),
      )(action$, state$, deps)),
    )),
  );

const finishedEventsEpic: Epic = combineEpics(
  routeEpic,
);

export { finishedEventsEpic };
