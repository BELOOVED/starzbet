import { merge, of, switchMap } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { callManagerFailedAction, callManagerRemoveSymbolAction, callManagerStartAction } from "@sb/call-manager";
import { type TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { claimBonusByPromoCodeAction } from "../BonusesActions";
import { CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL } from "../BonusVariables";

const claimBonusByPromoCodeEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(claimBonusByPromoCodeAction),
  filter(({ payload: { promoCode } }) => promoCode.length > 0),
  switchMap(({ payload: { promoCode } }) => merge(
    of(callManagerStartAction(CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL)),
    callWithAbort(deps.platformHttpApi.callClaimBonusByPromotionCode, promoCode).pipe(
      map(() => callManagerRemoveSymbolAction(CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL)),
      catchError((error) => {
        Logger.warn.epic("[handleClaimBonusByPromoCodeEpic] callClaimBonusByPromotionCode failed", error);

        return of(callManagerFailedAction(CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL, error));
      }),
    ),
  )),
);

export { claimBonusByPromoCodeEpic };
