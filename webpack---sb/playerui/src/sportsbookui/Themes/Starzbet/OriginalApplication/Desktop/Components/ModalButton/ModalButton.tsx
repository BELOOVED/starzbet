// @ts-nocheck
import clsx from "clsx";
import classes from "./ModalButton.module.css";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

const ModalButton = ({
  children,
  fit,
  large,
  onClick,
  className,
  disabled,
}) => (
  <button className={clsx(classes.button, className, large && classes.large, fit && classes.fit)} onClick={onClick} disabled={disabled}>
    <Ellipsis>
      {children}
    </Ellipsis>
  </button>
);
ModalButton.displayName = "ModalButton";

export { ModalButton };
