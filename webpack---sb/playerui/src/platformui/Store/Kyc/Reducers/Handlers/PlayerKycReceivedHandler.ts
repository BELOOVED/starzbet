import type { TPlatform_Player_Fragment } from "@sb/graphql-client/PlayerUI";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../../PlatformInitialState";

const playerKycReceivedHandler = (
  state: TPlatformAppState,
  kyc: TPlatform_Player_Fragment["kyc"],
): TPlatformAppState => assocPath(["player", "details", "kyc"], kyc, state);

export { playerKycReceivedHandler };
