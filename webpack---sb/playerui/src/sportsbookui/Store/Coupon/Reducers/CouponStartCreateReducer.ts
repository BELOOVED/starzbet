import { ESportsbook_Typename } from "@sb/graphql-client";
import { sportMenuRemoveAllActiveIdHandler } from "../../SportMenu/Reducers/Handlers/SportMenuRemoveAllActiveIdHandler";
import { type TAppState } from "../../InitialState";

const couponStartCreateReducer = (state: TAppState) => sportMenuRemoveAllActiveIdHandler({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      startEdit: true,
      startTooltip: true,
      newCoupon: {
        name: "",
        id: "",
        __typename: ESportsbook_Typename.sportsbookNewCoupon,
        image: null,
        playerGroupIds: [],
        filters: [],
      },
    },
  },
});

export { couponStartCreateReducer };
