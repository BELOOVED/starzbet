import { translates as sportsBookMessages } from "@sb/translates/sportsbookui/Themes/Starzbet/Translates";
import { translates as platformMessages } from "@sb/translates/platformui/Themes/Starzbet/Translates";
import "../../OriginalApplication/Mobile/Styles/Global.css";
import { MobileApp as PlatformMobileApp } from "../../../../../platformui/Themes/Starzbet/Mobile/MobileApp";
import { configureMixApp } from "../../../../../common/ConfigureApplication/ConfigureMixApp";
import { scrollRestorationManual } from "../../../../Utils/History";
import { mixConfigureStore } from "../../../../Store/ConfigureStore/MixConfigureStore";
import { MobileApp as SportsBookMobileApp } from "../../OriginalApplication/Mobile/MobileApp";

scrollRestorationManual();

configureMixApp(
  PlatformMobileApp,
  SportsBookMobileApp,
  mixConfigureStore(),
  [sportsBookMessages, platformMessages],
);
