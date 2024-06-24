import { availableAuthPlayerSelector } from "../../../../common/Store/Player/Selectors/AvailableAuthPlayerSelector";
import { type TMixAppState } from "../../CreateMixInitialState";
import { EPlaceBetButtonState } from "../Model/EPlaceBetButtonState";
import { betSlipDisabledSelector } from "./BetSlipDisabledSelector";
import { betSlipSomeConflictedWithBonusSelector, betSlipSomeConflictSelector } from "./BetSlipSomeConflictSelector";
import { betSlipLimitErrorSelector, betSlipPlacingSelector } from "./BetSlipSelectors";
import { betSlipChangedSelector } from "./BetSlipChangedSelector";
import { betSlipInvalidSelectionSelector } from "./BetSlipInvalidSelectionSelector";

const betSlipPlaceBetButtonStateSelector = (state: TMixAppState) => {
  const logged = availableAuthPlayerSelector(state);
  if (!logged) {
    return EPlaceBetButtonState.needLogin;
  }

  const disabled = betSlipDisabledSelector(state);
  if (disabled) {
    return EPlaceBetButtonState.disabled;
  }

  const conflicted = betSlipSomeConflictSelector(state);
  if (conflicted) {
    return EPlaceBetButtonState.disabled;
  }

  const bonusError = betSlipSomeConflictedWithBonusSelector(state);
  if (bonusError) {
    return EPlaceBetButtonState.disabled;
  }

  const placing = betSlipPlacingSelector(state);
  if (placing) {
    return EPlaceBetButtonState.placing;
  }

  const changed = betSlipChangedSelector(state);
  if (changed) {
    return EPlaceBetButtonState.needAcceptChange;
  }

  const invalidSelection = betSlipInvalidSelectionSelector(state);
  if (invalidSelection) {
    return EPlaceBetButtonState.needAcceptChange;
  }

  const limitError = betSlipLimitErrorSelector(state);
  if (limitError) {
    return EPlaceBetButtonState.needAcceptChange;
  }

  return EPlaceBetButtonState.readyToPlace;
};

export { betSlipPlaceBetButtonStateSelector };
