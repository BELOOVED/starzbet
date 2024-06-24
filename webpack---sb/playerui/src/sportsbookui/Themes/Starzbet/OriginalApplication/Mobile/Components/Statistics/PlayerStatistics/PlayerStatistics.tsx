import { memo, useCallback, useRef, useState } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_statistics_title_goalsPerMatchAbr,
  sportsbookui_starzbet_statistics_title_goalsPerMatchTitle,
  sportsbookui_starzbet_statistics_title_matches,
  sportsbookui_starzbet_statistics_title_player,
  sportsbookui_starzbet_statistics_title_playerGoals,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { isNotNil } from "@sb/utils";
import { type IPlayer } from "@sb/statistics-core";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./PlayerStatistics.module.css";
import { When } from "../../../../../../../../common/Components/When";
import { Flag } from "../../../../../../../Components/Flag/Flag";
import { range } from "../../../../../../../Utils/Range";
import { EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import {
  calcGoalsPerMatch,
  playerPositionNormalizer,
  selectTeamByType,
  type TStatisticParticipant,
} from "../../../../../../../Store/Statistics/Selectors/StatisticsViewSelector";
import { type IWithEventStatistics } from "../../../../../../../Store/Statistics/Model/IWithEventStatistics";
import { ShowMoreInList } from "../ShowMoreButton/ShowMoreButton";
import { WidgetHeader } from "../WidgetHeader/WidgetHeader";
import { FullTeamNameHeader } from "../Matches/Matches";
import { WidgetBody } from "../WidgetBody/WidgetBody";

const shortSize = 4;

const shortSizeShort = 1;

interface IPlayerStatisticsProps extends IWithEventStatistics {
  disableShowMore?: boolean;
}

const PlayerStatistics = memo<IPlayerStatisticsProps>(({ statistics, disableShowMore = false }) => {
  const team1 = selectTeamByType(EParticipantType.team1, statistics);
  const team2 = selectTeamByType(EParticipantType.team2, statistics);

  const itemsInList = Math.max(team1.players.length, team2.players.length);

  const ref = useRef<HTMLDivElement>(null);

  const scrollBack = useCallback(
    () => {
      if (ref.current) {
        ref.current.scrollIntoView({ block: "start", inline: "nearest" });
      }
    },
    [],
  );

  return (
    <WidgetBody>
      <WidgetHeader
        type={EStatisticsWidget.playerStatistics}
      />

      <div className={classes.teamLeaders} ref={ref}>
        <Team
          team={team1}
          disableShowMore={disableShowMore}
          itemsInList={itemsInList}
          scrollBack={scrollBack}
        />

        <Team
          team={team2}
          disableShowMore={disableShowMore}
          itemsInList={itemsInList}
          scrollBack={scrollBack}
        />
      </div>

      <GoalsPerMatch />
    </WidgetBody>
  );
});
PlayerStatistics.displayName = "PlayerStatistics";

interface ITeamProps {
  team: TStatisticParticipant;
  disableShowMore: boolean;
  itemsInList: number;
  scrollBack: () => void;
}

const Team = memo<ITeamProps>(({
  team,
  itemsInList,
  disableShowMore,
  scrollBack,
}) => {
  const [shownNumber, setShownNumber] = useState(Math.min(itemsInList, shortSize));

  return (
    <>
      <TeamLeadersTable
        team={team}
        shownNumber={shownNumber}
      />

      <When condition={!disableShowMore}>
        <ShowMoreInList
          itemsInList={itemsInList}
          shortSize={shortSize}
          onChange={setShownNumber}
          scrollBack={scrollBack}
        />
      </When>
    </>
  );
});
Team.displayName = "Team";

const PlayerStatisticsShort = memo<IPlayerStatisticsProps>(({ statistics, disableShowMore = false }) => {
  const team1 = selectTeamByType(EParticipantType.team1, statistics);
  const team2 = selectTeamByType(EParticipantType.team2, statistics);

  const itemsInList = Math.max(team1.players.length, team2.players.length);

  const [shownNumber, setShownNumber] = useState(Math.min(itemsInList, shortSizeShort));

  return (
    <div className={classes.playerStatisticsShort}>
      <WidgetHeader
        type={EStatisticsWidget.playerStatistics}
      />

      <div className={classes.teamLeaders}>
        <TeamLeadersTable
          team={team1}
          shownNumber={shownNumber}
        />

        <TeamLeadersTable
          team={team2}
          shownNumber={shownNumber}
        />
      </div>

      <When condition={!disableShowMore}>
        <ShowMoreInList
          itemsInList={itemsInList}
          shortSize={shortSizeShort}
          onChange={setShownNumber}
        />
      </When>
    </div>
  );
});
PlayerStatisticsShort.displayName = "PlayerStatisticsShort";

const PlayerStats = memo<IPlayer>(({
  name,
  birthdate,
  position,
  stats,
  nationality,
}) => (
  <tr className={classes.playerIndexes}>
    <td className={classes.playerNameTitle}>
      <div className={classes.playerInfo}>
        <div className={classes.name}>{name}</div>

        <div className={classes.player}>
          <div className={classes.playerOrigin}>
            <Flag country={nationality} />
          </div>

          <div className={classes.agePosition}>
            {playerPositionNormalizer(birthdate, position)}
          </div>
        </div>
      </div>
    </td>

    <td className={classes.matchStatIndex}>{isNotNil(stats) ? stats.matches : 0}</td>

    <td className={classes.matchStatIndex}>{isNotNil(stats) && stats.matches ? stats.goals : 0}</td>

    <td className={classes.matchStatIndex}>{calcGoalsPerMatch(stats)}</td>
  </tr>
));
PlayerStats.displayName = "PlayerStats";

interface ITeamLeadersTableProps {
  team: TStatisticParticipant;
  shownNumber: number;
}

const TeamLeadersTable = memo<ITeamLeadersTableProps>(({ team, shownNumber }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.topPlayersStats}>
      <FullTeamNameHeader
        team={team}
      />

      <table className={classes.topPlayers}>
        <thead className={classes.topPlayersHead}>
          <tr>
            <th className={classes.playerName}>{t(sportsbookui_starzbet_statistics_title_player)}</th>

            <th className={classes.matchStat}>{t(sportsbookui_starzbet_statistics_title_matches)}</th>

            <th className={classes.matchStat}>{t(sportsbookui_starzbet_statistics_title_playerGoals)}</th>

            <th className={classes.matchStat}>{t(sportsbookui_starzbet_statistics_title_goalsPerMatchAbr)}</th>
          </tr>
        </thead>

        <tbody className={classes.topPlayersBody}>
          {
            range(0, Math.min(shownNumber - 1, team.players.length - 1))
              .map((i) => <PlayerStats {...team.players[i]} key={i} />)
          }
        </tbody>
      </table>
    </div>
  );
});
TeamLeadersTable.displayName = "TeamLeadersTable";

const GoalsPerMatch = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.goalsPerMatchInfo}>{t(sportsbookui_starzbet_statistics_title_goalsPerMatchTitle)}</div>
  );
});
GoalsPerMatch.displayName = "GoalsPerMatch";

export { PlayerStatistics };
