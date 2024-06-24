import { memo } from "react";
import {
  platformui_starzbet_navLink_changePassword,
  platformui_starzbet_navLink_security,
  platformui_starzbet_password_headline_changePassword,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { ShieldIcon } from "../../../Components/Icons/ShieldIcon/ShieldIcon";
import { ChangePasswordForm } from "../../../Components/ChangePasswordForm/ChangePasswordForm";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_security,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_navLink_changePassword,
  },
];

const Password = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      title={t(platformui_starzbet_password_headline_changePassword)}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      icon={ShieldIcon}
      headerColorScheme={"orange-gradient"}
    >
      <ChangePasswordForm />
    </AccountPage>
  );
});
Password.displayName = "Password";

export { Password };
