import { type ComponentType, memo } from "react";
import { useSelector } from "react-redux";
import type { TFuncWithPlain } from "@sb/translator";
import { type TVoidFn, useActionWithBind, withCondition } from "@sb/utils";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import {
  claimBonusByPromoCodeErrorMessageSelector,
  claimBonusByPromoCodeFailedSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BonusCallManagerSelectors";
import { CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL } from "../../../../platformui/Store/Bonuses/BonusVariables";

interface IModalProps {
  title?: Readonly<Parameters<TFuncWithPlain>>;
  hideModal: TVoidFn;
}

const createClaimBonusByPromoCodeFailedModal = (
  ThemedModalErrorMessage: ComponentType<IModalProps>,
) => withCondition(
  claimBonusByPromoCodeFailedSelector,
  memo(() => {
    const errorMessage = useSelector(claimBonusByPromoCodeErrorMessageSelector);

    const onClose = useActionWithBind(callManagerRemoveSymbolAction, CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL);

    return <ThemedModalErrorMessage hideModal={onClose} title={errorMessage} />;
  }),
);

export { createClaimBonusByPromoCodeFailedModal };
