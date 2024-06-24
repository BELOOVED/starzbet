import { getNotNil, type TReducer } from "@sb/utils";
import { ESportsbook_Typename } from "@sb/graphql-client";
import { type IWithCoupon } from "../CouponState";
import { type couponAddTournamentAction } from "../CouponActions";
import { couponPlayerSelector } from "../Selectors/CouponsSelector";

const couponAddTournamentReducer: TReducer<IWithCoupon, typeof couponAddTournamentAction> = (state, { payload: { id } }) => {
  if (!state.coupon.player.startEdit) {
    return state;
  }

  const existingCoupon = getNotNil(couponPlayerSelector(state).newCoupon, ["couponAddTournamentReducer"], "existingCoupon");

  return {
    ...state,
    coupon: {
      ...state.coupon,
      player: {
        ...state.coupon.player,
        readyToSave: true,
        finaliseTooltip: true,
        newCoupon: {
          ...existingCoupon,
          filters: [
            ...existingCoupon.filters,
            {
              __typename: ESportsbook_Typename.sportsbookCouponEventFilter,
              id: null,
              name: null,
              sportId: null,
              categoryId: null,
              tournamentId: id,
              eventIds: [],
              eventStartTimeGte: null,
              eventStartTimeLte: null,
              marketTypes: [],
            },
          ],
        },
      },
    },
  };
};

export { couponAddTournamentReducer };
