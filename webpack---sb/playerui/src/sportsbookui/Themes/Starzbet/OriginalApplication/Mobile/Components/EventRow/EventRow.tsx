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
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import classes from "./EventRow.module.css";
import { NativeHorizontalScroll } from "../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { useWithoutFirstRender } from "../../../../../../../common/Hooks/UseWithoutFirstRender";
import type { IWithEventId, IWithSportId } from "../../../../../../../common/IWith";
import { Space } from "../../../../../../../common/Components/Space/Space";
import { DateFormat } from "../../../../../../../common/Components/Date/DateFormat";
import {
  eventByIdSelector,
  hasStatisticsByEventIdSelector,
  outrightByIdSelector,
} from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { getSportKindById } from "../../../../../../Store/Feed/Model/Sport";
import { ResetedLink, ResetedNavLink } from "../../../../../../Components/ResetedLink/ResetedLink";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { scrollToTop } from "../../../../../../Utils/ScrollToTop";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { outcomeTitleByMarketType } from "../../../../../../Store/Feed/Model/Outcome/OutcomeTitleMap";
import { ParticipantContainer } from "../../../../../../Containers/ParticipantContainer/ParticipantContainer";
import { participantTypesDoubleTuple } from "../../../../../../Store/Feed/Model/Event";
import { MarketContainer } from "../../../../../../Containers/MarketContainer/MarketContainer";
import { EventContainer } from "../../../../../../Containers/EventContainer/EventContainer";
import { StubMarketFilterProvider } from "../../../../../../Store/MarketFilter/MarketFilterProvider";
import { TeamIcon } from "../../../../../../Components/TeamIcon/TeamIcon";
import { OutrightName } from "../../../../../../Components/OutrightName/OutrightName";
import { useMainScoreValueByEventIdSelector } from "../../../../../../Store/Feed/Hooks/UseMainScoreValueByEventIdSelector";
import { scoreByTypeSelector } from "../../../../../../Store/Feed/Selectors/ScoreByTypeSelector";
import { type IWithEvent } from "../../../../../../Model/Bet";
import { getMarketTypeListBySportId } from "../../../../../Onwin2/GetMarketTypeListBySportId";
import { FullEventStatus } from "../../../Components/EventStatus/EventStatus";
import { StatsIcon } from "../../../Components/Icons/StatsIcon/StatsIcon";
import { EventFavIcon } from "../EventFavouriteButton/EventFavouriteButton";
import { EmptyOutcome, Market } from "../Market/Market";

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
  eventId,
  firstScore,
  secondScore,
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

const Date = memo(({ startTime }) => (
  <div className={classes.date}>
    <div className={classes.dateFormat}>
      <DateFormat date={startTime} format={"dd.MM.yyyy"} />
    </div>

    <div className={classes.time}>
      <DateFormat date={startTime} format={"HH:mm"} />
    </div>
  </div>
));
Date.displayName = "Date";

const PreLiveDate = memo(({ eventId }) => {
  const event = useParamSelector(eventByIdSelector, [eventId]);

  return (
    <div className={classes.preLiveDateContainer}>
      <Date startTime={event.startTime} />
    </div>
  );
});
PreLiveDate.displayName = "PreLiveDate";

const LiveDate = memo(({ eventId }) => {
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

const StatsBlock = memo(({ eventId }) => {
  const hasStatistics = useParamSelector(hasStatisticsByEventIdSelector, [eventId]);

  const params = { eventId };

  return hasStatistics
    ? (
      <ResetedNavLink
        className={classes.statsWrapper}
        to={routeMap.statistics.root}
        params={params}
      >
        <StatsIcon color={"darkText"} width={20} height={20} />
      </ResetedNavLink>
    )
    : (
      <div className={clsx(classes.statsWrapper, classes.disabled)}>
        <StatsIcon color={"darkText"} width={20} height={20} />
      </div>
    );
});
StatsBlock.displayName = "StatsBlock";

const Buttons = memo(({ eventId }) => (
  <div className={classes.block}>
    <StatsBlock eventId={eventId} />

    <EventFavIcon eventId={eventId} />
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
    <div className={clsx(classes.row, classes.outrightRow)}>
      <ResetedLink to={routeMap.preLive.outrights} params={params} onClick={scrollToTop}>
        <div className={classes.content}>
          <div className={classes.contentInner}>
            <div className={classes.outrightName}>
              <Ellipsis>
                <OutrightName id={id} />
              </Ellipsis>
            </div>

            <div className={classes.outrights}>
              {t(sportsbookui_starzbet_title_outrights)}

              {" >"}
            </div>

            <Date startTime={startTime} />
          </div>
        </div>
      </ResetedLink>
    </div>
  );
});
Outright.displayName = "Outright";

const emptyChild = ({ type }) => outcomeTitleByMarketType(type).map((_, i) => (<EmptyOutcome key={i} />));

const Markets = memo(({ sportId, eventId }) => {
  const marketTypes = getMarketTypeListBySportId(sportId);

  return (
    <div className={classes.marketsWrapper}>
      {
        <NativeHorizontalScroll trackClassName={classes.track} className={classes.scroll}>
          {
            marketTypes.map((marketType) => (
              <StubMarketFilterProvider marketType={marketType} key={marketType}>
                <MarketContainer
                  eventId={eventId}
                  child={Market}
                  emptyChild={emptyChild}
                />
              </StubMarketFilterProvider>
            ))
          }
        </NativeHorizontalScroll>
      }
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

  const date = live
    ? <LiveDate eventId={eventId} />
    : <PreLiveDate eventId={eventId} />;

  const params = { eventId };

  return (
    <div className={classes.row}>
      <ResetedLink
        to={getPathByMap(sportId, live)}
        params={params}
        onClick={scrollToTop}
        className={classes.link}
      >
        <div className={classes.content}>
          <div className={classes.infoContainer}>
            {animation && live ? <div className={classes.rowAnimation} onAnimationEnd={reset} /> : null}

            <div className={classes.contentInner}>
              <div className={classes.eventInfo}>
                <Teams eventId={eventId} isLive={live} />

                <div className={classes.contentSide}>
                  {
                    live
                      ? (
                        <Scores
                          eventId={eventId}
                          firstScore={firstScore}
                          secondScore={secondScore}
                          sportId={sportId}
                        />
                      )
                      : null
                  }
                </div>
              </div>

              <Buttons eventId={eventId} />

              <div className={classes.dateContainer}>
                {date}
              </div>
            </div>
          </div>

          <Markets eventId={eventId} sportId={sportId} tournamentId={tournamentId} />
        </div>
      </ResetedLink>
    </div>
  );
});
EventRowContent.displayName = "EventRowContent";

const EventRow = memo<IWithId>((props) => {
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
