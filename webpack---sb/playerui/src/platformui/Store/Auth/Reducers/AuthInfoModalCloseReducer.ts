import { type TReducer } from "@sb/utils";
import { type IWithLoginLockTime } from "../AuthInitialState";
import { type authInfoModalCloseAction } from "../AuthActions";

const authInfoModalCloseReducer: TReducer<IWithLoginLockTime, typeof authInfoModalCloseAction> = (
  state,
) => ({
  ...state,
  authInfoModal: false,
});

export { authInfoModalCloseReducer };
