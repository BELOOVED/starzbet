// @ts-nocheck

import clsx from "clsx";
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import classes from "./EditPick.module.css";
import { DateFormat } from "../../../../../../../../../../common/Components/Date/DateFormat";
import { PickName } from "../../../../../../../../../Components/PickName/PickName";
import { MarketNameByParams } from "../../../../../../../../../Components/MarketName/MarketName";
import { ShortScopeName } from "../../../../../../../../../Components/ScopeName/ScopeName";
import { OutrightOutcomeNameByParameters } from "../../../../../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { editingBetPickByOutcomeId } from "../../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { editPickOutcomeIdsByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditPickOutcomeIdsByIdSelector";
import { editOutrightPickIdsByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditOutrightPickIdsByIdSelector";
import { canEditPickByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditablePickByIdSelector";
import { type TBetPickEntry, type TEditableBet } from "../../../../../../../../../Store/MyBets/Model/TBet";
import { Ellipsis } from "../../../../../../../../../Components/Ellipsis/Ellipsis";
import { BetOutrightName } from "../../../../../../../../../Components/OutrightName/OutrightName";
import { SportIcon } from "../../../../../SportIcon/SportIcon";
import { BetTeams } from "../../../../BetTeams/BetTeams";
import { MyBetsPickCoefficient } from "../../../../Pick/PickCoefficient/PickCoefficient";
import { EditOutcome } from "../EditOutcome/EditOutcome";
import { NewEditOutrightPick, NewEditPick } from "../NewEditPick/NewEditPick";
import { RemoveButton } from "../RemoveButton/RemoveButton";

const EventPick = memo((
  {
    id,
    outcomeId,
    coefficient,
    eventStatus,
    pick,
    removed,
  },
) => {
  const editable = useParamSelector(canEditPickByIdSelector, [id]);

  const EventPickName = (
    <Ellipsis className={classes.pickName}>
      <PickName
        marketType={pick.market.type}
        marketParameters={pick.market.parameters}
        participants={pick.event.participants}
        outcomeParameters={pick.outcome.parameters}
        name={pick.outcome.translatesForManuallyCreated}
        scope={pick.market.scope}
        sportId={pick.event.sport.id}
      />
    </Ellipsis>

  );

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={clsx(classes.pick, removed && classes.removed)}>
      <div className={classes.pickInfoRow}>
        {
          editable
            ? (
              <EditOutcome
                id={id}
                outcomeId={outcomeId}
                outcomeIdsSelector={editPickOutcomeIdsByIdSelector}
              >
                {EventPickName}
              </EditOutcome>
            )
            : <>{EventPickName}</>
        }

        <div className={classes.coefficientAndRemove}>
          <MyBetsPickCoefficient coefficient={coefficient} />

          <RemoveButton id={id} removed={removed} />
        </div>
      </div>

      <Ellipsis className={classes.marketName}>
        <MarketNameByParams
          market={pick.market}
          scope={pick.market.scope}
          participants={pick.event.participants}
          sportId={pick.event.sport.id}
        />

        <ShortScopeName
          scope={pick.market.scope}
          sportId={pick.event.sport.id}
          pattern={" (@)"}
        />
      </Ellipsis>

      <div className={classes.teamsAndTime}>
        <div className={classes.teams}>
          <SportIcon id={pick.event.sport.id} color={"text"} className={classes.sportIcon} />

          <BetTeams eventId={pick.event.id} participants={pick.event.participants} />
        </div>

        <div className={classes.timeAndStatus}>
          {
            createElement(
              eventStatus,
              {
                startTime: pick.event.startTime,
                eventInfo: pick.eventInfo,
                score: pick.eventInfo.scopes["full_event--0"]?.scores?.score,
                participants: pick.event.participants,
                sportId: pick.event.sport.id,
                eventId: pick.event.id,
              },
            )
          }
        </div>
      </div>
    </div>
  );
});
EventPick.displayName = "EventPick";

const OutrightPick = memo((
  {
    id,
    outcomeId,
    coefficient,
    pick,
    removed,
  },
) => {
  const editable = useParamSelector(canEditPickByIdSelector, [id]);

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={clsx(classes.pick, removed && classes.removed)}>
      <div className={classes.pickInfoRow}>
        {
          editable
            ? (
              <EditOutcome
                id={id}
                outcomeId={outcomeId}
                outcomeIdsSelector={editOutrightPickIdsByIdSelector}
              >
                <Ellipsis className={classes.pickName}>
                  <OutrightOutcomeNameByParameters
                    parameters={pick.outcome.parameters}
                    translatesForManuallyCreated={pick.outcome.translatesForManuallyCreated}
                  />
                </Ellipsis>
              </EditOutcome>
            )
            : (
              <Ellipsis className={classes.pickName}>
                <OutrightOutcomeNameByParameters
                  parameters={pick.outcome.parameters}
                  translatesForManuallyCreated={pick.outcome.translatesForManuallyCreated}
                />
              </Ellipsis>

            )
        }

        <div className={classes.coefficientAndRemove}>
          <MyBetsPickCoefficient coefficient={coefficient} />

          <RemoveButton id={id} removed={removed} />
        </div>
      </div>

      <Ellipsis className={classes.marketName}>
        <BetOutrightName {...pick.outright} />
      </Ellipsis>

      <Ellipsis className={classes.teamsAndTime}>
        <DateFormat date={pick.outright.startTime} format={"HH:mm • E, do MMM"} />
      </Ellipsis>
    </div>
  );
});
OutrightPick.displayName = "OutrightPick";

type TEditPickProps = TBetPickEntry & {
  editableBet?: TEditableBet;
  eventStatus;
  outcomeStatus;
}
const EditPick = memo<TEditPickProps>(({
  outrightId,
  outcomeId,
  eventId,
  marketId,
  applied,
  removed,
  id,
  ...rest
}) => {
  const pick = useSelector(editingBetPickByOutcomeId(outcomeId));
  if (!pick) {
    return outrightId
      ? (
        <NewEditOutrightPick
          id={id}
          outcomeId={outcomeId}
          removed={removed}
          applied={applied}
        >
          <RemoveButton id={id} removed={removed} />
        </NewEditOutrightPick>
      )
      : (
        <NewEditPick
          id={id}
          outcomeId={outcomeId}
          eventId={eventId}
          marketId={marketId}
          removed={removed}
          applied={applied}
        >
          <RemoveButton id={id} removed={removed} />
        </NewEditPick>
      );
  }

  return outrightId
    ? (
      <OutrightPick
        id={id}
        outcomeId={outcomeId}
        pick={pick}
        removed={removed}
        {...rest}
      />
    )
    : (
      <EventPick
        id={id}
        outcomeId={outcomeId}
        pick={pick}
        removed={removed}
        {...rest}
      />
    );
});
EditPick.displayName = "EditPick";

export { EditPick };
