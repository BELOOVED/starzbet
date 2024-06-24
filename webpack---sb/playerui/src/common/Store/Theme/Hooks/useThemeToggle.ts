import { useSelector } from "react-redux";
import { type TVoidFn, useAction } from "@sb/utils";
import { setThemeAction } from "../ThemeActions";
import { themeSelector } from "../ThemeSelectors";
import { ETheme } from "../ThemeState";

type TThemeToggleHook = (defaultTheme?: ETheme) => [ETheme, TVoidFn];

const useThemeToggle: TThemeToggleHook = () => {
  const setTheme = useAction(setThemeAction);

  const theme = useSelector(themeSelector);

  const nextTheme = theme === ETheme.dark ? ETheme.light : ETheme.dark;

  const toggleTheme = () => setTheme(nextTheme);

  return [theme, toggleTheme];
};

export { useThemeToggle };
