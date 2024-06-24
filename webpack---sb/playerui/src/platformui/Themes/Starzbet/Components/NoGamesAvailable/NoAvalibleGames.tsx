import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_casino_noGamesAvailable } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./NoAvalibleGames.module.css";
import { LoaderImg } from "../../../../../common/Themes/Starzbet/Components/LoaderImg/LoaderImg";

const NoGamesAvailable = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.noGamesAvailable}>
      <LoaderImg className={classes.logo} />

      <span>{t(platformui_starzbet_casino_noGamesAvailable)}</span>
    </div>
  );
});
NoGamesAvailable.displayName = "NoGamesAvailable";

export {
  NoGamesAvailable,
};
