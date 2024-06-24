import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_myAccount_devices_devices,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { playerDevicesLoadingSelector } from "../../../../../Store/VerifyDevice/VerifyDeviceSelectors";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon/VerifiedIcon";
import { DevicesTable } from "../../../Components/DevicesTable/DevicesTable";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.devices,
  },
  {
    titleTKey: platformui_starzbet_myAccount_devices_devices,
  },
];

const Devices = memo(() => {
  const loading = useSelector(playerDevicesLoadingSelector);
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={VerifiedIcon}
      headerColorScheme={"orange-gradient"}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_myAccount_devices_devices)}
    >
      {loading ? <Loader /> : <DevicesTable />}
    </AccountPage>
  );
});
Devices.displayName = "Devices";

export { Devices };
