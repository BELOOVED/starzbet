import { type TReducer } from "@sb/utils";
import { type authNavigationDataSetAction } from "../AuthActions";
import type { IWithLoginLockTime } from "../AuthInitialState";

const authNavigationDataReducer: TReducer<IWithLoginLockTime, typeof authNavigationDataSetAction> = (
  state,
  { payload: { data } },
) =>
  ({
    ...state,
    authNavigation: data,
  })
;

export { authNavigationDataReducer };
