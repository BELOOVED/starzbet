import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type platformCPFClearAction } from "../FormActions";

const platformCPFClearReducer: TReducer<TPlatformAppState, typeof platformCPFClearAction> = (
  state,
) => ({
  ...state,
  userData: undefined,
});

export { platformCPFClearReducer };
