import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_vipClub_bonus_error_subtitle,
  platformui_starzbet_vipClub_bonus_error_title,
  platformui_starzbet_vipClubLeaders_leaderBoard_error_subtitle,
  platformui_starzbet_vipClubLeaders_leaderBoard_error_title,
  platformui_starzbet_vipClubTournaments_error_subtitle,
  platformui_starzbet_vipClubTournaments_error_title,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./VipClubError.module.css";
import { ThemedModalIcon } from "../../ThemedModal/ThemedModalIcon/ThemedModalIcon";

interface IVipClubEmptyBaseProps {
  titleTKey: TTKeys;
  subtitleTKey: TTKeys;
}

const createVipClubError = ({ titleTKey, subtitleTKey }: IVipClubEmptyBaseProps) =>
  memo(() => {
    const [t] = useTranslation();

    return (
      <div className={classes.vipClubError}>
        <ThemedModalIcon variant={"error"} />

        <h3 className={classes.vipClubErrorTitle}>{t(titleTKey)}</h3>

        <p className={classes.vipClubErrorText}>{t(subtitleTKey)}</p>
      </div>
    );
  });
createVipClubError.displayName = "VipClubErrorBase";

const VipClubErrorLeaderBoard = createVipClubError({
  titleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_error_title,
  subtitleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_error_subtitle,
});

const VipClubErrorTournamentsPage = createVipClubError({
  titleTKey: platformui_starzbet_vipClubTournaments_error_title,
  subtitleTKey: platformui_starzbet_vipClubTournaments_error_subtitle,
});

const VipClubErrorBonuses = createVipClubError({
  titleTKey: platformui_starzbet_vipClub_bonus_error_title,
  subtitleTKey: platformui_starzbet_vipClub_bonus_error_subtitle,
});

export { VipClubErrorLeaderBoard, VipClubErrorTournamentsPage, VipClubErrorBonuses };
