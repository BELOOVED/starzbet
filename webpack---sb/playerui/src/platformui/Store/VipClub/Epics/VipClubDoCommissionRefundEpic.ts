import { catchError, switchMap } from "rxjs/operators";
import { concat, EMPTY, of } from "rxjs";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubCommissionRefundAction, vipClubPlayerStateReceivedAction } from "../VipClubActions";
import {
  vipClubRefundDisabledSelector,
  vipClubRefundValueStringSelector,
} from "../Selectors/VipClubCommissionRefundSelectors";
import { vipClubLoadPlayerStateEpic } from "./VipClubLoadEpics";

const vipClubDoCommissionRefundEpic: TMixAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(vipClubCommissionRefundAction),
  switchMap(() => {
    const refundDisabled = vipClubRefundDisabledSelector(state$.value);

    if (refundDisabled) {
      const {
        availablePoints,
        cashbackPerPoints,
        currency,
        refundValue: { beforeDot, afterDotInPrecision, afterDotOverPrecision },
      } = vipClubRefundValueStringSelector(state$.value);

      Logger.error.app(
        "vipClubDoCommissionRefundEpic",
        `Player with ${availablePoints} available points and ${cashbackPerPoints} cashback per points tries to do refund.
         Player sees: ${beforeDot}.${afterDotInPrecision}${afterDotOverPrecision} ${currency}`,
      );

      return EMPTY;
    }

    return concat(
      of(callManagerStartAction(VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL)),
      callWithAbort(dependencies.platformHttpApi.callCashbackPoints, {}).pipe(
        switchMap(() => vipClubLoadPlayerStateEpic(action$, state$, dependencies).pipe(
          isCreator(vipClubPlayerStateReceivedAction),
          switchMap((action) => concat(
            of(vipClubPlayerStateReceivedAction(action.payload)),
            of(callManagerSucceededAction(VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL)),
          )),
        )),
        catchError((error) => {
          Logger.warn.epic("Epic \"vipClubCommissionRefundEpic\" failed", error);

          return of(callManagerFailedAction(VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL, error));
        }),
      ),
    );
  }),
);

export { vipClubDoCommissionRefundEpic };
