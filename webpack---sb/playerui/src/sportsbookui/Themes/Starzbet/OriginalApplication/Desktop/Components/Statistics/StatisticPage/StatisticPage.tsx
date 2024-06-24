import { createElement, memo, useEffect } from "react";
import { type TComponent, useAction, useParamSelector, withProps } from "@sb/utils";
import {
  sportsbookui_starzbet_statistics_title_cantFetchStatisticsForThisEvent,
  sportsbookui_starzbet_statistics_title_statistics,
  sportsbookui_starzbet_title_outrights,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { BaseTeamName } from "@sb/entity-translates";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./StatisticPage.module.css";
import { useGoBack } from "../../../../../../../../common/Hooks/UseGoBack";
import type { IWithEventId, IWithSportId } from "../../../../../../../../common/IWith";
import { Empty } from "../../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import {
  participantsByEventIdSelector,
  sportIdByEventIdSelector,
  tournamentByEventIdNotNilSelector,
  tournamentByIdSelector,
} from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { statisticViewMountedAction } from "../../../../../../../Store/Statistics/StatisticsActions";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { EventContainer } from "../../../../../../../Containers/EventContainer/EventContainer";
import { isFakeOutrightTournamentId, unfakeOutrightTournamentId } from "../../../../../../../Store/SportMenu/Model/SportMenu";
import { TournamentName } from "../../../../../../../Components/TournamentName/TournamentName";
import { type IWidgetsProps, StatisticsContainer } from "../../../../../../../Containers/StatisticsContainer/StatisticsContainer";
import {
  type IWithEvent,
  type IWithEventIdFromMatch,
  type IWithParticipants,
  type IWithTournamentId,
} from "../../../../../../../Model/Bet";
import type { IWithEventStatistics } from "../../../../../../../Store/Statistics/Model/IWithEventStatistics";
import { getTeamsFromParticipants } from "../../../../../../../Utils/GetTeamsFromParticipants";
import { HeadToHead } from "../../../../Mobile/Components/Statistics/HeadToHead/HeadToHead";
import { StatisticsCurrentForm } from "../../../../Mobile/Components/Statistics/CurrentForm/CurrentForm";
import { LastMeetings } from "../../../../Mobile/Components/Statistics/LastMeetings/LastMeetings";
import { LastMatches } from "../../../../Mobile/Components/Statistics/LastMatches/LastMatches";
import { NextMatches } from "../../../../Mobile/Components/Statistics/NextMatches/NextMatches";
import { PlayerStatistics } from "../../../../Mobile/Components/Statistics/PlayerStatistics/PlayerStatistics";
import { LeaguePosition } from "../../../../Mobile/Components/Statistics/LeaguePosition/LeaguePosition";
import { EventSuspended } from "../../../../Mobile/Components/EventSuspended/EventSuspended";
import { Loader } from "../../../../Components/Loader/Loader";

type TWidgetProps = IWithEventStatistics & IWithSportId;

const widgetComponents: Record<EStatisticsWidget, TComponent<TWidgetProps>> = {
  [EStatisticsWidget.currentForm]: StatisticsCurrentForm,
  [EStatisticsWidget.headToHead]: HeadToHead,
  [EStatisticsWidget.lastMeetings]: LastMeetings,
  [EStatisticsWidget.lastMatches]: LastMatches,
  [EStatisticsWidget.nextMatches]: NextMatches,
  [EStatisticsWidget.playerStatistics]: PlayerStatistics,
  [EStatisticsWidget.leaguePosition]: LeaguePosition,
};

const Header = memo<IWithParticipants>(({ participants }) => {
  const [t] = useTranslation();

  const handler = useGoBack();

  const [team1, team2] = getTeamsFromParticipants(
    participants,
    ["StatisticPage", "Header"],
  );

  return (
    <div className={classes.header}>
      <div className={classes.info}>
        <div className={classes.title}>
          <Ellipsis>
            {t(sportsbookui_starzbet_statistics_title_statistics)}
          </Ellipsis>
        </div>

        <div className={classes.event}>
          <Ellipsis>
            <BaseTeamName team={team1} />

            {" - "}

            <BaseTeamName team={team2} />
          </Ellipsis>
        </div>
      </div>

      <div className={classes.close} onClick={handler} />
    </div>
  );
});
Header.displayName = "Header";

const Widgets = memo<IWidgetsProps & IWithSportId>(({
  widgets,
  stats,
  sportId,
}) => (
  <div className={classes.widgets}>
    {
      widgets.map((widget) => (
        createElement(widgetComponents[widget], { key: widget, statistics: stats.statistics, sportId: sportId })
      ))
    }
  </div>
));
Widgets.displayName = "Widgets";

const WrappedLoader = memo(() => (
  <div className={classes.statisticsLoading}>
    <Loader />
  </div>
));
WrappedLoader.displayName = "WrappedLoader";

const ErrorMessage = withProps(Empty)({
  messageTKey: sportsbookui_starzbet_statistics_title_cantFetchStatisticsForThisEvent,
});

const Statistic = memo<IWithEvent>(({ event: { id } }) => {
  const sportId = useParamSelector(sportIdByEventIdSelector, [id]);
  const showStatistic = useAction(statisticViewMountedAction);

  useEffect(
    () => {
      showStatistic(id);
    },
    [],
  );

  return (
    <div className={classes.popup}>
      <StatisticsContainer
        eventId={id}
        loader={WrappedLoader}
        error={ErrorMessage}
        widgetsContainer={withProps(Widgets)({ sportId: sportId })}
      />
    </div>
  );
});
Statistic.displayName = "Statistic";

const EventHeader = memo<IWithTournamentId & IWithEventId>(({ tournamentId, eventId }) => {
  const [t] = useTranslation();
  const participants = useParamSelector(participantsByEventIdSelector, [eventId]);
  const tournament = useParamSelector(tournamentByIdSelector, [unfakeOutrightTournamentId(tournamentId)]);

  return (
    <div className={classes.eventHeader}>
      <div className={classes.eventHeaderContentWrapper}>
        <div className={classes.backButtonBackground} onClick={useGoBack()}>
          <div className={classes.backButton} />
        </div>

        <div className={classes.headerInfo}>
          <div className={classes.tournament}>
            <Ellipsis>
              {
                tournament
                  ? (
                    <TournamentName
                      id={tournament.id}
                    />
                  )
                  : null
              }

              {
                isFakeOutrightTournamentId(tournamentId) && (
                  <>
                    {", "}

                    {t(sportsbookui_starzbet_title_outrights)}
                  </>
                )
              }
            </Ellipsis>
          </div>

          <div className={classes.participantsWrapper}>
            <div className={classes.participant}>
              <BaseTeamName team={participants[EParticipantType.team1]} />
            </div>

            <div>{" - "}</div>

            <div className={classes.participant}>
              <BaseTeamName team={participants[EParticipantType.team2]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
EventHeader.displayName = "EventHeader";

const FullStatistic = memo<IWithEvent>(({ event: { id } }) => {
  const sportId = useParamSelector(sportIdByEventIdSelector, [id]);
  const tournamentId = useParamSelector(tournamentByEventIdNotNilSelector, [id, ["FullStatistic"]]);

  return (
    <div className={classes.popup}>
      <EventHeader eventId={id} tournamentId={tournamentId} />

      <StatisticsContainer
        eventId={id}
        loader={WrappedLoader}
        error={ErrorMessage}
        widgetsContainer={withProps(Widgets)({ sportId: sportId })}
      />
    </div>
  );
});
FullStatistic.displayName = "FullStatistic";

const StatisticPage = memo<IWithEventId>(({ eventId }) => (
  <EventContainer
    eventId={eventId}
    contentView={Statistic}
    emptyView={EventSuspended}
  />
));
StatisticPage.displayName = "StatisticPage";

const FullStatisticPage = memo<IWithEventIdFromMatch>(({ match: { params: { eventId } } }) => (
  <EventContainer
    eventId={eventId}
    contentView={FullStatistic}
    emptyView={EventSuspended}
  />
));
FullStatisticPage.displayName = "FullStatisticPage";

export { StatisticPage, FullStatisticPage };
