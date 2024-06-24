import clsx from "clsx";
import { memo } from "react";
import { EMarketType } from "@sb/betting-core/MarketType";
import { withPreventDefaultAndStopPropagation } from "@sb/utils";
import classes from "./Market.module.css";
import { LockIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/LockIcon/LockIcon";
import { BaseOutcomeContainer, OutcomeContentContainer } from "../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { coefficientFormat } from "../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { fromRenderProps } from "../../../../../Utils/FromRenderProps";
import {
  hasTotalOrHandicap,
  type IMarketProps,
  type IOutcomeContentProps,
  type IOutcomeEntriesProps,
  type IOutcomeProps,
} from "../../../../../Store/Feed/Model/Market/Market";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { OddsUp } from "../Icons/OddsBoost/OddsUp";
import { OddsDown } from "../Icons/OddsBoost/OddsDown";

const EmptyOutcome = memo(() => (
  <div className={classes.cell}>
    <div className={clsx(classes.odds, classes.locked)}>
      <LockIcon />
    </div>
  </div>
));
EmptyOutcome.displayName = "EmptyOutcome";

const FitEmptyOutcome = memo(() => (
  <div className={`${classes.cell} ${classes.fit}`}>
    <div className={clsx(classes.odds, classes.locked)}>
      <LockIcon />
    </div>
  </div>
));
FitEmptyOutcome.displayName = "FitEmptyOutcome";

const Outcome = memo<IOutcomeProps>(({
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

  const handle = withPreventDefaultAndStopPropagation(clickHandle);

  return (
    <div className={classes.cell}>
      <div className={`${classes.odds} ${oddsClass}`} onClick={handle}>
        {up ? <OddsUp className={classes.oddUp} /> : null}

        {down ? <OddsDown className={classes.oddDown} /> : null}

        {
          locked

            ? <LockIcon />
            : (
              <>
                <div className={classes.prop}>
                  <Ellipsis>
                    {prop}
                  </Ellipsis>
                </div>

                {coefficientFormat(coefficient)}
              </>
            )
        }
      </div>
    </div>
  );
});
Outcome.displayName = "Outcome";

const OutcomeEntries = memo<IOutcomeEntriesProps>(({ entries, marketType, ...rest }) => {
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

const OutcomeContent = memo<IOutcomeContentProps>(({
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

const Market = memo<IMarketProps>(({ marketId, marketType }) => (
  <BaseOutcomeContainer
    contentView={OutcomeContent}
    marketId={marketId}
    marketType={marketType}
  />
));
Market.displayName = "Market";

export { EmptyOutcome, Market, FitEmptyOutcome };
