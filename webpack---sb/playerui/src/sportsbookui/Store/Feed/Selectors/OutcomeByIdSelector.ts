import { createSimpleSelector, getNotNil } from "@sb/utils";
import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { betSlipPicksSelector } from "../../BetSlip/Selectors/BetSlipPicksSelectors";
import { VirtualGamePick } from "../../BetSlip/Model/BetPick";
import { isVirtualPick } from "../../BetSlip/Model/Utils";
import { outcomeIdListByMarketIdSelector, outcomesSelector } from "./FeedSelectors";

const coefficientByOutcomeIdSelector = createSimpleSelector(
  [
    betSlipPicksSelector,
    (_, id: string) => id,
  ],
  (picks, id) => getNotNil(picks.find((pick) => pick.is(id)), ["OutcomeByIdSelector"], "coefficientByOutcomeIdSelector").coefficient,
);

const parametersByOutcomeIdSelector = createSimpleSelector(
  [
    betSlipPicksSelector,
    outcomesSelector,
    (_, id: string) => id,
  ],
  (picks, outcomes, id) => {
    const virtualPick = picks.find((pick) => pick.is(id) && (pick instanceof VirtualGamePick));

    if (isVirtualPick(virtualPick)) {
      return virtualPick.outcomeParameters;
    }

    return outcomes[id]?.parameters;
  },
);

const outcomeResultByIdSelector = createSimpleSelector(
  [
    outcomesSelector,
    (_, id: string) => id,
  ],
  (outcomes, id) => outcomes[id]?.result,
);

const outcomeWinByMarketIdSelector = createSimpleSelector(
  [
    outcomeIdListByMarketIdSelector,
    outcomesSelector,
  ],
  (outcomeIdList, outcomes) => outcomeIdList.find((outcomeId) => outcomes[outcomeId]?.result === EOutcomeResult.win),
);

export {
  outcomeWinByMarketIdSelector,
  outcomeResultByIdSelector,
  parametersByOutcomeIdSelector,
  coefficientByOutcomeIdSelector,
};
