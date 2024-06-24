import {
  sportsbookui_statistics_widgetName_currentForm,
  sportsbookui_statistics_widgetName_headToHead,
  sportsbookui_statistics_widgetName_lastMatches,
  sportsbookui_statistics_widgetName_lastMeetings,
  sportsbookui_statistics_widgetName_leaguePosition,
  sportsbookui_statistics_widgetName_nextMatches,
  sportsbookui_statistics_widgetName_playerStatistics,
} from "@sb/translates/sportsbookui/CommonTKeys";

enum EStatisticsWidget {
  currentForm = "currentForm",
  headToHead = "headToHead",
  lastMeetings = "lastMeetings",
  lastMatches = "lastMatches",
  nextMatches = "nextMatches",
  playerStatistics = "playerStatistics",
  leaguePosition = "leaguePosition",
}

const statisticsWidgetTKeys: Record<EStatisticsWidget, string> = {
  [EStatisticsWidget.currentForm]: sportsbookui_statistics_widgetName_currentForm,
  [EStatisticsWidget.headToHead]: sportsbookui_statistics_widgetName_headToHead,
  [EStatisticsWidget.lastMeetings]: sportsbookui_statistics_widgetName_lastMeetings,
  [EStatisticsWidget.lastMatches]: sportsbookui_statistics_widgetName_lastMatches,
  [EStatisticsWidget.nextMatches]: sportsbookui_statistics_widgetName_nextMatches,
  [EStatisticsWidget.playerStatistics]: sportsbookui_statistics_widgetName_playerStatistics,
  [EStatisticsWidget.leaguePosition]: sportsbookui_statistics_widgetName_leaguePosition,
};

enum ELeaguePositionTab {
  home = "home",
  away = "away",
  total = "total"
}

const DEFAULT_LEAGUE_POSITION_TAB = ELeaguePositionTab.home;

export {
  EStatisticsWidget,
  ELeaguePositionTab,
  statisticsWidgetTKeys,
  DEFAULT_LEAGUE_POSITION_TAB,
};
