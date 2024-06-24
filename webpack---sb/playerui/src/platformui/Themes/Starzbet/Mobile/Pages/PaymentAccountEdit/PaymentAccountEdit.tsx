import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_title_editPaymentAccount,
  platformui_starzbet_title_paymentAccounts,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./PaymentAccountEdit.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { playerPaymentAccountsLoadingSelector } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountLoaderSelectors";
import { BankingIcon } from "../../../Components/Icons/BankingIcon/BankingIcon";
import { PaymentAccountEditForm } from "../../../Components/PaymentAccountEditForm/PaymentAccountEditForm";
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
    titleTKey: platformui_starzbet_title_editPaymentAccount,
  },
];

const PaymentAccountEdit = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(playerPaymentAccountsLoadingSelector);

  return (
    <AccountPage
      icon={BankingIcon}
      headerColorScheme={"purple"}
      routeMap={headerRouteMap}
      title={t(platformui_starzbet_title_editPaymentAccount)}
      backPath={routeMap.bankingPaymentAccountsRoute}
    >
      <div className={classes.container}>
        {
          loading
            ? <Loader />
            : <PaymentAccountEditForm />
        }
      </div>
    </AccountPage>
  );
});
PaymentAccountEdit.displayName = "PaymentAccountEdit";

export { PaymentAccountEdit };
