import { type ComponentType, memo } from "react";
import { useSelector } from "react-redux";
import { type TVoidFn, useActionWithBind, withCondition } from "@sb/utils";
import type { TFuncWithPlain } from "@sb/translator";
import {
  activateBonusFailedMessageSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BonusCallManagerSelectors";
import { modalCloseAction } from "../../../Store/Modal/ModalActions";
import { EModal } from "../../../Store/Modal/Model/EModal";
import { activateBonusFailedModalOpenedSelector } from "../../../Store/Modal/Selectors/ModalSelectors";

interface IModalProps {
  title?: Readonly<Parameters<TFuncWithPlain>>;
  hideModal: TVoidFn;
}

const createActivateBonusFailedModal = (
  ThemedModalErrorMessage: ComponentType<IModalProps>,
) => withCondition(
  activateBonusFailedModalOpenedSelector,
  memo(() => {
    const errorMessage = useSelector(activateBonusFailedMessageSelector);

    const onClose = useActionWithBind(modalCloseAction, EModal.activateBonusFailed);

    return <ThemedModalErrorMessage hideModal={onClose} title={errorMessage} />;
  }),
);

export { createActivateBonusFailedModal };
