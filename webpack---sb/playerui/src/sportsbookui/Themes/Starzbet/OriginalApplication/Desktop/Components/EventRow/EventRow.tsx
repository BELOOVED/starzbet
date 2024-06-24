// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { ESportKind } from "@sb/betting-core/ESportKind";
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_eventRow_goal,
  sportsbookui_starzbet_eventRow_live,
  sportsbookui_starzbet_title_outrights,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import { BaseTeamName } from "@sb/entity-translates";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import { EScoreType } from "@sb/betting-core/EScoreType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./EventRow.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { useModalOpenAction } from "../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { type IWithEventId, type IWithSportId, type IWithStartTime } from "../../../../../../../common/IWith";
import { useWithoutFirstRender } from "../../../../../../../common/Hooks/UseWithoutFirstRender";
import { Space } from "../../../../../../../common/Components/Space/Space";
import { DateFormat } from "../../../../../../../common/Components/Date/DateFormat";
import {
  eventByIdSelector,
  hasStatisticsByEventIdSelector,
  outrightByIdSelector,
} from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { getSportKindById } from "../../../../../../Store/Feed/Model/Sport";
import { ResetedLink } from "../../../../../../Components/ResetedLink/ResetedLink";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { scrollToTop } from "../../../../../../Utils/ScrollToTop";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { outcomeTitleByMarketType } from "../../../../../../Store/Feed/Model/Outcome/OutcomeTitleMap";
import { ParticipantContainer } from "../../../../../../Containers/ParticipantContainer/ParticipantContainer";
import { participantTypesDoubleTuple } from "../../../../../../Store/Feed/Model/Event";
import { MarketContainer, MarketPresetContainer } from "../../../../../../Containers/MarketContainer/MarketContainer";
import { EventContainer } from "../../../../../../Containers/EventContainer/EventContainer";
import { StubMarketFilterProvider } from "../../../../../../Store/MarketFilter/MarketFilterProvider";
import { useMedia } from "../../../../../../Hooks/UseMedia";
import { TeamIcon } from "../../../../../../Components/TeamIcon/TeamIcon";
import { marketFilterTypeByTournamentMapSelector } from "../../../../../../Store/MarketFilter/Selectors/MarketFilterSelectors";
import { OutrightName } from "../../../../../../Components/OutrightName/OutrightName";
import { type IWithEvent } from "../../../../../../Model/Bet";
import { useMainScoreValueByEventIdSelector } from "../../../../../../Store/Feed/Hooks/UseMainScoreValueByEventIdSelector";
import { scoreByTypeSelector } from "../../../../../../Store/Feed/Selectors/ScoreByTypeSelector";
import { noop } from "../../../../../../Utils/Noop";
import { EventFavIcon } from "../../../Mobile/Components/EventFavouriteButton/EventFavouriteButton";
import { EmptyOutcome, Market } from "../../../Components/Market/Market";
import { FullEventStatus } from "../../../Components/EventStatus/EventStatus";
import { StatsIcon } from "../../../Components/Icons/StatsIcon/StatsIcon";

const pathMap = {
  [ESportKind.base]: {
    prelive: routeMap.preLive.event,
    live: routeMap.live.event,
  },
  [ESportKind.esport]: {
    prelive: routeMap.esport.preLive.event,
    live: routeMap.esport.live.event,
  },
};

const getPathByMap = (sportId, live) => {
  const kind = getSportKindById(sportId);

  if (!pathMap[kind]) {
    throw new Error("EventRow: invalid path");
  }

  return live ? pathMap[kind].live : pathMap[kind].prelive;
};

const Teams = memo(({ eventId, isLive }) => (
  <div className={classes.teams}>
    <ParticipantContainer eventId={eventId}>
      {
        (participants) => (
          <>
            {
              participantTypesDoubleTuple.map((type) => (
                <div
                  className={clsx(classes.team, isLive && classes.teamMarginLive)}
                  key={participants[type].teamId}
                >
                  <div className={classes.teamIconWrapper} key={participants[type].teamId}>
                    <TeamIcon className={classes.teamIcon} teamId={participants[type].teamId} />
                  </div>

                  <Ellipsis>
                    <BaseTeamName team={participants[type]} />
                  </Ellipsis>
                </div>
              ))
            }
          </>
        )
      }
    </ParticipantContainer>
  </div>
));
Teams.displayName = "Teams";

interface IScoreProps extends IWithEventId, IWithSportId {
  score: number | undefined;
  type: EParticipantType;
}

const Score = memo<IScoreProps>(({
  score,
  eventId,
  type,
  sportId,
}) => {
  const [animation, reset] = useWithoutFirstRender(score);
  const yellowCards = useParamSelector(scoreByTypeSelector, [eventId, type, EScoreType.yellow_card]);
  const redCards = useParamSelector(scoreByTypeSelector, [eventId, type, EScoreType.red_card]);
  const [t] = useTranslation();
  const footballId = sportCodeToIdMap[ESportCode.soccer];
  const isSoccer = sportId === footballId;

  // TODO @Litavar wait BE fix
  return (
    <Space value={4} alignCenter>
      {yellowCards && redCards ? null : null}

      {animation && isSoccer ? <div className={classes.scoreText}>{t(sportsbookui_starzbet_eventRow_goal)}</div> : null}

      <div className={clsx(classes.score, animation && classes.scoreAnimation)} onAnimationEnd={reset}>
        {score ?? ""}
      </div>
    </Space>
  );
});
Score.displayName = "Score";

interface IScoresProps extends IWithEventId, IWithSportId {
  firstScore: number | undefined;
  secondScore: number | undefined;
}

const Scores = memo<IScoresProps>(({
  firstScore,
  secondScore,
  eventId,
  sportId,
}) => (
  <div className={classes.scores}>
    <Score
      score={firstScore}
      eventId={eventId}
      type={EParticipantType.team1}
      sportId={sportId}
    />

    <Score
      score={secondScore}
      eventId={eventId}
      type={EParticipantType.team2}
      sportId={sportId}
    />
  </div>
));
Scores.displayName = "Scores";

const Date = memo<IWithStartTime>(({ startTime }) => (
  <div className={classes.date}>
    <div className={classes.time}>
      <DateFormat date={startTime} format={"HH:mm"} />
    </div>

    <div className={classes.dateFormat}>
      <Ellipsis>
        <DateFormat date={startTime} format={"MMM dd"} />
      </Ellipsis>
    </div>
  </div>
));
Date.displayName = "Date";

const PreLiveDate = memo<IWithEventId>(({ eventId }) => {
  const event = useParamSelector(eventByIdSelector, [eventId]);

  return (
    <div className={classes.preLiveDateContainer}>
      <Date startTime={event.startTime} />
    </div>
  );
});
PreLiveDate.displayName = "PreLiveDate";

const LiveDate = memo<IWithEventId>(({ eventId }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.liveDate}>
      <div className={classes.minute}>
        <FullEventStatus eventId={eventId} noop={(t(sportsbookui_starzbet_eventRow_live))} />
      </div>
    </div>
  );
});
LiveDate.displayName = "LiveDate";

const StatisticButton = memo<IWithEventId>(({ eventId }) => {
  const hasStatistics = useParamSelector(hasStatisticsByEventIdSelector, [eventId]);

  const openModal = useModalOpenAction(EModal.statistics, { eventId });

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasStatistics) {
      return;
    }

    openModal();
  };

  return (
    <div className={clsx(classes.statsWrapper, !hasStatistics && classes.disabled)} onClick={hasStatistics ? handleClick : noop}>
      <StatsIcon color={"darkText"} width={20} height={20} />
    </div>
  );
});
StatisticButton.displayName = "StatisticButton";

const TotalMarkets = memo<IWithEventId>(({ eventId }) => {
  const { totalOutcomes } = useParamSelector(eventByIdSelector, [eventId]);

  if (!totalOutcomes) {
    return <div className={clsx(classes.totalMarkets, classes.empty)} />;
  }

  return (
    <div className={classes.totalMarkets}>
      {`+${totalOutcomes}`}
    </div>
  );
});
TotalMarkets.displayName = "TotalMarkets";

const Buttons = memo<IWithEventId>(({ eventId }) => (
  <div className={classes.block}>
    <EventFavIcon eventId={eventId} />

    <TotalMarkets eventId={eventId} />
  </div>
));
Buttons.displayName = "Buttons";

const Outright = memo(({
  id,
  startTime,
}) => {
  const [t] = useTranslation();

  const params = { id };

  return (
    <div className={classes.row}>
      <ResetedLink to={routeMap.preLive.outrights} params={params} onClick={scrollToTop}>
        <div className={classes.content}>
          <div className={classes.contentInner}>
            <Date startTime={startTime} />

            <div className={classes.outrightName}>
              <Ellipsis>
                <OutrightName id={id} />
              </Ellipsis>
            </div>

            <div className={classes.outrights}>
              {t(sportsbookui_starzbet_title_outrights)}

              {" >"}
            </div>
          </div>
        </div>
      </ResetedLink>
    </div>
  );
});
Outright.displayName = "Outright";

const emptyChild = ({ type }) => outcomeTitleByMarketType(type).map((_, i) => (<EmptyOutcome key={i} />));

const Markets = memo(({ sportId, eventId, tournamentId }) => {
  const marketType = useParamSelector(marketFilterTypeByTournamentMapSelector, [tournamentId, sportId]);

  return (
    <div className={classes.columnMarketsWrapper}>
      <div className={classes.column}>
        {
          IS_MOBILE_CLIENT_SIDE
            ? (
              <MarketPresetContainer
                eventId={eventId}
                child={Market}
                emptyChild={emptyChild}
              />
            )
            : (
              <StubMarketFilterProvider marketType={marketType} key={marketType}>
                <MarketContainer
                  eventId={eventId}
                  child={Market}
                  emptyChild={emptyChild}
                />
              </StubMarketFilterProvider>
            )
        }
      </div>
    </div>
  );
});
Markets.displayName = "Markets";

const EventRowContent = memo<IWithId & IWithEvent>(({
  id: eventId,
  event: {
    sportId,
    tournamentId,
    status,
  },
}) => {
  const live = isLive(status);
  const firstScore = useMainScoreValueByEventIdSelector(eventId, EParticipantType.team1);
  const secondScore = useMainScoreValueByEventIdSelector(eventId, EParticipantType.team2);
  const [animation, reset] = useWithoutFirstRender(firstScore, secondScore);

  const minimize = useMedia(
    ["(min-width: 1000.02px)"],
    [false],
    true,
  );

  const date = live
    ? <LiveDate eventId={eventId} />
    : <PreLiveDate eventId={eventId} />;

  const params = { eventId };

  return (
    <div className={classes.row}>
      {animation && live ? <div className={classes.rowAnimation} onAnimationEnd={reset} /> : null}

      <ResetedLink
        to={getPathByMap(sportId, live)}
        params={params}
        onClick={scrollToTop}
        className={classes.link}
      >
        <div className={classes.content}>
          <div className={classes.contentInner}>
            <div className={classes.eventInfo}>
              <div className={classes.contentSide}>
                {
                  !minimize
                    ? (
                      <div className={classes.dateContainer}>
                        {date}
                      </div>
                    )
                    : null
                }

                <Teams eventId={eventId} isLive={live} />
              </div>

              <div className={classes.contentSide}>
                {live ? <Scores firstScore={firstScore} secondScore={secondScore} eventId={eventId} /> : null}

                {!minimize ? <StatisticButton eventId={eventId} /> : null}
              </div>
            </div>

            <Markets eventId={eventId} sportId={sportId} tournamentId={tournamentId} />

            <Buttons eventId={eventId} />
          </div>
        </div>
      </ResetedLink>
    </div>
  );
});
EventRowContent.displayName = "EventRowContent";

const EventRow = memo((props) => {
  const outright = useParamSelector(outrightByIdSelector, [props.id]);

  return (
    outright
      ? (
        <Outright {...outright} {...props} />
      )
      : (
        <EventContainer
          eventId={props.id}
          contentView={EventRowContent}
          {...props}
        />
      )
  );
});
EventRow.displayName = "EventRow";

export { EventRow };
