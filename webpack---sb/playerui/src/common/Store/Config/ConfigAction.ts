import type { TPlatform_Config_Fragment } from "@sb/graphql-client/PlayerUI";
import { type ECurrencyCode } from "@sb/utils";

const configReceivedAction = (config: TPlatform_Config_Fragment) => ({
  type: "@CONFIG/RECEIVED",
  payload: { config },
});

const setSystemCurrencyAction = (systemCurrency: ECurrencyCode) => ({
  type: "@CONFIG/SET_SYSTEM_CURRENCY",
  payload: { systemCurrency },
});

export { configReceivedAction, setSystemCurrencyAction };
