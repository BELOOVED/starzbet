// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { useTranslation } from "@sb/translator";
import { EMarketType } from "@sb/betting-core/MarketType";
import { outcomeEnumValueTKeys } from "@sb/betting-core/SharedTKeys/OutcomeEnumValueTKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./KenoMarketList.module.css";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { getKenoCoefficient } from "../../../../../../../../Store/Virtual/Keno/Model/GetCoefficient";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { coefficientFormat } from "../../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

const MarketGroup = memo(({
  outcomeId,
  coefficient,
  title,
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
          {t(outcomeEnumValueTKeys[title])}
        </Ellipsis>
      </div>

      <div className={classes.odds}>
        {coefficientFormat(coefficient)}
      </div>
    </div>
  );
});
MarketGroup.displayName = "MarketGroup";

const OutcomeContainer = memo(({ marketId, outcomeEnum }) => {
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome: outcomeEnum });
  const coefficient = getKenoCoefficient(EMarketType.score_keno_heads_tails, [outcomeEnum]);

  return (
    <MarketGroup
      outcomeId={outcomeId}
      coefficient={coefficient}
      title={outcomeEnum}
    />
  );
});
OutcomeContainer.displayName = "OutcomeContainer";

const kenoHeadsTailsOutcomeEnums = [EOutcomeEnumValue.heads, EOutcomeEnumValue.evens, EOutcomeEnumValue.tails];

const KenoMarketList = memo(({ id }) => (
  <div className={classes.marketList}>
    {
      kenoHeadsTailsOutcomeEnums.map((outcomeEnum) => (
        <OutcomeContainer
          marketId={id}
          outcomeEnum={outcomeEnum}
          key={outcomeEnum}
        />
      ))
    }
  </div>
));
KenoMarketList.displayName = "KenoMarketList";

export { KenoMarketList };
