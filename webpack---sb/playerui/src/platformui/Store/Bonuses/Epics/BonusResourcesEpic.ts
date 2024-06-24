import { combineEpics } from "redux-observable";
import { mergeMap } from "rxjs";
import { isCreator } from "@sb/utils";
import { type TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import { getPlayerBonusResourcesWhere } from "../Utils/BonusResourcesWhereUtils";
import {
  bonusResourcesFetchedAction,
  bonusResourcesTableMountedAction,
  bonusResourcesTablePaginatorNextAction,
  bonusResourcesTablePaginatorPrevAction,
} from "../BonusesActions";
import { createBonusResourcesCallSymbol } from "../BonusVariables";
import { bonusResourcePageInfoSelector } from "../Selectors/BonusResourcesSelectors";
import { loadPlayerBonusResourcesEpicFactory } from "./LoadEpicFactories/LoadPlayerBonusResourcesEpicFactory";

const PAGINATOR_COUNT = 10;

const handleBonusResourcesTableMountedEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(bonusResourcesTableMountedAction),
  mergeMap(({ payload: { playerBonusId, phase, product } }) => loadPlayerBonusResourcesEpicFactory(
    createBonusResourcesCallSymbol(playerBonusId, phase, product),
    (resources, pageInfo) => bonusResourcesFetchedAction(playerBonusId, resources, pageInfo, phase, product),
    () => ({
      cursor: { first: PAGINATOR_COUNT },
      where: getPlayerBonusResourcesWhere(playerBonusId, phase, product),
    }),
  )(action$, state$, deps)),
);

const handleBonusResourcesTablePaginatorNextEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(bonusResourcesTablePaginatorNextAction),
  mergeMap(({ payload: { playerBonusId, phase, product } }) => loadPlayerBonusResourcesEpicFactory(
    createBonusResourcesCallSymbol(playerBonusId, phase, product),
    (resources, pageInfo) => bonusResourcesFetchedAction(playerBonusId, resources, pageInfo, phase, product),
    (state) => {
      const pageInfo = bonusResourcePageInfoSelector(state, playerBonusId, phase, product);

      if (!pageInfo.hasNextPage) {
        throw new Error("[handleBonusResourcesTablePaginatorNextEpic] there are no next page");
      }

      return {
        cursor: { first: PAGINATOR_COUNT, after: pageInfo.endCursor ?? undefined },
        where: getPlayerBonusResourcesWhere(playerBonusId, phase, product),
      };
    },
  )(action$, state$, deps)),
);

const handleBonusResourcesTablePaginatorPrevEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(bonusResourcesTablePaginatorPrevAction),
  mergeMap(({ payload: { playerBonusId, phase, product } }) => loadPlayerBonusResourcesEpicFactory(
    createBonusResourcesCallSymbol(playerBonusId, phase, product),
    (resources, pageInfo) => bonusResourcesFetchedAction(playerBonusId, resources, pageInfo, phase, product),
    (state) => {
      const pageInfo = bonusResourcePageInfoSelector(state, playerBonusId, phase, product);

      if (!pageInfo.hasPreviousPage) {
        throw new Error("[handleBonusResourcesTablePaginatorNextEpic] there are no prev page");
      }

      return {
        cursor: { first: PAGINATOR_COUNT, before: pageInfo.startCursor ?? undefined },
        where: getPlayerBonusResourcesWhere(playerBonusId, phase, product),
      };
    },
  )(action$, state$, deps)),
);

const bonusResourcesEpic = combineEpics(
  handleBonusResourcesTableMountedEpic,
  handleBonusResourcesTablePaginatorNextEpic,
  handleBonusResourcesTablePaginatorPrevEpic,
);

export { bonusResourcesEpic };
