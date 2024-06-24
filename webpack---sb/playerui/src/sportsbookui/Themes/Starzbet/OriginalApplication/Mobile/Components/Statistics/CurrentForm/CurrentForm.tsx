import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_statistics_title_drawShort,
  sportsbookui_starzbet_statistics_title_lossShort,
  sportsbookui_starzbet_statistics_title_winShort,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import {
  sportsbookui_statistics_widgetName_currentForm,
  sportsbookui_statistics_widgetName_lastMatches,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./CurrentForm.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { type ICurrentFormStats, type IPtc, teamCurrentFormStatsSelector } from "../../../../../../../Store/Statistics/Selectors/CurrentFormStats";
import { type IWithEventStatistics } from "../../../../../../../Store/Statistics/Model/IWithEventStatistics";
import { TeamIcon } from "../../../../../../../Components/TeamIcon/TeamIcon";
import { DonutChart } from "../DonutChart/DonutChart";

const mapMatchResultToClass = {
  W: classes.win,
  D: classes.draw,
  L: classes.loss,
};

const mapMatchResultToText = {
  W: sportsbookui_starzbet_statistics_title_winShort,
  D: sportsbookui_starzbet_statistics_title_drawShort,
  L: sportsbookui_starzbet_statistics_title_lossShort,
};

const Team = memo<ICurrentFormStats>(({ team, ptc, performance }) => {
  const [t] = useTranslation();

  const lastMatchesClass = clsx(classes.lastMatches, !IS_MOBILE_CLIENT_SIDE && classes.lastMatchesMultiview);
  const teamInfoClass = clsx(classes.teamInfo, !IS_MOBILE_CLIENT_SIDE && classes.teamInfoMultiview);

  return (
    <div className={classes.team}>
      <div className={teamInfoClass}>
        <div className={classes.chartContainer}>
          <div className={classes.teamIcon}>
            <TeamIcon teamId={team.id || ""} size={48} />
          </div>

          <DonutChart ptc={ptc} />
        </div>

        <Ellipsis>
          <BaseTeamName team={team} />
        </Ellipsis>
      </div>

      <div className={lastMatchesClass}>
        {
          performance.map((v, i) => (
            <div key={i} className={mapMatchResultToClass[v]}>
              {t(mapMatchResultToText[v])}
            </div>
          ))
        }
      </div>
    </div>
  );
});
Team.displayName = "Team";

interface IPerformance {
  team1: IPtc;
  team2: IPtc;
}

const Performance = memo<IPerformance>(({ team1, team2 }) => (
  <div className={classes.performance}>
    <div className={classes.performanceTeam}>
      <div className={classes.percent}>{`${team1.win}%`}</div>

      <div className={classes.percent}>{`${team1.loss}%`}</div>

      <div className={classes.percent}>{`${team1.draw}%`}</div>
    </div>

    <div className={classes.performanceTitle}>
      <div className={classes.won}>{"W"}</div>

      <div className={classes.lost}>{"L"}</div>

      <div className={classes.performanceDraw}>{"D"}</div>
    </div>

    <div className={classes.performanceTeam}>
      <div className={classes.percent}>{`${team2.win}%`}</div>

      <div className={classes.percent}>{`${team2.loss}%`}</div>

      <div className={classes.percent}>{`${team2.draw}%`}</div>
    </div>
  </div>
));
Performance.displayName = "Performance";

interface IStatisticsCurrentFormProps extends IWithEventStatistics {
  sportId: string;
}

const StatisticsCurrentForm = memo<IStatisticsCurrentFormProps>(({ statistics, sportId }) => {
  const [t] = useTranslation();
  const mobile = IS_MOBILE_CLIENT_SIDE;
  const team1 = { ...teamCurrentFormStatsSelector(statistics, EParticipantType.team1) };
  const team2 = { ...teamCurrentFormStatsSelector(statistics, EParticipantType.team2) };

  return (
    <div className={clsx(classes.currentForm, mobile && classes.mobile, classes[`--${sportIdToCodeMap[sportId]}`])}>
      <div className={classes.overall}>
        <Team
          {...team1}
        />

        <div className={classes.overallCenter}>
          <div className={classes.header}>{t(sportsbookui_statistics_widgetName_currentForm)}</div>

          <Performance team1={team1.ptc} team2={team2.ptc} />

          <div className={classes.lastTitle}>{t(sportsbookui_statistics_widgetName_lastMatches)}</div>
        </div>

        <Team
          {...team2}
        />
      </div>
    </div>
  );
});
StatisticsCurrentForm.displayName = "StatisticsCurrentForm";

export { StatisticsCurrentForm };
