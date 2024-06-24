import { createRootReducer } from "@sb/utils";
import { debugModeToggleAction } from "../DebugModeActions";
import { debugModeToggleReducer } from "./DebugModeToggleReducer";

const debugModeRootReducer = createRootReducer([
  [debugModeToggleReducer, debugModeToggleAction],
]);

export { debugModeRootReducer };
