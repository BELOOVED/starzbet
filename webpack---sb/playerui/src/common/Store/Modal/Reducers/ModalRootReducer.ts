import { createRootReducer } from "@sb/utils";
import {
  formInfoModalCloseAction,
  formInfoModalOpenAction,
  modalCloseAction,
  modalOpenAction,
  setAuthModalTypeAction,
} from "../ModalActions";
import { modalOpenReducer } from "./ModalOpenReducer";
import { modalCloseReducer } from "./ModalCloseReducer";
import { setAuthModalTypeReducer } from "./SetAuthModalTypeReducer";
import { formInfoModalOpenReducer } from "./FormInfoModalOpenReducer";
import { formInfoModalCloseReducer } from "./FormInfoModalCloseReducer";

const modalRootReducer = createRootReducer([
  [modalOpenReducer, modalOpenAction],
  [modalCloseReducer, modalCloseAction],
  [setAuthModalTypeReducer, setAuthModalTypeAction],
  [formInfoModalOpenReducer, formInfoModalOpenAction],
  [formInfoModalCloseReducer, formInfoModalCloseAction],
]);

export { modalRootReducer };
