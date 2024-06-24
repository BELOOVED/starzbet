import { memo } from "react";
import {
  platformui_starzbet_accountClosure_accountClosure,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./AccountClosure.module.css";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { HelpIcon } from "../../../Components/Icons/HelpIcon/HelpIcon";
import { AccountClosureForm } from "../../../Components/AccountClosureForm/AccountClosureForm";
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

const AccountClosure = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={HelpIcon}
      routeMap={headerRouteMap}
      backPath={routeMap.gamblingControl}
      title={t(platformui_starzbet_accountClosure_accountClosure)}
      headerColorScheme={"blue"}
    >
      <div className={classes.accountClosureContent}>
        <AccountClosureForm />
      </div>
    </AccountPage>
  );
});
AccountClosure.displayName = "AccountClosure";

export { AccountClosure };
