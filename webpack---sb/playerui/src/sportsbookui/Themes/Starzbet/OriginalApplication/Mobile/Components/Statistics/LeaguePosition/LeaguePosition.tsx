import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_statistics_button_away,
  sportsbookui_starzbet_statistics_button_home,
  sportsbookui_starzbet_statistics_button_overall,
  sportsbookui_starzbet_statistics_leaguePosition_title_gamePoints,
  sportsbookui_starzbet_statistics_leaguePosition_title_gamesDraw,
  sportsbookui_starzbet_statistics_leaguePosition_title_gamesLost,
  sportsbookui_starzbet_statistics_leaguePosition_title_gamesPlayed,
  sportsbookui_starzbet_statistics_leaguePosition_title_gamesWon,
  sportsbookui_starzbet_statistics_leaguePosition_title_goalsAgainst,
  sportsbookui_starzbet_statistics_leaguePosition_title_goalsDifference,
  sportsbookui_starzbet_statistics_leaguePosition_title_goalsFor,
  sportsbookui_starzbet_statistics_leaguePosition_title_positionShort,
  sportsbookui_starzbet_statistics_leaguePosition_title_team,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { keyToComponent } from "@sb/utils";
import { BaseTeamName } from "@sb/entity-translates";
import { type ITournamentTable } from "@sb/statistics-core";
import classes from "./LeaguePosition.module.css";
import { When } from "../../../../../../../../common/Components/When";
import { range } from "../../../../../../../Utils/Range";
import { DEFAULT_LEAGUE_POSITION_TAB, ELeaguePositionTab, EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { type IWithEventStatistics } from "../../../../../../../Store/Statistics/Model/IWithEventStatistics";
import { ShowMoreInList } from "../ShowMoreButton/ShowMoreButton";
import { WidgetHeader } from "../WidgetHeader/WidgetHeader";
import { WidgetBody } from "../WidgetBody/WidgetBody";

const tabTKeys: Record<ELeaguePositionTab, string> = {
  [ELeaguePositionTab.total]: sportsbookui_starzbet_statistics_button_overall,
  [ELeaguePositionTab.home]: sportsbookui_starzbet_statistics_button_home,
  [ELeaguePositionTab.away]: sportsbookui_starzbet_statistics_button_away,
};

interface ILeaguePositionProps extends IWithEventStatistics {
  shortSize?: number;
}

const LeaguePosition = memo<ILeaguePositionProps>(({ statistics }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_LEAGUE_POSITION_TAB);

  const positions = statistics?.tournamentTable[0]?.table[activeTab] ?? [];

  return (
    <WidgetBody>
      <WidgetHeader
        type={EStatisticsWidget.leaguePosition}
      />

      <LeagueFormButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <PositionTable
        positions={positions}
        shownNumber={positions.length}
      />
    </WidgetBody>
  );
});
LeaguePosition.displayName = "LeaguePosition";

interface ILeaguePositionShortProps extends ILeaguePositionProps {
  disableShowMore: boolean;
}

const LeaguePositionShort = memo<ILeaguePositionShortProps>(({ statistics, shortSize = 2, disableShowMore }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_LEAGUE_POSITION_TAB);

  const positions = statistics.tournamentTable[0]?.table[activeTab] ?? [];

  const [shownNumber, setShownNumber] = useState(Math.min(positions.length, shortSize));

  return (
    <div className={classes.leaguePositionShort}>
      <WidgetHeader
        type={EStatisticsWidget.leaguePosition}
      />

      <LeagueFormButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <PositionTable
        positions={positions}
        shownNumber={shownNumber}
      />

      <When condition={!disableShowMore}>
        <ShowMoreInList
          itemsInList={positions.length}
          shortSize={shortSize}
          onChange={setShownNumber}
        />
      </When>
    </div>
  );
});
LeaguePositionShort.displayName = "LeaguePositionShort";

interface ITabProps extends ILeagueFormButtonsProps {
  tab: ELeaguePositionTab;
}

const Tab = memo<ITabProps>(({ tab, activeTab, setActiveTab }) => {
  const [t] = useTranslation();

  const clickHandler = useCallback(
    () => {
      setActiveTab(tab);
    },
    [tab],
  );

  return (
    <div className={clsx(classes.tab, tab === activeTab && classes.activeTab)} onClick={clickHandler}>
      {t(tabTKeys[tab])}
    </div>
  );
});
Tab.displayName = "Tab";

interface ILeagueFormButtonsProps {
  activeTab: ELeaguePositionTab;
  setActiveTab: (tab: ELeaguePositionTab) => void;
}

const LeagueFormButtons = memo<ILeagueFormButtonsProps>(({ activeTab, setActiveTab }) => (
  <div className={classes.threeButtons}>
    {Object.values(ELeaguePositionTab).map(keyToComponent("tab", { activeTab, setActiveTab })(Tab))}
  </div>
));
LeagueFormButtons.displayName = "LeagueFormButtons";

const statIndexAbbreviations = [
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_gamesPlayed },
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_gamesWon },
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_gamesDraw },
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_gamesLost },
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_goalsFor },
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_goalsAgainst },
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_goalsDifference },
  { abbr: sportsbookui_starzbet_statistics_leaguePosition_title_gamePoints },
];

interface IPositionTableProps {
  positions: ITournamentTable[];
  shownNumber: number;
}

const PositionTable = memo<IPositionTableProps>(({ positions, shownNumber }) => {
  const [t] = useTranslation();

  const mapStatIndexes = statIndexAbbreviations.map((p, i) => (
    <th className={classes.statIndex} key={i}>{t(p.abbr)}</th>
  ));

  return (
    <table className={classes.positionTable}>
      <thead className={classes.positionHead}>
        <tr>
          <th className={classes.positionShort}>{t(sportsbookui_starzbet_statistics_leaguePosition_title_positionShort)}</th>

          <th className={classes.arrowIcon} />

          <th className={classes.teamTitle}>{t(sportsbookui_starzbet_statistics_leaguePosition_title_team)}</th>

          {mapStatIndexes}
        </tr>
      </thead>

      <tbody>
        {
          range(0, Math.min(shownNumber - 1, positions.length - 1)).map((i) => (
            <TeamPositionStats {...positions[i]} key={i} />
          ))
        }
      </tbody>
    </table>
  );
});
PositionTable.displayName = "PositionTable";

const TeamPositionStats = memo<ITournamentTable>(({
  position,
  team,
  draw,
  loss,
  points,
  goalDiff,
  goalsAgainst,
  goalsFor,
  change,
  matchesCount,
  win,
}) => {
  const arrow = clsx(
    change === 0 && classes.zero,
    change > 0 && classes.up,
    change < 0 && classes.down,
  );
  const teamName = { teamId: team.id, name: team.name };

  return (
    <tr className={classes.teamPositionInfo}>
      <td className={classes.positionShortNumber}>{position}</td>

      <td>
        <div className={arrow} />
      </td>

      <td className={classes.teamTitle}>
        <BaseTeamName team={teamName} />
      </td>

      <td>{matchesCount}</td>

      <td>{win}</td>

      <td>{draw}</td>

      <td>{loss}</td>

      <td>{goalsFor}</td>

      <td>{goalsAgainst}</td>

      <td>{goalDiff}</td>

      <td>{points}</td>
    </tr>
  );
});
TeamPositionStats.displayName = "TeamPositionStats";

export { LeaguePosition };
