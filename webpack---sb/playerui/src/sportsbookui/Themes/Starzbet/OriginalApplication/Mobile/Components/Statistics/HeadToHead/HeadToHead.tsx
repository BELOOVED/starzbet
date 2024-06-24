import clsx from "clsx";
import { type CSSProperties, type FC, type JSX, memo, type ReactNode } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_statistics_headToHead_avgGoals,
  sportsbookui_starzbet_statistics_headToHead_bestScore,
  sportsbookui_starzbet_statistics_headToHead_won,
  sportsbookui_starzbet_title_draw,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { BaseTeamName } from "@sb/entity-translates";
import { entries } from "@sb/utils";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import classes from "./HeadToHead.module.css";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { selectTeamByType, type TStatisticParticipant } from "../../../../../../../Store/Statistics/Selectors/StatisticsViewSelector";
import { computeH2hStats, type IHead2HeadStats } from "../../../../../../../Store/Statistics/Selectors/Head2HeadStats";
import { type IWithEventStatistics } from "../../../../../../../Store/Statistics/Model/IWithEventStatistics";
import { WidgetHeader } from "../WidgetHeader/WidgetHeader";
import { WidgetBody } from "../WidgetBody/WidgetBody";

const headToHeadTKeys = {
  bestScore: sportsbookui_starzbet_statistics_headToHead_bestScore,
  avgGoals: sportsbookui_starzbet_statistics_headToHead_avgGoals,
};

const getWidth = (width: number | string): CSSProperties => ({ width });

const HeadToHead = memo<IWithEventStatistics>(({ statistics }) => {
  const homeTeam = selectTeamByType(EParticipantType.team1, statistics);
  const awayTeam = selectTeamByType(EParticipantType.team2, statistics);

  const {
    home,
    away,
    draw,
    ptc,
    best,
    avgGoals,
  } = computeH2hStats(statistics);

  const homeStats = {
    avgGoals: <span>{avgGoals.home}</span>,
    bestScore: (
      <span>
        <Score>{best.home}</Score>
      </span>
    ),
  };

  const awayStats = {
    avgGoals: <span>{avgGoals.away}</span>,
    bestScore: (
      <span>
        <Score>{best.away}</Score>
      </span>
    ),
  };

  return (
    <WidgetBody>
      <WidgetHeader type={EStatisticsWidget.headToHead} />

      <Summary away={awayTeam} home={homeTeam} />

      <WinDrawLoss
        home={home}
        away={away}
        draw={draw}
        ptc={ptc}
      />

      <WinDrawLossLine {...ptc} />

      <HomeAwayHeadToHeadStats
        home={<HeadToHeadStats stats={homeStats} />}
        away={<HeadToHeadStats right stats={awayStats} />}
      />
    </WidgetBody>
  );
});
HeadToHead.displayName = "HeadToHead";

const Score: FC<{ children: [number, number]; }> = ({ children }) =>
  children ? `${children[0]} : ${children[1]}` : "- : -";
Score.displayName = "Score";

interface IHomeAwayHeadToHeadStatsProps {
  home: ReactNode;
  away: ReactNode;
}

const HomeAwayHeadToHeadStats = memo<IHomeAwayHeadToHeadStatsProps>(({ home, away }) => (
  <div className={classes.headToHeadStatsContainer}>
    <div>
      {home}
    </div>

    <div>
      {away}
    </div>
  </div>
));
HomeAwayHeadToHeadStats.displayName = "HomeAwayHeadToHeadStats";

interface IHeadToHeadStatsProps {
  stats: { avgGoals: JSX.Element; bestScore: JSX.Element; };
  right?: boolean;
}

const HeadToHeadStats = memo<IHeadToHeadStatsProps>(({ stats, right = false }) => {
  const [t] = useTranslation();

  return (
    <>
      {
        entries(stats).map(([key, stats]) => (
          <div
            key={key}
            className={clsx(classes.statsRow, right && classes.rightStatsRow)}
          >
            {t(headToHeadTKeys[key])}

            {": "}

            {stats}
          </div>
        ))
      }
    </>
  );
});
HeadToHeadStats.displayName = "HeadToHeadStats";

const WinDrawLoss = memo<Pick<IHead2HeadStats, "home" | "draw" | "away" | "ptc">>(({
  home,
  draw,
  away,
  ptc,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.matchesBetween}>
        <div>
          <span>
            {t(sportsbookui_starzbet_statistics_headToHead_won)}
          </span>

          <span className={classes.winsNumber}>{home}</span>
        </div>

        <div className={classes.drawTitle}>
          <span>
            {t(sportsbookui_starzbet_title_draw)}
          </span>

          <span className={classes.drawNumber}>{draw}</span>
        </div>

        <div>
          <span>
            {t(sportsbookui_starzbet_statistics_headToHead_won)}
          </span>

          <span className={classes.lossNumber}>{away}</span>
        </div>
      </div>

      <div className={classes.matchesBetween}>
        <div className={classes.homeTeamWins} style={getWidth(ptc.home)} />

        <div className={classes.drawInfo} />

        <div className={classes.awayTeamWins} style={getWidth(ptc.away)} />
      </div>
    </div>

  );
});
WinDrawLoss.displayName = "WinDrawLoss";

const WinDrawLossLine = memo<IHead2HeadStats["ptc"]>(({ home, away, draw }) => {
  if (home === away) {
    return (
      <div className={classes.headToHeadLines}>
        <div
          className={classes.winLine}
          style={getWidth(home)}
        />

        <div className={classes.drawLine} style={getWidth(draw)} />

        <div
          className={classes.lossLine}
          style={getWidth(away)}
        />
      </div>
    );
  }

  const homeClassName = (home > away
    ? classes.winLine
    : classes.lossLine) || (home === away ? classes.winLine : classes.winLine);

  const awayClassName = (away > home
    ? classes.winLine
    : classes.lossLine) || (away === home ? classes.winLine : classes.winLine);

  return (
    <div className={classes.headToHeadLines}>
      <div
        className={homeClassName}
        style={getWidth(home)}
      />

      <div className={classes.drawLine} style={getWidth(draw)} />

      <div
        className={awayClassName}
        style={getWidth(away)}
      />
    </div>
  );
});
WinDrawLossLine.displayName = "WinDrawLossLine";

interface ISummaryProps {
  home: TStatisticParticipant;
  away: TStatisticParticipant;
}

const Summary = memo<ISummaryProps>(({ home, away }) => (
  <div className={classes.headToHeadTeams}>
    <div className={classes.homeTeamOne}>
      <Ellipsis>
        <BaseTeamName team={home} />
      </Ellipsis>
    </div>

    <div className={classes.awayTeamTwo}>
      <Ellipsis>
        <BaseTeamName team={away} />
      </Ellipsis>
    </div>
  </div>
));
Summary.displayName = "Summary";

const HeadToHeadShort = memo<IWithEventStatistics>(({ statistics }) => {
  const {
    home,
    away,
    draw,
    ptc,
    best,
    avgGoals,
  } = computeH2hStats(statistics);

  const homeStats = {
    avgGoals: <span>{avgGoals.home}</span>,
    bestScore: (
      <span>
        <Score>{best.home}</Score>
      </span>
    ),
  };

  const awayStats = {
    avgGoals: <span>{avgGoals.away}</span>,
    bestScore: (
      <span>
        <Score>{best.away}</Score>
      </span>
    ),
  };

  return (
    <div className={classes.headToHeadShort}>
      <WinDrawLoss
        home={home}
        away={away}
        draw={draw}
        ptc={ptc}
      />

      <WinDrawLossLine {...ptc} />

      <HomeAwayHeadToHeadStats
        home={<HeadToHeadStats stats={homeStats} />}
        away={<HeadToHeadStats right stats={awayStats} />}
      />
    </div>
  );
});
HeadToHeadShort.displayName = "HeadToHeadShort";

export { HeadToHead, HeadToHeadShort };
