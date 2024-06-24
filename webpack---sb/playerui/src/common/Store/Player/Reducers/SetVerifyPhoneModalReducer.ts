import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type hideVerifyPhoneModalAction, type showVerifyPhoneModalAction } from "../PlayerActions";

const setVerifyPhoneModalReducer = (phoneModal: boolean): TReducer<
  TPlatformAppState,
  typeof showVerifyPhoneModalAction | typeof hideVerifyPhoneModalAction
> => (state) => ({
  ...state,
  player: {
    ...state.player,
    verify: {
      ...state.player.verify,
      phoneModal,
    },
  },
});

export { setVerifyPhoneModalReducer };
