import { type IAuthState } from "../Types/AuthTypes";

const authInitialState: IAuthState = {
  token: undefined,
  showKeepAliveExpired: false,
  awaitLogin: false,
  awaitRecovery: true,
  lastLoginError: undefined,
  startRefresh: false,
  refreshFailed: false,
};

export { authInitialState };
