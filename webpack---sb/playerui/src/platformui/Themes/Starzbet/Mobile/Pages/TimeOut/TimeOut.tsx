import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_timeOut_coolOff,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./TimeOut.module.css";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { TimeOutForm } from "../../../Components/TimeOutForm/TimeOutForm";
import { HelpIcon } from "../../../Components/Icons/HelpIcon/HelpIcon";
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

const TimeOut = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={HelpIcon}
      routeMap={headerRouteMap}
      title={t(platformui_starzbet_timeOut_coolOff)}
      backPath={routeMap.gamblingControl}
      headerColorScheme={"blue"}
    >
      <div className={classes.content}>
        <TimeOutForm />
      </div>
    </AccountPage>
  );
});
TimeOut.displayName = "TimeOut";

export { TimeOut };
