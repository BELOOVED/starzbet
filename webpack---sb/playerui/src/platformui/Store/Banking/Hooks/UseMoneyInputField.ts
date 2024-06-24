import {
  type ChangeEventHandler,
  type CSSProperties,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { type IMoney, isVoid, Money, type TNullable } from "@sb/utils";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";

const INPUT_VALUE_SEPARATOR = ".";
const EXCLUDED_INPUT_KEYS = ["+", "-", "e"];

const useMoneyInputField = (
  onChange: (value: IMoney) => void,
  value: TNullable<IMoney>,
): DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> => {
  const currency = useSelector(playerCurrencySelector);
  const [inputValue, setInputValue] = useState(value ? Money.toUnit(value) : "");

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { target: { value: nextValue } } = event;

    const precision = Money.getPrecision(currency);
    const [int, decimal] = nextValue.split(INPUT_VALUE_SEPARATOR);

    const limitPrecision = decimal && decimal.length > precision;

    if (limitPrecision) {
      return;
    }

    const matchZero = int?.match(/0[0-9]+/);

    const invalid = matchZero && matchZero.index === 0 && !nextValue.includes(INPUT_VALUE_SEPARATOR);

    if (invalid) {
      return;
    }

    setInputValue(nextValue);
    onChange(Money.parseOrZero(nextValue, currency));
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (
      (isVoid(inputValue) && event.key === ".") ||
      EXCLUDED_INPUT_KEYS.includes(event.key.toLowerCase())
    ) {
      event.preventDefault();
    }
  };

  const style = useMemo<CSSProperties | undefined>(
    () => {
      if (!inputValue) {
        return undefined;
      }

      return {
        width: `${inputValue.length + 1}ch`,
      };
    },
    [inputValue],
  );

  useEffect(
    () => {
      // handler value, changed from outside input
      if (value && !Money.equalsTo(Money.parseOrZero(inputValue, currency), value)) {
        setInputValue(Money.toUnit(value));
      }

      // reset input value
      if (!value && inputValue) {
        setInputValue("");
      }
    },
    [value],
  );

  return {
    type: "number",
    autoComplete: "off",
    value: inputValue,
    onChange: inputHandler,
    onKeyDown: onKeyDown,
    inputMode: "decimal",
    style,
  };
};

export { useMoneyInputField };
