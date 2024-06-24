import clsx from "clsx";
import { memo } from "react";
import { type TVoidFn } from "@sb/utils";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./EyeComponent.module.css";
import { EyeIcon } from "../Icons/EyeIcon/EyeIcon";

interface IEyeComponent extends IWithQaAttribute {
  onClick: TVoidFn;
  hidden: boolean;
  eyeClasses?: string;
  eyeWrapperClasses?: string;
}

const EyeComponent = memo<IEyeComponent>(({
  onClick,
  hidden,
  eyeClasses,
  eyeWrapperClasses,
  qaAttribute,
}) => (
  <div onClick={onClick} className={clsx(classes.eyeWrapper, eyeWrapperClasses)} {...qaAttr(qaAttribute)}>
    <EyeIcon
      className={clsx(classes.eye, eyeClasses)}
      color={hidden ? "brand" : "darkText"}
      open={!hidden}
    />
  </div>
));
EyeComponent.displayName = "EyeComponent";

export { EyeComponent };
