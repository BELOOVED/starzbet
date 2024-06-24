import { memo } from "react";
import {
  platformui_starzbet_footer_myDetails,
  platformui_starzbet_navLink_details,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import {
  SettingsIcon,
} from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/SettingsIcon/SettingsIcon";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { UpdatePlayerDetailsForm } from "../../../Components/MyDetails/UpdatePlayerDetailsForm/UpdatePlayerDetailsForm";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_navLink_details,
  },
];

const MyDetails = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_footer_myDetails)}
      icon={SettingsIcon}
      headerColorScheme={"orange-gradient"}
      withHide
    >
      <UpdatePlayerDetailsForm />
    </AccountPage>
  );
});
MyDetails.displayName = "MyDetails";

export { MyDetails };
