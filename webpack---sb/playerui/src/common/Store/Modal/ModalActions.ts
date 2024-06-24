import { type TExplicitAny } from "@sb/utils";
import { type EAuthModal, type EModal } from "./Model/EModal";

const modalOpenAction = (type: EModal, data: TExplicitAny = null, keepPreviousOpen = false) => ({
  type: "@MODAL/OPEN",
  payload: {
    type,
    data,
    keepPreviousOpen,
  },
});

const modalCloseAction = (type: EModal, data?: TExplicitAny, skip = false) => ({
  type: "@MODAL/ClOSE",
  payload: { type, data, skip },
});

const setAuthModalTypeAction = (type: EAuthModal) => ({
  type: "@MODAL/SET_AUTH_TYPE",
  payload: { type },
});

const formInfoModalOpenAction = () => ({
  type: "@MODAL/FORM_INFO_MODAL_OPEN",
});

const formInfoModalCloseAction = () => ({
  type: "@MODAL/FORM_INFO_MODAL_CLOSE",
});

export {
  modalOpenAction,
  modalCloseAction,
  setAuthModalTypeAction,
  formInfoModalCloseAction,
  formInfoModalOpenAction,
};
