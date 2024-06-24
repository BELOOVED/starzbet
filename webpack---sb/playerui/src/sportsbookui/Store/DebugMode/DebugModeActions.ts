import { type EDebugMode } from "./Model/EDebugMode";

const debugModeToggleAction = (debugMode: EDebugMode) => ({
  type: "@DEBUG_MODE/TOGGLE",
  payload: {
    debugMode,
  },
});

export { debugModeToggleAction };
