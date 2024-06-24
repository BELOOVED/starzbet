// @ts-nocheck
import { memo } from "react";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_navLink_responsibleGamblingControls,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./GamblingControl.module.css";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { HelpIcon } from "../../../Components/Icons/HelpIcon/HelpIcon";
import { GamblingMenu } from "../../Components/MyAccountMenu/MyAccountMenu";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
  },
];

const GamblingControl = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.wrapper}>
      <AccountPage
        icon={HelpIcon}
        headerColorScheme={"blue"}
        routeMap={headerRouteMap}
        title={t(platformui_starzbet_navLink_responsibleGamblingControls)}
        backPath={routeMap.myAccountRoute}
      >
        <div className={classes.container}>
          <GamblingMenu />
        </div>
      </AccountPage>
    </div>
  );
});
GamblingControl.displayName = "GamblingControl";

export { GamblingControl };
