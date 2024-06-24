import { useCallback, useReducer } from "react";
import { not, type TExplicitAny, type TVoidFn, useAction } from "@sb/utils";
import { type EModal } from "../Model/EModal";
import { modalCloseAction } from "../ModalActions";

const useSkipModal = (type: EModal, data?: TExplicitAny, onClose?: TVoidFn) => {
  const [skip, toggleSkip] = useReducer(not<boolean>, false);

  const closeModal = useAction(modalCloseAction);

  const closeHandler = useCallback(
    () => {
      closeModal(type, data, skip);
      onClose?.();
    },
    [type, data, skip, onClose],
  );

  return [skip, toggleSkip, closeHandler] as const;
};

export { useSkipModal };
