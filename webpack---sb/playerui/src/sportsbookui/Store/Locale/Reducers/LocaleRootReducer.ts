import { createRootReducer } from "@sb/utils";
import { localeChangeAction, publicLocaleChangeAction } from "../../../../common/Actions";
import { localeChangeReducer } from "./LocaleChangeReducer";
import { publicLocaleChangeReducer } from "./PublicLocaleChangeReducer";

const localeRootReducer = createRootReducer([
  [localeChangeReducer, localeChangeAction],
  [publicLocaleChangeReducer, publicLocaleChangeAction],
]);

export { localeRootReducer };
