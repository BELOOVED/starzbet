import { combineEpics } from "redux-observable";
import { EMPTY, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isCreator, type TNullable } from "@sb/utils";
import { type TPageInfo_Fragment } from "@sb/graphql-client";
import { type TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import { Logger } from "../../../../common/Utils/Logger";
import { deprecatedBonusGraphQlApi, type IPaginator } from "../../../Api/DeprecatedBonusGraphQlApi";
import { graphQlNodeSelector, graphQlPageInfoSelector } from "../../Root/Selectors/GraphQlSelectors";
import {
  deprecatedBonusesBonusResourcesTableMountedAction,
  deprecatedBonusesLoadBonusResourceByIdAction,
  deprecatedBonusesLoadBonusResourcesAction,
  deprecatedBonusResourceFetchedAction,
  deprecatedBonusResourcesFetchedAction,
  deprecatedPlatformBonusResourcesFetchedAction,
} from "../BonusesActions";
import { deprecatedPlayerBonusResourcePageInfoSelector } from "../Selectors/DeprecatedBonusResourcesSelectors";

const PAGINATOR_COUNT = 10;

const getPaginator = (pageInfo: TNullable<TPageInfo_Fragment>, prev?: boolean, next?: boolean): IPaginator => {
  if (!pageInfo || (!prev && !next)) {
    return { cursor: { first: PAGINATOR_COUNT } };
  }

  if (prev) {
    return { cursor: { last: PAGINATOR_COUNT, before: pageInfo.startCursor ?? undefined } };
  }

  if (next) {
    return { cursor: { first: PAGINATOR_COUNT, after: pageInfo.endCursor ?? undefined } };
  }

  throw new Error("[getPaginator] incorrect condition");
};

const handleBonusResourcesTableMountedEpic: TAppEpicWithBonuses = (action$, state$, { graphQLClient }) =>
  action$.pipe(
    isCreator(deprecatedBonusesBonusResourcesTableMountedAction),
    switchMap(({
      payload: {
        playerBonusId,
        phase,
        product,
        prev,
        next,
      },
    }) => {
      const pageInfo = deprecatedPlayerBonusResourcePageInfoSelector(state$.value, playerBonusId, phase, product);
      const paginator = getPaginator(pageInfo, prev, next);

      return deprecatedBonusGraphQlApi(graphQLClient).loadPlayerBonusResources(playerBonusId, paginator, phase, product).pipe(
        map((page) => {
          const nodes = graphQlNodeSelector(page);
          const pageInfo = graphQlPageInfoSelector(page);

          return deprecatedBonusResourcesFetchedAction(playerBonusId, nodes, pageInfo, phase, product);
        }),
        catchError((error) => {
          Logger.warn.epic("[handleBonusResourcesTableMountedEpic] load error", error);

          return EMPTY;
        }),
      );
    }),
  );

const loadBonusResourcesDeprecatedEpic: TAppEpicWithBonuses = (action$, state$, { graphQLClient }) =>
  action$.pipe(
    isCreator(deprecatedBonusesLoadBonusResourcesAction),
    switchMap(({ payload: { playerBonusId } }) =>
      deprecatedBonusGraphQlApi(graphQLClient).loadPlayerBonusResourcesDeprecated(playerBonusId).pipe(
        map((page) => deprecatedPlatformBonusResourcesFetchedAction(playerBonusId, graphQlNodeSelector(page))),
        catchError((error) => {
          Logger.warn.epic("[loadBonusResourcesDeprecatedEpic] load error", error);

          return EMPTY;
        }),
      )),
  );

const loadBonusResourceByIdEpic: TAppEpicWithBonuses = (action$, state$, { graphQLClient }) =>
  action$.pipe(
    isCreator(deprecatedBonusesLoadBonusResourceByIdAction),
    switchMap(({
      payload: {
        bonusResourceId,
        playerBonusId,
        phase,
        product,
      },
    }) => deprecatedBonusGraphQlApi(graphQLClient).loadPlayerBonusResourceById(bonusResourceId).pipe(
      map((page) => {
        const nodes = graphQlNodeSelector(page);

        return deprecatedBonusResourceFetchedAction(playerBonusId, bonusResourceId, phase, nodes, product);
      }),
      catchError((error) => {
        Logger.warn.epic("[handleBonusResourcesTableMountedEpic] load error", error);

        return EMPTY;
      }),
    )),
  );

/**
 * @deprecated
 */
const deprecatedBonusResourcesEpic = combineEpics(
  handleBonusResourcesTableMountedEpic,
  loadBonusResourcesDeprecatedEpic,
  loadBonusResourceByIdEpic,
);

export { deprecatedBonusResourcesEpic };
