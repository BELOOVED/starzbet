import { isString } from "@sb/utils";

const getNumericValue = (value: string | number) => isString(value) ? value.replace(/[^0-9.]/g, "") : value.toString();

export { getNumericValue };
