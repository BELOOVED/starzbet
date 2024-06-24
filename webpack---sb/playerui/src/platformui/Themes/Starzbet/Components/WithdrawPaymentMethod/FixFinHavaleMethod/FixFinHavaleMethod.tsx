import { memo } from "react";
import { useSelector } from "react-redux";
import { isNil, isVoid } from "@sb/utils";
import { platformui_starzbet_banking_title_chooseYourBank } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawPaymentMethod.module.css";
import { Empty } from "../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import {
  bankingSystemBankAccountsSelector,
  depositActiveBankAccountIdSelector,
} from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { paymentMethodsLoadingSelector } from "../../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { fixFinAccountActiveSelector } from "../../../../../Store/Banking/Form/FixFin/FixFinWithBankAccountSelectors";
import { FixFinBankAccount, FixFinBankIcon } from "../../FixFinFiatHavaleBankAccount/FixFinFiatHavaleBankAccount";
import { WithdrawForm } from "../../WithdrawForm/WithdrawForm";

const FixFinBankAccounts = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(paymentMethodsLoadingSelector);
  const bankAccounts = useSelector(bankingSystemBankAccountsSelector);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (isVoid(bankAccounts)) {
    return (
      <Empty />
    );
  }

  return (
    <>
      <div className={classes.chooseBank}>
        {t(platformui_starzbet_banking_title_chooseYourBank)}
      </div>

      <div className={classes.bankAccountList}>
        {
          bankAccounts.map((bankAccount) => {
            if (bankAccount.__typename !== "Platform_FixFinBank") {
              throw new Error("Unexpected `bank account` data, fetch correct bank account on `payment method` page");
            }

            return (
              <FixFinBankAccount
                {...bankAccount}
                key={bankAccount.name}
              />
            );
          })
        }
      </div>
    </>
  );
});
FixFinBankAccounts.displayName = "FixFinBankAccounts";

const FixFinHavaleForm = memo(() => {
  const bankAccount = useSelector(fixFinAccountActiveSelector);

  return (
    <>
      <div className={classes.bankInfo}>
        <div className={classes.bankName}>
          {bankAccount.name}
        </div>

        <FixFinBankIcon bank={bankAccount.name} logo={bankAccount.banner ?? bankAccount.logo} fixed />
      </div>

      <WithdrawForm />
    </>
  );
});
FixFinHavaleForm.displayName = "FixFinHavaleForm";

const FixFinHavaleMethod = memo(() => {
  const activeBankAccount = useSelector(depositActiveBankAccountIdSelector);

  if (isNil(activeBankAccount)) {
    return (
      <FixFinBankAccounts />
    );
  }

  return (
    <FixFinHavaleForm />
  );
});
FixFinHavaleMethod.displayName = "FixFinHavaleMethod";

export { FixFinHavaleMethod };
