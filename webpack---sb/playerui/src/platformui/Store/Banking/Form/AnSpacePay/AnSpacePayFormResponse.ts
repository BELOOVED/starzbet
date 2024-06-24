import { type TCallResponsePayload } from "@sb/sdk";
import { type call_AnSpacePayMakeDepositCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { isObject } from "@sb/utils";
import { DepositFormResponseError } from "../../Utils/DepositFormResponseError";

type TAnSpacePayFormResponse = TCallResponsePayload<typeof call_AnSpacePayMakeDepositCommand>;

const isAnSpacePayFormResponse = (response: unknown): response is TAnSpacePayFormResponse => isObject(response) &&
  "qrCodeString" in response &&
  "urlQRCode" in response;

function assertsAnSpacePayFormResponse(response: unknown, context: string): asserts response is TAnSpacePayFormResponse {
  if (!isAnSpacePayFormResponse(response)) {
    throw new DepositFormResponseError(response, `${context} => assertsAnSpacePayFormResponse`);
  }
}

export { assertsAnSpacePayFormResponse };
