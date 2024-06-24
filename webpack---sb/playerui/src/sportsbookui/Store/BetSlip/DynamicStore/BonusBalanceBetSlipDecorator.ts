import { isNil } from "@sb/utils";
import { distinctUntilChanged, filter } from "@sb/dynamic-store";
import {
  activeBonusWithWageringNullableSelector,
  activeFreeBetBonusNullableSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/SelectorsNeededToSplit";
import { mixDynamicStore } from "../../MixDynamicStore";
import {
  betSlipIsFreeBetParlayCheckedSelector,
  betSlipUseBonusBalanceCheckedCountSelector,
  betSlipUseBonusBalanceForParlayCheckedSelector,
  betSlipUseFreeBetsCheckedCountSelector,
} from "../Selectors/BetSlipSelectors";
import { betSlipState } from "../BetSlipState";

/**
 * when some picks use freeBet balance
 * and there are no more active FreeBet bonuses
 * should clear useFreeBet selections
 */
mixDynamicStore.addDecorator(
  mixDynamicStore.createDecorator(
    activeFreeBetBonusNullableSelector,
    (state) => ({
      ...state,
      betSlip: {
        ...state.betSlip,
        useFreeBetCheckedMap: betSlipState.betSlip.useFreeBetCheckedMap,
        useFreeBetForParlayChecked: false,
      },
    }),
    filter(isNil),
    distinctUntilChanged(),
  ),
  (state) => {
    const isSomeSingleChecked = betSlipUseFreeBetsCheckedCountSelector(state) > 0;
    if (isSomeSingleChecked) {
      return true;
    }

    const isParlayChecked = betSlipIsFreeBetParlayCheckedSelector(state);
    if (isParlayChecked) {
      return true;
    }

    return false;
  },
);

/**
 * when some picks use bonus balance
 * and there are no more active bonuses with wagering
 * should clear useBonusBalance selections
 */
mixDynamicStore.addDecorator(
  mixDynamicStore.createDecorator(
    activeBonusWithWageringNullableSelector,
    (state) => ({
      ...state,
      betSlip: {
        ...state.betSlip,
        useBonusBalanceCheckedMap: betSlipState.betSlip.useBonusBalanceCheckedMap,
        useBonusBalanceForParlayChecked: false,
      },
    }),
    filter(isNil),
    distinctUntilChanged(),
  ),
  (state) => {
    const isSomeSingleChecked = betSlipUseBonusBalanceCheckedCountSelector(state) > 0;
    if (isSomeSingleChecked) {
      return true;
    }

    const isParlayChecked = betSlipUseBonusBalanceForParlayCheckedSelector(state);
    if (isParlayChecked) {
      return true;
    }

    return false;
  },
);
