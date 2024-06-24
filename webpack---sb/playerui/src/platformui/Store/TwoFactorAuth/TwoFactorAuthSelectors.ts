import { createNotNilSelector, createPropertySelectors, createSimpleSelector, withParams } from "@sb/utils";
import { selectFormValue } from "@sb/form-new";
import { playerDetailsSelectors } from "../../../common/Store/Player/Selectors/PlayerSelectors";
import { type ITwoFactorAuth } from "./TwoFactorAuthInitialState";
import { type TWithOneTimePassword, TWO_FACTOR_AUTH_CONFIRM_FORM_NAME } from "./SubmitForm/Model";

const twoFactorAuthSelector = (twoFactorAuth: ITwoFactorAuth) => twoFactorAuth;
const twoFactorAuthSelectors = createPropertySelectors(twoFactorAuthSelector);
const twoFactorAuthDataSelectors = createPropertySelectors(twoFactorAuthSelectors.twoFactorAuth);

const notNilTwoFactorAuthSelector = createNotNilSelector(twoFactorAuthDataSelectors.activateData, ["notNilTwoFactorAuthSelector"], "activateData");

const notNilBackupCodesSelector = createNotNilSelector(twoFactorAuthDataSelectors.backupCodes, ["notNilBackupCodesSelector"], "backupCodes");

const twoFactorAuthPropertySelectors = createPropertySelectors(notNilTwoFactorAuthSelector);

const isReadyTwoFactorAuthSecretSelector = createSimpleSelector(
  [twoFactorAuthDataSelectors.activateData, playerDetailsSelectors.twoFactorAuthenticationEnabled],
  (activateData, isActivated) => isActivated || activateData,
);

const notNilPlayerDataSelector = createNotNilSelector(twoFactorAuthDataSelectors.player, ["notNilPlayerDataSelector"], "player");

const playerAuthDataSelector = createSimpleSelector(
  [notNilPlayerDataSelector, withParams(selectFormValue<TWithOneTimePassword>, TWO_FACTOR_AUTH_CONFIRM_FORM_NAME)],
  (player, code) => ({ ...player, ...code }),
);

const twoFactorAuthActivateFormEnableSelector = createSimpleSelector(
  [playerDetailsSelectors.twoFactorAuthenticationEnabled],
  (isActive) => !isActive,
);

const twoFactorAuthDeactivateFormEnableSelector = createSimpleSelector(
  [playerDetailsSelectors.twoFactorAuthenticationEnabled],
  (isActive) => !!isActive,
);

export {
  isReadyTwoFactorAuthSecretSelector,
  notNilBackupCodesSelector,
  twoFactorAuthPropertySelectors,
  twoFactorAuthSelectors,
  twoFactorAuthDataSelectors,
  playerAuthDataSelector,
  twoFactorAuthActivateFormEnableSelector,
  twoFactorAuthDeactivateFormEnableSelector,
};
