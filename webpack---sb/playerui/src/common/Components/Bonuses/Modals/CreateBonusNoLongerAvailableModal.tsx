import { type ComponentType, memo } from "react";
import type { TFuncWithPlain } from "@sb/translator";
import { type TVoidFn, useActionWithBind, withCondition } from "@sb/utils";
import { sportsbookui_bonus_error_bonusIsNoLongerAvailable } from "@sb/translates/sportsbookui/CommonTKeys";
import { bonusNoLongerAvailableModalOpenedSelector } from "../../../Store/Modal/Selectors/ModalSelectors";
import { modalCloseAction } from "../../../Store/Modal/ModalActions";
import { EModal } from "../../../Store/Modal/Model/EModal";

interface IModalProps {
  title?: Readonly<Parameters<TFuncWithPlain>>;
  hideModal: TVoidFn;
}

const ERROR_MESSAGE = [sportsbookui_bonus_error_bonusIsNoLongerAvailable] as const;

const createBonusNoLongerAvailableModal = (
  ThemedModalErrorMessage: ComponentType<IModalProps>,
) => withCondition(
  bonusNoLongerAvailableModalOpenedSelector,
  memo(() => {
    const onClose = useActionWithBind(modalCloseAction, EModal.bonusNoLongerAvailable);

    return <ThemedModalErrorMessage hideModal={onClose} title={ERROR_MESSAGE} />;
  }),
);

export { createBonusNoLongerAvailableModal };
