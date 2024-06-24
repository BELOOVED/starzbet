// @ts-nocheck
import { createElement, memo } from "react";
import {
  sportsbookui_starzbet_statistics_title_cantFetchStatisticsForThisEvent,
  sportsbookui_starzbet_statistics_title_statistics,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { BaseTeamName } from "@sb/entity-translates";
import { useParamSelector } from "@sb/utils";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./StatisticPopup.module.css";
import { Loader } from "../../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { useLockBodyScroll } from "../../../../../../../../common/Hooks/UseLockBodyScroll";
import { CloseIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { useGoBack } from "../../../../../../../../common/Hooks/UseGoBack";
import { sportIdByEventIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import {
  useAvailableStatsWidgetSelector,
} from "../../../../../../../Store/Statistics/Hooks/UseAvailableStatsWidgetSelector";
import {
  statisticsByEventIdSelector,
  statisticsErrorSelector,
  statisticsLoadingSelector,
} from "../../../../../../../Store/Statistics/Selectors/StatisticsSelectors";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { StatisticsCurrentForm } from "../CurrentForm/CurrentForm";
import { HeadToHead } from "../HeadToHead/HeadToHead";
import { LastMeetings } from "../LastMeetings/LastMeetings";
import { LastMatches } from "../LastMatches/LastMatches";
import { NextMatches } from "../NextMatches/NextMatches";
import { PlayerStatistics } from "../PlayerStatistics/PlayerStatistics";
import { LeaguePosition } from "../LeaguePosition/LeaguePosition";

const widgetComponents = {
  [EStatisticsWidget.currentForm]: StatisticsCurrentForm,
  [EStatisticsWidget.headToHead]: HeadToHead,
  [EStatisticsWidget.lastMeetings]: LastMeetings,
  [EStatisticsWidget.lastMatches]: LastMatches,
  [EStatisticsWidget.nextMatches]: NextMatches,
  [EStatisticsWidget.playerStatistics]: PlayerStatistics,
  [EStatisticsWidget.leaguePosition]: LeaguePosition,
};

const Header = memo(({ participants }) => {
  const [t] = useTranslation();

  const handler = useGoBack();

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
            <BaseTeamName team={participants[EParticipantType.team1]} />

            {" - "}

            <BaseTeamName team={participants[EParticipantType.team2]} />
          </Ellipsis>
        </div>
      </div>

      <div className={classes.close} onClick={handler}>
        <CloseIcon />
      </div>
    </div>
  );
});
Header.displayName = "Header";

const Widgets = memo(({
  widgets,
  stats,
  isLoading,
  isError,
  sportId,
}) => {
  const [t] = useTranslation();

  if (!stats || isError) {
    return (
      <div className={classes.statisticsLoadingError}>
        {t(sportsbookui_starzbet_statistics_title_cantFetchStatisticsForThisEvent)}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={classes.statisticsLoading}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.widgets}>
      {
        widgets.map((widget) => (
          createElement(widgetComponents[widget], { key: widget, statistics: stats.statistics, sportId: sportId })
        ))
      }
    </div>
  );
});
Widgets.displayName = "Widgets";

const StatisticPopup = memo(({ event: { id, participants } }) => {
  const widgets = useAvailableStatsWidgetSelector(id);
  const stats = useParamSelector(statisticsByEventIdSelector, [id]);
  const sportId = useParamSelector(sportIdByEventIdSelector, [id]);

  const isLoading = useParamSelector(statisticsLoadingSelector, [id]);
  const isError = useParamSelector(statisticsErrorSelector, [id]);

  useLockBodyScroll();

  return (
    <div className={classes.popup}>
      <Header participants={participants} />

      <Widgets
        widgets={widgets}
        stats={stats}
        isLoading={isLoading}
        isError={isError}
        sportId={sportId}
      />
    </div>
  );
});
StatisticPopup.displayName = "StatisticPopup";

export { StatisticPopup };
