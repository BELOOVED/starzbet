import { memo } from "react";
import {
  platformui_starzbet_games_noGamesAvailable,
  platformui_starzbet_games_recentlyPlayed_playTheGameThatUpdate,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./NoRecentlyPlayedGames.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { CactusIcon } from "../Icons/CactusIcon/AddIcon";

const NoRecentlyPlayedGames = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.card}>
      {
        !IS_MOBILE_CLIENT_SIDE
          ? (
            <div className={classes.iconContainer}>
              <CactusIcon width={22} height={28} />
            </div>
          )
          : null
      }

      <div className={classes.textContainer}>
        <Ellipsis className={classes.header}>
          {t(platformui_starzbet_games_noGamesAvailable)}
        </Ellipsis>

        <p className={classes.text}>{t(platformui_starzbet_games_recentlyPlayed_playTheGameThatUpdate)}</p>
      </div>
    </div>
  );
});
NoRecentlyPlayedGames.displayName = "NoRecentlyPlayedGames";

export {
  NoRecentlyPlayedGames,
};
