import { memo } from "react";
import { withCondition } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_userMessages_title_notifications,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { userMessageIsMessageDetailsIsRouteMatchedSelector } from "../../../../../Store/UserMessage/UserMessageSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { UserMessageDetails as BaseUserMessageDetails } from "../../../Components/UserMessage/UserMessageDetails/UserMessageDetails";
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
const UserMessageDetails = withCondition(
  userMessageIsMessageDetailsIsRouteMatchedSelector,
  memo(() => {
    const [t] = useTranslation();

    return (
      <AccountPage
        icon={NotificationIcon}
        headerColorScheme={"blue"}
        routeMap={headerRouteMap}
        backPath={routeMap.userMessages}
        title={t(platformui_starzbet_userMessages_title_notifications)}
      >
        <BaseUserMessageDetails />
      </AccountPage>
    );
  }),
);
UserMessageDetails.displayName = "UserMessageDetails";

export { UserMessageDetails };
