// @ts-nocheck
import { memo } from "react";
import { withProps } from "@sb/utils";
import { sportsbookui_starzbet_title_allSports } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { ESportPreLiveSportMenuContainer } from "../../../../../../Containers/SportMenuContainer/SportMenuContainer";
import { SportMenu } from "../../Components/SportMenu/SportMenu";
import { AllSports } from "./AllSports";

const menu = withProps(ESportPreLiveSportMenuContainer)({ child: SportMenu });

const EsportPreLiveAllSports = memo(() => (
  <AllSports
    closePath={routeMap.esport.preLive.root}
    header={sportsbookui_starzbet_title_allSports}
    sportMenu={menu}
    isESports={true}
    switchTo={routeMap.preLive.allSports}
  />
));
EsportPreLiveAllSports.displayName = "EsportPreLiveAllSports";

export { EsportPreLiveAllSports };
