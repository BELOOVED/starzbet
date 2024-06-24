import { type IWithDebugModeState } from "../DebugModeState";
import { type debugModeToggleAction } from "../DebugModeActions";

const debugModeToggleReducer = (state: IWithDebugModeState, { payload: { debugMode } }: ReturnType<typeof debugModeToggleAction>) => ({
  ...state,
  debugMode: {
    ...state.debugMode,
    [debugMode]: !state.debugMode[debugMode],
  },
});

export { debugModeToggleReducer };
