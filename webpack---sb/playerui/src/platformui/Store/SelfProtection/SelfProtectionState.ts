import type { TPlatform_SelfProtectionBag_Fragment } from "@sb/graphql-client/PlayerUI";

interface ISelfProtectionState {
  bags: TPlatform_SelfProtectionBag_Fragment[];
  realityCheckExpired: boolean;
}

interface IWithSelfProtectionState {
  selfProtection: ISelfProtectionState;
}

const selfProtectionState: IWithSelfProtectionState = {
  selfProtection: {
    bags: [],
    realityCheckExpired: false,
  },
};

export { selfProtectionState, type IWithSelfProtectionState };
