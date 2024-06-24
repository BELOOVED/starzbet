import { type IWithPragmaticDgaState } from "../PragmaticDgaInitialState";

const openedDgaGameReducer = (state: IWithPragmaticDgaState) => ({
  ...state,
  dgaGameCount: state.dgaGameCount + 1,
});

export { openedDgaGameReducer };
