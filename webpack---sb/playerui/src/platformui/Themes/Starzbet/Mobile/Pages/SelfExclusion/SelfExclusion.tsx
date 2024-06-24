import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_headline_selfExclusion,
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_navLink_selfExclusion,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./SelfExclusion.module.css";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { SelfExclusionForm } from "../../../Components/SelfExclusionForm/SelfExclusionForm";
import { HelpIcon } from "../../../Components/Icons/HelpIcon/HelpIcon";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_navLink_selfExclusion,
  },
];

const SelfExclusion = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      title={t(platformui_starzbet_headline_selfExclusion)}
      backPath={routeMap.gamblingControl}
      routeMap={headerRouteMap}
      icon={HelpIcon}
      headerColorScheme={"blue"}
    >
      <div className={classes.content}>
        <SelfExclusionForm />
      </div>
    </AccountPage>
  );
});
SelfExclusion.displayName = "SelfExclusion";

export { SelfExclusion };
