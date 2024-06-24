import { memo } from "react";
import { useSelector } from "react-redux";
import { type ECurrencyCode, Money } from "@sb/utils";
import { playerCurrencySelector } from "../../Store/Player/Selectors/PlayerCurrencySelector";
import { type INumericInputProps, NumericInput } from "./NumericInput";

type TCurrencyInputProps = Omit<INumericInputProps, "precision" | "placeholder">

interface IRequireCurrencyInputProps extends TCurrencyInputProps {
  currency: ECurrencyCode;
}

const RequireCurrencyInput = memo<IRequireCurrencyInputProps>(({
  currency,
  className,
  onChange,
  value,
  defaultValue,
  qaAttribute,
  name,
  disabled,
  id,
  max,
}) => {
  const precision = Money.getPrecision(currency);

  const placeholder = Money.toUnit(Money.getZero(currency));

  return (
    <NumericInput
      defaultValue={defaultValue}
      name={name}
      id={id}
      max={max}
      qaAttribute={qaAttribute}
      value={value}
      precision={precision}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
});
RequireCurrencyInput.displayName = "RequireCurrencyInput";

const CurrencyInput = memo<TCurrencyInputProps>(({
  onChange,
  value,
  className,
  disabled,
  qaAttribute,
  defaultValue,
  max,
  name,
  id,
}) => {
  const currency = useSelector(playerCurrencySelector);

  return (
    <RequireCurrencyInput
      currency={currency}
      qaAttribute={qaAttribute}
      value={value}
      className={className}
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
      max={max}
      name={name}
      id={id}
    />
  );
});
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput, RequireCurrencyInput };
