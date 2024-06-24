import { createRootReducer } from "@sb/utils";
import { setThemeAction } from "../ThemeActions";
import { setThemeReducer } from "./SetThemeReducer";

const themeRootReducer = createRootReducer([
  [setThemeReducer, setThemeAction],
]);

export { themeRootReducer };
