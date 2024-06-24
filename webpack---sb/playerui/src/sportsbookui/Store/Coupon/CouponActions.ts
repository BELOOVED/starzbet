import { type TSportsbook_CouponGroup_Fragment, type TSportsbook_NewCoupon_Fragment } from "@sb/graphql-client/PlayerUI";

const couponGroupsFetchedAction = (payload: TSportsbook_CouponGroup_Fragment[]) => ({
  type: "@COUPON/GROUPS_FETCHED",
  payload,
});

const couponRemoveNotDefaultAction = () => ({
  type: "@COUPON/REMOVE_NOT_DEFAULT",
});

const couponStartCreateAction = () => ({
  type: "@COUPON/START_CREATE",
});

const couponCancelCreateAction = () => ({
  type: "@COUPON/CANCEL_CREATE",
});

const couponDisableStartTooltipAction = () => ({
  type: "@COUPON/DISABLE_START_TOOLTIP",
});

const couponEnableFinaliseTooltipAction = () => ({
  type: "@COUPON/ENABLE_FINALISE_TOOLTIP",
});

const couponDisableFinaliseTooltipAction = () => ({
  type: "@COUPON/DISABLE_FINALISE_TOOLTIP",
});

const couponStartSaveAction = () => ({
  type: "@COUPON/START_SAVE",
});

const couponCancelSaveAction = () => ({
  type: "@COUPON/CANCEL_SAVE",
});

const couponSaveAction = (name: string) => ({
  type: "@COUPON/SAVE",
  payload: { name },
});

const couponRemoveAction = (couponId: string) => ({
  type: "@COUPON/REMOVE",
  payload: { couponId },
});

const couponUpdateAction = (couponId: string) => ({
  type: "@COUPON/UPDATE",
  payload: { couponId },
});

const couponCompleteSaveAction = () => ({
  type: "@COUPON/COMPLETE_SAVE",
});

const couponFetchedAction = (payload: TSportsbook_NewCoupon_Fragment) => ({
  type: "@COUPON/FETCHED",
  payload,
});

const couponChangeSkipCreateTipAction = (value: boolean) => ({
  type: "@COUPON/CHANGE_SKIP_CREATE_TIP",
  payload: { value },
});

const couponAddTournamentAction = (id: string) => ({
  type: "@COUPON/ADD_TOURNAMENT",
  payload: { id },
});

const couponRemoveTournamentAction = (id: string) => ({
  type: "@COUPON/REMOVE_TOURNAMENT",
  payload: { id },
});

const couponToggleExpandAction = () => ({
  type: "@COUPON/TOGGLE_EXPAND",
});

export {
  couponGroupsFetchedAction,
  couponRemoveNotDefaultAction,
  couponStartCreateAction,
  couponCancelCreateAction,
  couponDisableStartTooltipAction,
  couponEnableFinaliseTooltipAction,
  couponDisableFinaliseTooltipAction,
  couponStartSaveAction,
  couponCancelSaveAction,
  couponSaveAction,
  couponRemoveAction,
  couponUpdateAction,
  couponCompleteSaveAction,
  couponFetchedAction,
  couponChangeSkipCreateTipAction,
  couponAddTournamentAction,
  couponRemoveTournamentAction,
  couponToggleExpandAction,
};
