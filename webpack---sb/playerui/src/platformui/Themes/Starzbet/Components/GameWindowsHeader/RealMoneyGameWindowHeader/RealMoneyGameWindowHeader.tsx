import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_gameWindow_header_realMoney } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import commonClasses from "../GameWindowHeader.module.css";
import classes from "./RealMoneyGameWindowHeader.module.css";
import { HiddenMainBalance } from "../../../../../../common/Components/HiddenBalance/HiddenMainBalance";
import { GAME_WINDOW_HEADER_STYLE_V1 } from "../../../../../Utils/GameWindowUtils";
import { VipClubGameWindowHeaderPointsProgress } from "../../VipClub/VipClubProgress/VipClubProgress";
import { VipClubGameWindowWidget } from "../../VipClub/VipClubWidget/VipClubWidget";

const RealMoneyGameWindowHeader = memo(() => {
  const [t] = useTranslation();

  return (
    <div style={GAME_WINDOW_HEADER_STYLE_V1} className={clsx(commonClasses.gameWindowHeader, classes.realMoneyHeader)}>
      <VipClubGameWindowWidget />

      <div className={classes.headerCenter}>
        <div className={classes.flexSpaceBetween}>
          <div className={classes.headerLabel}>{t(platformui_starzbet_gameWindow_header_realMoney)}</div>

          <HiddenMainBalance className={classes.headerBalance} />
        </div>

        <VipClubGameWindowHeaderPointsProgress />
      </div>
    </div>
  );
});
RealMoneyGameWindowHeader.displayName = "RealMoneyGameWindowHeader";

export {
  RealMoneyGameWindowHeader,
};
