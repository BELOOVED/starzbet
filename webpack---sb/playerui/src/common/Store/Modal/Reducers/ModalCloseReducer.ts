import { type TExplicitAny, type TReducer } from "@sb/utils";
import { keys } from "@sb/utils/Keys";
import { type IWithModalState } from "../ModalState";
import { type modalCloseAction } from "../ModalActions";
import { type EModal } from "../Model/EModal";

const modalCloseReducer: TReducer<IWithModalState, typeof modalCloseAction> = (state, { payload: { type, skip } }) => {
  const reduceModal = (newState: Partial<Record<EModal, TExplicitAny>>, key: EModal) => (key === type
    ? newState
    : { ...newState, [key]: state.modal[key] });

  return {
    ...state,
    modal: keys(state.modal).reduce(reduceModal, {}),
    skippedModals: skip ? [...state.skippedModals, type] : state.skippedModals,
  };
};

export { modalCloseReducer };
