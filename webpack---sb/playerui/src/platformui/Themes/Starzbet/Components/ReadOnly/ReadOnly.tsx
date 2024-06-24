// @ts-nocheck
import clsx from "clsx";
import { createRef, memo, type ReactNode, useEffect } from "react";
import { useTranslation } from "@sb/translator";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./ReadOnly.module.css";

interface IReadOnlyProps extends IWithQaAttribute {
  value: string;
  placeholder: string;
  inputClassName?: string;
  className?: string;
  hint?: ReactNode;
  isDisabled?: boolean;
  isWarning?: boolean;
  removePadding?: boolean;
}

const ReadOnly = memo<IReadOnlyProps>(({
  value,
  placeholder,
  inputClassName = "",
  className = "",
  qaAttribute,
  containerQaAttribute,
  isDisabled,
  isWarning,
  hint,
  removePadding = false,
}) => {
  const [t] = useTranslation();

  const ref = createRef();

  useEffect(
    () => {
      if (value) {
        ref.current.value = value;
      }
    },
    [value],
  );

  const containerClass = clsx(
    classes.inputContainer,
    className,
    isDisabled && classes.inputContainerDisabled,
    removePadding && classes.removePadding,
    isWarning && classes.inputContainerWarning,
  );

  return (
    <div className={containerClass} {...qaAttr(containerQaAttribute)}>
      <div className={classes.placeholder}>
        {t(placeholder)}
      </div>

      <div className={classes.container}>
        <input
          type={"text"}
          defaultValue={value ?? "-"}
          readOnly
          ref={ref}
          className={inputClassName}
          {...qaAttr(qaAttribute)}
        />

        {hint}
      </div>
    </div>
  );
});
ReadOnly.displayName = "ReadOnly";

export { ReadOnly };
