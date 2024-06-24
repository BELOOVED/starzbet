import { type TAppState } from "../../InitialState";
import { sportMenuRemoveAllActiveIdHandler } from "./Handlers/SportMenuRemoveAllActiveIdHandler";

const sportMenuRemoveAllActiveIdReducer = (state: TAppState) => (
  sportMenuRemoveAllActiveIdHandler(state)
);

export { sportMenuRemoveAllActiveIdReducer };
