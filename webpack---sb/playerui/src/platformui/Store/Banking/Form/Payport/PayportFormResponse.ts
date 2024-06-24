import { type TCallResponsePayload } from "@sb/sdk";
import { type call_PayPortGetAvailablePaymentMethodsQuery } from "@sb/sdk/SDKClient/paymentintegration";
import { isArray, isObject } from "@sb/utils";
import { DepositFormResponseError } from "../../Utils/DepositFormResponseError";

type TPayportFormResponse = TCallResponsePayload<typeof call_PayPortGetAvailablePaymentMethodsQuery>;

const isPayportFormResponse = (response: unknown): response is TPayportFormResponse => isArray(response) &&
  response.every(
    (it) =>
      isObject(it) &&
    "adId" in it &&
    "bankName" in it &&
    "paymentSystemType" in it,
  );

function assertsPayportFormResponse(response: unknown, context: string): asserts response is TPayportFormResponse {
  if (!isPayportFormResponse(response)) {
    throw new DepositFormResponseError(response, `${context} => assertsPayportFormResponse`);
  }
}

export { assertsPayportFormResponse };
