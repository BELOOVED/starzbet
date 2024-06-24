import { type ObservableInput, of, switchMap } from "rxjs";
import { call_FindAllCouponGroupsCommand } from "@sb/sdk/SDKClient/coupon";
import { type ICouponGroupDto } from "@sb/sdk/sportsbook/coupon/api/dto/CouponGroupDto";
import { fromCallFactory, handleError } from "@sb/adminui-utils";
import { cmsui_block_error_loadBonuses } from "@sb/translates/cmsui/Keys";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getRpcClient } from "../../EpicUtils/EpicUtils";
import { couponsListFetchedAction } from "../CMSActions";

interface IObservableInput {
  type: string;
  payload: {
    coupons: ICouponGroupDto[];
  };
}

const loadCouponsEpic: TCmsAppEpic = (_, __, deps) =>
  fromCallFactory(
    getRpcClient(deps),
  )(
    call_FindAllCouponGroupsCommand,
  )({}, deps, deps.metadata).pipe(
    switchMap<ICouponGroupDto[], ObservableInput<IObservableInput>>((data) => of(couponsListFetchedAction(data))),
    handleError([cmsui_block_error_loadBonuses]),
  );

export { loadCouponsEpic };
