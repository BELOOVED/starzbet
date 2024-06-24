import type { TPlatform_SelfProtectionBag_Fragment } from "@sb/graphql-client/PlayerUI";

const selfProtectionReceivedAction = (bags: TPlatform_SelfProtectionBag_Fragment[]) => ({
  type: "@SELF_PROTECTION/RECEIVED",
  payload: { bags },
});

const setRealityChecksTimerAction = () => ({
  type: "@SELF_PROTECTION/SET_REALITY_CHECKS_TIMER",
});

const realityChecksTimeExpiredAction = () => ({
  type: "@SELF_PROTECTION/REALITY_CHECKS_TIME_EXPIRED",
});

export { selfProtectionReceivedAction, setRealityChecksTimerAction, realityChecksTimeExpiredAction };
