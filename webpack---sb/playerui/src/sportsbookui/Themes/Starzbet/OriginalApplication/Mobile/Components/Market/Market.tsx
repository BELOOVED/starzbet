// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback } from "react";
import { EMarketType } from "@sb/betting-core/MarketType";
import classes from "./Market.module.css";
import { LockIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/LockIcon/LockIcon";
import { BaseOutcomeContainer, OutcomeContentContainer } from "../../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { coefficientFormat } from "../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { fromRenderProps } from "../../../../../../Utils/FromRenderProps";
import { hasTotalOrHandicap } from "../../../../../../Store/Feed/Model/Market/Market";
import { OddsUp } from "../../../Components/Icons/OddsBoost/OddsUp";
import { OddsDown } from "../../../Components/Icons/OddsBoost/OddsDown";

const EmptyOutcome = memo(() => (
  <div className={classes.cell}>
    <div className={classes.odds}>
      <div className={classes.prop} />

      <div className={classes.coefficient}>
        <LockIcon />
      </div>
    </div>
  </div>
));
EmptyOutcome.displayName = "EmptyOutcome";

const Outcome = memo(({
  coefficient,
  locked,
  clickHandle,
  active,
  up,
  down,
  prop,
}) => {
  const oddsClass = clsx(
    active && classes.active,
    locked && classes.locked,
    up && classes.up,
    down && classes.down,
  );

  const handle = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      clickHandle();
    },
    [clickHandle],
  );

  return (
    <div className={classes.cell}>
      <div className={`${classes.odds} ${oddsClass}`} onClick={handle}>
        {up ? <OddsUp className={classes.oddUp} /> : null}

        {down ? <OddsDown className={classes.oddDown} /> : null}

        <div className={classes.prop}>
          {prop}
        </div>

        <div className={classes.coefficient}>
          {locked ? <LockIcon /> : coefficientFormat(coefficient)}
        </div>
      </div>
    </div>
  );
});
Outcome.displayName = "Outcome";

const OutcomeEntries = memo(({ entries, marketType, ...rest }) => {
  const viewList = entries.map((id) => (
    <OutcomeContentContainer
      {...rest}
      key={id}
      id={id}
      marketType={marketType}
      forceShort
    >
      {fromRenderProps(Outcome)}
    </OutcomeContentContainer>
  ));

  if (marketType === EMarketType.score_1x2 && entries.length === 2) {
    return [viewList[0], <EmptyOutcome key={"stub"} />, viewList[1]];
  }

  return viewList;
});
OutcomeEntries.displayName = "OutcomeEntries";

const OutcomeContent = memo(({
  marketParameters,
  entries,
  marketType,
  marketId,
}) => (
  <>
    {
      hasTotalOrHandicap(marketParameters) && (
        <div className={classes.params}>
          {marketParameters.total || marketParameters.handicap}
        </div>
      )
    }

    <OutcomeEntries
      entries={entries}
      marketType={marketType}
      marketId={marketId}
    />
  </>
));
OutcomeContent.displayName = "OutcomeContent";

const Market = memo(({ marketId, marketType }) => (
  <BaseOutcomeContainer
    contentView={OutcomeContent}
    marketId={marketId}
    marketType={marketType}
  />
));
Market.displayName = "Market";

export { EmptyOutcome, Market };
