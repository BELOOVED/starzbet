import clsx from "clsx";
import { memo, useCallback, useRef, useState } from "react";
import { BaseTeamName } from "@sb/entity-translates";
import { type IMatch, type TStatisticsParticipants } from "@sb/statistics-core";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./Matches.module.css";
import { When } from "../../../../../../../../common/Components/When";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { selectScoreForMatch, type TStatisticParticipant } from "../../../../../../../Store/Statistics/Selectors/StatisticsViewSelector";
import { range } from "../../../../../../../Utils/Range";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { type EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { TeamIcon } from "../../../../../../../Components/TeamIcon/TeamIcon";
import { ShowMoreInList } from "../ShowMoreButton/ShowMoreButton";
import { WidgetHeader } from "../WidgetHeader/WidgetHeader";
import { WidgetBody } from "../WidgetBody/WidgetBody";

const shortSize = 4;

const shortSizeShort = 1;

interface ITeamProps {
  matches: Record<TStatisticsParticipants, IMatch[]>;
  team: TStatisticParticipant;
  disableShowMore: boolean;
  itemsInList: number;
  scrollBack: () => void;
}

const Team = memo<ITeamProps>(({
  team,
  itemsInList,
  matches,
  disableShowMore,
  scrollBack,
}) => {
  const [shownNumber, setShownNumber] = useState(Math.min(itemsInList, shortSize));

  const matchesTeam = matches[team.teamId];

  return (
    <>
      <div className={classes.teamLastFourMatches}>
        <FullTeamNameHeader
          team={team}
        />

        {range(0, Math.min(shownNumber - 1, matchesTeam.length - 1)).map((i) => <Match {...matchesTeam[i]} key={i} />)}
      </div>

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

interface IMatchesProps extends Record<TStatisticsParticipants, TStatisticParticipant> {
  header: EStatisticsWidget;
  disableShowMore: boolean;
  matches: Record<TStatisticsParticipants, IMatch[]>;
}

const Matches = memo<IMatchesProps>(({
  matches,
  team1,
  team2,
  disableShowMore,
  header,
}) => {
  const itemsInList = Math.max(...Object.values(matches).map((arr) => arr.length));

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
      <WidgetHeader type={header} />

      <div className={classes.teamsCurrentForm} ref={ref}>
        <Team
          matches={matches}
          team={team1}
          disableShowMore={disableShowMore}
          itemsInList={itemsInList}
          scrollBack={scrollBack}
        />

        <Team
          matches={matches}
          team={team2}
          disableShowMore={disableShowMore}
          itemsInList={itemsInList}
          scrollBack={scrollBack}
        />
      </div>
    </WidgetBody>
  );
});
Matches.displayName = "Matches";

const MatchesShort = memo<IMatchesProps>(({
  matches,
  team1,
  team2,
  disableShowMore,
}) => {
  const itemsInList = Math.max(...Object.values(matches).map((arr) => arr.length));

  const [shownNumber, setShownNumber] = useState(Math.min(itemsInList, shortSizeShort));

  const matchesTeam1 = matches[team1.teamId];
  const matchesTeam2 = matches[team2.teamId];

  return (
    <div className={classes.lastFourMatchesShort}>
      <div className={classes.teamsCurrentForm}>
        <div className={classes.teamLastFourMatches}>
          <FullTeamNameHeader
            team={team1}
          />

          {range(0, Math.min(shownNumber - 1, matchesTeam1.length - 1)).map((i) => <Match {...matchesTeam1[i]} key={i} />)}
        </div>

        <div className={classes.teamLastFourMatches}>
          <FullTeamNameHeader
            team={team2}
          />

          {range(0, Math.min(shownNumber - 1, matchesTeam2.length - 1)).map((i) => <Match {...matchesTeam2[i]} key={i} />)}
        </div>
      </div>

      <When condition={!disableShowMore}>
        <ShowMoreInList
          itemsInList={itemsInList}
          shortSize={shortSize}
          onChange={setShownNumber}
        />
      </When>
    </div>
  );
});
MatchesShort.displayName = "MatchesShort";

interface IFullTeamNameHeaderProps {
  team: TStatisticParticipant;
}

const FullTeamNameHeader = memo<IFullTeamNameHeaderProps>(({ team }) => (
  <div className={classes.fullTeamName}>
    <div className={classes.teamIcon}>
      <TeamIcon teamId={team.id} />
    </div>

    <div className={classes.fullTeamNameTitle}>
      <Ellipsis>
        <BaseTeamName team={team} />
      </Ellipsis>
    </div>
  </div>
));
FullTeamNameHeader.displayName = "FullTeamNameHeader";

const Match = memo<IMatch>(({
  time,
  tournament,
  participants,
  scores,
}) => {
  const home = selectScoreForMatch(scores, EParticipantType.team1);
  const away = selectScoreForMatch(scores, EParticipantType.team2);
  const team1 = participants[EParticipantType.team1];
  const team2 = participants[EParticipantType.team2];

  const team1Name = { teamId: team1.id, name: team1.name };
  const team2Name = { teamId: team2.id, name: team2.name };

  return (
    <div className={classes.fullMatchInfo}>
      <div className={classes.match}>
        <div className={classes.block}>
          <div className={clsx(classes.homeTeam, home > away && classes.winner)}>
            <BaseTeamName team={team1Name} />
          </div>

          <span className={classes.horizLine} />
        </div>

        <MatchScore
          home={home}
          away={away}
        />

        <div className={classes.block}>
          <span className={classes.horizLine} />

          <div className={clsx(classes.awayTeam, home < away && classes.winner)}>
            <BaseTeamName team={team2Name} />
          </div>
        </div>
      </div>

      <div className={classes.tournamentName}>
        <DateFormat date={time} format={"EEE d MMM yyyy"} />

        {` | ${tournament}`}
      </div>
    </div>
  );
});
Match.displayName = "Match";

interface IMatchScoreProps {
  home: number | null;
  away: number | null;
}

const MatchScore = memo<IMatchScoreProps>(({ home, away }) => (
  <div className={classes.score}>
    <span>
      {home === null ? "-" : home}
    </span>

    <span className={classes.colon}>{":"}</span>

    <span>
      {away === null ? "-" : away}
    </span>
  </div>
));
MatchScore.displayName = "MatchScore";

export { Matches, FullTeamNameHeader, MatchesShort };
