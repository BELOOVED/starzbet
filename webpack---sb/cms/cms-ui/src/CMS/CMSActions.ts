import { type ICouponGroupDto } from "@sb/sdk/sportsbook/coupon/api/dto/CouponGroupDto";
import { cmsActionType } from "./Model/CMSActionType";
const couponListFetchedActionType = "@CMS/COUPONS_LIST_FETCHED";

const changeCurrentFormAction = (formName: string) => ({
  type: cmsActionType("CHANGE_CURRENT_FORM_NAME"),
  payload: { formName },
});

const couponsListFetchedAction = (coupons: ICouponGroupDto[]) => ({
  type: couponListFetchedActionType,
  payload: {
    coupons,
  },
});

export {
  couponsListFetchedAction,
  changeCurrentFormAction,
};
