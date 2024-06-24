import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_paymentAccount_title_accountName,
  platformui_starzbet_paymentAccount_title_iban,
  platformui_starzbet_title_bank,
  platformui_starzbet_title_chooseBankAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useActionWithBind } from "@sb/utils";
import { callManagerErrorSelector, callManagerRemoveSymbolAction } from "@sb/call-manager";
import classes from "../DepositForm.module.css";
import { depositFixFinFiatVevoHavaleFormResponseSelector } from "../../../../../Store/Banking/Form/FixFin/FixFinFiatFormSelectors";
import {
  isFixFinFiatVevoHavaleBanksResponse,
  type TFixFinVevoHavaleBank,
  type TFixFinVevoHavaleBanks,
  type TVevoHavaleUserResult,
} from "../../../../../Store/Banking/Models/FixFinFiatModel";
import { fixFinVevoHavaleBankAccountSelectAction } from "../../../../../Store/Banking/BankingActions";
import { DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL, DEPOSIT_FORM } from "../../../../../Store/Banking/Utils/Variables";
import { bankingExtractFormError } from "../../../../../Store/Banking/Utils/BankingFormErrorFunction";
import { getCallSymbolError } from "../../../../../Store/Form/Utils/GetCallSymbolError";
import { FixFinFiatHavaleBankAccount } from "../../FixFinFiatHavaleBankAccount/FixFinFiatHavaleBankAccount";
import { DepositFormItem } from "../DepositFormItem";
import { DepositShowErrorModal } from "../DepositShowErrorModal/DepositShowErrorModal";

const SimpleContent = memo<TVevoHavaleUserResult>(({
  iban,
  bankName,
  accountName,
}) => (
  <div className={classes.formGroup}>
    <div className={classes.formGroupItem}>
      <DepositFormItem title={platformui_starzbet_paymentAccount_title_iban} value={iban} withCopy />

      <DepositFormItem title={platformui_starzbet_title_bank} value={bankName} />

      <DepositFormItem title={platformui_starzbet_paymentAccount_title_accountName} value={accountName} />
    </div>
  </div>
));
SimpleContent.displayName = "SimpleContent";

const BankAccount = memo<TFixFinVevoHavaleBank>(({
  id,
  name,
  logo,
  banner,
}) => {
  const handler = useActionWithBind(fixFinVevoHavaleBankAccountSelectAction, id);

  return (
    <FixFinFiatHavaleBankAccount
      onClick={handler}
      bank={name}
      logo={banner ?? logo}
    />
  );
});
BankAccount.displayName = "BankAccount";

const FixFinVevoHavaleBankForm = memo<TFixFinVevoHavaleBanks>(({ bankAccounts }) => {
  const [t] = useTranslation();
  const error = useSelector(callManagerErrorSelector.with.symbol(DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL));
  const hideModal = useActionWithBind(callManagerRemoveSymbolAction, [DEPOSIT_FIX_FIN_VEVO_HAVALE_BANK_SELECT_CALL_SYMBOL]);

  return (
    <>
      {error ? <DepositShowErrorModal hideModal={hideModal} {...bankingExtractFormError(DEPOSIT_FORM)(getCallSymbolError(error))} /> : null}

      <div className={classes.bankNameTitle}>
        {t(platformui_starzbet_title_chooseBankAccount)}
      </div>

      <div className={classes.bankAccountList}>
        {bankAccounts.map((bankAccount) => <BankAccount {...bankAccount} key={bankAccount.id} />)}
      </div>
    </>
  );
});
FixFinVevoHavaleBankForm.displayName = "FixFinVevoHavaleBankForm";

const FixFinFiatVevoHavaleSuccessForm = memo(() => {
  const response = useSelector(depositFixFinFiatVevoHavaleFormResponseSelector);

  if (isFixFinFiatVevoHavaleBanksResponse(response)) {
    return (
      <FixFinVevoHavaleBankForm bankAccounts={response} />
    );
  }

  return (
    <SimpleContent {...response.info} />
  );
});
FixFinFiatVevoHavaleSuccessForm.displayName = "FixFinFiatVevoHavaleSuccessForm";

export { FixFinFiatVevoHavaleSuccessForm };
