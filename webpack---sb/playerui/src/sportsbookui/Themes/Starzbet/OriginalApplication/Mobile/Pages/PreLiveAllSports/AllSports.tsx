// @ts-nocheck
import { createElement, memo } from "react";
import { platformui_starzbet_navLink_parlayBay } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./PreLiveAllSports.module.css";
import { routeMap as platformRoute } from "../../../../../../../platformui/RouteMap/RouteMap";
import { PlayerMenuContainer } from "../../../../../../Containers/PlayerMenuContainer/PlayerMenuContainer";
import { ResetedLink } from "../../../../../../Components/ResetedLink/ResetedLink";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { CouponsMenu } from "../../../Desktop/Components/CouponsAndFavouriteMenu/CouponsAndFavouriteMenu";
import { ParlayBayIcon } from "../../../Components/Icons/ParlayBayIcon/ParlayBayIcon";
import { FullScreenMenu } from "../../Components/FullScreenMenu/FullScreenMenu";
import { SwitchSportsESports } from "../../Components/SwitchSportsEspots/SwitchSportsEsports";
import { OutrightMenu } from "../../Components/OutrightMenu/OutrightMenu";

const notLoggedChild = () => null;

const AllSports = memo(({
  closePath,
  header,
  sportMenu,
  isESports,
  switchTo,
}) => {
  const [t] = useTranslation();

  return (
    <FullScreenMenu closePath={closePath} title={header}>
      <PlayerMenuContainer
        loggedChild={CouponsMenu}
        notLoggedChild={notLoggedChild}
      />

      <ResetedLink to={platformRoute.parlayBay} className={classes.parlayBayLink}>
        <div className={classes.icon}>
          <ParlayBayIcon />
        </div>

        <Ellipsis className={classes.title}>
          {t(platformui_starzbet_navLink_parlayBay)}
        </Ellipsis>
      </ResetedLink>

      <div className={classes.header}>
        <SwitchSportsESports isESports={isESports} switchTo={switchTo} />
      </div>

      {
        !isESports && (
          <OutrightMenu />
        )
      }

      {createElement(sportMenu)}
    </FullScreenMenu>
  );
});
AllSports.displayName = "AllSports";

export { AllSports };
