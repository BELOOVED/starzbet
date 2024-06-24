import { createMemoSelector, createSimpleSelector, getNotNil, isNotNil, withParams } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { localClientTimeZoneOffsetSelector } from "../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { sortedTournamentEntriesSelectorFactory } from "../../Feed/Selectors/SortedTournamentEntriesSelectorFactory";
import { preLiveFavouritesSelector } from "../../PreLive/Selectors/PreLiveSelectors";
import { preLiveEventsSelector } from "../../Feed/Selectors/PreLiveEventsSelector";
import { tournamentByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { type TMixAppState } from "../../CreateMixInitialState";
import { type TGroupEvents, type TSortEvent } from "../../Feed/Model/Event";
import { type IWithCoupon } from "../CouponState";
import { eventIdListByCouponSelector } from "./EventIdListByCouponSelector";

const couponPlayerSelector = ({ coupon: { player } }: IWithCoupon) => player;

const startEditPlayerCouponSelector = (state: IWithCoupon) => couponPlayerSelector(state).startEdit;

const allCouponsSelector = ({ coupon }: IWithCoupon) => coupon.coupons;

const couponGroupsSelector = ({ coupon }: IWithCoupon) => coupon.groups;

const couponExpandedSelector = ({ coupon }: IWithCoupon) => coupon.expanded;

const couponByIdSelector = (state: IWithCoupon, couponId: string) => allCouponsSelector(state)[couponId];

const couponsByPlayerIdSelector = createSimpleSelector(
  [
    playerDetailsSelectors.id,
    couponGroupsSelector,
  ],
  (playerId, groups) => {
    const group = groups.find((group) => group.playerId === playerId);

    return group
      ? group.coupons
      : [];
  },
);

const couponIdListByPlayerIdSelector = createSimpleSelector(
  [couponsByPlayerIdSelector],
  (coupons) => coupons.map(({ id }) => id),
);

const couponGroupIdByPlayerIdSelector = createSimpleSelector(
  [
    playerDetailsSelectors.id,
    couponGroupsSelector,
  ],
  (playerId, groups) => {
    const group = groups.find((group) => group.playerId === playerId);

    if (!group) {
      Logger.warn.selector("[couponGroupIdByPlayerIdSelector]", `Coupon group not found by playerId: ${playerId}`);

      return void 0;
    }

    return group.id;
  },
);

const couponSkipCouponCreateTipSelector = ({ coupon: { player } }: IWithCoupon) => player.skipCouponCreateTip;

const couponNewCouponHasTournamentIdSelector = (state: IWithCoupon, tournamentId: string) =>
  getNotNil(
    couponPlayerSelector(state).newCoupon,
    ["Coupons Selector"],
    "couponNewCouponHasTournamentIdSelector",
  ).filters.some((it) => it.tournamentId === tournamentId);

const couponNewCouponFilterTournamentIdListSelector = (state: TMixAppState) => (
  getNotNil(
    couponPlayerSelector(state).newCoupon,
    ["Coupons Selector"],
    "couponNewCouponFilterTournamentIdListSelector",
  ).filters
    .map(({ tournamentId }) => tournamentId)
    .filter((it) => it && !!tournamentByIdSelector(state, it))
);

const nullableCouponNewCouponFilterTournamentIdListSelector = (state: TMixAppState) => (
  couponPlayerSelector(state).newCoupon?.filters
    .map(({ tournamentId }) => tournamentId)
    .filter((it) => it && !!tournamentByIdSelector(state, it))
);

const couponNewCouponLastTournamentSelector = (state: TMixAppState) => (
  couponPlayerSelector(state).newCoupon?.filters
    .map(({ tournamentId }) => isNotNil(tournamentId) && tournamentByIdSelector(state, tournamentId))
    .filter((it) => isNotNil(it))
    .pop()
);

// TODO @LEBEDZEU - Add correct types

const tournamentEntriesByCouponIdSelectorFactory = ([
  couponId,
  sortFn,
  groupFn,
]: [string, TSortEvent, TGroupEvents]) => sortedTournamentEntriesSelectorFactory(
  preLiveFavouritesSelector,
  createMemoSelector(
    [
      withParams(couponByIdSelector, couponId),
      preLiveEventsSelector,
      localClientTimeZoneOffsetSelector,
    ],
    (coupon, events, timezoneOffset) => groupFn(events, sortFn(events)(eventIdListByCouponSelector(events, timezoneOffset)(coupon))),
  ),
  "tournamentEntriesByCouponIdSelectorFactory",
);

export {
  couponPlayerSelector,
  startEditPlayerCouponSelector,
  allCouponsSelector,
  couponGroupsSelector,
  couponExpandedSelector,
  couponByIdSelector,
  couponsByPlayerIdSelector,
  couponIdListByPlayerIdSelector,
  couponGroupIdByPlayerIdSelector,
  couponSkipCouponCreateTipSelector,
  couponNewCouponHasTournamentIdSelector,
  couponNewCouponFilterTournamentIdListSelector,
  nullableCouponNewCouponFilterTournamentIdListSelector,
  couponNewCouponLastTournamentSelector,
  /**
   * FIXME
   * circ-deps
   */
  tournamentEntriesByCouponIdSelectorFactory,
};
