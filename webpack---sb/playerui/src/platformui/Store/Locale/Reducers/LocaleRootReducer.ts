import { createRootReducer } from "@sb/utils";
import { localeChangeAction } from "../../../../common/Actions";
import { localeChangeReducer } from "./LocaleChangeReducer";

const localeRootReducer = createRootReducer([
  [localeChangeReducer, localeChangeAction],
]);

export { localeRootReducer };
