import { createSimpleSelector } from "@sb/utils";
import { gainThemeContext } from "../../Utils/ThemeContext";
import { ETheme, type IWithThemeState } from "./ThemeState";

const themeSelector = ({ theme }: IWithThemeState) => {
  const defaultTheme = gainThemeContext().static.find("defaultThemeMode") || ETheme.dark;

  return theme ?? defaultTheme;
};

const isLightModeSelector = createSimpleSelector(
  [themeSelector],
  (theme) => theme === "light",
);

export { themeSelector, isLightModeSelector };
