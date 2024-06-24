import { type TSportsbook_CouponGroup_Fragment, type TSportsbook_NewCoupon_Fragment } from "@sb/graphql-client/PlayerUI";

interface IStateCoupon {
  player: {
    startEdit: boolean;
    startTooltip: boolean;
    finaliseTooltip: boolean;
    readyToSave: boolean;
    saving: boolean;
    skipCouponCreateTip: boolean;
    newCoupon?: TSportsbook_NewCoupon_Fragment;
  };
  expanded: boolean;
  coupons: Record<string, TSportsbook_NewCoupon_Fragment>;
  groups: TSportsbook_CouponGroup_Fragment[];
}

const couponGroupsFetchedHandler = (prevCoupons: IStateCoupon, nextCoupons: TSportsbook_CouponGroup_Fragment[]) => {
  if (nextCoupons.length === 0) {
    return prevCoupons;
  }

  const allCoupons: Record<string, TSportsbook_NewCoupon_Fragment> = {};

  nextCoupons.forEach(({ coupons }) => {
    coupons.forEach((coupon) => {
      allCoupons[coupon.id] = coupon;
    });
  });

  return {
    ...prevCoupons,
    coupons: {
      ...prevCoupons.coupons,
      ...allCoupons,
    },
    groups: [
      ...prevCoupons.groups.filter(({ id }) => nextCoupons.find((coupon) => coupon.id !== id)),
      ...nextCoupons,
    ],
  };
};

export { couponGroupsFetchedHandler, type IStateCoupon };
