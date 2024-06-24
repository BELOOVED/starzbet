import type { TCallResponsePayload } from "@sb/sdk";
import type { call_RegisterPlayerCommand, call_RegisterPrivatePlayerCommand } from "@sb/sdk/SDKClient/platformplayer";
import { type TExplicitAny } from "@sb/utils";

const removedTokenAction = () => ({
  type: "@TOKEN/REMOVED",
});

const loginLockForTimeAction = (time: number | null) => ({
  type: "@LOGIN/LOCK_FOR_TIME",
  payload: { time },
});

const authInfoModalOpenAction = () => ({
  type: "@AUTH/INFO_MODAL_OPEN",
});

const authInfoModalCloseAction = () => ({
  type: "@AUTH/INFO_MODAL_CLOSE",
});

const registerSuccessAction =
  (response: TCallResponsePayload<typeof call_RegisterPlayerCommand | typeof call_RegisterPrivatePlayerCommand>) => ({
    type: "@REGISTER/SUCCESS",
    payload: { response },
  });

const authNavigationDataSetAction = (data: TExplicitAny) => ({
  type: "@AUTH/SET_AUTH_NAVIGATION",
  payload: { data },
});

export {
  removedTokenAction,
  loginLockForTimeAction,
  authInfoModalOpenAction,
  authInfoModalCloseAction,
  registerSuccessAction,
  authNavigationDataSetAction,
};
