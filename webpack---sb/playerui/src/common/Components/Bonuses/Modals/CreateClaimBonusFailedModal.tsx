import { type ComponentType, memo } from "react";
import { useSelector } from "react-redux";
import { type TVoidFn, useActionWithBind, withCondition } from "@sb/utils";
import type { TFuncWithPlain } from "@sb/translator";
import {
  claimBonusFailedMessageSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BonusCallManagerSelectors";
import { claimBonusFailedModalOpenedSelector } from "../../../Store/Modal/Selectors/ModalSelectors";
import { modalCloseAction } from "../../../Store/Modal/ModalActions";
import { EModal } from "../../../Store/Modal/Model/EModal";

interface IModalProps {
  title?: Readonly<Parameters<TFuncWithPlain>>;
  hideModal: TVoidFn;
}

const createClaimBonusFailedModal = (
  ThemedModalErrorMessage: ComponentType<IModalProps>,
) => withCondition(
  claimBonusFailedModalOpenedSelector,
  memo(() => {
    const errorMessage = useSelector(claimBonusFailedMessageSelector);

    const onClose = useActionWithBind(modalCloseAction, EModal.claimBonusFailed);

    return <ThemedModalErrorMessage hideModal={onClose} title={errorMessage} />;
  }),
);

export { createClaimBonusFailedModal };
