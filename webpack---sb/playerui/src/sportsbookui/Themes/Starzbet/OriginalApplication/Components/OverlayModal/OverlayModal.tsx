// @ts-nocheck
import React, { useState, createElement } from "react";
import classes from "./OverlayModal.module.css";

const OverlayModal = React.memo(({
  component,
  form,
  overlayClick,
  ...rest
}) => {
  const [modal, setModal] = useState(true);

  const handleClick = () => {
    setModal((flag) => !flag);
    if (form) {
      form.reset();
    }
    if (overlayClick) {
      overlayClick();
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

export  { OverlayModal };
