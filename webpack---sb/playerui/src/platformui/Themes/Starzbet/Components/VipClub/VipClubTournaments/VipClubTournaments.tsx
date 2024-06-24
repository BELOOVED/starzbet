import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_vipClubTournaments_daily,
  platformui_starzbet_vipClubTournaments_monthly,
  platformui_starzbet_vipClubTournaments_timer_days,
  platformui_starzbet_vipClubTournaments_timer_finished,
  platformui_starzbet_vipClubTournaments_timer_hours,
  platformui_starzbet_vipClubTournaments_timer_minutes,
  platformui_starzbet_vipClubTournaments_timer_seconds,
  platformui_starzbet_vipClubTournaments_weekly,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import type { TPlatform_VipClubTournament_Fragment } from "@sb/graphql-client/PlayerUI";
import { EVipClubPeriodType, vipClubParsePeriodKind } from "@sb/vip-club";
import { withProps } from "@sb/utils";
import classes from "./VipClubTournaments.module.css";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { VipClubTournamentBase } from "../../../../../Components/VipClub/VipClubTournamentBase";
import { VipClubTournamentPrize } from "../../../../../Components/VipClub/VipClubTournamentPrize";
import { VipClubActiveTournamentsBase } from "../../../../../Components/VipClub/VipClubTournaments/VipClubActiveTournamentsBase";
import {
  createVipClubTournamentTimer,
  type IVipClubTournamentTimeProps,
} from "../../../../../Components/VipClub/VipClubTournaments/VipClubTournamentTimerBase";

const VipClubTournamentFinished = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubTournamentTimeFinished}>
      <Ellipsis className={classes.vipClubTournamentTimeNum}>{t(platformui_starzbet_vipClubTournaments_timer_finished)}</Ellipsis>
    </div>
  );
});
VipClubTournamentFinished.displayName = "VipClubTournamentFinished";

const TournamentTime = memo<IVipClubTournamentTimeProps>(({ num, text }) => (
  <div className={classes.vipClubTournamentTime}>
    <div className={classes.vipClubTournamentTimeNum}>{num}</div>

    <div className={classes.vipClubTournamentTimeText}>{text}</div>
  </div>
));
TournamentTime.displayName = "TournamentTime";

const VipClubTournamentTimer = createVipClubTournamentTimer<TTKeys>({
  Finished: VipClubTournamentFinished,
  Time: TournamentTime,
  className: classes.vipClubTournamentTimer,
  daysTKey: platformui_starzbet_vipClubTournaments_timer_days,
  hoursTKey: platformui_starzbet_vipClubTournaments_timer_hours,
  minutesTKey: platformui_starzbet_vipClubTournaments_timer_minutes,
  secondsTKey: platformui_starzbet_vipClubTournaments_timer_seconds,
});

const VIP_CLUB_TOURNAMENT_PERIOD_TYPE_TO_TKEY: Record<EVipClubPeriodType, TTKeys> = {
  [EVipClubPeriodType.daily]: platformui_starzbet_vipClubTournaments_daily,
  [EVipClubPeriodType.weekly]: platformui_starzbet_vipClubTournaments_weekly,
  [EVipClubPeriodType.monthly]: platformui_starzbet_vipClubTournaments_monthly,
};

const VipClubTournament = memo<TPlatform_VipClubTournament_Fragment>(({ id, endTime, templateSnapshot: { prize, period } }) => {
  const [t] = useTranslation();

  const { period: periodType } = vipClubParsePeriodKind(period.kind);

  return (
    <VipClubTournamentBase id={id} className={classes.vipClubTournament}>
      <div className={classes.vipClubTournamentLeft}>
        <div className={classes.vipClubTournamentTitle}>
          <Ellipsis>
            {t(VIP_CLUB_TOURNAMENT_PERIOD_TYPE_TO_TKEY[periodType])}
          </Ellipsis>
        </div>

        <div className={classes.vipClubTournamentPrize}>
          <VipClubTournamentPrize prize={prize} />
        </div>
      </div>

      <VipClubTournamentTimer endTime={endTime} />
    </VipClubTournamentBase>
  );
});
VipClubTournament.displayName = "VipClubTournament";

const VipClubTournaments = withProps(VipClubActiveTournamentsBase)({
  className: classes.vipClubTournaments,
  Tournament: VipClubTournament,
});

export { VipClubTournaments };
