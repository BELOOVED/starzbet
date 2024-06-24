import clsx from "clsx";
import { type ChangeEventHandler, type FC, type PropsWithChildren } from "react";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./Toggle.module.css";

interface IToggleProps extends IWithQaAttribute {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
  sliderClassName?: string;
}

const Toggle: FC<PropsWithChildren<IToggleProps>> = ({
  children,
  checked,
  onChange,
  disabled,
  className,
  sliderClassName,
  qaAttribute,
}) => (
  <label className={clsx(classes.switch, disabled && classes.disabled, className)} {...qaAttr(qaAttribute)}>
    <div className={classes.title}>
      {children}
    </div>

    <input
      type={"checkbox"}
      checked={checked ?? false}
      onChange={onChange}
      disabled={disabled}
      className={classes.input}
    />

    <span className={clsx(classes.slider, sliderClassName)} />
  </label>
);
Toggle.displayName = "Toggle";

export { Toggle };
