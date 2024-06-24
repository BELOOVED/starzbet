import { type TReducer } from "@sb/utils";
import { type localeChangeAction } from "../../../../common/Actions";
import { type ILocaleState } from "../LocaleState";

const localeChangeReducer: TReducer<ILocaleState, typeof localeChangeAction> = (
  state,
  { payload: { locale } },
) => ({
  ...state,
  locale,
});

export { localeChangeReducer };
