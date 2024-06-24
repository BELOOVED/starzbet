import { memo } from "react";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_realityChecks_realityChecks,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { HelpIcon } from "../../../Components/Icons/HelpIcon/HelpIcon";
import { RealityCheckForm } from "../../../Components/RealityCheckForm/RealityCheckForm";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_realityChecks_realityChecks,
  },
];

const RealityCheck = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={HelpIcon}
      headerColorScheme={"blue"}
      routeMap={headerRouteMap}
      backPath={routeMap.gamblingControl}
      title={t(platformui_starzbet_realityChecks_realityChecks)}
    >
      <RealityCheckForm />
    </AccountPage>
  );
});
RealityCheck.displayName = "RealityCheck";

export { RealityCheck };
