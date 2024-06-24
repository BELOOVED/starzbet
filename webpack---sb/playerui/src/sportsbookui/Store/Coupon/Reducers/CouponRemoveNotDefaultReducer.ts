import { DEFAULT_PLAYER_GROUP_ID } from "../../../../common/Constants/DefaultPlayerGroupId";
import { allCouponsSelector, couponGroupsSelector } from "../Selectors/CouponsSelector";
import { type IWithCoupon } from "../CouponState";

const couponRemoveNotDefaultReducer = (state: IWithCoupon) => {
  const groups = couponGroupsSelector(state);

  const removedGroup: string[] = [];
  const removedCoupons: string[] = [];

  groups.forEach(({ id: groupId, coupons }) => {
    coupons.forEach(({ id: couponId, playerGroupIds }) => {
      if (!playerGroupIds.includes(DEFAULT_PLAYER_GROUP_ID)) {
        removedGroup.push(groupId);
        removedCoupons.push(couponId);
      }
    });
  });

  const nextCoupons = { ...allCouponsSelector(state) };

  removedCoupons.forEach((id) => {
    delete nextCoupons[id];
  });

  return {
    ...state,
    coupon: {
      ...state.coupon,
      groups: groups.filter(({ id }) => !removedGroup.includes(id)),
      coupons: nextCoupons,
    },
  };
};

export { couponRemoveNotDefaultReducer };
