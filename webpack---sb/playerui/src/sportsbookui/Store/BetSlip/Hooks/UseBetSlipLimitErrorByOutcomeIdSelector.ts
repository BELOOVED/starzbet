import { createSelector } from "reselect";
import { EMoneyFormat, type IMoney, Money, useParamSelector } from "@sb/utils";
import { sportsbookui_betSlip_error_maximumStakeYouCanPlace } from "@sb/translates/sportsbookui/CommonTKeys";
import { type TTFuncParameters } from "@sb/translator";
import { coefficientByOutcomeIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { betSlipLimitSelector } from "../Selectors/BetSlipSelectors";

const computeStakeByMaxPayout = (maxPayout: IMoney, coefficient: number) => (
  Money.toUnit(Money.subtract(Money.divide(maxPayout, coefficient), Money.parseAny("0.01", maxPayout.currency)))
);

const betSlipLimitErrorByOutcomeIdSelectorFactory = createSelector(
  [
    betSlipLimitSelector,
    coefficientByOutcomeIdSelector,
    (_: unknown, outcomeId: string) => outcomeId,
  ],
  (limit, coefficient, outcomeId): TTFuncParameters | undefined => {
    if (!limit) {
      return void 0;
    }

    const currentLimit = limit.find(({ info }) => Object.keys(info.matchedPicks).find((id) => id === outcomeId));

    if (!currentLimit) {
      return void 0;
    }

    const payout = currentLimit.rule.money;

    const stake = computeStakeByMaxPayout(payout, coefficient);

    return (
      [
        sportsbookui_betSlip_error_maximumStakeYouCanPlace,
        { stake: Money.toFormat(Money.parseAny(stake, payout.currency), EMoneyFormat.symbolLeft) },
      ]
    );
  },
);

const useBetSlipLimitErrorByOutcomeIdSelector = (outcomeId: string) => useParamSelector(
  betSlipLimitErrorByOutcomeIdSelectorFactory,
  [outcomeId],
);

export { useBetSlipLimitErrorByOutcomeIdSelector, betSlipLimitErrorByOutcomeIdSelectorFactory };
