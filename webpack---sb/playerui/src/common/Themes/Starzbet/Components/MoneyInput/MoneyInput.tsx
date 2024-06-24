import clsx from "clsx";
import { type HTMLProps, memo, useRef } from "react";
import { ECurrencySymbol, type IMoney, Money } from "@sb/utils";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./MoneyInput.module.css";
import { useMoneyInputField } from "../../../../../platformui/Store/Banking/Hooks/UseMoneyInputField";
import { type TFieldStatus } from "../../../../Components/Field/FieldCreator";

type TInputHTMLProps = Omit<HTMLProps<HTMLInputElement>, "label" | "value" | "onChange">;

interface IMoneyInputProps extends IWithQaAttribute, TInputHTMLProps {
  value: IMoney | undefined;
  onChange: (value: IMoney | undefined) => void;
  status?: TFieldStatus;
}

const MoneyInput = memo<IMoneyInputProps>(({
  value,
  onChange,
  status,
  className,
  qaAttribute,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputField = useMoneyInputField(onChange, value);
  const focusInput = () => inputRef.current?.focus();

  const inputClass = clsx(
    classes.moneyInputContainer,
    status === "error" && classes.incorrect,
    className,
  );

  return (
    <div className={inputClass} onClick={focusInput}>
      {value && !Money.isZero(value) ? <span className={classes.currency}>{ECurrencySymbol[value.currency]}</span> : null}

      <input
        {...inputField}
        {...rest}
        {...qaAttr(qaAttribute)}
        ref={inputRef}
      />
    </div>
  );
});
MoneyInput.displayName = "MoneyInput";

export { MoneyInput };
