import { IS_SERVER } from "@sb/utils";
import { type TSportsbook_CouponGroup_Fragment } from "@sb/graphql-client/PlayerUI";
import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";
import { couponGroupsFetchedHandler, type IStateCoupon } from "./Reducers/Handlers/CouponGroupsFetchedHandler";

interface IWithCoupon {
  coupon: IStateCoupon;
}

let preloadCouponGroups: TSportsbook_CouponGroup_Fragment[] = [];

// TODO - Add types for PRELOADED STATE
// @ts-ignore
if (!IS_SERVER && window.__PRELOADED_STATE__?.coupons) {
  // Grab the state from a global variable injected into the server-generated HTML
  // @ts-ignore
  preloadCouponGroups = window.__PRELOADED_STATE__.coupons;

  // Allow the passed state to be garbage-collected
  // @ts-ignore
  delete window.__PRELOADED_STATE__.coupons;
}

const couponState: IWithCoupon = {
  coupon: couponGroupsFetchedHandler(
    {
      player: {
        startEdit: false,
        startTooltip: false,
        finaliseTooltip: false,
        readyToSave: false,
        saving: false,
        skipCouponCreateTip: getLocalStorage(localStorageKeys.skipCouponCreateTip) || false,
      },
      expanded: true,
      coupons: {},
      groups: [],
    },
    preloadCouponGroups,
  ),
};

export {
  couponState,
  type IWithCoupon,
};
