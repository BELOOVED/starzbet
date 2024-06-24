import { type TReducer } from "@sb/utils";
import { type localeChangeAction } from "../../../../common/Actions";
import { type IWithLocaleState } from "../LocaleState";

const localeChangeReducer: TReducer<IWithLocaleState, typeof localeChangeAction> = (state, { payload: { locale } }) => ({
  ...state,
  locale,
});

export { localeChangeReducer };
