import { memo, useReducer } from "react";
import { useTranslation } from "@sb/translator";
import { not, useParamSelector } from "@sb/utils";
import { type EPlatform_PlayerPaymentAccountType } from "@sb/graphql-client";
import type { TPlatform_PlayerPaymentAccount_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./PaymentAccount.module.css";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { When } from "../../../../../../common/Components/When";
import { ChevronIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/ChevronIcon/ChevronIcon";
import { EditIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/EditIcon/EditIcon";
import { paymentAccountListTranslateMap } from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { paymentAccountsByAccountTypeSelector } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountSelectors";
import { AddIcon } from "../../../Components/Icons/AddIcon/AddIcon";
import { PaymentAccountCard } from "../../../Desktop/Components/PaymentAccount/PaymentAccountCard";
import { PaymentAccountRemoveForm } from "../../../Components/PaymentAccountRemoveForm/PaymentAccountRemoveForm";

const AddPaymentAccount = memo(() => (
  <div className={classes.addCard}>
    <AddIcon
      color={"darkText"}
      width={48}
      height={48}
    />
  </div>
));
AddPaymentAccount.displayName = "AddPaymentAccount";

const PaymentAccountExtraContent = memo<IWithId>(({ id }) => {
  const params = { id };

  return (
    <div className={classes.actions}>
      <LinkLocalized to={routeMap.bankingPaymentAccountEditRoute} params={params}>
        <EditIcon
          size={"s"}
          color={"darkText"}
        />
      </LinkLocalized>

      <PaymentAccountRemoveForm id={id} />
    </div>
  );
});
PaymentAccountExtraContent.displayName = "PaymentAccountExtraContent";

const PaymentAccountContent = memo<TPlatform_PlayerPaymentAccount_Fragment>((account) => (
  <div className={classes.accountCard}>
    <div className={classes.accountContent}>
      <PaymentAccountCard {...account} />
    </div>

    <PaymentAccountExtraContent id={account.id} />
  </div>
));
PaymentAccountContent.displayName = "PaymentAccountContent";

interface IPaymentAccountProps {
  accountType: EPlatform_PlayerPaymentAccountType;
}

const PaymentAccount = memo<IPaymentAccountProps>(({ accountType }) => {
  const [t] = useTranslation();
  const paymentAccounts = useParamSelector(paymentAccountsByAccountTypeSelector, [accountType]);
  const [expanded, toggleExpanded] = useReducer(not<boolean>, false);

  const params = { accountType };

  return (
    <>
      <div onClick={toggleExpanded} className={classes.accountTypeHeader}>
        <div className={classes.accountType}>
          <Ellipsis>
            {t(paymentAccountListTranslateMap[accountType])}
          </Ellipsis>
        </div>

        <ChevronIcon expanded={expanded} />
      </div>

      <When condition={expanded}>
        <div className={classes.accountList}>
          {
            paymentAccounts.map((account) => (
              <PaymentAccountContent {...account} key={account.id} />
            ))
          }

          <LinkLocalized to={routeMap.bankingPaymentAccountCreateRoute} params={params}>
            <AddPaymentAccount />
          </LinkLocalized>
        </div>
      </When>
    </>
  );
});
PaymentAccount.displayName = "PaymentAccount";

export { PaymentAccount };
