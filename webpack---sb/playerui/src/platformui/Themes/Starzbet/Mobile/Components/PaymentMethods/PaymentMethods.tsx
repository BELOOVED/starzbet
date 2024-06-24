import { type ChangeEventHandler, memo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { isNotEmpty, isNotVoid, useParamSelector, usePersistCallback, withCondition } from "@sb/utils";
import {
  platformui_starzbet_casino_input_search,
  platformui_starzbet_headline_method,
  platformui_starzbet_title_max,
  platformui_starzbet_title_min,
  platformui_starzbet_title_notFound,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import type { TPlatform_AvailablePaymentMethod_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./PaymentMethods.module.css";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { ResetedInput } from "../../../../../../sportsbookui/Components/ResetedInput/ResetedInput";
import { Empty } from "../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { CloseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon";
import { SearchIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/SearchIcon/SearchIcon";
import { playerCurrencySelector } from "../../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { bankingAvailablePaymentMethodsSelector } from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { toFormatPlayerMoneyInBag } from "../../../../../Utils/PlayerMoneyBag";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { type TPaymentMethodId } from "../../../../../Store/Banking/Models/PaymentMethodIdModel";
import {
  paymentMethodsLoadedSelector,
  paymentMethodsLoadingSelector,
} from "../../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { type TPaymentMethodRoute } from "../../../../../Store/Banking/Models/TPaymentMethodRoute";
import { PaymentMethodIcon } from "../../../Components/PaymentMethodIcon/PaymentMethodIcon";
import { BankingIcon } from "../../../Components/Icons/BankingIcon/BankingIcon";
import { AccountPage } from "../AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../PageHeader/PageHeader";

interface IPaymentMethodItemProps extends TPlatform_AvailablePaymentMethod_Fragment {
  to: TPaymentMethodRoute;
}

const PaymentMethodItem = memo<IPaymentMethodItemProps>(({
  id,
  to,
  maxPaymentAmount,
  minPaymentAmount,
  name,
}) => {
  const playerCurrency = useSelector(playerCurrencySelector);

  const params = { paymentMethodId: id };

  return (
    <LinkLocalized to={to} params={params} className={classes.paymentMethodCard}>
      <div className={classes.paymentMethodCardContent}>
        <PaymentMethodIcon paymentMethodId={id as TPaymentMethodId} />

        <Ellipsis>
          {name}
        </Ellipsis>
      </div>

      <Ellipsis className={classes.paymentMethodDescriptionItem}>
        {toFormatPlayerMoneyInBag(minPaymentAmount, playerCurrency)}
      </Ellipsis>

      <Ellipsis className={classes.paymentMethodDescriptionItem}>
        {toFormatPlayerMoneyInBag(maxPaymentAmount, playerCurrency)}
      </Ellipsis>
    </LinkLocalized>
  );
});
PaymentMethodItem.displayName = "PaymentMethodItem";

interface IPaymentMethodsTableProps {
  to: TPaymentMethodRoute;
  emptyText: TTKeys;
}

const PaymentMethodsTable = withCondition(
  paymentMethodsLoadedSelector,
  memo<IPaymentMethodsTableProps>(({ emptyText, to }) => {
    const [t] = useTranslation();

    const [searchValue, setSearchValue] = useState("");
    const availableMethods = useParamSelector(bankingAvailablePaymentMethodsSelector, [searchValue]);

    const onSearch = usePersistCallback<ChangeEventHandler<HTMLInputElement>>((e) => setSearchValue(e.target.value));
    const onClear = usePersistCallback(() => setSearchValue(""));

    return (
      <div className={classes.methodTable}>
        <div className={classes.tableHeader}>
          <div className={classes.tableHeaderContent}>
            {t(platformui_starzbet_headline_method)}
          </div>

          <div className={classes.tableHeaderItem}>
            {t(platformui_starzbet_title_min)}
          </div>

          <div className={classes.tableHeaderItem}>
            {t(platformui_starzbet_title_max)}
          </div>
        </div>

        <div className={classes.searchContainer}>
          <div className={classes.search}>
            <SearchIcon color={"darkText"} />

            <ResetedInput
              className={classes.searchInput}
              placeholder={t.plain(platformui_starzbet_casino_input_search)}
              value={searchValue}
              onChange={onSearch}
            />

            {isNotEmpty(searchValue) ? <CloseIcon onClick={onClear} color={"darkText"} size={"s"} /> : null}
          </div>
        </div>

        {
          isNotEmpty(availableMethods)
            ? availableMethods.map((method) => <PaymentMethodItem {...method} to={to} key={method.id} />)
            : <Empty messageTKey={isNotVoid(searchValue) ? platformui_starzbet_title_notFound : emptyText} />
        }
      </div>
    );
  }),
);
PaymentMethodsTable.displayName = "PaymentMethodsTable";

interface IPaymentMethodsProps extends IPaymentMethodsTableProps {
  headerTKey: TTKeys;
  headerRouteMap: TPageHeaderSourceMap;
}

const PaymentMethods = memo<IPaymentMethodsProps>(({
  headerTKey,
  headerRouteMap,
  ...props
}) => {
  const [t] = useTranslation();

  const methodLoading = useSelector(paymentMethodsLoadingSelector);

  return (
    <AccountPage
      title={t(headerTKey)}
      backPath={routeMap.myAccountRoute}
      icon={BankingIcon}
      routeMap={headerRouteMap}
      headerColorScheme={"purple"}
    >
      <div className={classes.container}>
        {
          methodLoading
            ? <Loader />
            : <PaymentMethodsTable {...props} />
        }
      </div>
    </AccountPage>
  );
});
PaymentMethods.displayName = "PaymentMethods";

export { PaymentMethods };
