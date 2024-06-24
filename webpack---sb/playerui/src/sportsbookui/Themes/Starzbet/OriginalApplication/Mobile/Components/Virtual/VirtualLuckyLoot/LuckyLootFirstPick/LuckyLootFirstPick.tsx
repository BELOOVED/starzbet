// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { EMarketType } from "@sb/betting-core/MarketType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { useParamSelector } from "@sb/utils";
import classes from "./LuckyLootFirstPick.module.css";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { MarketName } from "../../../../../../../../Components/MarketName/MarketName";
import { luckyLootColorKeys } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/LuckyLoot";
import { luckyLootFirstColorMarketSelector } from "../../../../../../../../Store/Virtual/LuckyLoot/Selectors/LuckyLootMarketListSelector";
import { getLuckyLootCoefficient } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/GetCoefficient";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { virtualGameBySportSelector } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

const MarketGroup = memo(({
  outcomeId,
  color,
  marketId,
  coefficient,
}) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const colorBall = clsx(
    classes.ball,
    classes[color],
  );

  return (
    <div className={classes.outcomeWrapper} onClick={createHandler}>
      <div className={colorBall} />

      <div className={classes.marketName}>
        <Ellipsis>
          <MarketName id={marketId} />
        </Ellipsis>
      </div>

      <div className={classes.odds}>
        {coefficient}
      </div>
    </div>
  );
});
MarketGroup.displayName = "MarketGroup";

const FirstColorPicker = memo(() => {
  const keys = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_lucky_loot]));
  const marketId = useSelector(luckyLootFirstColorMarketSelector);

  if (!keys) {
    return null;
  }

  const coefficient = getLuckyLootCoefficient(EMarketType.score_lucky_loot_first_color, [keys.join(",")]);

  const color = luckyLootColorKeys.find((it) => it.keys.includes(keys[0]))?.color;
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome: [color] });

  return (
    <MarketGroup
      outcomeId={outcomeId}
      coefficient={coefficient}
      marketId={marketId}
      color={color}
    />
  );
});
FirstColorPicker.displayName = "FirstColorPicker";

export { FirstColorPicker };
