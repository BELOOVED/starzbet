import { createRootReducer, simpleReducer } from "@sb/utils";
import { keepAliveExpiredAction } from "@sb/auth";
import { removedTokenAction } from "../../../../platformui/Store/Auth/AuthActions";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import {
  hideLogoutMessageAction,
  hideVerifyPhoneModalAction,
  optimisticVerifyPhoneAction,
  playerBonusWalletBalanceReceivedAction,
  playerConfirmVerifyAction,
  playerDetailsReceivedAction,
  playerFreeBetWalletBalanceReceivedAction,
  playerMinimalReceivedAction,
  playerReceivedEmailVerificationTokenAction,
  playerReceivedGroupIdAction,
  playerReceivedPhoneVerificationTokenAction,
  playerRejectVerifyAction,
  playerStartVerifyAction,
  playerWalletBalanceReceivedAction,
  playerWalletReceivedAction,
  showVerifyPhoneModalAction,
  toggleHideDetailsAction,
  toggleShowBalanceAction,
  twoFactorAuthChangeAction,
} from "../PlayerActions";
import { playerStartVerifyReducer } from "./PlayerStartVerifyReducer";
import { playerConfirmVerifyReducer } from "./PlayerConfirmVerifyReducer";
import { playerRejectVerifyReducer } from "./PlayerRejectVerifyReducer";
import { setVerifyPhoneModalReducer } from "./SetVerifyPhoneModalReducer";
import { setLogoutMessageReducer } from "./SetLogoutMessageReducer";
import { optimisticVerifyPhoneReducer } from "./OptimisticVerifyPhoneReducer";
import { resetPlayerReducer } from "./ResetPlayerReducer";
import { playerDetailsReceivedReducer } from "./PlayerDetailsReceivedReducer";
import { playerWalletReceivedReducer } from "./PlayerWalletReceivedReducer";
import { toggleShowBalanceReducer } from "./ToggleShowBalanceReducer";
import { playerMinimalReceivedReducer } from "./PlayerMinimalReceivedReducer";
import { toggleHideDetailsReducer } from "./ToggleHideDetailsReducer";
import { playerReceivedPhoneVerificationTokenReducer } from "./PlayerReceivedPhoneVerificationTokenReducer";
import { playerReceivedEmailVerificationTokenReducer } from "./PlayerReceivedEmailVerificationTokenReducer";
import { twoFactorUpdateReducer } from "./TwoFactorUpdateReducers";

const playerWalletBalanceReceivedReducer = simpleReducer<TPlatformAppState>(
  ["balance"],
  ["player", "details", "wallet", "balance"],
);

const playerBonusWalletBalanceReceivedReducer = simpleReducer<TPlatformAppState>(
  ["balance"],
  ["player", "details", "bonusWallet", "balance"],
);

const playerFreeBetWalletBalanceReceivedReducer = simpleReducer<TPlatformAppState>(
  ["balance"],
  ["player", "details", "freeBetWallet", "balance"],
);

const playerReceivedGroupIdReducer = simpleReducer<TPlatformAppState>(
  ["player", "groupId"],
  ["player", "details", "groupId"],
);

const playerRootReducer = createRootReducer([
  [toggleShowBalanceReducer, toggleShowBalanceAction],
  [resetPlayerReducer, removedTokenAction],

  [playerReceivedGroupIdReducer, playerReceivedGroupIdAction],
  [playerReceivedPhoneVerificationTokenReducer, playerReceivedPhoneVerificationTokenAction],
  [playerReceivedEmailVerificationTokenReducer, playerReceivedEmailVerificationTokenAction],

  //Verify
  [playerStartVerifyReducer, playerStartVerifyAction],
  [playerConfirmVerifyReducer, playerConfirmVerifyAction],
  [playerRejectVerifyReducer, playerRejectVerifyAction],

  [playerDetailsReceivedReducer, playerDetailsReceivedAction],
  [playerMinimalReceivedReducer, playerMinimalReceivedAction],
  [playerWalletReceivedReducer, playerWalletReceivedAction],
  [optimisticVerifyPhoneReducer, optimisticVerifyPhoneAction],

  //LogoutMessage
  [setLogoutMessageReducer(true), keepAliveExpiredAction],
  [setLogoutMessageReducer(false), hideLogoutMessageAction],
  [setVerifyPhoneModalReducer(true), showVerifyPhoneModalAction],
  [setVerifyPhoneModalReducer(false), hideVerifyPhoneModalAction],
  [playerWalletBalanceReceivedReducer, playerWalletBalanceReceivedAction],
  [playerBonusWalletBalanceReceivedReducer, playerBonusWalletBalanceReceivedAction],
  [playerFreeBetWalletBalanceReceivedReducer, playerFreeBetWalletBalanceReceivedAction],

  //Hide details
  [toggleHideDetailsReducer, toggleHideDetailsAction],

  //2FA
  [twoFactorUpdateReducer, twoFactorAuthChangeAction],
]);

export { playerRootReducer };
