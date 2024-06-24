// @ts-nocheck
import { type ComponentType, createElement, memo, useState } from "react";
import { type FormRenderProps } from "react-final-form";
import { type TAnyObject, type TVoidFn } from "@sb/utils";
import classes from "./OverlayModal.module.css";

interface IOverlayModalProps extends TAnyObject {
  component: ComponentType;
  onClose?: TVoidFn;
  form?: FormRenderProps["form"];
}

const OverlayModal = memo<IOverlayModalProps>(({
  component,
  form,
  onClose,
  ...rest
}) => {
  const [modal, setModal] = useState(true);

  const handleClick = () => {
    setModal((flag) => !flag);
    if (form) {
      setTimeout(form.reset);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {
        modal && (
          <div className={classes.modalContainer}>
            <div className={classes.overlay} onClick={handleClick}>
              {createElement(component, { handleClick, form, ...rest })}
            </div>
          </div>
        )
      }
    </>
  );
});
OverlayModal.displayName = "OverlayModal";

export { OverlayModal };
