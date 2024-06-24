// @ts-nocheck
import clsx from "clsx";
import { createElement, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_pays, sportsbookui_starzbet_title_first, sportsbookui_starzbet_title_bonusBall } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useAction, useParamSelector } from "@sb/utils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { shared_market_score_lucky_loot_first_ball } from "@sb/translates/shared/SharedTKeys";
import classes from "./LuckyLootCombo.module.css";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { betSlipCreateBatchPickAction } from "../../../../../../../../Store/BetSlip/BetSlipActions";
import { pickKind } from "../../../../../../../../Store/BetSlip/Model/BetPick";
import { luckyLootFirstBallsMarketSelector } from "../../../../../../../../Store/Virtual/LuckyLoot/Selectors/LuckyLootMarketListSelector";
import { getLuckyLootComboCoefficient, luckyLootColorKeys } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/LuckyLoot";
import { getComboOutcomeIds } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/GetComboOutcomeIds";
import { virtualGameBySportSelector } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { luckyLootOutcomeSelector } from "../../../../../../../../Store/Virtual/LuckyLoot/Selectors/LuckyLootOutcomeSelector";
import {
  activeOutcomeByIdSelector,
} from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { FirstColorPicker } from "../LuckyLootFirstPick/LuckyLootFirstPick";
import { LuckyLootSetStrict } from "../LuckyLootSetStrict/LuckyLootSetStrict";

const intermediateCombo = (count) => {
  const result = [];

  for (let i = Math.floor(count / 2); i < count; i++) {
    result.push(i);
  }

  return result;
};

const Ball = memo(({ id }) => {
  const color = luckyLootColorKeys.find((it) => it.keys.includes(id)).color;

  const colorBall = clsx(
    classes.ball,
    classes[color],
  );

  return (
    <div className={colorBall}>
      {id}
    </div>
  );
});
Ball.displayName = "Ball";

const Combo = memo(({ comboLength }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.intermediates}>
      <div className={classes.intermediateList}>
        {
          intermediateCombo(comboLength).map((it) => (
            <div key={it} className={classes.intermediateTitle}>
              <Ellipsis className={classes.comboPays}>
                {it}

                {" "}

                {t(sportsbookui_starzbet_title_pays)}
              </Ellipsis>

              <div className={classes.comboLength}>
                {getLuckyLootComboCoefficient(comboLength, it)}
              </div>
            </div>
          ))
        }
      </div>

      <div className={`${classes.intermediateTitle} ${classes.total}`}>
        <Ellipsis className={classes.comboPays}>
          {comboLength}

          {" "}

          {t(sportsbookui_starzbet_title_pays)}
        </Ellipsis>

        <div className={classes.comboLength}>
          {getLuckyLootComboCoefficient(comboLength)}
        </div>
      </div>
    </div>
  );
});
Combo.displayName = "Combo";

const RowCombo = memo(({ comboLength, outcomeIds }) => {
  const [t] = useTranslation();
  const keys = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_lucky_loot]));

  const createBatchPick = useAction(betSlipCreateBatchPickAction);
  const createHandler = useCallback(() => createBatchPick(pickKind.virtualGame, outcomeIds), [outcomeIds]);

  return (
    <div className={classes.combo} onClick={createHandler}>
      <div className={classes.comboTitle}>
        <div className={classes.comboTitleHeader}>
          <div className={classes.comboTitleHeaderPick}>
            {t(sportsbookui_starzbet_title_first)}

            {" "}

            {comboLength}
          </div>

          <Ellipsis className={classes.comboTitleHeaderBonus}>
            {t(sportsbookui_starzbet_title_bonusBall)}

            {" "}

            {"X2"}
          </Ellipsis>
        </div>

        <div className={classes.comboTitleFooter}>
          {
            keys.slice(0, comboLength).map((ball) => (
              <Ball id={ball} key={ball} />
            ))
          }
        </div>
      </div>

      <Combo comboLength={comboLength} />
    </div>
  );
});
RowCombo.displayName = "RowCombo";

const FirstPick = memo(({
  outcomeIds,
  coefficient,
}) => {
  const [t] = useTranslation();
  const [key] = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_lucky_loot]));
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeIds[0]]);
  const createHandler = useBetSlipCreateBatchHandler(outcomeIds, active);

  return (
    <div className={classes.outcomeWrapper} onClick={createHandler}>
      <Ball id={key} />

      <div className={classes.marketName}>
        <Ellipsis>
          {t(shared_market_score_lucky_loot_first_ball)}
        </Ellipsis>
      </div>

      <div className={classes.odds}>
        {coefficient}
      </div>
    </div>
  );
});
FirstPick.displayName = "FirstPick";

const FirstBallContainer = memo(({
  keys,
  marketId,
  comboLength,
  view,
}) => {
  const outcome = useSelector(luckyLootOutcomeSelector(keys.length));
  const outcomeIds = getComboOutcomeIds(marketId, [outcome], comboLength);
  const coefficient = getLuckyLootComboCoefficient(keys.length, comboLength);

  if (!outcomeIds.length) {
    return null;
  }

  return createElement(
    view,
    {
      comboLength,
      outcomeIds,
      coefficient,
    },
  );
});
FirstBallContainer.displayName = "FirstBallContainer";

const FirstBalls = memo(() => {
  const keys = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_lucky_loot]));

  const marketId = useSelector(luckyLootFirstBallsMarketSelector);

  if (!keys || !keys.length) {
    return null;
  }

  return (
    <>
      <div className={classes.firstBall}>
        <FirstColorPicker />

        <FirstBallContainer
          marketId={marketId}
          comboLength={1}
          keys={keys.slice(0, 1)}
          view={FirstPick}
        />
      </div>

      <div className={classes.comboContainer}>
        {
          keys.slice(1).map((key, idx) => (
            <FirstBallContainer
              marketId={marketId}
              keys={keys}
              comboLength={idx + 2}
              view={RowCombo}
              key={`${marketId}${key}`}
            />
          ))
        }
      </div>

      <LuckyLootSetStrict />
    </>
  );
});
FirstBalls.displayName = "FirstBalls";

export { FirstBalls };
