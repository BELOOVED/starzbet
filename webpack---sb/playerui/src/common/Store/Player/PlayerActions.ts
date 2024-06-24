import type { TPlatform_Player_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IMoney } from "@sb/utils";
import { type IPlayerMinimal } from "./Model/IPlayerMinimal";

const playerDetailsReceivedAction = (player: TPlatform_Player_Fragment) => ({
  type: "@PLAYER/DETAILS_RECEIVED",
  payload: { player },
});

const playerMinimalReceivedAction = (player: IPlayerMinimal) => ({
  type: "@PLAYER/MINIMAL_RECEIVED",
  payload: { player },
});

const playerWalletReceivedAction = (player: TPlatform_Player_Fragment) => ({
  type: "@PLAYER/WALLET_RECEIVED",
  payload: { player },
});

const playerRequestWalletAction = () => ({
  type: "@PLAYER/REQUEST_WALLET",
});

const hideLogoutMessageAction = () => ({
  type: "@PLAYER/HIDE_LOGOUT_MESSAGE",
});

const toggleShowBalanceAction = () => ({
  type: "@PLAYER/SET_HIDDEN_BALANCE",
  payload: {},
});

const showVerifyPhoneModalAction = () => ({
  type: "@PLAYER/SHOW_VERIFY_PHONE_MODAL",
});

const hideVerifyPhoneModalAction = () => ({
  type: "@PLAYER/HIDE_VERIFY_PHONE_MODAL",
});

const playerWalletBalanceReceivedAction = (balance: IMoney) => ({
  type: "@PLAYER/WALLET_BALANCE_RECEIVED",
  payload: { balance },
});

const playerBonusWalletBalanceReceivedAction = (balance: IMoney) => ({
  type: "@PLAYER/BONUS_WALLET_BALANCE_RECEIVED",
  payload: { balance },
});

const playerFreeBetWalletBalanceReceivedAction = (balance: IMoney) => ({
  type: "@PLAYER/FREE_BET_WALLET_BALANCE_RECEIVED",
  payload: { balance },
});

const toggleHideDetailsAction = () => ({
  type: "@PLAYER/TOGGLE_HIDE_DETAILS",
});

const playerStartVerifyAction = () => ({
  type: "@PLAYER/START_VERIFY",
});

const playerConfirmVerifyAction = () => ({
  type: "@PLAYER/CONFIRM_VERIFY",
});

const playerRejectVerifyAction = (error: string) => ({
  type: "@PLAYER/REJECT_VERIFY",
  payload: { error },
});

const optimisticVerifyPhoneAction = (payload: boolean) => ({
  type: "@PLAYER/OPTIMISTIC_VERIFY_PHONE",
  payload,
});

const playerReceivedGroupIdAction = (player: TPlatform_Player_Fragment) => ({
  type: "@PLAYER/RECEIVED_GROUP_ID",
  payload: {
    player,
  },
});

const playerReceivedPhoneVerificationTokenAction = (player: TPlatform_Player_Fragment) => ({
  type: "@PLAYER/RECEIVED_PHONE_VERIFICATION_TOKEN",
  payload: {
    player,
  },
});

const playerReceivedEmailVerificationTokenAction = (player: TPlatform_Player_Fragment) => ({
  type: "@PLAYER/RECEIVED_EMAIL_VERIFICATION_TOKEN",
  payload: {
    player,
  },
});

const updatePlayerEmailRequestAction = () => ({
  type: "@PLAYER/UPDATE_EMAIL_REQUEST",
});

const updatePlayerPhoneNumberRequestAction = () => ({
  type: "@PLAYER/UPDATE_PHONE_NUMBER_REQUEST",
});

const twoFactorAuthChangeAction = () => ({
  type: "@PLAYER/2FA_ACTIVATED",
});

export {
  playerDetailsReceivedAction,
  playerWalletReceivedAction,
  playerRequestWalletAction,
  hideLogoutMessageAction,
  toggleShowBalanceAction,
  showVerifyPhoneModalAction,
  hideVerifyPhoneModalAction,
  playerMinimalReceivedAction,
  playerWalletBalanceReceivedAction,
  playerBonusWalletBalanceReceivedAction,
  playerFreeBetWalletBalanceReceivedAction,
  toggleHideDetailsAction,
  playerStartVerifyAction,
  playerConfirmVerifyAction,
  playerRejectVerifyAction,
  optimisticVerifyPhoneAction,
  playerReceivedGroupIdAction,
  playerReceivedPhoneVerificationTokenAction,
  playerReceivedEmailVerificationTokenAction,
  updatePlayerEmailRequestAction,
  updatePlayerPhoneNumberRequestAction,
  twoFactorAuthChangeAction,
};
