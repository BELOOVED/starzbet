import { memo } from "react";
import { useSelector } from "react-redux";
import { routerLocationSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_banking_page_bankingHistory,
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_title_all,
  platformui_starzbet_title_deposits,
  platformui_starzbet_title_withdrawals,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { createSimpleSelector, isNotNil, isVoid, objToComponent } from "@sb/utils";
import classes from "./BankingHistory.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { Empty } from "../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { useLocalizedPush } from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import {
  loadingTransactionRequestsSelector,
  nodesTransactionRequestsSelector,
} from "../../../../../Store/TransactionRequests/Selectors/TransactionRequestsSelector";
import { TransactionRequestsPaginator } from "../../../Desktop/Components/Paginator/Paginator";
import { BankingIcon } from "../../../Components/Icons/BankingIcon/BankingIcon";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { BankingHistoryCard } from "../../Components/BankingHistoryCard/BankingHistoryCard";
import { Select } from "../../Components/Select/Select";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const selectOptions = [
  {
    id: routeMap.bankingHistoryRoute,
    name: platformui_starzbet_title_all,
  },
  {
    id: routeMap.bankingHistoryDepositsRoute,
    name: platformui_starzbet_title_deposits,
  },
  {
    id: routeMap.bankingHistoryWithdrawalsRoute,
    name: platformui_starzbet_title_withdrawals,
  },
];

const currentPathNameSelector = createSimpleSelector(
  [routerLocationSelector],
  (location) => {
    const matchDeposit = matchPath(location.pathname, { path: routeMap.bankingHistoryDepositsRoute });
    if (isNotNil(matchDeposit)) {
      return routeMap.bankingHistoryDepositsRoute;
    }

    const matchWithdraw = matchPath(location.pathname, { path: routeMap.bankingHistoryWithdrawalsRoute });
    if (isNotNil(matchWithdraw)) {
      return routeMap.bankingHistoryWithdrawalsRoute;
    }

    return routeMap.bankingHistoryRoute;
  },
);

const BankingHistoryTab = memo(() => {
  const goto = useLocalizedPush();
  const current = useSelector(currentPathNameSelector);

  return (
    <Select
      // @ts-ignore
      small
      current={current}
      options={selectOptions}
      handler={goto}
    />
  );
});
BankingHistoryTab.displayName = "BankingHistoryTab";

const BankingHistoryList = memo(() => {
  const deposits = useSelector(nodesTransactionRequestsSelector);

  if (isVoid(deposits)) {
    return (
      <Empty />
    );
  }

  return (
    <div className={classes.historyList}>
      {deposits.map(objToComponent("id")(BankingHistoryCard))}

      <TransactionRequestsPaginator />
    </div>
  );
});
BankingHistoryList.displayName = "BankingHistoryList";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_banking_page_bankingHistory,
  },
];

const BankingHistory = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(loadingTransactionRequestsSelector);

  return (
    <AccountPage
      icon={BankingIcon}
      headerColorScheme={"purple"}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_banking_page_bankingHistory)}
    >
      <div className={classes.container}>
        <BankingHistoryTab />

        {loading ? <Loader /> : <BankingHistoryList />}
      </div>
    </AccountPage>
  );
});
BankingHistory.displayName = "BankingHistory";

export { BankingHistory };
