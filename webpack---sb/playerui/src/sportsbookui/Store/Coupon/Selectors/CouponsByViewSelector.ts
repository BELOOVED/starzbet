import { createMemoSelector, createSimpleSelector, isNotEmpty, Time } from "@sb/utils";
import { type TSportsbook_CouponGroup_Fragment, type TSportsbook_NewCoupon_Fragment } from "@sb/graphql-client/PlayerUI";
import { ESportsbook_CouponView } from "@sb/graphql-client";
import { localClientTimeZoneOffsetSelector } from "../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { type IWithCoupon } from "../CouponState";
import { couponGroupsSelector } from "./CouponsSelector";

const isShowTime = (startShowTime: string | null | undefined, stopShowTime: string | null | undefined, offset: number) => {
  if (!stopShowTime || !startShowTime) {
    return true;
  }

  return (
    Time.isWithinInterval(Date.now(), { start: +startShowTime, end: +stopShowTime }, { offset })
  );
};

const isAvailable = (offset: number) => ({ enabled, startShowTime, stopShowTime }: TSportsbook_CouponGroup_Fragment) => (
  enabled && isShowTime(startShowTime, stopShowTime, offset)
);

const couponsByViewSelector = createMemoSelector(
  [
    (_, viewType: ESportsbook_CouponView) => viewType,
    couponGroupsSelector,
    localClientTimeZoneOffsetSelector,
  ],
  (viewType, groups, timezoneOffset) => {
    const group = groups.filter(isAvailable(timezoneOffset)).find(({ view }) => view === viewType);

    return group
      ? group.coupons
      : [];
  },
  {
    expensive: true,
  },
);

const topLeaguesCouponsSelector = (state: IWithCoupon) => couponsByViewSelector(state, ESportsbook_CouponView.topLeaguesMenu);

const MAX_BATCH_LENGTH = 3;

const topLeaguesCouponsBatchSelector = createMemoSelector(
  [topLeaguesCouponsSelector],
  (coupons) => {
    const batchArrayLength = Math.ceil(coupons.length / MAX_BATCH_LENGTH);

    const batchArray: TSportsbook_NewCoupon_Fragment[][] = [];

    coupons.forEach((coupon, index) => {
      const batchIndex = Math.floor(index / batchArrayLength);

      if (!batchArray[batchIndex]) {
        batchArray.push([]);
      }

      batchArray[batchIndex]?.push(coupon);
    });

    return batchArray;
  },
);

const isNotEmptyTopLeaguesCouponsSelector = createSimpleSelector([topLeaguesCouponsSelector], isNotEmpty);

export {
  couponsByViewSelector,
  topLeaguesCouponsSelector,
  isNotEmptyTopLeaguesCouponsSelector,
  topLeaguesCouponsBatchSelector,
};
