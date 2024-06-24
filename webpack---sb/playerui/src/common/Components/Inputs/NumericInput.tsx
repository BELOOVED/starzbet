import {
  type ChangeEventHandler,
  type ComponentPropsWithRef,
  type FocusEventHandler,
  type InputHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { isNotNil } from "@sb/utils";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import { ResetedInput } from "../../../sportsbookui/Components/ResetedInput/ResetedInput";
import { getNumericValue } from "../../Utils/GetNumericValue";
import { formatNumericInputValueDynamic, formatNumericInputValueStatic } from "./Utils/FormatNumericInputValue";
import { type TNumericInputValue } from "./TNumericInputValue";

type TNativeInputProps = Pick<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "className" | "placeholder" | "disabled">;

type TNumericInputOnChange = (numericStringValue: string, valueAsNumber: number, formattedValue?: string) => void;

interface INumericInputProps extends TNativeInputProps, IWithQaAttribute {
  value?: TNumericInputValue;
  precision?: number;
  max?: number;
  onChange: TNumericInputOnChange;
  defaultValue?: string | number;
}

const NumericInput = memo<INumericInputProps>(
  ({
    id,
    name,
    className,
    disabled = false,
    value: valueFromProps,
    placeholder,
    precision,
    max = Number.MAX_SAFE_INTEGER,
    onChange,
    defaultValue,
    qaAttribute,
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const cursorPosition = useRef<number | null>(0);

    const [displayValue, setDisplayValue] = useState(() => {
      if (isNotNil(defaultValue)) {
        formatNumericInputValueStatic(defaultValue, precision);
      }
      if (isNotNil(valueFromProps)) {
        formatNumericInputValueStatic(valueFromProps, precision);
      }

      return "";
    });

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        const { value, selectionStart } = event.target;

        const numericStringValue = getNumericValue(value);

        const valueAsNumber = parseFloat(numericStringValue);

        if (max && valueAsNumber > max) {
          return;
        }

        const formattedValue = formatNumericInputValueDynamic(value, precision);

        cursorPosition.current = Math.max((selectionStart ?? 0) + (formattedValue.length - value.length), 0);

        setDisplayValue(formattedValue);

        onChange(numericStringValue, valueAsNumber, formattedValue);
      },
      [onChange],
    );

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        const { value } = event.target;

        setDisplayValue(formatNumericInputValueStatic(value, precision));
      },
      [],
    );

    useEffect(
      () => {
        inputRef.current?.setSelectionRange(cursorPosition.current, cursorPosition.current);
      },
      [displayValue],
    );

    useEffect(
      () => {
        const formatedValueFromProps = formatNumericInputValueStatic(valueFromProps);
        const formatedDisplayValue = formatNumericInputValueStatic(displayValue);

        if (formatedDisplayValue !== formatedValueFromProps) {
          setDisplayValue(formatedValueFromProps);
        }
      },
      [valueFromProps],
    );

    const inputProps: ComponentPropsWithRef<"input"> = {
      type: "text",
      inputMode: "decimal",
      pattern: "[0-9]*",
      id,
      name,
      className,
      onChange: handleChange,
      onBlur: handleBlur,
      placeholder,
      disabled,
      ref: inputRef,
      value: displayValue,
    };

    return <ResetedInput {...inputProps} {...qaAttr(qaAttribute)} />;
  },
);
NumericInput.displayName = "NumericInput";

export { NumericInput };
export type { INumericInputProps, TNumericInputOnChange };
