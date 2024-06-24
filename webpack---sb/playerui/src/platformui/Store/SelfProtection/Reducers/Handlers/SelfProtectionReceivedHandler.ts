import type { TPlatform_SelfProtectionBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPlatformAppState } from "../../../PlatformInitialState";

const selfProtectionReceivedHandler = (
  state: TPlatformAppState,
  bags: TPlatform_SelfProtectionBag_Fragment[],
): TPlatformAppState => ({
  ...state,
  selfProtection: {
    ...state.selfProtection,
    bags,
  },
});

export { selfProtectionReceivedHandler };
