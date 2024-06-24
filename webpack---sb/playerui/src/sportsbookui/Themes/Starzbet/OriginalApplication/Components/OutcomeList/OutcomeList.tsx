// @ts-nocheck
import clsx from "clsx";
import { memo, useReducer } from "react";
import { keyToComponent, not, useParamSelector, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { findTeamByShortId } from "@sb/betting-core/FindTeamByShortId";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./OutcomeList.module.css";
import { When } from "../../../../../../common/Components/When";
import { LockIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/LockIcon/LockIcon";
import { participantsByMarketIdSelector } from "../../../../../Store/Feed/Selectors/FeedSelectors";
import { coefficientFormat } from "../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { fromRenderProps } from "../../../../../Utils/FromRenderProps";
import { OutcomeContentContainer } from "../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { OutrightCoefficientContainer } from "../../../../../Containers/CoefficientContainer/CoefficientContainer";
import { OutrightOutcomeName } from "../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { ShowMore } from "../ShowMore/ShowMore";
import { OddsUp } from "../Icons/OddsBoost/OddsUp";
import { OddsDown } from "../Icons/OddsBoost/OddsDown";

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
      <div className={`${classes.outcome} ${oddsClass}`} onClick={clickHandle}>
        <div className={classes.parameter}>
          <OutrightOutcomeName id={id} />
        </div>

        <div className={classes.odds}>
          {locked ? <LockIcon /> : coefficientFormat(coefficient)}
        </div>
      </div>
    </div>
  );
});
OutrightOutcomeInner.displayName = "OutrightOutcomeInner";

const OutrightOutcome = memo(({ id }) => (
  <OutrightCoefficientContainer id={id}>
    {(props) => <OutrightOutcomeInner id={id} {...props} />}
  </OutrightCoefficientContainer>
));
OutrightOutcome.displayName = "OutrightOutcome";

const CommonOutcomeContent = memo(({
  coefficient,
  locked,
  clickHandle,
  active,
  up,
  down,
  parameter,
}) => {
  const oddsClass = clsx(
    active && classes.active,
    locked && classes.locked,
    up && classes.up,
    down && classes.down,
  );

  return (
    <div className={`${classes.outcome} ${oddsClass}`} onClick={clickHandle}>
      {up ? <OddsUp className={classes.oddUp} /> : null}

      {down ? <OddsDown className={classes.oddDown} /> : null}

      {
        locked
          ? (
            <div className={classes.lock}>
              <LockIcon />
            </div>
          )
          : (
            <>
              <div className={classes.parameter}>
                <Ellipsis>
                  {parameter}
                </Ellipsis>
              </div>

              <div className={classes.odds}>
                {coefficientFormat(coefficient)}
              </div>
            </>
          )
      }
    </div>
  );
});
CommonOutcomeContent.displayName = "CommonOutcomeContent";

const NamedOutcomeContent = memo(({ name, ...rest }) => (
  <CommonOutcomeContent {...rest} parameter={name} />
));
NamedOutcomeContent.displayName = "NamedOutcomeContent";

const BothParameter = memo(({ name, prop }) => (
  <span>
    {name}
    &nbsp;

    {prop}
  </span>
));
BothParameter.displayName = "BothParameter";

const PropOutcomeContent = memo(({ name, prop, ...rest }) => (
  <CommonOutcomeContent
    {...rest}
    parameter={<BothParameter prop={prop} name={name} />}
  />
));
PropOutcomeContent.displayName = "PropOutcomeContent";

const CorrectScoreOutcome = memo((props) => (
  <OutcomeContentContainer {...props}>
    {fromRenderProps(NamedOutcomeContent)}
  </OutcomeContentContainer>
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

      <div className={classes.correctScoreGroupList}>
        {outcomeIdList.map(keyToComponent("id", rest)(CorrectScoreOutcome))}
      </div>
    </div>
  );
});
CorrectScoreGroup.displayName = "CorrectScoreGroup";

const CorrectScoreOutcomeList = memo(({
  entries,
  ...rest
}) => {
  const [sliced, toggle] = useReducer(not<boolean>, true);

  const tooMuch = entries.some(([_, list]) => list.length > 5);

  const getOutcomeIdList = (outcomeIdList) => tooMuch && sliced
    ? outcomeIdList.slice(0, 5)
    : outcomeIdList;

  return (
    <div className={classes.market}>
      <div className={clsx(classes.outcomes, classes.outcomesScore)}>
        {
          entries.map(([id, outcomeIdList]) => (
            <CorrectScoreGroup
              id={id}
              outcomeIdList={getOutcomeIdList(outcomeIdList)}
              {...rest}
              key={id}
            />
          ))
        }
      </div>

      <When condition={tooMuch}>
        <ShowMore onClick={toggle} less={!sliced} />
      </When>
    </div>
  );
});
CorrectScoreOutcomeList.displayName = "CorrectScoreOutcomeList";

const BaseOutcome = memo(({
  content,
  moreThanThree,
  marketType,
  ...rest
}) => (
  <div className={clsx(classes.outcomeWrapper, moreThanThree && classes.moreThanThree)}>
    <OutcomeContentContainer marketType={marketType} {...rest}>
      {fromRenderProps(content)}
    </OutcomeContentContainer>
  </div>
));
BaseOutcome.displayName = "BaseOutcome";

const BaseOutcomeList = memo(({ entries, ...rest }) => {
  const moreThanThree = entries.length >= 3;

  return (
    <div className={classes.market}>
      <div className={clsx(classes.outcomes, moreThanThree && classes.moreThanThreeList)}>
        {entries.map(keyToComponent("id", { ...rest, moreThanThree })(BaseOutcome))}
      </div>
    </div>
  );
});
BaseOutcomeList.displayName = "BaseOutcomeList";

const NamedOutcomeList = withProps(BaseOutcomeList)({ content: NamedOutcomeContent });
NamedOutcomeList.displayName = "NamedOutcomeList";

const PropOutcomeList = withProps(BaseOutcomeList)({ content: PropOutcomeContent });

export {
  OutrightOutcome,
  CorrectScoreOutcomeList,
  NamedOutcomeList,
  PropOutcomeList,
};
