import { isNil } from "@sb/utils";

const authValueConverter = (val: string | null | undefined) => isNil(val) ? "" : val;

export { authValueConverter };
