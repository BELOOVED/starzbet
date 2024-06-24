// @ts-nocheck
import clsx from "clsx";
import { createElement, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { sportsbookui_starzbet_liveEventPage_live } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap, sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { BaseTeamName } from "@sb/entity-translates";
import { useParamSelector } from "@sb/utils";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./EventOverall.module.css";
import { DateFormat } from "../../../../../../../common/Components/Date/DateFormat";
import { eventByIdSelector, sportIdByEventIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { FullEventStatus } from "../../../../../../Components/EventStatus/EventStatus";
import { isServer } from "../../../../../../Store/Feed/Model/Event";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { statisticViewMountedAction } from "../../../../../../Store/Statistics/StatisticsActions";
import { statisticsByEventIdSelector } from "../../../../../../Store/Statistics/Selectors/StatisticsSelectors";
import { DashScoreValue } from "../../../../../../Components/ScoreValue/ScoreValue";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { CurrentServer } from "../../../../../../Containers/ParticipantContainer/ParticipantContainer";
import { TeamIcon } from "../../../../../../Components/TeamIcon/TeamIcon";
import { OutrightName } from "../../../../../../Components/OutrightName/OutrightName";
import { BasketballWidget } from "../StatsWidget/BasketballWidget/BasketballWidget";
import { TennisWidget } from "../StatsWidget/TennisWidget/TennisWidget";
import { TableTennisWidget } from "../StatsWidget/TableTennisWidget/TableTennisWidget";
import { VolleyballWidget } from "../StatsWidget/VolleyballWidget/VolleyballWidget";
import { IceHockeyWidget } from "../StatsWidget/IceHockeyWidget/IceHockeyWidget";
import { BeachVolleyballWidget } from "../StatsWidget/BeachVolleyballWidget/BeachVolleyballWidget";
import { BadmintonWidget } from "../StatsWidget/BadmintonWidget/BadmintonWidget";
import { BaseballWidget } from "../StatsWidget/BaseballWidget/BaseballWidget";
import { EventButtons } from "../EventButtons/EventButtons";

const statsWidgets = {
  [sportCodeToIdMap[ESportCode.basketball]]: BasketballWidget,
  [sportCodeToIdMap[ESportCode.tennis]]: TennisWidget,
  [sportCodeToIdMap[ESportCode.table_tennis]]: TableTennisWidget,
  [sportCodeToIdMap[ESportCode.volleyball]]: VolleyballWidget,
  [sportCodeToIdMap[ESportCode.ice_hockey]]: IceHockeyWidget,
  [sportCodeToIdMap[ESportCode.beach_volleyball]]: BeachVolleyballWidget,
  [sportCodeToIdMap[ESportCode.badminton]]: BadmintonWidget,
  [sportCodeToIdMap[ESportCode.baseball]]: BaseballWidget,
};

const servedSports = [
  sportCodeToIdMap[ESportCode.tennis],
  sportCodeToIdMap[ESportCode.badminton],
  sportCodeToIdMap[ESportCode.snooker],
  sportCodeToIdMap[ESportCode.table_tennis],
];

const withService = (sportId) => servedSports.includes(sportId);

const EsportIcon = memo(({ sportId }) => {
  const esport = useRouteMatch(routeMap.esport.root);

  if (!esport) {
    return null;
  }

  return (
    <div
      className={`${classes.icon} ${classes[`--icon-${sportIdToCodeMap[sportId]}`]}`}
    />
  );
});
EsportIcon.displayName = "EsportIcon";

const Team = memo(({
  eventId,
  sportId,
  type,
  participants,
}) => {
  const teamId = participants[type].teamId;

  return (
    <div className={classes.team}>
      {
        withService(sportId)
          ? (
            <CurrentServer eventId={eventId}>
              {
                (server) => (
                  <div className={clsx(classes.player, isServer(participants[type].shortId, server) && classes.server)}>
                    <TeamIcon teamId={teamId} size={48} />
                  </div>
                )
              }
            </CurrentServer>
          )
          : (
            <div className={classes.teamIcon}>
              <TeamIcon teamId={teamId} size={48} />
            </div>
          )
      }

      <Ellipsis>
        <BaseTeamName team={participants[type]} />
      </Ellipsis>
    </div>
  );
});
Team.displayName = "Team";

const PreLiveCenter = memo(({ eventId, setStatistics, statistics }) => {
  const { startTime, sportId } = useParamSelector(eventByIdSelector, [eventId]);

  return (
    <div className={classes.preLiveCenter}>
      <EsportIcon sportId={sportId} />

      <div className={classes.date}>
        <span>
          <DateFormat date={startTime} format={"dd MMM yyyy"} />
        </span>

        <span>
          <DateFormat date={startTime} format={"HH:mm"} />
        </span>
      </div>

      <EventButtons eventId={eventId} setStatistics={setStatistics} statistics={statistics} />
    </div>
  );
});
PreLiveCenter.displayName = "PreLiveCenter";

const LiveCenter = memo(({ eventId, setStatistics, statistics }) => {
  const [t] = useTranslation();

  const { sportId } = useParamSelector(eventByIdSelector, [eventId]);

  return (
    <div className={classes.liveCenter}>
      <EsportIcon sportId={sportId} />

      <div className={classes.timeWrapper}>
        <span className={classes.liveCircle} />

        <FullEventStatus eventId={eventId} noop={t(sportsbookui_starzbet_liveEventPage_live)} />
      </div>

      <div className={classes.scores}>
        <div className={classes.scoreValue}>
          <DashScoreValue
            eventId={eventId}
            type={EParticipantType.team1}
          />
        </div>

        {":"}

        <div className={classes.scoreValue}>
          <DashScoreValue
            eventId={eventId}
            type={EParticipantType.team2}
          />
        </div>
      </div>

      <EventButtons
        eventId={eventId}
        setStatistics={setStatistics}
        statistics={statistics}
        isLive
      />
    </div>
  );
});
LiveCenter.displayName = "LiveCenter";

const EventOverall = memo(({
  eventId,
  participants,
  centerView,
  sportId,
  setStatistics,
  statistics,
}) => {
  const stats = useParamSelector(statisticsByEventIdSelector, [eventId]);

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(statisticViewMountedAction(eventId));
    },
    [],
  );

  return (
    <div className={classes.overallBackground}>
      <div className={classes.overall}>
        <div className={classes.column}>
          <Team
            eventId={eventId}
            sportId={sportId}
            type={EParticipantType.team1}
            participants={participants}
            statistics={stats?.statistics}
          />
        </div>

        <div className={classes.column}>
          {createElement(centerView, { eventId, setStatistics, statistics })}
        </div>

        <div className={classes.column}>
          <Team
            eventId={eventId}
            sportId={sportId}
            type={EParticipantType.team2}
            participants={participants}
            statistics={stats?.statistics}
          />
        </div>
      </div>
    </div>
  );
});
EventOverall.displayName = "EventOverall";

const OutrightOverall = memo(({
  id,
  sportId,
  startTime,
}) => (
  <div className={`${classes.overall} ${classes[`--${sportIdToCodeMap[sportId]}`]}`}>
    <div className={classes.column}>
      <div className={classes.outright}>
        <OutrightName id={id} />
      </div>

      <div className={classes.date}>
        <DateFormat date={startTime} format={"EE, dd MMM"} />
      </div>

      <div className={classes.timeOutright}>
        <DateFormat date={startTime} format={"HH:mm"} />
      </div>
    </div>
  </div>
));
OutrightOverall.displayName = "OutrightOverall";

const PreLiveEventOverall = memo((props) => (
  <EventOverall
    centerView={PreLiveCenter}
    {...props}
  />
));
PreLiveEventOverall.displayName = "PreLiveEventOverall";

const LiveEventOverall = memo(({ eventId, ...rest }) => {
  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);

  return (
    <div className={classes.liveEventOverall}>
      <div className={classes.lightnings}>
        <div className={classes.lightning} />

        <div className={clsx(classes.lightning, classes.lightningMirror)} />
      </div>

      <EventOverall
        centerView={LiveCenter}
        eventId={eventId}
        {...rest}
      />

      {statsWidgets[sportId] && createElement(statsWidgets[sportId], { eventId })}
    </div>
  );
});
LiveEventOverall.displayName = "LiveEventOverall";

export {
  OutrightOverall,
  PreLiveEventOverall,
  LiveEventOverall,
};
