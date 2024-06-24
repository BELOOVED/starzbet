import { isNil } from "@sb/utils";
import type { TPhoneValue } from "../Model/TPhoneValue";

const phoneValueToString = (value: TPhoneValue | undefined | null) => {
  if (isNil(value)) {
    return "";
  }

  return value.code.trim() + value.number;
};

export {
  phoneValueToString,
};
