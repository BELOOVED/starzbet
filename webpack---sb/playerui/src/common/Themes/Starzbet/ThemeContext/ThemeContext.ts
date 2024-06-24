import { isNotNil } from "@sb/utils";
import variables from "./Variables.module.css";
import { landingVariant2Epic } from "../../../../platformui/Store/Landing/Epics/LandingVariant2Epic";
import { topWinnersOnGamePageRootEpic, topWinnersRootEpic } from "../../../../platformui/Store/TopWinners/TopWinnersRootEpic";
import { routeMap } from "../../../../sportsbookui/RouteMap/RouteMap";
import { vipClubRootEpic } from "../../../../platformui/Store/VipClub/Epics/VipClubRootEpic";
import { verifyDeviceRootEpics } from "../../../../platformui/Store/VerifyDevice/Epics/VerifyDeviceEpic";
import { STARZBET_VERIFY_DEVICE_ENABLE } from "../../../../platformui/Store/VerifyDevice/EnableFlags";
import { vipClubOnPlayGameRouteEpic } from "../../../../platformui/Store/VipClub/Epics/VipClubRouterEpic";
import { playGameRootEpic } from "../../../../platformui/Store/PlayGame/PlayGameEpic";
import { groupProvidersPageEpics } from "../../../../platformui/Store/Games/Epics/GamesCombineProvidersEpics";
import { IS_STARZBET_KG } from "../../../../ServerEnvironment";
import { createThemeContext, type IThemeContextVariant5 } from "../../../Utils/ThemeContext";

createThemeContext<IThemeContextVariant5>({
  name: "Starzbet",
  notOnPlayGameRouteThemeEpics: [
    landingVariant2Epic,
    topWinnersRootEpic,
    topWinnersOnGamePageRootEpic,
    groupProvidersPageEpics,
    vipClubRootEpic,
    STARZBET_VERIFY_DEVICE_ENABLE ? verifyDeviceRootEpics : null,
  ].filter(isNotNil),
  variables,
  sportsbookConnectedEpicAdditionalRoutes: IS_STARZBET_KG ? [] : [{ path: routeMap.root, exact: true }],
  themeEpics: [vipClubOnPlayGameRouteEpic, playGameRootEpic],
});
