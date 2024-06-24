import { numberToComma } from "@sb/utils";
import { getNumericValue } from "../../../Utils/GetNumericValue";
import { type TNumericInputValue } from "../TNumericInputValue";

//when user is typing, and we don't want to interrupt them
const formatNumericInputValueDynamic = (value: TNumericInputValue, precision = 2) => {
  if (!value) {
    return "";
  }

  const numericValue = getNumericValue(value);

  if (!numericValue.includes(".")) {
    return numberToComma(Number(numericValue));
  }

  const parts = numericValue.split(".");

  const integerPart = numberToComma(Number(parts[0]));
  const decimalPart = parts[1] ? `.${parts[1].substring(0, precision)}` : ".";

  return integerPart + decimalPart;
};

const formatNumericInputValueStatic = (value: TNumericInputValue, precision = 2) => {
  if (!value) {
    return "";
  }

  const numericValue = getNumericValue(value);

  return numberToComma(Number(numericValue), precision);
};

export { formatNumericInputValueDynamic, formatNumericInputValueStatic };
