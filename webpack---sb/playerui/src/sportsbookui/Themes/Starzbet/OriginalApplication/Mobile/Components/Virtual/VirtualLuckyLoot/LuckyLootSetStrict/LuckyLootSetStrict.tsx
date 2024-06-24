// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { EMarketType } from "@sb/betting-core/MarketType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { useParamSelector } from "@sb/utils";
import classes from "./LuckyLootSetStrict.module.css";
import { marketParametersByIdSelector } from "../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { MarketName } from "../../../../../../../../Components/MarketName/MarketName";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { sortBy } from "../../../../../../../../Utils/SortBy";
import { luckyLootSubsetInSetMarketSelector } from "../../../../../../../../Store/Virtual/LuckyLoot/Selectors/LuckyLootMarketListSelector";
import { getLuckyLootCoefficient } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/GetCoefficient";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { virtualGameBySportSelector } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";
import { Arrow } from "../../../../../Components/Arrow/Arrow";

const sportId = sportCodeToIdMap[ESportCode.kiron_lucky_loot];

const MarketHead = memo(({
  toggle,
  expanded,
  marketId,
}) => (
  <div className={clsx(classes.head, expanded && classes.expended)} onClick={toggle}>
    <MarketName id={marketId} />

    <Arrow invert={!expanded} />
  </div>
));
MarketHead.displayName = "MarketHead";

const MarketOutcome = memo(({
  outcome,
  coefficient,
  outcomeId,
}) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classList = clsx(
    classes.outcomeWrapper,
    active && classes.active,
  );

  return (
    <div className={classList} onClick={createHandler}>
      <div className={classes.outcomeParameter}>
        <Ellipsis>
          {outcome}

          {"+"}
        </Ellipsis>
      </div>

      <div className={classes.odds}>
        {coefficient}
      </div>
    </div>
  );
});
MarketOutcome.displayName = "MarketOutcome";

const OutcomeContainer = memo(({ marketId }) => {
  const keys = useSelector(virtualGameBySportSelector(sportId));
  const parameters = useParamSelector(marketParametersByIdSelector, [marketId]);

  const outcomeId = virtualGameGetOutcomeId(
    marketId,
    { outcome: [sortBy((it) => +it, keys).join(",")] },
  );
  const coefficient = getLuckyLootCoefficient(EMarketType.score_lucky_loot_subset_in_set_strict, [sortBy((it) => +it, keys).join(",")], parameters);

  return (
    <MarketOutcome
      outcomeId={outcomeId}
      coefficient={coefficient}
      outcome={parameters[EMarketParameter.number]}
    />
  );
});
OutcomeContainer.displayName = "OutcomeContainer";

const LuckyLootSetStrict = memo(() => {
  const keys = useSelector(virtualGameBySportSelector(sportId));
  const marketIds = useSelector(luckyLootSubsetInSetMarketSelector);

  if (!keys || keys.length !== 6 || !marketIds) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <MarketName id={marketIds[0]} />
      </div>

      <div className={classes.marketList}>
        {marketIds.map((marketId) => <OutcomeContainer marketId={marketId} key={marketId} />)}
      </div>
    </div>
  );
});
LuckyLootSetStrict.displayName = "LuckyLootSetStrict";

export { LuckyLootSetStrict };
