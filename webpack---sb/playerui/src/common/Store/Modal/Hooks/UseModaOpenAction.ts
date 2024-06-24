import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { type TExplicitAny } from "@sb/utils";
import { modalOpenAction } from "../ModalActions";
import { type EModal } from "../Model/EModal";

const useModalOpenAction = (type: EModal, data?: TExplicitAny) => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(modalOpenAction(type, data)), [type, data]);
};

export { useModalOpenAction };
