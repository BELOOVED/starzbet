// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { keyToComponent, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { findTeamByShortId } from "@sb/betting-core/FindTeamByShortId";
import { marketTypeTKeys } from "@sb/betting-core/SharedTKeys/MarketTypeTKeys";
import { EEventStatus } from "@sb/betting-core/EEventStatus";
import { isFinished } from "@sb/betting-core/EEventStatusUtils";
import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./OutcomeList.module.css";
import { LockIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/LockIcon/LockIcon";
import { participantsByMarketIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { coefficientFormat } from "../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { fromRenderProps } from "../../../../../../../Utils/FromRenderProps";
import { OutcomeContentContainer } from "../../../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { OutrightOutcomeName } from "../../../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { OddsUp } from "../../../../Components/Icons/OddsBoost/OddsUp";
import { OddsDown } from "../../../../Components/Icons/OddsBoost/OddsDown";

const CommonOutcomeContent = memo(({
  coefficient,
  locked,
  clickHandle,
  active,
  up,
  down,
  name,
  eventStatus,
  result,
}) => {
  const oddsClass = clsx(
    active && classes.active,
    locked && classes.locked,
    up && classes.up,
    down && classes.down,
    eventStatus === EEventStatus.finished && classes.finished,
    result === EOutcomeResult.win && classes.won,
  );

  return (
    <div className={`${classes.outcome} ${oddsClass}`} onClick={clickHandle}>
      {up ? <OddsUp className={classes.oddUp} /> : null}

      {down ? <OddsDown className={classes.oddDown} /> : null}

      <div className={classes.name}>
        <Ellipsis>
          {name}
        </Ellipsis>
      </div>

      <div className={classes.odds}>
        <div className={classes.coefficient}>
          {locked && !isFinished(eventStatus) ? <LockIcon /> : coefficientFormat(coefficient)}

          {eventStatus === EEventStatus.finished ? <LockIcon className={classes.lockLabel} /> : null}
        </div>
      </div>
    </div>
  );
});
CommonOutcomeContent.displayName = "CommonOutcomeContent";

const ExpandOutcomeContent = memo(({
  coefficient,
  locked,
  clickHandle,
  active,
  up,
  down,
  name,
  prop,
  eventStatus,
  result,
}) => {
  const oddsClass = clsx(
    active && classes.active,
    locked && classes.locked,
    up && classes.up,
    down && classes.down,
    eventStatus === EEventStatus.finished && classes.finished,
    result === EOutcomeResult.win && classes.won,
  );

  return (
    <div className={`${classes.outcome} ${oddsClass}`} onClick={clickHandle}>
      {up ? <OddsUp className={classes.oddUp} /> : null}

      {down ? <OddsDown className={classes.oddDown} /> : null}

      <div className={classes.outcomeText}>
        <div className={classes.name}>
          <Ellipsis>
            {name}
          </Ellipsis>
        </div>

        <div className={classes.parameter}>
          {prop}
        </div>
      </div>

      <div className={classes.odds}>
        <div className={classes.coefficient}>
          {locked && !isFinished(eventStatus) ? <LockIcon /> : coefficientFormat(coefficient)}

          {eventStatus === EEventStatus.finished ? <LockIcon className={classes.lockLabel} /> : null}
        </div>
      </div>
    </div>
  );
});
ExpandOutcomeContent.displayName = "ExpandOutcomeContent";

const RacingOutcomeContent = memo(({
  coefficient,
  locked,
  clickHandle,
  active,
  up,
  down,
  marketType,
  eventStatus,
  result,
}) => {
  const [t] = useTranslation();

  const oddsClass = clsx(
    classes.racingOutcome,
    active && classes.active,
    up && classes.up,
    down && classes.down,
    eventStatus === EEventStatus.finished && classes.finished,
    result === EOutcomeResult.win && classes.won,
  );

  return (
    <div className={oddsClass} onClick={clickHandle}>
      {up ? <OddsUp className={classes.oddUp} /> : null}

      {down ? <OddsDown className={classes.oddDown} /> : null}

      <div className={classes.racingName}>
        {t(marketTypeTKeys[marketType])}
      </div>

      <div className={classes.racingOdds}>
        {locked && !isFinished(eventStatus) ? <LockIcon /> : coefficientFormat(coefficient)}

        {eventStatus === EEventStatus.finished ? <LockIcon className={classes.lockLabel} /> : null}
      </div>
    </div>
  );
});
RacingOutcomeContent.displayName = "RacingOutcomeContent";

const CorrectScoreOutcome = memo((props) => (
  <div className={classes.outcomeWrapper}>
    <OutcomeContentContainer {...props}>
      {fromRenderProps(CommonOutcomeContent)}
    </OutcomeContentContainer>
  </div>
));
CorrectScoreOutcome.displayName = "CorrectScoreOutcome";

const CorrectScoreGroup = memo(({
  id,
  outcomeIdList,
  ...rest
}) => {
  const [t] = useTranslation();

  const participants = useParamSelector(participantsByMarketIdSelector, [rest.marketId]);

  const team = findTeamByShortId(participants, id);

  return (
    <div className={classes.correctScoreGroup}>
      <div className={classes.correctScoreGroupName}>
        <Ellipsis>
          {team ? <BaseTeamName team={team} /> : t(id)}
        </Ellipsis>
      </div>

      <div>
        {outcomeIdList.map(keyToComponent("id", rest)(CorrectScoreOutcome))}
      </div>
    </div>
  );
});
CorrectScoreGroup.displayName = "CorrectScoreGroup";

const CorrectScoreOutcomeList = memo(({
  entries,
  ...rest
}) => (
  <div className={classes.outcomes}>
    {
      entries.map(([id, outcomeIdList]) => (
        <CorrectScoreGroup
          id={id}
          outcomeIdList={outcomeIdList}
          {...rest}
          key={id}
        />
      ))
    }
  </div>
));
CorrectScoreOutcomeList.displayName = "CorrectScoreOutcomeList";

const RaceWinnerOutcomeGroup = memo(({ marketType, ...rest }) => (
  <OutcomeContentContainer marketType={marketType} {...rest}>
    {({ ...props }) => <RacingOutcomeContent marketType={marketType} {...props} />}
  </OutcomeContentContainer>
));
RaceWinnerOutcomeGroup.displayName = "RaceWinnerOutcomeGroup";

const BaseOutcome = memo(({ marketType, ...rest }) => (
  <div className={classes.outcomeWrapper}>
    <OutcomeContentContainer marketType={marketType} {...rest}>
      {fromRenderProps(CommonOutcomeContent)}
    </OutcomeContentContainer>
  </div>
));
BaseOutcome.displayName = "BaseOutcome";

const ExpandOutcome = memo(({ marketType, ...rest }) => (
  <div className={classes.outcomeWrapper}>
    <OutcomeContentContainer marketType={marketType} {...rest}>
      {fromRenderProps(ExpandOutcomeContent)}
    </OutcomeContentContainer>
  </div>
));
ExpandOutcome.displayName = "ExpandOutcome";

const ExpandOutcomeList = memo(({ entries, ...rest }) => (
  <div className={classes.outcomes}>
    {entries.map(keyToComponent("id", rest)(ExpandOutcome))}
  </div>
));
ExpandOutcomeList.displayName = "ExpandOutcomeList";

const BaseOutcomeList = memo(({ entries, ...rest }) => (
  <div className={classes.outcomes}>
    {entries.map(keyToComponent("id", rest)(BaseOutcome))}
  </div>
));
BaseOutcomeList.displayName = "BaseOutcomeList";

const LargeOutcomeList = memo(({ entries, ...rest }) => (
  <div className={`${classes.outcomes} ${classes.large}`}>
    {entries.map(keyToComponent("id", rest)(BaseOutcome))}
  </div>
));
LargeOutcomeList.displayName = "LargeOutcomeList";

const OutrightOutcomeInner = memo(({
  id,
  coefficient,
  locked,
  clickHandle,
  active,
  up,
  down,
}) => {
  const oddsClass = clsx(
    active && classes.active,
    locked && classes.locked,
    up && classes.up,
    down && classes.down,
  );

  return (
    <div className={classes.outcomeWrapper}>
      <div className={classes.outcome} onClick={clickHandle}>
        <div className={classes.parameter}>
          <OutrightOutcomeName id={id} />
        </div>

        <div className={`${classes.odds} ${oddsClass}`}>
          {
            locked
              ? null
              : coefficientFormat(coefficient)
          }
        </div>
      </div>
    </div>
  );
});
OutrightOutcomeInner.displayName = "OutrightOutcomeInner";

export {
  CorrectScoreOutcomeList,
  BaseOutcomeList,
  ExpandOutcomeList,
  LargeOutcomeList,
  RaceWinnerOutcomeGroup,
};
