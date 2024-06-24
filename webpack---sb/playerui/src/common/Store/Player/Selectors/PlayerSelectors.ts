import { createPropertySelector, createPropertySelectors, createSimpleSelector, getNotNil, isNotNil } from "@sb/utils";
import { callManagerStartedSelector, createCallManagerSymbol } from "@sb/call-manager";
import { type TAppState } from "../../../../sportsbookui/Store/InitialState";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { type EPermissionKey } from "../Model/Permissions";

const playerRootSelector = ({ player }: IWithPlayerState) => player;

const playerSelectors = createPropertySelectors(playerRootSelector);

const hiddenBalanceSelector = createPropertySelector(playerRootSelector, "hiddenBalance");

const hiddenDetailsSelector = createPropertySelector(playerRootSelector, "hiddenDetails");

const verifyPhoneModalSelector = createPropertySelector(playerSelectors.verify, "phoneModal");

const logoutMessageDisplaySelector = createPropertySelector(playerSelectors.logoutMessage, "display");

const playerDetailsSelectors = createPropertySelectors(playerSelectors.details);

const isPlayerBonusWalletExistSelector = createSimpleSelector([playerDetailsSelectors.bonusWallet], isNotNil);

const playerBonusWalletBalanceAssertedSelector = createSimpleSelector(
  [playerDetailsSelectors.bonusWallet],
  (bonusWallet) => getNotNil(bonusWallet, ["playerBonusWalletBalanceAssertedSelector"], "bonusWallet").balance,
);

const playerIdNotNilSelector = createSimpleSelector(
  [playerDetailsSelectors.id],
  (id) => getNotNil(id, ["playerIdNotNilSelector"], "id"),
);

const isTestPlayerSelector = createSimpleSelector(
  [playerDetailsSelectors.testPlayer],
  Boolean,
);

// firstTimeDepost
const playerFirstTimeDepositIsNotNilSelector = createSimpleSelector([playerDetailsSelectors.firstTimeDeposit], isNotNil);

const playerNotVerifiedSelector = (state: IWithPlayerState) => {
  const verified = playerDetailsSelectors.verified(state);

  return isNotNil(verified) && !verified;
};

const AUTH_SEND_SYMBOL = createCallManagerSymbol("AUTH_SEND_SYMBOL");
const formSendSelector = (state: TAppState) => callManagerStartedSelector(state, AUTH_SEND_SYMBOL);

const isPrivatePlayerSelector = createSimpleSelector(
  [playerDetailsSelectors.phoneVerificationToken],
  (phoneVerificationToken) => phoneVerificationToken === null,
);

const allowPageByPermissionSelector = createSimpleSelector(
  [
    playerDetailsSelectors.permissions,
    (_, permissionKey: EPermissionKey) => permissionKey,
  ],
  (permissions, permissionKey) => permissions[permissionKey],
);

export {
  playerSelectors,

  hiddenBalanceSelector,
  hiddenDetailsSelector,

  verifyPhoneModalSelector,

  logoutMessageDisplaySelector,

  playerDetailsSelectors,
  isPlayerBonusWalletExistSelector,
  playerBonusWalletBalanceAssertedSelector,
  isTestPlayerSelector,
  playerIdNotNilSelector,
  playerFirstTimeDepositIsNotNilSelector,
  playerNotVerifiedSelector,

  formSendSelector,

  isPrivatePlayerSelector,

  allowPageByPermissionSelector,

};
