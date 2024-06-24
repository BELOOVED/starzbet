import { type IMoney, isNotNil } from "@sb/utils";
import { type TAppState } from "../../../../../sportsbookui/Store/InitialState";
import {
  betSlipIsFreeBetParlayCheckedSelector,
  betSlipIsUseBonusBalanceCheckedSelector,
  betSlipIsUseFreeBetCheckedSelector,
  betSlipPromotionBonusIdSelector,
  betSlipUseBonusBalanceForParlayCheckedSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";

const metadataForSingleBetSelector = (state: TAppState, outcomeId: string, totalStake: IMoney) => {
  const isFreeBetChecked = betSlipIsUseFreeBetCheckedSelector(state, outcomeId);

  if (isFreeBetChecked) {
    return { freeBetAmount: totalStake.amount, freeBetCurrency: totalStake.currency };
  }

  const isUseBonusBalanceChecked = betSlipIsUseBonusBalanceCheckedSelector(state, outcomeId);
  if (isUseBonusBalanceChecked) {
    return { bonusBetAmount: totalStake.amount, bonusBetCurrency: totalStake.currency };
  }

  return undefined;
};

const metadataForFoldAndSystemBetSelector = (state: TAppState, totalStake: IMoney) => {
  const isFreeBetChecked = betSlipIsFreeBetParlayCheckedSelector(state);

  if (isFreeBetChecked) {
    return { freeBetAmount: totalStake.amount, freeBetCurrency: totalStake.currency };
  }

  const useBonusBalanceParlay = betSlipUseBonusBalanceForParlayCheckedSelector(state);

  if (useBonusBalanceParlay) {
    return { bonusBetAmount: totalStake.amount, bonusBetCurrency: totalStake.currency };
  }

  const promotionBonusId = betSlipPromotionBonusIdSelector(state);

  if (isNotNil(promotionBonusId)) {
    return { bonusIdToClaim: promotionBonusId };
  }

  return undefined;
};

export { metadataForSingleBetSelector, metadataForFoldAndSystemBetSelector };
