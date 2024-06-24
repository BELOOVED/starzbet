// @ts-nocheck

import clsx from "clsx";
import { memo, type MouseEventHandler, useEffect, useReducer } from "react";
import { not, useAction, useParamSelector, withPreventDefault, withProps } from "@sb/utils";
import { EEventStatus } from "@sb/betting-core/EEventStatus";
import { isFinished } from "@sb/betting-core/EEventStatusUtils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { useTranslation } from "@sb/translator";
import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./Row.module.css";
import { LockIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/LockIcon/LockIcon";
import { eventStatusByIdSelector, sportIdByEventIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { coefficientFormat } from "../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { hasTotalOrHandicap } from "../../../../../../../Store/Feed/Model/Market/Market";
import { DashScoreValue } from "../../../../../../../Components/ScoreValue/ScoreValue";
import { BaseOutcomeContainer } from "../../../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { MarketContainer } from "../../../../../../../Containers/MarketContainer/MarketContainer";
import { participantTypesDoubleTuple } from "../../../../../../../Store/Feed/Model/Event";
import { outcomeTitleByMarketType } from "../../../../../../../Store/Feed/Model/Outcome/OutcomeTitleMap";
import { ParticipantContainer } from "../../../../../../../Containers/ParticipantContainer/ParticipantContainer";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { StubMarketFilterProvider } from "../../../../../../../Store/MarketFilter/MarketFilterProvider";
import { CoefficientContainer } from "../../../../../../../Containers/CoefficientContainer/CoefficientContainer";
import { feedAddEventSubscriberAction, feedRemoveEventSubscriberAction } from "../../../../../../../Store/Feed/FeedActions";
import { eventSubscriberEnum } from "../../../../../../../Store/Feed/Model/EventSubscriberEnum";
import { virtualRacingSport } from "../../../../../../../Store/Virtual/Common/Model/VirtualRacingSport";
import {
  useVirtualGameEventNameSelector,
  useVirtualGameEventNumberIdSelector,
} from "../../../../../../../Store/Virtual/Common/Hooks/UseVirtualGameEventNameSelector";
import { EventContainer } from "../../../../../../../Containers/EventContainer/EventContainer";
import { virtualRacingLoadStatisticsAction } from "../../../../../../../Store/Statistics/StatisticsActions";
import { VirtualTeamIcon } from "../../../../../../../Components/TeamIcon/TeamIcon";
import { useMedia } from "../../../../../../../Hooks/UseMedia";
import { isVirtualSportWithTeamIcon } from "../../../../../../../Store/Virtual/Common/Model/VirtualSportWithTeamIcon";
import { getMarketTypeListBySportId } from "../../../../../../Onwin2/GetMarketTypeListBySportId";
import { EventStatus } from "../../../../Desktop/Components/Virtual/EventStatus/EventStatus";
import { OddsUp } from "../../../../Components/Icons/OddsBoost/OddsUp";
import { OddsDown } from "../../../../Components/Icons/OddsBoost/OddsDown";
import { DropdownIcon } from "../../../../Components/Icons/DropdownIcon/DropdownIcon";
import { VirtualRacingSport } from "../VirtualRacingSport/VirtualRacingSport";
import { MarketGroups } from "../MarketGroup/MarketGroup";

const EmptyOutcome = memo(() => (
  <div className={classes.cell}>
    <div className={`${classes.outcome} ${classes.locked}`}>
      <LockIcon />
    </div>
  </div>
));
EmptyOutcome.displayName = "EmptyOutcome";

const StubOutcome = memo(() => (
  <div className={classes.cell} />
));
StubOutcome.displayName = "StubOutcome";

const Outcome = memo(({
  coefficient,
  locked,
  clickHandle,
  active,
  up,
  down,
  text,
  eventStatus,
  result,
}) => {
  const [t] = useTranslation();

  const oddsClass = clsx(
    active && classes.active,
    up && classes.up,
    down && classes.down,
    eventStatus === EEventStatus.finished && classes.finished,
    result === EOutcomeResult.win && classes.won,
  );

  const handle: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    clickHandle();
  };

  return (
    <div className={`${classes.outcome} ${oddsClass}`} onClick={handle}>
      {up ? <OddsUp className={classes.oddUp} /> : null}

      {down ? <OddsDown className={classes.oddDown} /> : null}

      <div className={classes.outcomeProps}>
        {t(text)}
      </div>

      <div className={classes.odds}>
        {locked && !isFinished(eventStatus) ? <LockIcon /> : coefficientFormat(coefficient)}
      </div>

      {eventStatus === EEventStatus.finished ? <LockIcon className={classes.lockLabel} /> : null}
    </div>
  );
});
Outcome.displayName = "Outcome";

const OutcomeEntries = memo(({ entries, marketType, marketParameters }) => {
  const viewList = entries.map((id, index) => (
    <CoefficientContainer key={id} id={id}>
      {
        ({ ...props }) => (
          <Outcome
            text={outcomeTitleByMarketType(marketType)[hasTotalOrHandicap(marketParameters) ? index + 1 : index]}
            {...props}
          />
        )
      }
    </CoefficientContainer>
  ));

  if (marketType === EMarketType.score_1x2 && entries.length === 2) {
    return [viewList[0], <StubOutcome key={"stub"} />, viewList[1]];
  }

  return viewList;
});
OutcomeEntries.displayName = "OutcomeEntries";

const OutcomeContent = memo(({
  marketParameters,
  entries,
  marketType,
}) => (
  <div className={classes.marketGroup}>
    {
      hasTotalOrHandicap(marketParameters) && (
        <div className={classes.cell}>
          <div className={classes.params}>
            {marketParameters.total || marketParameters.handicap}
          </div>
        </div>
      )
    }

    <OutcomeEntries
      entries={entries}
      marketType={marketType}
      marketParameters={marketParameters}
    />
  </div>
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

const EventNumber = memo(({ eventId }) => {
  const eventNumber = useVirtualGameEventNumberIdSelector(eventId);

  return (
    <div className={classes.eventNumber}>
      {`ID ${eventNumber}`}
    </div>
  );
});
EventNumber.displayName = "EventNumber";

const Teams = memo(({ eventId, sportId }) => {
  const status = useParamSelector(eventStatusByIdSelector, [eventId]);

  return (
    <div className={classes.teams}>
      <ParticipantContainer eventId={eventId}>
        {
          (participants) => (
            <>
              {
                isVirtualSportWithTeamIcon(sportId)
                  ? (
                    <div className={classes.teamsIcons}>
                      {
                        participantTypesDoubleTuple.map((type) => (
                          <div className={classes.teamLogo} key={participants[type].teamId}>
                            <VirtualTeamIcon teamId={participants[type].teamId} />
                          </div>
                        ))
                      }
                    </div>
                  )
                  : null
              }

              <div className={classes.team}>
                {
                  participantTypesDoubleTuple.map((type) => (
                    <div className={classes.teamInfo} key={participants[type].teamId}>
                      <Ellipsis>
                        <BaseTeamName team={participants[type]} />
                      </Ellipsis>

                      {
                        isFinished(status) && (
                          <div className={classes.score}>
                            <DashScoreValue
                              eventId={eventId}
                              type={type}
                            />
                          </div>
                        )
                      }
                    </div>
                  ))
                }

                <EventNumber eventId={eventId} />
              </div>
            </>
          )
        }
      </ParticipantContainer>
    </div>
  );
});
Teams.displayName = "Teams";

const EventName = memo(({ eventId }) => {
  const eventName = useVirtualGameEventNameSelector(eventId);
  const eventNumber = useVirtualGameEventNumberIdSelector(eventId);

  return (
    <div className={classes.fullName}>
      <Ellipsis>
        {eventName}
      </Ellipsis>

      <div className={classes.eventNumber}>
        {"ID "}

        {eventNumber}
      </div>
    </div>
  );
});
EventName.displayName = "EventName";

const TotalMarkets = memo(({
  totalOutcomes,
  toggleHandler,
  expanded,
}) => (
  <div className={classes.totalMarkets} onClick={toggleHandler}>
    {
      totalOutcomes !== 0 && (
        <div>
          {totalOutcomes}
        </div>
      )
    }

    <DropdownIcon color={"darkText"} expanded={expanded} />
  </div>
));
TotalMarkets.displayName = "TotalMarkets";

const AdditionalMarkets = memo(({ eventId }) => {
  const addEventSubscriber = useAction(feedAddEventSubscriberAction);
  const removeEventSubscriber = useAction(feedRemoveEventSubscriberAction);
  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);
  const status = useParamSelector(eventStatusByIdSelector, [eventId]);

  useEffect(
    () => {
      if (isFinished(status)) {
        return void 0;
      }

      addEventSubscriber(eventSubscriberEnum.additionalMarkets, eventId);

      return () => {
        removeEventSubscriber(eventSubscriberEnum.additionalMarkets, eventId);
      };
    },
    [],
  );

  if (virtualRacingSport.includes(sportId)) {
    return (
      <VirtualRacingSport eventId={eventId} />
    );
  }

  return (
    <MarketGroups eventId={eventId} />
  );
});
AdditionalMarkets.displayName = "AdditionalMarkets";

const emptyChild = ({ type }) => (
  <div className={classes.marketGroup}>
    {
      outcomeTitleByMarketType(type).map((_, i) => (
        <EmptyOutcome key={i} />))
    }
  </div>
);

const EventRow = memo(({
  event: {
    id,
    sportId,
    status,
    startTime,
    totalOutcomes,
  },
  expanded,
  toggle,
}) => {
  const isVirtualRacing = virtualRacingSport.includes(sportId);

  const virtualRacingLoadStatistics = useAction(virtualRacingLoadStatisticsAction);

  const marketCount = useMedia(
    ["(min-width: 700px)", "(min-width: 550px)"],
    [3, 2],
    1,
  );

  const toggleHandler = () => {
    if (isVirtualRacing && !expanded) {
      virtualRacingLoadStatistics(id);
    }

    toggle();
  };

  const marketTypes = getMarketTypeListBySportId(sportId).slice(0, marketCount);

  return (
    <>
      <div className={clsx(classes.eventRow, expanded && classes.expanded)} onClick={withPreventDefault(toggleHandler)}>
        <EventStatus status={status} startTime={startTime} />

        {
          isVirtualRacing
            ? (
              <EventName sportId={sportId} eventId={id} />)
            : (
              <Teams sportId={sportId} eventId={id} />
            )
        }

        <TotalMarkets
          totalOutcomes={totalOutcomes}
          expanded={expanded}
        />

        <div className={classes.markets}>
          {
            marketTypes.map((marketType) => (
              <StubMarketFilterProvider marketType={marketType} key={marketType}>
                <MarketContainer
                  eventId={id}
                  child={Market}
                  emptyChild={emptyChild}
                />
              </StubMarketFilterProvider>
            ))
          }
        </div>
      </div>

      {expanded && <AdditionalMarkets eventId={id} />}
    </>
  );
});
EventRow.displayName = "EventRow";

const SimplyEventRowContent = memo((props) => {
  const [expanded, toggle] = useReducer(not<boolean>, false);

  return (
    <EventRow
      {...props}
      toggle={toggle}
      expanded={expanded}
    />
  );
});
SimplyEventRowContent.displayName = "SimplyEventRowContent";

const SimplyEventRow = withProps(EventContainer)({ contentView: SimplyEventRowContent });

const EventRowExpanded = memo(({ id, ...rest }) => (
  <EventContainer
    {...rest}
    eventId={id}
    contentView={EventRow}
  />
));
EventRowExpanded.displayName = "EventRowExpanded";

export {
  SimplyEventRow,
  EventRowExpanded,
};
