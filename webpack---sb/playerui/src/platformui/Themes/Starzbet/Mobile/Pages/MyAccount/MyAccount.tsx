import { memo } from "react";
import { ExpandableNavigationMenu } from "../../../Components/ExpandableNavigationMenu/ExpandableNavigationMenu";
import { AccountPage } from "../../Components/AccountPage/AccountPage";

const MyAccount = memo(() => (
  <AccountPage>
    <ExpandableNavigationMenu />
  </AccountPage>
));
MyAccount.displayName = "MyAccount";

export { MyAccount };
