import { type TReducer } from "@sb/utils";
import { type IWithModalState } from "../ModalState";
import { type setAuthModalTypeAction } from "../ModalActions";
import { EModal } from "../Model/EModal";

const setAuthModalTypeReducer: TReducer<IWithModalState, typeof setAuthModalTypeAction> = (state, { payload: { type } }) => ({
  ...state,
  modal: {
    ...state.modal,
    [EModal.auth]: {
      ...state.modal[EModal.auth],
      authType: type,
    },
  },
});

export { setAuthModalTypeReducer };
