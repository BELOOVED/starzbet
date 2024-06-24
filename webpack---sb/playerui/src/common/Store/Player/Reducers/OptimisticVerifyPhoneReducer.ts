import { type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type optimisticVerifyPhoneAction } from "../PlayerActions";

const optimisticVerifyPhoneReducer: TReducer<TPlatformAppState, typeof optimisticVerifyPhoneAction> = (state, { payload }) => assocPath(
  ["player", "verify"],
  {
    ...state.player.verify,
    optimisticVerifiedPhone: payload,
  },
  state,
);

export { optimisticVerifyPhoneReducer };
