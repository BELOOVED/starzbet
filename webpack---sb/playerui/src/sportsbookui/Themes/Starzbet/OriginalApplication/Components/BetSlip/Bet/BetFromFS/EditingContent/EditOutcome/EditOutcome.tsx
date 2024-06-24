// @ts-nocheck

import clsx from "clsx";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sportsbookui_starzbet_myBets_title_toReturn } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, Money, not, useClickOutside, useParamSelector } from "@sb/utils";
import classes from "./EditOutcome.module.css";
import { When } from "../../../../../../../../../../common/Components/When";
import {
  marketByIdSelector,
  participantsByEventIdSelector,
  scopeByIdSelector,
  sportIdByEventIdSelector,
} from "../../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { changeOutcomeAction } from "../../../../../../../../../Store/MyBets/MyBetsActions";
import { PickName } from "../../../../../../../../../Components/PickName/PickName";
import { usePotentialPayoutAfterEditBet } from "../../../../../../../../../Store/MyBets/Hooks/UsePotentialPayoutAfterEditBet";
import { lockedOutcomeSelector } from "../../../../../../../../../Store/Feed/Selectors/LockedOutcomeSelector";
import { OutrightOutcomeNameByParameters } from "../../../../../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { outcomeBetOrCurrentByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { canEditPickByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditablePickByIdSelector";
import { Ellipsis } from "../../../../../../../../../Components/Ellipsis/Ellipsis";
import { ChevronIcon } from "../../../../../Icons/ChevronIcon/ChevronIcon";
import { TradeIcon } from "../../../../../Icons/TradeIcon/TradeIcon";
import { CheckIcon } from "../../../../../Icons/CheckIcon/CheckIcon";
import { MyBetsPickCoefficient } from "../../../../Pick/PickCoefficient/PickCoefficient";

const Payout = memo(({ id, prevOutcomeId }) => {
  const [t] = useTranslation();

  const payout = usePotentialPayoutAfterEditBet(prevOutcomeId, id);

  return (
    <Ellipsis className={classes.outcomeReturn}>
      {t(sportsbookui_starzbet_myBets_title_toReturn)}
      &nbsp;

      {Money.toFormat(payout, EMoneyFormat.symbolLeft)}
    </Ellipsis>
  );
});
Payout.displayName = "Payout";

const OutcomeContent = memo(({
  outcome,
  market,
  onClick,
  prevOutcomeId,
  id,
  active,
}) => {
  const scope = useParamSelector(scopeByIdSelector, [market.scopeId]);

  const participants = useParamSelector(participantsByEventIdSelector, [market.eventId]);
  const sportId = useParamSelector(sportIdByEventIdSelector, [market.eventId]);

  const handleActive = (e) => onClick(e.currentTarget.dataset.id);

  return (
    <div
      className={clsx(classes.outcome, active && classes.active)}
      key={outcome.id}
      data-id={outcome.id}
      onClick={handleActive}
    >
      <div className={classes.nameAndReturn}>
        <Ellipsis className={classes.outcomeName}>
          <PickName
            marketType={market.type}
            marketParameters={market.parameters}
            participants={participants}
            outcomeParameters={outcome.parameters}
            name={outcome.translatesForManuallyCreated}
            scope={scope}
            sportId={sportId}
          />
        </Ellipsis>

        <Payout id={id} prevOutcomeId={prevOutcomeId} />
      </div>

      <div className={classes.coefficientAndCheck}>
        <MyBetsPickCoefficient coefficient={outcome.coefficient} />

        <When condition={active}>
          <CheckIcon className={classes.checkIcon} color={"text"} />
        </When>
      </div>
    </div>
  );
});
OutcomeContent.displayName = "OutcomeContent";

const OutrightOutcomeContent = memo(({
  outcome,
  onClick,
  prevOutcomeId,
  id,
  active,
}) => {
  const handleActive = (e) => onClick(e.currentTarget.dataset.id);

  return (
    <div
      className={clsx(classes.outcome, active && classes.active)}
      key={outcome.id}
      data-id={outcome.id}
      onClick={handleActive}
    >
      <div className={classes.nameAndReturn}>
        <Ellipsis className={classes.outcomeName}>
          <OutrightOutcomeNameByParameters
            parameters={outcome.parameters}
            translatesForManuallyCreated={outcome.translatesForManuallyCreated}
          />
        </Ellipsis>

        <Payout id={id} prevOutcomeId={prevOutcomeId} />
      </div>

      <div className={classes.coefficientAndCheck}>
        <MyBetsPickCoefficient coefficient={outcome.coefficient} />

        {active && <div className={classes.check} />}
      </div>
    </div>
  );
});
OutrightOutcomeContent.displayName = "OutrightOutcomeContent";

const Outcome = memo(({ id, ...rest }) => {
  const locked = useParamSelector(lockedOutcomeSelector, [id]);

  const outcome = useParamSelector(outcomeBetOrCurrentByIdSelector, [id]);
  const market = useParamSelector(marketByIdSelector, [outcome.marketId]);

  if (!outcome || locked) {
    return null;
  }

  return (
    outcome.outrightId
      ? (
        <OutrightOutcomeContent
          outcome={outcome}
          id={id}
          {...rest}
        />
      )
      : market && (
        <OutcomeContent
          outcome={outcome}
          market={market}
          id={id}
          {...rest}
        />
      )
  );
});
Outcome.displayName = "Outcome";

// todo refact this shit

const OutcomeDropdown = memo((
  {
    outcomeId,
    toggleDropdown,
    outcomeIdsSelector,
  },
) => {
  const outcomeIdList = useSelector(outcomeIdsSelector(outcomeId));

  const dispatch = useDispatch();

  const handleDone = (newOutcomeId) => {
    dispatch(changeOutcomeAction(outcomeId, newOutcomeId));

    toggleDropdown(false);
  };

  return (
    <div className={classes.dropdown}>
      {
        outcomeIdList.map((id) => (
          <Outcome
            key={id}
            id={id}
            active={outcomeId === id}
            prevOutcomeId={outcomeId}
            onClick={handleDone}
          />
        ))
      }
    </div>
  );
});
OutcomeDropdown.displayName = "OutcomeDropdown";

const EditOutcome = (
  {
    id,
    children,
    outcomeId,
    outcomeIdsSelector,
  },
) => {
  const [dropdown, setDropdown] = useState(false);

  const ref = useClickOutside(() => setDropdown(false), true);

  const editable = useParamSelector(canEditPickByIdSelector, [id]);

  const handleToggle = () => {
    if (!editable) {
      return;
    }

    setDropdown(not);
  };

  return (
    <div ref={ref} className={classes.select} onClick={handleToggle}>
      <div className={classes.nameWrapper}>
        <TradeIcon color={"active"} className={classes.tradeIcon} />

        {children}
      </div>

      <ChevronIcon expanded={dropdown} color={"text"} />

      {
        dropdown && editable && (
          <OutcomeDropdown
            outcomeId={outcomeId}
            toggleDropdown={setDropdown}
            outcomeIdsSelector={outcomeIdsSelector}
          />
        )
      }
    </div>
  );
};
EditOutcome.displayName = "EditOutcome";

export { EditOutcome };
