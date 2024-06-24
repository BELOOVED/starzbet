import {
  createRootReducer,
  isString,
  simpleReducer,
  type TActionWithPayload,
  type TExplicitAny,
  type TReducer,
  valueByPathReducer,
} from "@sb/utils";
import { loggedOutAction } from "@sb/auth";
import { callManagerFailedAction } from "@sb/call-manager";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { update } from "../../../../sportsbookui/Utils/Update";
import { openModalReducerHandler } from "../../../../common/Store/Modal/Reducers/ModalOpenReducer";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { type TAppStateWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import {
  availableBonusesFetchedAction,
  availableBonusFetchedAction,
  bonusEventDataModalClosedAction,
  bonusHasBeenCreatedAction,
  bonusNoLongerAvailableModalClosedAction,
  bonusResourcesFetchedAction,
  changeBonusProductFilterAction,
  changeBonusShowCompletedFilterAction,
  changeBonusSortFilterAction,
  changeBonusTypeCommonFilterAction,
  deprecatedBonusesBonusResourcesTableMountedAction,
  deprecatedBonusResourceFetchedAction,
  deprecatedBonusResourcesFetchedAction,
  deprecatedPlatformBonusResourcesFetchedAction,
  historyBonusesFetchedAction,
  historyBonusFetchedAction,
  platformCMSBonusesFetchedAction,
  playerBonusesFetchedAction,
  playerBonusFetchedAction,
  playerBonusHasBeenActivatedAction,
  playerBonusHasBeenCanceledAction,
  playerBonusHasBeenCompletedAction,
  playerBonusHasBeenLostAction,
  playerBonusHasBeenWonAction,
  registrationBonusesFetchedAction,
  setCashbackSumAction,
  unsettledBonusResourcesCountUnmountedAction,
  unsettledBonusResourcesFetchedAction,
  updatePreferredCashbackBonusIdAction,
} from "../BonusesActions";
import { type IDeprecatedResourcesPage, type IWithPlatformBonusesState } from "../BonusesInitialState";
import { ACTIVATE_BONUS_CALL_SYMBOL, CANCEL_BONUS_CALL_SYMBOL, CLAIM_BONUS_CALL_SYMBOL } from "../BonusVariables";

const simpleBonusReducer = <AC extends (...args: TExplicitAny[]) => TActionWithPayload<Record<string, unknown>>>(
  bonusStateKey: keyof IWithPlatformBonusesState["platformBonuses"],
  actionPayloadKey: keyof ReturnType<AC>["payload"],
) => simpleReducer<IWithPlatformBonusesState>([actionPayloadKey as string], ["platformBonuses", bonusStateKey]);

const platformRegistrationBonusesFetchedReducer = simpleBonusReducer<typeof registrationBonusesFetchedAction>("registrationBonuses", "registrationBonuses");
const platformAvailableBonusesFetchedReducer = simpleBonusReducer<typeof availableBonusesFetchedAction>("availableBonuses", "availableBonuses");
const playerBonusesFetchedReducer = simpleBonusReducer<typeof playerBonusesFetchedAction>("playerBonuses", "playerBonuses");
const platformHistoryBonusesFetchedReducer = simpleBonusReducer<typeof historyBonusesFetchedAction>("historyBonuses", "historyBonuses");
const changeBonusTypeCommonFilterReducer = simpleBonusReducer<typeof changeBonusTypeCommonFilterAction>("bonusTypeCommonFilter", "bonusTypeCommonFilter");
const changeBonusProductFilterReducer = simpleBonusReducer<typeof changeBonusProductFilterAction>("bonusProductFilter", "bonusProductFilter");
const changeBonusSortFilterReducer = simpleBonusReducer<typeof changeBonusSortFilterAction>("sortBy", "sortBy");
const changeBonusShowCompletedFilterReducer = simpleBonusReducer<typeof changeBonusShowCompletedFilterAction>("showOnlyCompleted", "showOnlyCompleted");
const setCashbackSumReducer = simpleBonusReducer<typeof setCashbackSumAction>("cashbackSum", "cashbackSum");
const updatePreferredCashbackBonusIdReducer = simpleBonusReducer<typeof updatePreferredCashbackBonusIdAction>("preferredCashbackBonusId", "preferredCashbackBonusId");

const bonusNoLongerAvailableModalClosedReducer = valueByPathReducer(["platformBonuses", "bonusNoLongerAvailableModalVisible"], false);

const notSettledBonusResourcesFetchedReducer = (
  state: IWithPlatformBonusesState,
  { payload: { playerBonusId, count } }: ReturnType<typeof unsettledBonusResourcesFetchedAction>,
): IWithPlatformBonusesState => ({
  ...state,
  platformBonuses: {
    ...state.platformBonuses,
    notSettledResourcesMap: {
      ...state.platformBonuses.notSettledResourcesMap,
      [playerBonusId]: count,
    },
  },
});

const platformCMSBonusesFetchedReducer = (
  state: TMixAppState,
  action: ReturnType<typeof platformCMSBonusesFetchedAction>,
): TMixAppState => ({
  ...state,
  platformBonuses: {
    ...state.platformBonuses,
    bonusesForCMS: action.payload,
  },
});

const playerBonusFetchedReducer = (
  state: TMixAppState,
  action: ReturnType<typeof playerBonusFetchedAction>,
): TMixAppState => ({
  ...state,
  platformBonuses: {
    ...state.platformBonuses,
    playerBonuses: [
      ...state.platformBonuses.playerBonuses.filter(({ id }) => id !== action.payload.playerBonus.id),
      action.payload.playerBonus,
    ],
  },
});

const availableBonusFetchedReducer = (
  state: TMixAppState,
  { payload: { availableBonus, ignoreNullResponseError } }: ReturnType<typeof availableBonusFetchedAction>,
): TMixAppState => {
  const availableBonuses = isString(availableBonus)
    ? state.platformBonuses.availableBonuses.filter(({ id }) => id !== availableBonus)
    : state.platformBonuses.availableBonuses.filter(({ id }) => id !== availableBonus.id).concat(availableBonus);

  let nextState: TMixAppState = { ...state, platformBonuses: { ...state.platformBonuses, availableBonuses } };

  if (isString(availableBonus) && !ignoreNullResponseError) {
    nextState = openModalReducerHandler(nextState, EModal.bonusNoLongerAvailable, true, true);
  }

  return nextState;
};

const historyBonusFetchedReducer = (
  state: TMixAppState,
  action: ReturnType<typeof historyBonusFetchedAction>,
): TMixAppState => ({
  ...state,
  platformBonuses: {
    ...state.platformBonuses,
    historyBonuses: [
      ...state.platformBonuses.historyBonuses.filter(({ id }) => id !== action.payload.historyBonus.id),
      action.payload.historyBonus,
    ],
  },
});

/**
 * @deprecated
 */
const deprecatedPlatformBonusResourcesFetchedReducer = (
  state: TMixAppState,
  { payload: { playerBonusId, bonusResources } }: ReturnType<typeof deprecatedPlatformBonusResourcesFetchedAction>,
): TMixAppState => ({
  ...state,
  platformBonuses: {
    ...state.platformBonuses,
    deprecatedBonusResources: {
      ...state.platformBonuses.deprecatedBonusResources,
      [playerBonusId]: bonusResources,
    },
  },
});

const bonusResourcesFetchedReducer = (
  state: TMixAppState,
  { payload }: ReturnType<typeof bonusResourcesFetchedAction>,
): TMixAppState => {
  const {
    resources: records,
    pageInfo,
    playerBonusId,
    phase,
    product,
  } = payload;

  return ({
    ...state,
    platformBonuses: {
      ...state.platformBonuses,
      resources: {
        ...state.platformBonuses.resources,
        [playerBonusId]: {
          ...(state.platformBonuses.resources[playerBonusId] ?? {}),
          [phase]: {
            ...(state.platformBonuses.resources[playerBonusId]?.[phase] ?? {}),
            [product ?? "all"]: { records, pageInfo },
          },
        },
      },
    },
  });
};

/**
 * @deprecated
 */
const platformBonusResourcesFetchedReducer = (
  state: TMixAppState,
  {
    payload: {
      playerBonusId,
      bonusResources,
      pageInfo,
      phase,
      product,
    },
  }: ReturnType<typeof deprecatedBonusResourcesFetchedAction>,
): TMixAppState => {
  if (!phase) {
    return ({
      ...state,
      platformBonuses: {
        ...state.platformBonuses,
        bonusResources: {
          ...state.platformBonuses.bonusResources,
          [playerBonusId]: {
            loading: false,
            records: bonusResources,
            pageInfo,
          },
        },
      },
    });
  }

  return ({
    ...state,
    platformBonuses: {
      ...state.platformBonuses,
      bonusResourcesSegregated: {
        ...state.platformBonuses.bonusResourcesSegregated,
        [playerBonusId]: {
          ...state.platformBonuses.bonusResourcesSegregated[playerBonusId],
          [phase]: {
            ...(state.platformBonuses.bonusResourcesSegregated[playerBonusId]?.[phase] ?? {}),
            [product ?? "all"]: {
              loading: false,
              records: bonusResources,
              pageInfo,
            },
          },
        },
      },
    },
  });
};

/**
 * @deprecated
 */
const platformBonusResourceFetchedReducer = (
  state: TMixAppState,
  {
    payload: {
      playerBonusId,
      bonusResourceId,
      phase,
      bonusResources,
      product,
    },
  }: ReturnType<typeof deprecatedBonusResourceFetchedAction>,
): TMixAppState => {
  if (!phase) {
    const records = state.platformBonuses.bonusResources[playerBonusId]?.records ?? [];

    const index = records.findIndex((record) => record.id === bonusResourceId);

    return ({
      ...state,
      platformBonuses: {
        ...state.platformBonuses,
        // @ts-ignore
        bonusResources: {
          ...state.platformBonuses.bonusResources,
          [playerBonusId]: {
            ...state.platformBonuses.bonusResources[playerBonusId],
            records: update(index, bonusResources[0], records),
          },
        },
      },
    });
  }

  const p = product ?? "all";

  const records = state.platformBonuses.bonusResourcesSegregated[playerBonusId]?.[phase]?.[p]?.records ?? [];

  const index = records.findIndex((record) => record.id === bonusResourceId);

  return ({
    ...state,
    platformBonuses: {
      ...state.platformBonuses,
      bonusResourcesSegregated: {
        ...state.platformBonuses.bonusResourcesSegregated,
        [playerBonusId]: {
          ...state.platformBonuses.bonusResourcesSegregated[playerBonusId],
          [phase]: {
            ...(state.platformBonuses.bonusResourcesSegregated[playerBonusId]?.[phase] ?? {}),
            [p]: {
              ...(state.platformBonuses.bonusResourcesSegregated[playerBonusId]?.[phase]?.[p] ?? {}),
              records: update(index, bonusResources[0], records),
            },
          },
        },
      },
    },
  });
};

const emptyPage: IDeprecatedResourcesPage = {
  loading: true,
  records: [],
  pageInfo: null,
};

/**
 * @deprecated
 */
const platformBonusesLoadBonusResourcesReducer = (
  state: TMixAppState,
  { payload: { playerBonusId, phase, product } }: ReturnType<typeof deprecatedBonusesBonusResourcesTableMountedAction>,
): TMixAppState => {
  if (!phase) {
    return ({
      ...state,
      platformBonuses: {
        ...state.platformBonuses,
        bonusResources: {
          ...state.platformBonuses.bonusResources,
          [playerBonusId]: {
            ...state.platformBonuses.bonusResources[playerBonusId] ?? emptyPage,
            loading: true,
          },
        },
      },
    });
  }

  return ({
    ...state,
    platformBonuses: {
      ...state.platformBonuses,
      bonusResourcesSegregated: {
        ...state.platformBonuses.bonusResourcesSegregated,
        [playerBonusId]: {
          ...state.platformBonuses.bonusResourcesSegregated[playerBonusId] ?? {},
          [phase]: {
            ...state.platformBonuses.bonusResourcesSegregated[playerBonusId]?.[phase] ?? {},
            [product ?? "all"]: {
              ...state.platformBonuses.bonusResourcesSegregated[playerBonusId]?.[phase]?.[product ?? "all"] ?? emptyPage,
              loading: true,
            },
          },
        },
      },
    },
  });
};

const unsettledBonusResourcesCountUnmountedReducer = (
  state: IWithPlatformBonusesState,
  { payload: { playerBonusId } }: ReturnType<typeof unsettledBonusResourcesCountUnmountedAction>,
) => {
  const newMap = { ...state.platformBonuses.notSettledResourcesMap };
  delete newMap[playerBonusId];

  return {
    ...state,
    platformBonuses: {
      ...state.platformBonuses,
      notSettledResourcesMap: newMap,
    },
  };
};

const bonusHasBeenCreatedReducer = (
  state: IWithPlatformBonusesState,
  action: ReturnType<typeof bonusHasBeenCreatedAction>,
): IWithPlatformBonusesState => action.payload.eventPayload.shouldBeShown
  ? simpleBonusReducer<typeof bonusHasBeenCreatedAction>("bonusClaimedEvent", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenActivatedReducer = (
  state: IWithPlatformBonusesState,
  action: ReturnType<typeof playerBonusHasBeenActivatedAction>,
): IWithPlatformBonusesState => action.payload.eventPayload.shouldBeShown
  ? simpleBonusReducer<typeof playerBonusHasBeenActivatedAction>("playerBonusActivatedEvent", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenCanceledReducer = (
  state: IWithPlatformBonusesState,
  action: ReturnType<typeof playerBonusHasBeenCanceledAction>,
): IWithPlatformBonusesState => action.payload.eventPayload.shouldBeShown
  ? simpleBonusReducer<typeof playerBonusHasBeenCanceledAction>("playerBonusCanceledEvent", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenWonReducer = (
  state: IWithPlatformBonusesState,
  action: ReturnType<typeof playerBonusHasBeenWonAction>,
): IWithPlatformBonusesState => action.payload.eventPayload.shouldBeShown
  ? simpleBonusReducer<typeof playerBonusHasBeenWonAction>("playerBonusWonEvent", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenCompletedReducer = (
  state: IWithPlatformBonusesState,
  action: ReturnType<typeof playerBonusHasBeenCompletedAction>,
): IWithPlatformBonusesState => action.payload.eventPayload.shouldBeShown
  ? simpleBonusReducer<typeof playerBonusHasBeenCompletedAction>("playerBonusCompletedEvent", "eventPayload")(state, action)
  : state;

const playerBonusHasBeenLostReducer = (
  state: IWithPlatformBonusesState,
  action: ReturnType<typeof playerBonusHasBeenLostAction>,
): IWithPlatformBonusesState => action.payload.eventPayload.shouldBeShown
  ? simpleBonusReducer<typeof playerBonusHasBeenLostAction>("playerBonusLostEvent", "eventPayload")(state, action)
  : state;

const playerBonusRemoveEventDataReducer = (
  state: IWithPlatformBonusesState,
  { payload: { eventType } }: ReturnType<typeof bonusEventDataModalClosedAction>,
): IWithPlatformBonusesState => ({
  ...state,
  platformBonuses: {
    ...state.platformBonuses,
    [eventType]: null,
  },
});

const bonusesLoggedOutReducer = (state: IWithPlatformBonusesState): IWithPlatformBonusesState => ({
  ...state,
  platformBonuses: {
    ...state.platformBonuses,
    availableBonuses: [],
    playerBonuses: [],
    historyBonuses: [],
  },
});

const bonusCallManagerFailedReducer: TReducer<TAppStateWithBonuses, typeof callManagerFailedAction> =
  (state, { payload: { id, symbol } }) => {
    switch (symbol) {
      case CLAIM_BONUS_CALL_SYMBOL: {
        return openModalReducerHandler(state, EModal.claimBonusFailed, id, true);
      }
      case ACTIVATE_BONUS_CALL_SYMBOL: {
        return openModalReducerHandler(state, EModal.activateBonusFailed, id, true);
      }
      case CANCEL_BONUS_CALL_SYMBOL: {
        return openModalReducerHandler(state, EModal.cancelBonusFailed, id, true);
      }
      default: {
        return state;
      }
    }
  };

const platformBonusesRootReducer = createRootReducer([
  [platformRegistrationBonusesFetchedReducer, registrationBonusesFetchedAction],
  [platformAvailableBonusesFetchedReducer, availableBonusesFetchedAction],
  [playerBonusesFetchedReducer, playerBonusesFetchedAction],
  [platformCMSBonusesFetchedReducer, platformCMSBonusesFetchedAction],
  [bonusNoLongerAvailableModalClosedReducer, bonusNoLongerAvailableModalClosedAction],
  [availableBonusFetchedReducer, availableBonusFetchedAction],
  [playerBonusFetchedReducer, playerBonusFetchedAction],
  [historyBonusFetchedReducer, historyBonusFetchedAction],
  [platformHistoryBonusesFetchedReducer, historyBonusesFetchedAction],
  [notSettledBonusResourcesFetchedReducer, unsettledBonusResourcesFetchedAction],
  [bonusResourcesFetchedReducer, bonusResourcesFetchedAction],

  [unsettledBonusResourcesCountUnmountedReducer, unsettledBonusResourcesCountUnmountedAction],
  [changeBonusTypeCommonFilterReducer, changeBonusTypeCommonFilterAction],
  [changeBonusProductFilterReducer, changeBonusProductFilterAction],
  [changeBonusSortFilterReducer, changeBonusSortFilterAction],
  [changeBonusShowCompletedFilterReducer, changeBonusShowCompletedFilterAction],

  [setCashbackSumReducer, setCashbackSumAction],
  [updatePreferredCashbackBonusIdReducer, updatePreferredCashbackBonusIdAction],

  [bonusHasBeenCreatedReducer, bonusHasBeenCreatedAction],
  [playerBonusHasBeenActivatedReducer, playerBonusHasBeenActivatedAction],
  [playerBonusHasBeenCanceledReducer, playerBonusHasBeenCanceledAction],
  [playerBonusHasBeenLostReducer, playerBonusHasBeenLostAction],
  [playerBonusHasBeenWonReducer, playerBonusHasBeenWonAction],
  [playerBonusHasBeenCompletedReducer, playerBonusHasBeenCompletedAction],
  [playerBonusRemoveEventDataReducer, bonusEventDataModalClosedAction],

  [bonusesLoggedOutReducer, loggedOutAction],

  [bonusCallManagerFailedReducer, callManagerFailedAction],

  [deprecatedPlatformBonusResourcesFetchedReducer, deprecatedPlatformBonusResourcesFetchedAction],
  [platformBonusResourcesFetchedReducer, deprecatedBonusResourcesFetchedAction],
  [platformBonusResourceFetchedReducer, deprecatedBonusResourceFetchedAction],
  [platformBonusesLoadBonusResourcesReducer, deprecatedBonusesBonusResourcesTableMountedAction],
]);

export { platformBonusesRootReducer };
