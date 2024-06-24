import clsx from "clsx";
import { memo } from "react";
import { EPlatform_PlayerBonusStatusEnum } from "@sb/graphql-client";
import {
  platformui_starzbet_bonus_status_active,
  platformui_starzbet_bonus_status_cancelled,
  platformui_starzbet_bonus_status_completed,
  platformui_starzbet_bonus_status_expired,
  platformui_starzbet_bonus_status_lost,
  platformui_starzbet_bonus_status_pending,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./PlayerBonusStatus.module.css";

interface IPlayerBonusStatusProps {
  status: EPlatform_PlayerBonusStatusEnum;
}

const playerBonusStatusTKeyMap: Record<EPlatform_PlayerBonusStatusEnum, TTKeys> = {
  [EPlatform_PlayerBonusStatusEnum.claimed]: platformui_starzbet_bonus_status_pending,
  [EPlatform_PlayerBonusStatusEnum.inProgress]: platformui_starzbet_bonus_status_active,
  [EPlatform_PlayerBonusStatusEnum.cancelled]: platformui_starzbet_bonus_status_cancelled,
  [EPlatform_PlayerBonusStatusEnum.won]: platformui_starzbet_bonus_status_completed,
  [EPlatform_PlayerBonusStatusEnum.completed]: platformui_starzbet_bonus_status_completed,
  [EPlatform_PlayerBonusStatusEnum.expired]: platformui_starzbet_bonus_status_expired,
  [EPlatform_PlayerBonusStatusEnum.lost]: platformui_starzbet_bonus_status_lost,
};

const playerBonusStatusTagClassNameMap: Record<EPlatform_PlayerBonusStatusEnum, string | undefined> = {
  [EPlatform_PlayerBonusStatusEnum.inProgress]: classes.green,
  [EPlatform_PlayerBonusStatusEnum.won]: classes.green,
  [EPlatform_PlayerBonusStatusEnum.completed]: classes.green,
  [EPlatform_PlayerBonusStatusEnum.claimed]: classes.yellow,
  [EPlatform_PlayerBonusStatusEnum.expired]: classes.yellow,
  [EPlatform_PlayerBonusStatusEnum.cancelled]: classes.red,
  [EPlatform_PlayerBonusStatusEnum.lost]: classes.red,
};

const PlayerBonusStatus = memo<IPlayerBonusStatusProps>(({ status }) => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.tag, playerBonusStatusTagClassNameMap[status])}>
      {t(playerBonusStatusTKeyMap[status])}
    </div>
  );
});
PlayerBonusStatus.displayName = "PlayerBonusStatus";

export { PlayerBonusStatus };
