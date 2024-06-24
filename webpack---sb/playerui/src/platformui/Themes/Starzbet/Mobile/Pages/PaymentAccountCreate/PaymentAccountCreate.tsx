import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { isNil } from "@sb/utils";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_paymentAccount_title_create,
  platformui_starzbet_title_paymentAccounts,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./PaymentAccountCreate.module.css";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { paymentAccountTypeTranslateMap } from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { paymentAccountCreateAccountTypeSelector } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountSelectors";
import { BankingIcon } from "../../../Components/Icons/BankingIcon/BankingIcon";
import { PaymentAccountCreateForm } from "../../../Components/PaymentAccountCreateForm/PaymentAccountCreateForm";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_title_paymentAccounts,
    path: routeMap.bankingPaymentAccountsRoute,
  },
  {
    titleTKey: platformui_starzbet_paymentAccount_title_create,
  },
];

const PaymentAccountCreate = memo(() => {
  const [t] = useTranslation();
  const accountType = useSelector(paymentAccountCreateAccountTypeSelector);

  // todo^Bondarenko investigate after router update
  if (isNil(accountType)) {
    return null;
  }

  return (
    <AccountPage
      icon={BankingIcon}
      headerColorScheme={"purple"}
      routeMap={headerRouteMap}
      title={t(paymentAccountTypeTranslateMap[accountType])}
      backPath={routeMap.bankingPaymentAccountsRoute}
    >
      <div className={classes.container}>
        <PaymentAccountCreateForm />
      </div>
    </AccountPage>
  );
});
PaymentAccountCreate.displayName = "PaymentAccountCreate";

export { PaymentAccountCreate };
