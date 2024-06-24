import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_banking_title_playLimit,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./PlayLimit.module.css";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { PlayLimitForm } from "../../../Components/PlayLimitForm/PlayLimitForm";
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

const PlayLimit = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={HelpIcon}
      headerColorScheme={"blue"}
      routeMap={headerRouteMap}
      title={t(platformui_starzbet_banking_title_playLimit)}
      backPath={routeMap.gamblingControl}
    >
      <div className={classes.depositLimit}>
        <PlayLimitForm />
      </div>
    </AccountPage>
  );
});
PlayLimit.displayName = "PlayLimit";

export { PlayLimit };
