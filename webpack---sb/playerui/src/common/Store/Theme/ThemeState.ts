import { getLocalStorage, localStorageKeys } from "../LocalStorage/localStorageKeys";

enum ETheme {
  light = "light",
  dark = "dark",
}

interface IWithThemeState {
  theme: ETheme | null;
}

const themeState = {
  theme: getLocalStorage(localStorageKeys.theme) || null,
};

export { themeState, type IWithThemeState, ETheme };
