// @ts-nocheck
import { memo } from "react";
import { withProps } from "@sb/utils";
import { sportsbookui_starzbet_title_allSports } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { LiveSportMenuContainer, PreLiveSportMenuContainer } from "../../../../../../Containers/SportMenuContainer/SportMenuContainer";
import { LiveSportMenu, SportMenu } from "../../Components/SportMenu/SportMenu";
import { AllSports } from "./AllSports";

const menu = withProps(PreLiveSportMenuContainer)({ child: SportMenu });

const PreLiveAllSports = memo(() => (
  <AllSports
    closePath={routeMap.preLive.root}
    switchTo={routeMap.esport.preLive.allSports}
    header={sportsbookui_starzbet_title_allSports}
    sportMenu={menu}
    isESports={false}
  />
));
PreLiveAllSports.displayName = "PreLiveAllSports";

const LiveAllSports = memo(() => {
  const liveMenu = withProps(LiveSportMenuContainer)({ child: LiveSportMenu });

  return (
    <AllSports
      closePath={routeMap.live.root}
      header={sportsbookui_starzbet_title_allSports}
      sportMenu={liveMenu}
      isESports={false}
      switchTo={routeMap.esport.live.root}
    />
  );
});
LiveAllSports.displayName = "LiveAllSports";

export { LiveAllSports, PreLiveAllSports };
