import { createRootReducer, type TReducer } from "@sb/utils";
import { twoFactorAuthChangeAction } from "../../../common/Store/Player/PlayerActions";
import { type ITwoFactorAuth } from "./TwoFactorAuthInitialState";
import {
  backupCodesReceivedAction,
  finishTwoFactorAuthStepAction,
  secretReceivedAction,
  startTwoFactorAuthStepAction,
} from "./TwoFactorAuthActions";

const secretReceivedReducer: TReducer<ITwoFactorAuth, typeof secretReceivedAction> = (state, { payload }) => ({
  ...state,
  twoFactorAuth: {
    ...state.twoFactorAuth,
    activateData: payload,
  },
});

const backupCodesReceivedReducer: TReducer<ITwoFactorAuth, typeof backupCodesReceivedAction> = (state, { payload }) => ({
  ...state,
  twoFactorAuth: {
    ...state.twoFactorAuth,
    backupCodes: payload,
  },
});

const closeBackupModalReducer: TReducer<ITwoFactorAuth, typeof twoFactorAuthChangeAction> = (state) => ({
  ...state,
  twoFactorAuth: {
    ...state.twoFactorAuth,
    backupCodes: null,
  },
});

const startTwoFactorAuthStepReducer: TReducer<ITwoFactorAuth, typeof startTwoFactorAuthStepAction> = (state, { payload }) => ({
  ...state,
  twoFactorAuth: {
    ...state.twoFactorAuth,
    player: payload,
  },
  isTwoFactorAuthStep: true,
});

const finishTwoFactorAuthStepReducer: TReducer<ITwoFactorAuth, typeof finishTwoFactorAuthStepAction> = (state) => ({
  ...state,
  twoFactorAuth: {
    ...state.twoFactorAuth,
    player: null,
  },
  isTwoFactorAuthStep: false,
});

const twoFactorAuthRootReducer = createRootReducer([
  [secretReceivedReducer, secretReceivedAction],
  [startTwoFactorAuthStepReducer, startTwoFactorAuthStepAction],
  [finishTwoFactorAuthStepReducer, finishTwoFactorAuthStepAction],
  [closeBackupModalReducer, twoFactorAuthChangeAction],
  [backupCodesReceivedReducer, backupCodesReceivedAction],
]);

export { twoFactorAuthRootReducer };
