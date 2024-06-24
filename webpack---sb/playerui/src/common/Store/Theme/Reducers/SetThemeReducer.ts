import { type TReducer } from "@sb/utils";
import { type IWithThemeState } from "../ThemeState";
import { type setThemeAction } from "../ThemeActions";

const setThemeReducer: TReducer<IWithThemeState, typeof setThemeAction> = (state, { payload: { theme } }) => ({
  ...state,
  theme,
});

export { setThemeReducer };
