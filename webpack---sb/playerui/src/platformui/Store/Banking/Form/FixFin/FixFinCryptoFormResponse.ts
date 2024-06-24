import { type TCallResponsePayload } from "@sb/sdk";
import { type call_FixFinMakeCryptoDepositCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { isObject } from "@sb/utils";
import { DepositFormResponseError } from "../../Utils/DepositFormResponseError";

type TFixFinCryptoFormResponse = TCallResponsePayload<typeof call_FixFinMakeCryptoDepositCommand>;

const isFixFinCryptoFormResponse = (response: unknown): response is TFixFinCryptoFormResponse => isObject(response) &&
  "address" in response &&
  "amount" in response &&
  "coin" in response &&
  "network" in response;

function assertsFixFinCryptoCallResponse(response: unknown, context: string): asserts response is TFixFinCryptoFormResponse {
  if (!isFixFinCryptoFormResponse(response)) {
    throw new DepositFormResponseError(response, `${context} => assertsFixFinCryptoCallResponse`);
  }
}

export { assertsFixFinCryptoCallResponse };
