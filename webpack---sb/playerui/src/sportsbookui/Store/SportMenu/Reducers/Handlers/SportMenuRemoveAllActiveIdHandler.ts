import { type TAppState } from "../../../InitialState";
import { sportMenuState } from "../../SportMenuState";

const sportMenuRemoveAllActiveIdHandler = (state: TAppState) => ({
  ...state,
  sportMenu: { ...state.sportMenu, active: sportMenuState.sportMenu.active },
});

export { sportMenuRemoveAllActiveIdHandler };
