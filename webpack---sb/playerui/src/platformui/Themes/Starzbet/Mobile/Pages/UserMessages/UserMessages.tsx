import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_userMessages_title_notifications,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { UserMessages as BaseUserMessages } from "../../../Components/UserMessage/UserMessages/UserMessages";
import { NotificationIcon } from "../../../Components/Icons/NotificationIcon/NotificationIcon";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_userMessages_title_notifications,
  },
];

const UserMessages = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={NotificationIcon}
      headerColorScheme={"blue"}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_userMessages_title_notifications)}
    >
      <BaseUserMessages />
    </AccountPage>
  );
});
UserMessages.displayName = "UserMessages";

export { UserMessages };
