import { memo } from "react";
import { useSelector } from "react-redux";
import { isNotNil, type TVoidFn, usePersistCallback } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bankAccount_accountHolder,
  platformui_starzbet_button_send,
  platformui_starzbet_paymentAccount_title_iban,
  platformui_starzbet_title_chooseBankAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { EFormTypes } from "../../../../../Store/Form/Model/EFormTypes";
import { type TFixFinFiatBankAccount } from "../../../../../Store/Banking/Models/FixFinFiatModel";
import { bankingExtractFormError } from "../../../../../Store/Banking/Utils/BankingFormErrorFunction";
import {
  depositMethodSelectedErrorSelector,
  depositMethodSelectedLoadingSelector,
  depositMethodSelectedSucceededSelector,
} from "../../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { useFixFinFiatMethodSelectedHandler } from "../../../../../Store/Banking/Hooks/UseFixFinFiatMethodSelectedHandler";
import {
  depositFixFinFiatWithBankAccountsFormResponseBankAccountsSelector,
} from "../../../../../Store/Banking/Form/FixFin/FixFinFiatFormSelectors";
import { FixFinBankIcon, FixFinFiatHavaleBankAccount } from "../../FixFinFiatHavaleBankAccount/FixFinFiatHavaleBankAccount";
import { DepositShowSuccessModal } from "../DepositShowSuccessModal/DepositShowSuccessModal";
import { DepositShowErrorModal } from "../DepositShowErrorModal/DepositShowErrorModal";
import { DepositFormItem } from "../DepositFormItem";

interface ISendFormProps {
  onSubmit: TVoidFn;
}

const SendForm = memo<ISendFormProps & TFixFinFiatBankAccount>(({
  bank,
  walletName,
  walletNo,
  onSubmit,
}) => {
  const [t] = useTranslation();

  const loading = useSelector(depositMethodSelectedLoadingSelector);

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <DepositFormItem title={platformui_starzbet_bankAccount_accountHolder} value={walletName} />

        <DepositFormItem title={platformui_starzbet_paymentAccount_title_iban} value={walletNo} withCopy />

        <Button
          colorScheme={"orange-gradient"}
          onClick={onSubmit}
          disabled={loading}
        >
          {t(platformui_starzbet_button_send)}
        </Button>
      </div>

      <div className={classes.formGroupItem}>
        <FixFinBankIcon className={classes.bankIcon} bank={bank} />
      </div>
    </div>
  );
});
SendForm.displayName = "SendForm";

interface IBankAccountProps {
  onSelect: (bankAccount: TFixFinFiatBankAccount) => void;
}

const BankAccount = memo<TFixFinFiatBankAccount & IBankAccountProps>(({
  onSelect,
  ...bankAccount
}) => {
  const selectHandler = usePersistCallback(() => onSelect(bankAccount));

  return (
    <FixFinFiatHavaleBankAccount
      bank={bankAccount.bank}
      onClick={selectHandler}
      logo={bankAccount.image}
    />
  );
});
BankAccount.displayName = "BankAccount";

const BankAccountList = memo<IBankAccountProps>((props) => {
  const [t] = useTranslation();

  const bankAccounts = useSelector(depositFixFinFiatWithBankAccountsFormResponseBankAccountsSelector);

  return (
    <>
      <div className={classes.chooseBankTitle}>
        {t(platformui_starzbet_title_chooseBankAccount)}
      </div>

      <div className={classes.bankAccountList}>
        {bankAccounts.map((bankAccount) => <BankAccount {...props} {...bankAccount} key={bankAccount.bank} />)}
      </div>
    </>
  );
});
BankAccountList.displayName = "BankAccountList";

const FixFinFiatBankAccountsSuccessForm = memo(() => {
  const error = useSelector(depositMethodSelectedErrorSelector);
  const success = useSelector(depositMethodSelectedSucceededSelector);

  const {
    currentBankAccount,
    handlerError,
    onSubmit,
    onSelect,
  } = useFixFinFiatMethodSelectedHandler();

  return (
    <>
      {success ? <DepositShowSuccessModal /> : null}

      {
        error
          ? <DepositShowErrorModal hideModal={handlerError} {...bankingExtractFormError(EFormTypes.depositForm)(error)} />
          : null
      }

      {
        isNotNil(currentBankAccount)
          ? <SendForm onSubmit={onSubmit} {...currentBankAccount} />
          : <BankAccountList onSelect={onSelect} />
      }
    </>
  );
});
FixFinFiatBankAccountsSuccessForm.displayName = "FixFinFiatBankAccountsSuccessForm";

export { FixFinFiatBankAccountsSuccessForm };
