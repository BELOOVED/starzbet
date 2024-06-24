import { type IWithPragmaticDgaState } from "../PragmaticDgaInitialState";

const closedDgaGameReducer = (state: IWithPragmaticDgaState) => ({
  ...state,
  dgaGameCount: state.dgaGameCount - 1,
});

export { closedDgaGameReducer };
