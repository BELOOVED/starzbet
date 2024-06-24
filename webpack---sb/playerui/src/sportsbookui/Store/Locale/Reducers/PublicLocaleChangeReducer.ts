import type { TReducer } from "@sb/utils";
import { type publicLocaleChangeAction } from "../../../../common/Actions";
import type { IWithLocaleState } from "../LocaleState";

const publicLocaleChangeReducer: TReducer<IWithLocaleState, typeof publicLocaleChangeAction> = (state, { payload: { locale } }) => ({
  ...state,
  publicLocale: locale,
});

export { publicLocaleChangeReducer };
