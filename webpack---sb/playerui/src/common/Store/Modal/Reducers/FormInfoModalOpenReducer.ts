import { type TReducer } from "@sb/utils";
import { type IWithModalState } from "../ModalState";
import { type formInfoModalOpenAction } from "../ModalActions";

const formInfoModalOpenReducer: TReducer<IWithModalState, typeof formInfoModalOpenAction> = (
  state,
) => ({
  ...state,
  isFormModalOpen: true,
});

export { formInfoModalOpenReducer };
