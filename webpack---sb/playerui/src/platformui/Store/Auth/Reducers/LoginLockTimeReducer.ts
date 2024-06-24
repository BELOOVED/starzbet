import { type TReducer } from "@sb/utils";
import { type IWithLoginLockTime } from "../AuthInitialState";
import { type loginLockForTimeAction } from "../AuthActions";

const loginLockTimeReducer: TReducer<IWithLoginLockTime, typeof loginLockForTimeAction> = (
  state,
  { payload: { time } },
) => ({
  ...state,
  loginLockTime: time,
});

export { loginLockTimeReducer };
