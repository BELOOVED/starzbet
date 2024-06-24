// @ts-nocheck
import clsx from "clsx";
import { createElement, memo, useMemo } from "react";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./ValueSequenceNoramlizer.module.css";
import { luckyLootColorKeys } from "../../Store/Virtual/LuckyLoot/Model/LuckyLoot";
import { spinAndWinBlackKey, spinAndWinRedKey } from "../../Store/Virtual/SpinAndWin/Model/SpinAndWin";

const AndMore = memo(({ count }) => (
  <div className={classes.andMore}>
    {"+"}

    {count}
  </div>
));
AndMore.displayName = "AndMore";

const NormalizeValueSequenceWithNumberParameters = memo(({
  sportId,
  outcomeParameters,
  marketParameters,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  collapsed = true,
}) => (
  <>
    <div className={classes.parameters}>
      {marketParameters[EMarketParameter.number]}

      {"+"}
    </div>

    {
      collapsed && (
        <NormalizeForValueSequence
          sportId={sportId}
          outcomeParameters={outcomeParameters}
          collapsed={true}
        />
      )
    }
  </>
));
NormalizeValueSequenceWithNumberParameters.displayName = "NormalizeValueSequenceWithNumberParameters";

const LuckyLootBall = memo(({ id }) => {
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
LuckyLootBall.displayName = "LuckyLootBall";

const KenoBall = memo(({ id }) => {
  const classList = clsx(
    classes.keno,
    id <= 40 && classes.yellow,
    id > 40 && classes.orange,
  );

  return (
    <div className={classList}>
      {id}
    </div>
  );
});
KenoBall.displayName = "KenoBall";

const SpinAndWinBall = memo(({ id }) => {
  const classList = clsx(
    classes.box,
    id === 0 && classes.zeroBox,
    spinAndWinRedKey.includes(id) && classes.redBox,
    spinAndWinBlackKey.includes(id) && classes.blackBox,
  );

  return (
    <div className={classList}>
      {id}
    </div>
  );
});
SpinAndWinBall.displayName = "SpinAndWinBall";

// eslint-disable-next-line rulesdir/no-truethly-default-assign
const Normalizer = memo(({ outcome, collapsed = true, view }) => {
  const list = useMemo(() => outcome.split(","), []);

  if (!collapsed && list.length > 6) {
    return (
      <div className={classes.list}>
        {list.slice(0, 5).map((ball) => createElement(view, { id: +ball, key: ball }))}

        <AndMore count={list.length - 5} />
      </div>
    );
  }

  return (
    <div className={classes.list}>
      {list.map((ball) => createElement(view, { id: +ball, key: ball }))}
    </div>
  );
});
Normalizer.displayName = "Normalizer";

const viewMapBySport = {
  [sportCodeToIdMap[ESportCode.kiron_lucky_loot]]: LuckyLootBall,
  [sportCodeToIdMap[ESportCode.kiron_keno]]: KenoBall,
  [sportCodeToIdMap[ESportCode.kiron_roulette]]: SpinAndWinBall,
};

const NormalizeForValueSequence = memo(({ sportId, outcomeParameters, collapsed }) => {
  const view = viewMapBySport[sportId];

  if (!view) {
    return null;
  }

  return (
    <Normalizer
      outcome={outcomeParameters.outcome}
      collapsed={collapsed}
      view={view}
    />
  );
});
NormalizeForValueSequence.displayName = "NormalizeForValueSequence";

export { NormalizeForValueSequence, NormalizeValueSequenceWithNumberParameters };
