import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { modalCloseAction } from "../ModalActions";
import { type EModal } from "../Model/EModal";

const useModalCloseAction = (type: EModal) => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(modalCloseAction(type)), [type]);
};

export { useModalCloseAction };
