import { type ETheme } from "./ThemeState";

const setThemeAction = (theme: ETheme) => ({
  type: "@THEME/SET_THEME",
  payload: { theme },
});

export { setThemeAction };
