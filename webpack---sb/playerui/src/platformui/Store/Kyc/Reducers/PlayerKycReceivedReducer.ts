import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type playerKycReceivedAction } from "../KycActions";
import { playerKycReceivedHandler } from "./Handlers/PlayerKycReceivedHandler";

const playerKycReceivedReducer: TReducer<
  TPlatformAppState, typeof playerKycReceivedAction
> = (state, { payload }) => playerKycReceivedHandler(
  state,
  payload,
);

export { playerKycReceivedReducer };
