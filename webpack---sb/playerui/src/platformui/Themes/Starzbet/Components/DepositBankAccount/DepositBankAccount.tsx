import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_banking_title_chooseYourBank } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { getNotNil, isNil, isVoid } from "@sb/utils";
import { EPlatform_Typename } from "@sb/graphql-client";
import classes from "./DepositBankAccount.module.css";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { Empty } from "../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import {
  bankingSystemBankAccountLoadingSelector,
  bankingSystemBankAccountsSelector,
  platformBankingDepositPaymentMethodSelector,
} from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../../../../Store/Banking/Models/PaymentMethodIdModel";
import { smoothScrollToTop } from "../../../../Utils/ScrollToTop";
import { type IWithTypeCheckBankAccountProps, withTypeCheckBankAccount } from "../../../../Store/Banking/Utils/WithTypeCheckBankAccount";
import { FixFinBankAccount } from "../FixFinFiatHavaleBankAccount/FixFinFiatHavaleBankAccount";
import { KolayPayAccount } from "./KolayPayAccount/KolayPayAccount";
import { BankTransferAccount } from "./BankTransferAccount/BankTransferAccount";

const FixFinBank = withTypeCheckBankAccount(
  FixFinBankAccount,
  EPlatform_Typename.platformFixFinBank,
);

const bankAccountPerMethodMap: Partial<Record<TPaymentMethodId, ComponentType<IWithTypeCheckBankAccountProps>>> = {
  [PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_DEPOSIT_ID]: withTypeCheckBankAccount(
    BankTransferAccount,
    EPlatform_Typename.platformSystemBankAccount,
  ),

  [PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_DEPOSIT_ID]: withTypeCheckBankAccount(
    KolayPayAccount,
    EPlatform_Typename.platformKolayPayBankAccount,
  ),

  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FASTLINE_QR]: FixFinBank,

  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_FASTLINE_CEPBANK]: FixFinBank,

  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_DEPOSIT_SISTEMNAKIT_HAVALE]: FixFinBank,
};

const DepositBankAccount = memo(() => {
  const [t] = useTranslation();
  smoothScrollToTop();

  const paymentMethodId = useSelector(platformBankingDepositPaymentMethodSelector);

  const loading = useSelector(bankingSystemBankAccountLoadingSelector);
  const bankAccounts = useSelector(bankingSystemBankAccountsSelector);

  if (loading) {
    return (
      <Loader />
    );
  }

  // todo^Bondarenko investigate after router update
  if (isVoid(bankAccounts) || isNil(paymentMethodId)) {
    return (
      <Empty />
    );
  }

  const component = getNotNil(bankAccountPerMethodMap[paymentMethodId], ["DepositBankAccount"], `Unexpected null bank account for ${paymentMethodId} method`);

  return (
    <>
      <div className={classes.chooseBankTitle}>
        {t(platformui_starzbet_banking_title_chooseYourBank)}
      </div>

      <div className={classes.bankAccountList}>
        {
          bankAccounts.map((bankAccount, idx) => createElement(
            component,
            {
              key: `${bankAccount.__typename}${idx}`,
              props: bankAccount,
            },
          ))
        }
      </div>
    </>
  );
});
DepositBankAccount.displayName = "DepositBankAccount";

export { DepositBankAccount };
