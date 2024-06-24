import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { createSimpleSelector, getNotNil, isNotNil } from "@sb/utils";
import { type ICashOutPickDto } from "@sb/sdk/coefficientcalculation/CashOutPickDto";
import { type TPickResult } from "@sb/betting-core/TPickResult";
import { betByIdSelector } from "../MyBets/Selectors/MyBetsSelectors";
import { outcomesSelector } from "../Feed/Selectors/FeedSelectors";
import { type TMixAppState } from "../CreateMixInitialState";
import { type IWithCashOutState } from "./CashOutState";

const cashOutForBetByIdSelector = (s: IWithCashOutState, betId: string) => s.cashOut.moneyMap[betId];

const notNilCashOutForBetByIdSelector = createSimpleSelector(
  [cashOutForBetByIdSelector],
  (cashOut) => getNotNil(cashOut, ["notNilCashOutForBetByIdSelector"], "cashOut"),
);

const cashOutMoneyMapSelector = ({ cashOut }: IWithCashOutState) => cashOut.moneyMap;
const cashOutStateSelector = ({ cashOut }: IWithCashOutState) => cashOut.state;

const cashOutStateByIdSelector = (state: IWithCashOutState, id: string) => cashOutStateSelector(state)[id];

type TCashOutPicks = {
  picks: ICashOutPickDto[];
  hasLive: boolean;
}

const cashOutPicksByBetIdSelector =
  (state: TMixAppState, betId: string) => {
    const bet = betByIdSelector(betId)(state);
    const outcomes = outcomesSelector(state);

    return isNotNil(bet)
      ? bet.picks.reduce<TCashOutPicks>(
        (acc, pick) => {
          const outcomeId = pick.outcome.id;

          const notNilOutcome = getNotNil(outcomes[outcomeId], ["cashOutPicksByBetIdSelector"], "outcome");

          acc.picks.push(
            {
              outcomeId: pick.outcome.id,
              coefficient: String(notNilOutcome.coefficient),
              updatedAt: String(notNilOutcome.updatedAt),
              pickResult: notNilOutcome.result as TPickResult || "no_result", // Wait for back check TPickResult & EOutcomeResult
            },
          );
          acc.hasLive = !acc.hasLive && "eventInfo" in pick && isLive(pick.eventInfo.eventStatus as EEventStatus);

          return acc;
        },
        { picks: [], hasLive: false },
      )
      : { picks: [], hasLive: false };
  };

export {
  cashOutForBetByIdSelector,
  cashOutMoneyMapSelector,
  cashOutStateSelector,
  cashOutStateByIdSelector,
  cashOutPicksByBetIdSelector,
  notNilCashOutForBetByIdSelector,
};
