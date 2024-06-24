import clsx from "clsx";
import { memo, useState } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_statistics_title_noLastMeetingsAvailable } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./LastMeetings.module.css";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { range } from "../../../../../../../Utils/Range";
import { EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { type IWithEventStatistics } from "../../../../../../../Store/Statistics/Model/IWithEventStatistics";
import { type ILastMeetingsStats, selectLastMeetingsStats } from "../../../../../../../Store/Statistics/Selectors/LastMeetingsStats";
import { WidgetHeader } from "../WidgetHeader/WidgetHeader";
import { ShowMoreInList } from "../ShowMoreButton/ShowMoreButton";
import { WidgetBody } from "../WidgetBody/WidgetBody";

interface ILastMeetingsProps extends IWithEventStatistics {
  disableShowMore?: boolean;
}

const LastMeetings = memo<ILastMeetingsProps>(({ statistics, disableShowMore = false }) => {
  const [t] = useTranslation();
  const lastMatches = statistics.headToHead;

  const [shownNumber, setShownNumber] = useState(Math.min(lastMatches.length, 4));

  if (lastMatches.length === 0) {
    return (
      <span className={classes.noLastMeetings}>
        {t(sportsbookui_starzbet_statistics_title_noLastMeetingsAvailable)}
      </span>
    );
  }

  return (
    <WidgetBody>
      <WidgetHeader type={EStatisticsWidget.lastMeetings} />

      {range(0, shownNumber - 1).map((i) => <Match {...selectLastMeetingsStats(i, statistics)} key={i} />)}

      {
        !disableShowMore && (
          <ShowMoreInList
            itemsInList={lastMatches.length}
            shortSize={4}
            onChange={setShownNumber}
          />
        )
      }
    </WidgetBody>
  );
});
LastMeetings.displayName = "LastMeetings";

const LastMeetingsShort = memo<ILastMeetingsProps>(({ statistics, disableShowMore = false }) => {
  const [t] = useTranslation();
  const lastMatches = statistics.headToHead;

  const [shownNumber, setShownNumber] = useState(Math.min(lastMatches.length, 2));

  if (lastMatches.length === 0) {
    return (
      <span className={classes.noLastMeetings}>
        {t(sportsbookui_starzbet_statistics_title_noLastMeetingsAvailable)}
      </span>
    );
  }

  return (
    <div className={classes.lastMeetingsShort}>
      {range(0, shownNumber - 1).map((i) => <Match {...selectLastMeetingsStats(i, statistics)} key={i} />)}

      {
        !disableShowMore && (
          <ShowMoreInList
            itemsInList={lastMatches.length}
            shortSize={4}
            onChange={setShownNumber}
          />
        )
      }
    </div>
  );
});
LastMeetingsShort.displayName = "LastMeetingsShort";

const Match = memo<ILastMeetingsStats>(({
  home,
  away,
  score,
  time,
  tournament,
}) => (
  <div className={classes.row}>
    <div className={classes.lastMatch}>
      <div className={clsx(classes.homeTeam, score.home > score.away && classes.winner)}>
        <span className={classes.name}>
          <BaseTeamName team={home} />
        </span>

        <span className={classes.horizontalLine} />
      </div>

      <Score {...score} />

      <div className={clsx(classes.awayTeam, score.home < score.away && classes.winner)}>
        <span className={classes.horizontalLine} />

        <span className={classes.name}>
          <BaseTeamName team={away} />
        </span>
      </div>
    </div>

    <div className={classes.dateTournament}>
      <DateFormat date={time} format={"EEE d MMM yyyy"} />

      {` | ${tournament}`}
    </div>
  </div>
));
Match.displayName = "Match";

const Score = memo<ILastMeetingsStats["score"]>(({ home, away }) => (
  <div className={classes.score}>
    <span>
      {home}
    </span>

    <span className={classes.colon}>{":"}</span>

    <span>
      {away}
    </span>
  </div>
));
Score.displayName = "Score";

export { LastMeetings, LastMeetingsShort };
