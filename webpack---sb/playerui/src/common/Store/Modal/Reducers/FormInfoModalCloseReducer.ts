import type { TReducer } from "@sb/utils";
import type { IWithModalState } from "../ModalState";
import type { formInfoModalCloseAction } from "../ModalActions";

const formInfoModalCloseReducer: TReducer<IWithModalState, typeof formInfoModalCloseAction> = (
  state,
) => ({
  ...state,
  isFormModalOpen: false,
});

export { formInfoModalCloseReducer };
