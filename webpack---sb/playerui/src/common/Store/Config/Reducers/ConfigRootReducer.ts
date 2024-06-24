import { createRootReducer, simpleReducer } from "@sb/utils";
import { configReceivedAction, setSystemCurrencyAction } from "../ConfigAction";
import { configReceivedReducer } from "./ConfigReceivedReducer";

const setSystemCurrencyReducer = simpleReducer(["systemCurrency"], ["config", "systemCurrency"]);

const configRootReducer = createRootReducer([
  [configReceivedReducer, configReceivedAction],
  [setSystemCurrencyReducer, setSystemCurrencyAction],
]);

export { configRootReducer };
