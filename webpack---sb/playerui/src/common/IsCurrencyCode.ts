import { ECurrencyCode } from "@sb/utils";

const isCurrencyCode = (code: unknown): code is ECurrencyCode => (
  typeof code === "string" && Object.values(ECurrencyCode).includes(code as ECurrencyCode)
);

export { isCurrencyCode };
