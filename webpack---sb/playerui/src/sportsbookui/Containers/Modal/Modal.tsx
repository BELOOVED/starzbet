// @ts-nocheck
import { useSelector } from "react-redux";
import { Fragment, memo, type ReactNode, useCallback } from "react";
import { modalSelector } from "../../../common/Store/Modal/Selectors/ModalSelectors";

interface IModalProps {
  modalMap: Record<string, ReactNode>;
}

const Modal = memo<IModalProps>(({ modalMap }) => {
  const modal = useSelector(modalSelector);

  const renderModal = useCallback(
    (kind: any) => (
      <Fragment key={kind}>
        {modalMap[kind]}
      </Fragment>
    ),
    [modalMap],
  );

  return (
    Object.keys(modal).map(renderModal)
  );
});
Modal.displayName = "Modal";

export { Modal };
