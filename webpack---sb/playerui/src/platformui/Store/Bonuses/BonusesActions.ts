import type {
  TPlatform_Bonus_Fragment,
  TPlatform_Bonus_Registration_Fragment,
  TPlatform_Bonus_Template_Fragment,
  TPlatform_PlayerBonus_Fragment,
  TPlatform_PlayerBonusResource_Fragment,
  TPlatform_PlayerBonusResourceDeprecated_Fragment,
  TPlatform_PlayerBonusResourceRead_Fragment,
} from "@sb/graphql-client/PlayerUI";
import {
  type EBonusProductEnum,
  type EPlatform_PlayerBonusPhaseEnum,
  type TPageInfo_Fragment,
} from "@sb/graphql-client";
import { type IMoney } from "@sb/utils";
import {
  type IBonusCanceledPayload,
  type IBonusCompletedPayload,
  type IBonusLostPayload,
  type IBonusProgressUpdatedPayload,
  type IBonusWonPayload,
  type TBonusActivatedPayload,
  type TProceededToWageringStagePayload,
} from "../../Model/BonusWebSocketEvents";
import { type TProductFilterKey } from "./Utils/BonusesUISortFilterUtils";
import { type EBonusTypeCommonFilter } from "./Model/Enums/EBonusTypeCommonFilter";
import { type EBonusSortFilter } from "./Model/Enums/EBonusSortFilter";
import { type IBonusCreatedPayload, type TPlayerBonusEvent } from "./BonusesInitialState";

const registrationBonusesFetchedAction = (registrationBonuses: TPlatform_Bonus_Registration_Fragment[]) => ({
  type: "@PLATFORM/REGISTRATION_BONUSES_FETCHED",
  payload: { registrationBonuses },
});

const availableBonusesFetchedAction = (availableBonuses: TPlatform_Bonus_Fragment[]) => ({
  type: "@PLATFORM/AVAILABLE_BONUSES_FETCHED",
  payload: { availableBonuses },
});

const detailedAvailableBonusRequestedAction = (bonusId: string) => ({
  type: "@PLATFORM/DETAILED_AVAILABLE_BONUS_REQUESTED",
  payload: { bonusId },
});

const bonusNoLongerAvailableModalClosedAction = () => ({
  type: "@PLATFORM/BONUS_NO_LONGER_AVAILABLE_MODAL_CLOSED",
});

/**
 * string in case when response is Nil ->
 * it means that bonus no longer available for player
 */
const availableBonusFetchedAction = (availableBonus: TPlatform_Bonus_Fragment | string, ignoreNullResponseError?: boolean) => ({
  type: "@PLATFORM/AVAILABLE_BONUS_FETCHED",
  payload: { availableBonus, ignoreNullResponseError },
});

const playerBonusesFetchedAction = (playerBonuses: TPlatform_PlayerBonus_Fragment[]) => ({
  type: "@PLATFORM/PLAYER_BONUSES_FETCHED",
  payload: { playerBonuses },
});

const platformCMSBonusesFetchedAction = (bonuses: TPlatform_Bonus_Template_Fragment[]) => ({
  type: "@CMS/BONUSES_FETCHED",
  payload: bonuses,
});

const playerBonusFetchedAction = (playerBonus: TPlatform_PlayerBonus_Fragment) => ({
  type: "@PLATFORM/PLAYER_BONUS_FETCHED",
  payload: { playerBonus },
});

const historyBonusFetchedAction = (historyBonus: TPlatform_PlayerBonus_Fragment) => ({
  type: "@PLATFORM/HISTORY_BONUS_FETCHED",
  payload: { historyBonus },
});

const historyBonusesFetchedAction = (historyBonuses: TPlatform_PlayerBonus_Fragment[]) => ({
  type: "@PLATFORM/HISTORY_BONUSES_FETCHED",
  payload: { historyBonuses },
});

// bonus resources deprecated
/**
 * @deprecated
 */
const deprecatedBonusResourceFetchedAction = (
  playerBonusId: string,
  bonusResourceId: string,
  phase: EPlatform_PlayerBonusPhaseEnum,
  bonusResources: TPlatform_PlayerBonusResource_Fragment[],
  product?: EBonusProductEnum,
) => ({
  type: "@PLATFORM/DEPRECATED_BONUS_RESOURCE_FETCHED",
  payload: {
    playerBonusId,
    bonusResourceId,
    bonusResources,
    phase,
    product,
  },
});

/**
 * @deprecated
 */
const deprecatedPlatformBonusResourcesFetchedAction = (
  playerBonusId: string,
  bonusResources: TPlatform_PlayerBonusResourceDeprecated_Fragment[],
) => ({
  type: "@PLATFORM/BONUS_RESOURCES_FETCHED_DEPRECATED",
  payload: { playerBonusId, bonusResources },
});

/**
 * @deprecated
 */
const deprecatedBonusResourcesFetchedAction = (
  playerBonusId: string,
  bonusResources: TPlatform_PlayerBonusResource_Fragment[],
  pageInfo: TPageInfo_Fragment,
  phase?: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => ({
  type: "@PLATFORM/DEPRECATED_BONUS_RESOURCES_FETCHED",
  payload: {
    playerBonusId,
    bonusResources,
    pageInfo,
    phase,
    product,
  },
});

/**
 * @deprecated
 * todo split on 'mounted'(remove prev/next) and 'pagination' actions
 */
const deprecatedBonusesBonusResourcesTableMountedAction = (
  playerBonusId: string,
  phase?: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
  prev?: boolean,
  next?: boolean,
) => ({
  type: "@PLATFORM/DEPRECATED_BONUSES_BONUS_RESOURCES_TABLE_MOUNTED",
  payload: {
    playerBonusId,
    phase,
    product,
    prev,
    next,
  },
});

/**
 * @deprecated
 */
const deprecatedBonusesLoadBonusResourcesAction = (
  playerBonusId: string,
) => ({
  type: "@PLATFORM/DEPRECATED_BONUSES_LOAD_BONUS_RESOURCES",
  payload: { playerBonusId },
});

/**
 * @deprecated
 */
const deprecatedBonusesLoadBonusResourceByIdAction = (
  playerBonusId: string,
  bonusResourceId: string,
  phase: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => ({
  type: "@PLATFORM/DEPRECATED_BONUSES_LOAD_BONUS_RESOURCE_BY_ID",
  payload: {
    playerBonusId,
    bonusResourceId,
    phase,
    product,
  },
});

// bonus resources
const bonusResourcesFetchedAction = (
  playerBonusId: string,
  resources: TPlatform_PlayerBonusResourceRead_Fragment[],
  pageInfo: TPageInfo_Fragment,
  phase: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => ({
  type: "@PLATFORM/BONUS_RESOURCES_FETCHED",
  payload: {
    playerBonusId,
    resources,
    pageInfo,
    phase,
    product,
  },
});

const bonusResourcesTableMountedAction = (
  playerBonusId: string,
  phase: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => ({
  type: "@PLATFORM/BONUSES_BONUS_RESOURCES_TABLE_MOUNTED",
  payload: { playerBonusId, phase, product },
});

const bonusResourcesTablePaginatorNextAction = (
  playerBonusId: string,
  phase: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => ({
  type: "@PLATFORM/BONUSES_BONUS_RESOURCES_TABLE_PAGINATOR_NEXT_CLICKED",
  payload: { playerBonusId, phase, product },
});

const bonusResourcesTablePaginatorPrevAction = (
  playerBonusId: string,
  phase: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
) => ({
  type: "@PLATFORM/BONUSES_BONUS_RESOURCES_TABLE_PAGINATOR_PREV_CLICKED",
  payload: { playerBonusId, phase, product },
});

// unsettled bonus resources count
const unsettledBonusResourcesCountMountedAction = (playerBonusId: string) => ({
  type: "@PLATFORM/BONUSES_BONUS_UNSETTLED_BONUS_RESOURCES_COUNT_MOUNTED",
  payload: { playerBonusId },
});

const unsettledBonusResourcesCountUnmountedAction = (playerBonusId: string) => ({
  type: "@PLATFORM/BONUSES_BONUS_UNSETTLED_BONUS_RESOURCES_COUNT_UNMOUNTED",
  payload: { playerBonusId },
});

const unsettledBonusResourcesFetchedAction = (
  playerBonusId: string,
  count: number,
) => ({
  type: "@PLATFORM/BONUSES_NOT_SETTLED_BONUS_RESOURCES_COUNT_FETCHED",
  payload: { playerBonusId, count },
});

// user actions
const claimBonusAction = (bonusId: string) => ({
  type: "@PLATFORM/CLAIM_BONUS",
  payload: { bonusId },
});

const activateBonusAction = (playerBonusId: string) => ({
  type: "@PLATFORM/BONUSES_ACTIVATE_BONUS",
  payload: { playerBonusId },
});

const cancelBonusAction = (playerBonusId: string) => ({
  type: "@PLATFORM/BONUSES_CANCEL_BONUS",
  payload: { playerBonusId },
});

const claimBonusByPromoCodeAction = (promoCode: string) => ({
  type: "@PLATFORM/CLAIM_BONUS_BY_PROMO_CODE",
  payload: { promoCode },
});

// cashback
const transferCashbackModalOpenedAction = (notVipClubBonus?: boolean) => ({
  type: "@PLATFORM/TRANSFER_CASHBACK_MODAL_OPENED",
  payload: { notVipClubBonus },
});

const transferCashbackAction = (notVipClubBonus?: boolean) => ({
  type: "@PLATFORM/TRANSFER_CASHBACK",
  payload: { notVipClubBonus },
});

const setCashbackSumAction = (cashbackSum: IMoney | null) => ({
  type: "@PLATFORM/SET_CASHBACK_SUM",
  payload: { cashbackSum },
});

const updatePreferredCashbackBonusIdAction = (preferredCashbackBonusId: string | null) => ({
  type: "@PLATFORM/UPDATE_PREFERRED_CASHBACK_BONUS_ID",
  payload: { preferredCashbackBonusId },
});

// sync filters
const changeBonusTypeCommonFilterAction = (bonusTypeCommonFilter: EBonusTypeCommonFilter | null) => ({
  type: "@PLATFORM/CHANGE_BONUS_TYPE_COMMON_FILTER",
  payload: { bonusTypeCommonFilter },
});

const changeBonusProductFilterAction = (bonusProductFilter: TProductFilterKey) => ({
  type: "@PLATFORM/CHANGE_BONUS_PRODUCT_FILTER",
  payload: { bonusProductFilter },
});

const changeBonusSortFilterAction = (sortBy: EBonusSortFilter | null) => ({
  type: "@PLATFORM/CHANGE_BONUS_SORT_FILTER",
  payload: { sortBy },
});

const changeBonusShowCompletedFilterAction = (showOnlyCompleted: boolean) => ({
  type: "@PLATFORM/CHANGE_BONUS_SHOW_COMPLETED_FILTER",
  payload: { showOnlyCompleted },
});

// ws events data
const playerBonusProceededToWageringStageAction = (eventPayload: TProceededToWageringStagePayload) => ({
  type: "@PLATFORM/PLAYER_BONUS_PROCEEDED_TO_WAGERING_STAGE",
  payload: { eventPayload },
});

const bonusHasBeenCreatedAction = (eventPayload: IBonusCreatedPayload) => ({
  type: "@PLATFORM/BONUS_HAS_BEEN_CREATED",
  payload: { eventPayload },
});

const playerBonusHasBeenCanceledAction = (eventPayload: IBonusCanceledPayload) => ({
  type: "@PLATFORM/PLAYER_BONUS_HAS_BEEN_CANCELED",
  payload: { eventPayload },
});

const playerBonusHasBeenActivatedAction = (eventPayload: TBonusActivatedPayload) => ({
  type: "@PLATFORM/PLAYER_BONUS_HAS_BEEN_ACTIVATED",
  payload: { eventPayload },
});

const playerBonusHasBeenWonAction = (eventPayload: IBonusWonPayload) => ({
  type: "@PLATFORM/PLAYER_BONUS_HAS_BEEN_WON",
  payload: { eventPayload },
});

const playerBonusHasBeenCompletedAction = (eventPayload: IBonusCompletedPayload) => ({
  type: "@PLATFORM/PLAYER_BONUS_HAS_BEEN_COMPLETED",
  payload: { eventPayload },
});

const playerBonusHasBeenLostAction = (eventPayload: IBonusLostPayload) => ({
  type: "@PLATFORM/PLAYER_BONUS_HAS_BEEN_LOST",
  payload: { eventPayload },
});

const playerBonusProgressHasBeenUpdatedAction = (eventPayload: IBonusProgressUpdatedPayload) => ({
  type: "@PLATFORM/PLAYER_BONUS_PROGRESS_HAS_BEEN_UPDATED",
  payload: { eventPayload },
});

/**
 * bonus update should be skipped when redirect on available/myBonuses routes from another route
 */
const bonusEventDataModalClosedAction = (eventType: TPlayerBonusEvent, skipBonusUpdate = false) => ({
  type: "@PLATFORM/BONUSES_EVENT_DATA_MODAL_CLOSED",
  payload: { eventType, skipBonusUpdate },
});

export {
  registrationBonusesFetchedAction,
  availableBonusFetchedAction,
  playerBonusFetchedAction,
  historyBonusFetchedAction,
  availableBonusesFetchedAction,
  detailedAvailableBonusRequestedAction,
  bonusNoLongerAvailableModalClosedAction,
  playerBonusesFetchedAction,
  historyBonusesFetchedAction,
  platformCMSBonusesFetchedAction,
  unsettledBonusResourcesFetchedAction,
  unsettledBonusResourcesCountMountedAction,
  unsettledBonusResourcesCountUnmountedAction,
  bonusResourcesFetchedAction,
  bonusResourcesTableMountedAction,
  bonusResourcesTablePaginatorNextAction,
  bonusResourcesTablePaginatorPrevAction,
  claimBonusAction,
  claimBonusByPromoCodeAction,
  activateBonusAction,
  cancelBonusAction,
  transferCashbackModalOpenedAction,
  transferCashbackAction,
  setCashbackSumAction,
  updatePreferredCashbackBonusIdAction,
  changeBonusTypeCommonFilterAction,
  changeBonusProductFilterAction,
  changeBonusSortFilterAction,
  changeBonusShowCompletedFilterAction,
  playerBonusProceededToWageringStageAction,
  bonusHasBeenCreatedAction,
  playerBonusHasBeenActivatedAction,
  playerBonusHasBeenCanceledAction,
  playerBonusHasBeenLostAction,
  playerBonusHasBeenWonAction,
  playerBonusHasBeenCompletedAction,
  playerBonusProgressHasBeenUpdatedAction,
  bonusEventDataModalClosedAction,
  // deprecated resources
  deprecatedBonusesLoadBonusResourcesAction,
  deprecatedPlatformBonusResourcesFetchedAction,
  deprecatedBonusesBonusResourcesTableMountedAction,
  deprecatedBonusResourcesFetchedAction,
  deprecatedBonusResourceFetchedAction,
  deprecatedBonusesLoadBonusResourceByIdAction,
};
