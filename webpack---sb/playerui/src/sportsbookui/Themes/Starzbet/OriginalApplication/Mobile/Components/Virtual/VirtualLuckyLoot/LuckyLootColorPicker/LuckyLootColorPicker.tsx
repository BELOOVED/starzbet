// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { useParamSelector } from "@sb/utils";
import classes from "./LuckyLootColorPicker.module.css";
import { marketParametersByIdSelector } from "../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { luckyLootColorCountMarketSelector } from "../../../../../../../../Store/Virtual/LuckyLoot/Selectors/LuckyLootMarketListSelector";
import { luckyLootColorCountKeys } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/LuckyLoot";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { getColorCountOutcome } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/GetOutcome";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

const Field = memo(({
  id,
  color,
  coefficient,
  outcomeId,
}) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classBall = clsx(
    classes.ball,
    classes[color],
  );

  return (
    <div className={classes.fieldContainer} onClick={createHandler}>
      <div className={classes.fieldHeader}>
        <div className={classBall} />

        <span>
          {id}

          {id !== 0 && "+"}
        </span>
      </div>

      <div className={classes.coefficient}>
        {coefficient}
      </div>
    </div>
  );
});
Field.displayName = "Field";

const OutcomeContainer = memo(({ marketId, coefficient, count }) => {
  const outcome = getColorCountOutcome(count);
  const outcomeId = virtualGameGetOutcomeId(marketId, outcome);
  const parameters = useParamSelector(marketParametersByIdSelector, [marketId]);

  return (
    <Field
      id={count}
      coefficient={coefficient}
      outcomeId={outcomeId}
      color={parameters[EMarketParameter.color]}
    />
  );
});
OutcomeContainer.displayName = "OutcomeContainer";

const LuckyLootColorPicker = memo(() => {
  const marketIds = useSelector(luckyLootColorCountMarketSelector);

  return (
    <div className={classes.colorPickerContainer}>
      {
        marketIds && marketIds.map((marketId) => (
          <div className={classes.colorList} key={marketId}>
            {
              luckyLootColorCountKeys.map(({ key, coefficient }) => (
                <OutcomeContainer
                  marketId={marketId}
                  count={key}
                  coefficient={coefficient}
                  key={`${marketId}:${key}`}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );
});
LuckyLootColorPicker.displayName = "LuckyLootColorPicker";

export { LuckyLootColorPicker };
