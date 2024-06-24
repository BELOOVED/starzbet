import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_title_paymentAccounts,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EPlatform_PlayerPaymentAccountType } from "@sb/graphql-client";
import { keyToComponent } from "@sb/utils";
import classes from "./PaymentAccounts.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { playerPaymentAccountsLoadingSelector } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountLoaderSelectors";
import { BankingIcon } from "../../../Components/Icons/BankingIcon/BankingIcon";
import { PaymentAccountRemoveSubmitResult } from "../../../Components/PaymentAccountRemoveForm/PaymentAccountRemoveForm";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { PaymentAccount } from "../../Components/PaymentAccount/PaymentAccount";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const accountTypeList = Object.values(EPlatform_PlayerPaymentAccountType);

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_title_paymentAccounts,
  },
];

const PaymentAccounts = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(playerPaymentAccountsLoadingSelector);

  return (
    <AccountPage
      routeMap={headerRouteMap}
      title={t(platformui_starzbet_title_paymentAccounts)}
      backPath={routeMap.myAccountRoute}
      icon={BankingIcon}
      headerColorScheme={"purple"}
    >
      {
        loading
          ? <Loader />
          : (
            <div className={classes.accountContainer}>
              {accountTypeList.map(keyToComponent("accountType", null)(PaymentAccount))}
            </div>
          )
      }

      <PaymentAccountRemoveSubmitResult />
    </AccountPage>
  );
});
PaymentAccounts.displayName = "PaymentAccounts";

export { PaymentAccounts };
