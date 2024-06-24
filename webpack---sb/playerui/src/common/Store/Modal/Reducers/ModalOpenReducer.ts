import { type TExplicitAny, type TReducer } from "@sb/utils";
import { type IWithModalState } from "../ModalState";
import { type modalOpenAction } from "../ModalActions";
import { defaultAuthData, EModal } from "../Model/EModal";

const openModalReducerHandler = <S extends IWithModalState>(state: S, type: EModal, data: TExplicitAny, keepPreviousOpen: boolean) => {
  if (state.skippedModals.includes(type)) {
    return state;
  }

  // Auth Open Modal resolver - to open login modal by default without passing data
  const modalData = type === EModal.auth && !data ? defaultAuthData : data;

  return ({
    ...state,
    modal: keepPreviousOpen ? { ...state.modal, [type]: modalData } : { [type]: modalData },
  });
};

const modalOpenReducer: TReducer<IWithModalState, typeof modalOpenAction> = (state, { payload }) =>
  openModalReducerHandler(state, payload.type, payload.data, payload.keepPreviousOpen);

export { modalOpenReducer, openModalReducerHandler };
