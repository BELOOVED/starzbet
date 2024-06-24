// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { EMarketType } from "@sb/betting-core/MarketType";
import { outcomeEnumValueTKeys } from "@sb/betting-core/SharedTKeys/OutcomeEnumValueTKeys";
import { sportsbookui_starzbet_title_sumOfDraw } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./LuckyLootMarketList.module.css";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import {
  luckyLootHighLowMarketSelector,
  luckyLootOddEvenMarketSelector,
} from "../../../../../../../../Store/Virtual/LuckyLoot/Selectors/LuckyLootMarketListSelector";
import { getLuckyLootCoefficient } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/GetCoefficient";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

const MarketOutcome = memo(({
  outcomeId,
  outcomeEnum,
  coefficient,
  outcomeParameter,
}) => {
  const [t] = useTranslation();

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
          {t(outcomeEnumValueTKeys[outcomeEnum])}
        </Ellipsis>

        {" "}

        {outcomeParameter}
      </div>

      <div className={classes.odds}>
        {coefficient}
      </div>
    </div>
  );
});
MarketOutcome.displayName = "MarketOutcome";

const OutcomeContainer = memo(({
  marketId,
  outcomeEnum,
  marketType,
  ...rest
}) => {
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome: [outcomeEnum] });
  const coefficient = getLuckyLootCoefficient(marketType, [outcomeEnum]);

  return (
    <MarketOutcome
      outcomeId={outcomeId}
      outcomeEnum={outcomeEnum}
      coefficient={coefficient}
      {...rest}
    />
  );
});
OutcomeContainer.displayName = "OutcomeContainer";

const LuckyLootMarketContainer = memo(({
  marketId,
  list,
  ...rest
}) => list.map((outcomeEnum) => (
  <OutcomeContainer
    marketId={marketId}
    outcomeEnum={outcomeEnum}
    {...rest}
    key={outcomeEnum}
  />
)));
LuckyLootMarketContainer.displayName = "LuckyLootMarketContainer";

const marketListOddEven = [EOutcomeEnumValue.odd, EOutcomeEnumValue.even];
const marketListHighLow = [EOutcomeEnumValue.high, EOutcomeEnumValue.low];

const LuckyLootOddEvenMarket = memo(() => {
  const marketId = useSelector(luckyLootOddEvenMarketSelector);

  if (!marketId) {
    return null;
  }

  return (
    <LuckyLootMarketContainer
      list={marketListOddEven}
      marketId={marketId}
      marketType={EMarketType.score_lucky_loot_sum_odd_even}
    />
  );
});
LuckyLootOddEvenMarket.displayName = "LuckyLootOddEvenMarket";

const LuckyLootHighLowMarket = memo(() => {
  const marketId = useSelector(luckyLootHighLowMarketSelector);

  if (!marketId) {
    return null;
  }

  return (
    <LuckyLootMarketContainer
      list={marketListHighLow}
      marketId={marketId}
      outcomeParameter={"75.5"}
      marketType={EMarketType.score_lucky_loot_sum_high_low}
    />
  );
});
LuckyLootHighLowMarket.displayName = "LuckyLootHighLowMarket";

const LuckyLootSumOfDrawMarketGroups = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {t(sportsbookui_starzbet_title_sumOfDraw)}
      </div>

      <div className={classes.marketList}>
        <LuckyLootOddEvenMarket />

        <LuckyLootHighLowMarket />
      </div>
    </div>
  );
});
LuckyLootSumOfDrawMarketGroups.displayName = "LuckyLootSumOfDrawMarketGroups";

export { LuckyLootSumOfDrawMarketGroups };
