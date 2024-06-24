import { IS_SERVER } from "@sb/utils";
import { platformLocalStorageKeys } from "../../LocalStorage/PlatformLocalStorageKeys";
import { getLocalStorage } from "../../LocalStorage/localStorageKeys";
import { type IWithLogoutMessage, logoutMessageInitialState } from "./LogoutMessageInitialState";
import { type IWithVerifyInitialState, verifyInitialState } from "./VerifyInitialState";
import { detailsInitialState, type IWithDetailsState } from "./DetailsInitialState";

interface IPlayerState extends IWithLogoutMessage,
  IWithVerifyInitialState,
  IWithDetailsState {
  hiddenBalance: boolean;
  hiddenDetails: boolean;
}

interface IWithPlayerState {
  player: IPlayerState;
}

const playerInitialState: IWithPlayerState = {
  player: {
    ...logoutMessageInitialState,
    ...verifyInitialState,
    ...detailsInitialState,
    hiddenBalance: IS_SERVER ? false : !!getLocalStorage(platformLocalStorageKeys.hiddenBalance),
    hiddenDetails: false,
  },
};

export { playerInitialState, type IWithPlayerState };
