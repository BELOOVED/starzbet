import { type TReducer } from "@sb/utils";
import { type IWithLoginLockTime } from "../AuthInitialState";
import { type authInfoModalOpenAction } from "../AuthActions";

const authInfoModalOpenReducer: TReducer<IWithLoginLockTime, typeof authInfoModalOpenAction> = (
  state,
) => ({
  ...state,
  authInfoModal: true,
});

export { authInfoModalOpenReducer };
