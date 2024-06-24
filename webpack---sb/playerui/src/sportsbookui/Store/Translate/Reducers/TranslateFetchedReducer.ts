import { type TReducer } from "@sb/utils";
import { type IWithTranslates } from "../TranslateState";
import { type translateFetchedAction } from "../TranslateActions";

const translateFetchedReducer: TReducer<IWithTranslates, typeof translateFetchedAction> = (state, { payload: { translate } }) => ({
  ...state,
  translate,
});

export { translateFetchedReducer };
