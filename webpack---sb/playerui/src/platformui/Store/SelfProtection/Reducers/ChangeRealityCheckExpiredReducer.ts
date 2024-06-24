import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type removedTokenAction } from "../../Auth/AuthActions";
import { type realityChecksTimeExpiredAction, type setRealityChecksTimerAction } from "../SelfProtectionActions";

const changeRealityCheckExpiredReducer = (realityCheckExpired: boolean): TReducer<
  TPlatformAppState,
  typeof setRealityChecksTimerAction |
  typeof removedTokenAction |
  typeof realityChecksTimeExpiredAction
> => (state) => ({
  ...state,
  selfProtection: {
    ...state.selfProtection,
    realityCheckExpired,
  },
});

export { changeRealityCheckExpiredReducer };
