import clsx from "clsx";
import { createElement, memo } from "react";
import { qaAttr } from "@sb/qa-attributes";
import classes from "./Input.module.css";
import { type IInputBaseProps } from "../../../../Components/Field/TextFieldCreator";
import { dataItemAttr, EDataItemAttr } from "../../../../DataItemAttr";

const Input = memo<IInputBaseProps>(({
  className,
  status,
  qaAttribute,
  postfix,
  prefix,
  ...rest
}) => {
  const inputClass = clsx(
    classes.input,
    status === "error" && classes.incorrect,
    prefix && classes.withPrefix,
    postfix && classes.withPostfix,
    className,
  );

  return (
    <div className={classes.container}>
      {prefix ? <div className={classes.prefixWrapper}>{createElement(prefix)}</div> : null}

      <input
        {...dataItemAttr(EDataItemAttr.textInput)}
        className={inputClass}
        {...rest}
        {...qaAttr(qaAttribute)}
      />

      {postfix ? createElement(postfix) : null}
    </div>
  );
});
Input.displayName = "Input";

export {
  Input,
};
