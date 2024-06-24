import { memo } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, type IMoney, Money, type TNullable, useActionWithBind, useParamSelector, withProps } from "@sb/utils";
import {
  platformui_starzbet_bankAccount_accountHolder,
  platformui_starzbet_bankAccount_branchCode,
  platformui_starzbet_deposit_confirmDeposit,
  platformui_starzbet_deposit_pleaseWaitInformation,
  platformui_starzbet_paymentAccount_title_iban,
  platformui_starzbet_paymentMethod_minMax,
  platformui_starzbet_title_bank,
  platformui_starzbet_title_chooseBankAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { callManagerErrorSelector, callManagerRemoveSymbolAction, type TCallManagerSymbol } from "@sb/call-manager";
import classes from "../DepositForm.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { type TFixFinFiatBank } from "../../../../../Store/Banking/Models/FixFinFiatModel";
import { EFormTypes } from "../../../../../Store/Form/Model/EFormTypes";
import { bankingExtractFormError } from "../../../../../Store/Banking/Utils/BankingFormErrorFunction";
import {
  useFixFinBankSelectedHandler,
  useFixFinSelectedBankConfirmHandler,
} from "../../../../../Store/Banking/Hooks/UseFixFinTrHavaleHandler";
import {
  DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL,
  DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL,
} from "../../../../../Store/Banking/Utils/Variables";
import { depositFixFinFiatWithBanksFormResponseInfoBanksSelector } from "../../../../../Store/Banking/Form/FixFin/FixFinFiatFormSelectors";
import { getCallSymbolError } from "../../../../../Store/Form/Utils/GetCallSymbolError";
import { FixFinFiatHavaleBankAccount } from "../../FixFinFiatHavaleBankAccount/FixFinFiatHavaleBankAccount";
import { DepositShowErrorModal } from "../DepositShowErrorModal/DepositShowErrorModal";
import { DepositShowSuccessModal } from "../DepositShowSuccessModal/DepositShowSuccessModal";
import { DepositFormItem } from "../DepositFormItem";

interface IOnErrorFormProps {
  callSymbol: TCallManagerSymbol;
}

const OnErrorForm = memo<IOnErrorFormProps>(({ callSymbol }) => {
  const hideModal = useActionWithBind(callManagerRemoveSymbolAction, [callSymbol]);
  const error = useParamSelector(callManagerErrorSelector, [callSymbol]);

  if (!error) {
    return null;
  }

  return (
    <DepositShowErrorModal hideModal={hideModal} {...bankingExtractFormError(EFormTypes.depositForm)(getCallSymbolError(error))} />
  );
});
OnErrorForm.displayName = "OnErrorForm";

interface IExtraContentProps {
  min: TNullable<IMoney>;
  max: TNullable<IMoney>;
}

const ExtraContent = memo<IExtraContentProps>(({
  min,
  max,
}) => {
  const [t] = useTranslation();

  return (
    <>
      <div>
        {t(platformui_starzbet_paymentMethod_minMax)}
      </div>

      <div>
        {min ? Money.toFormat(min, EMoneyFormat.symbolRight) : "-"}

        {" / "}

        {max ? Money.toFormat(max, EMoneyFormat.symbolRight) : "-"}
      </div>
    </>
  );
});
ExtraContent.displayName = "ExtraContent";

interface IBankAccountListProps {
  onSelect: (bankAccount: TFixFinFiatBank) => () => void;
}

const BankAccountList = memo<IBankAccountListProps>(({ onSelect }) => {
  const [t] = useTranslation();

  const banks = useSelector(depositFixFinFiatWithBanksFormResponseInfoBanksSelector);

  return (
    <>
      <div className={classes.chooseBankTitle}>
        {t(platformui_starzbet_title_chooseBankAccount)}
      </div>

      <div className={classes.bankAccountList}>
        {
          banks.map((bank) => (
            <FixFinFiatHavaleBankAccount
              bank={bank.name}
              onClick={onSelect(bank)}
              key={bank.id}
              logo={bank.logo}
              extra={withProps(ExtraContent)({ min: bank.min, max: bank.max })}
            />
          ))
        }
      </div>
    </>
  );
});
BankAccountList.displayName = "BankAccountList";

const ConfirmForm = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();

  const {
    onConfirm,
    succeeded,
    loading,
    bank,
  } = useFixFinSelectedBankConfirmHandler(id);

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <DepositFormItem title={platformui_starzbet_title_bank} value={bank.name} />

        <DepositFormItem title={platformui_starzbet_bankAccount_accountHolder} value={bank.accountOwner ?? "-"} />

        <DepositFormItem title={platformui_starzbet_bankAccount_branchCode} value={bank.branchCode ?? "-"} />

        <DepositFormItem title={platformui_starzbet_paymentAccount_title_iban} withCopy value={bank.iban ?? "-"} />

        <OnErrorForm callSymbol={DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL} />

        {succeeded ? <DepositShowSuccessModal /> : null}

        <Button
          colorScheme={"orange-gradient"}
          onClick={onConfirm}
          disabled={loading}
        >
          {t(platformui_starzbet_deposit_confirmDeposit)}
        </Button>
      </div>
    </div>
  );
});
ConfirmForm.displayName = "ConfirmForm";

const FixFinFiatBankSelectedSuccessForm = memo(() => {
  const [t] = useTranslation();
  const {
    currentBank,
    loading,
    onSelectBank,
  } = useFixFinBankSelectedHandler();

  if (loading) {
    return (
      <>
        {t(platformui_starzbet_deposit_pleaseWaitInformation)}

        <Loader />
      </>
    );
  }

  if (currentBank) {
    return (
      <ConfirmForm id={currentBank} />
    );
  }

  return (
    <>
      <OnErrorForm callSymbol={DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL} />

      <BankAccountList onSelect={onSelectBank} />
    </>
  );
});
FixFinFiatBankSelectedSuccessForm.displayName = "FixFinFiatBankSelectedSuccessForm";

export { FixFinFiatBankSelectedSuccessForm };
