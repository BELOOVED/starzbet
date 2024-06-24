import { createRootReducer } from "@sb/utils";
import { translateFetchedAction } from "../TranslateActions";
import { translateFetchedReducer } from "./TranslateFetchedReducer";

const translateRootReducer = createRootReducer([
  [translateFetchedReducer, translateFetchedAction],
]);

export { translateRootReducer };
