import { type TReducer } from "@sb/utils";
import { type EPlatform_PlayerVerifyStrategy } from "@sb/graphql-client";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type playerMinimalReceivedAction } from "../PlayerActions";

const playerMinimalReceivedReducer: TReducer<
  TPlatformAppState,
  typeof playerMinimalReceivedAction
> = (
  state,
  {
    payload: {
      player: {
        verificationStrategy,
        profile,
        ...rest
      },
    },
  },
) => (
  {
    ...state,
    player: {
      ...state.player,
      details: {
        ...state.player.details,
        //TODO типы TVerificationStrategy и EPlatform_PlayerVerifyStrategy не совпадают, потому что 1 enam - 2 string
        verifyStrategy: verificationStrategy as EPlatform_PlayerVerifyStrategy,
        profile: {
          ...profile,
          identityNumber: profile.identityNumber || null,
          townCity: null,
          address: null,
          postcode: null,
        },
        isLoaded: true,
        ...rest,
      },
    },
  }
);

export { playerMinimalReceivedReducer };
