import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type selfProtectionReceivedAction } from "../SelfProtectionActions";
import { selfProtectionReceivedHandler } from "./Handlers/SelfProtectionReceivedHandler";

const selfProtectionReceivedReducer: TReducer<
  TPlatformAppState,
  typeof selfProtectionReceivedAction
> = (state, { payload: { bags } }) => selfProtectionReceivedHandler(
  state,
  bags,
);

export { selfProtectionReceivedReducer };
