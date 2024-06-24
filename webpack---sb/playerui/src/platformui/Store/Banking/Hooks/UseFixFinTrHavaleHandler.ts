import { useState } from "react";
import { useAction, useParamSelector } from "@sb/utils";
import { callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { type TFixFinFiatBank } from "../Models/FixFinFiatModel";
import { depositFixFinBankSelectedAction, depositFixFinSelectedBankConfirmAction } from "../BankingActions";
import { DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL, DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL } from "../Utils/Variables";
import { depositFixFinFiatCurrentBankSelector } from "../Form/FixFin/FixFinFiatFormSelectors";

const useFixFinBankSelectedHandler = () => {
  const [currentBank, setCurrentBank] = useState<string | null>(null);
  const bankSelected = useAction(depositFixFinBankSelectedAction);
  const loading = useParamSelector(callManagerStartedSelector, [DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL]);
  const succeeded = useParamSelector(callManagerSucceededSelector, [DEPOSIT_FIX_FIN_BANK_SELECTED_CALL_SYMBOL]);

  const onSelectBank = (bank: TFixFinFiatBank) => () => {
    if (loading) {
      return;
    }

    setCurrentBank(bank.id);
    bankSelected(bank.id);
  };

  return {
    currentBank: succeeded && currentBank ? currentBank : null,
    loading,
    onSelectBank,
  };
};

const useFixFinSelectedBankConfirmHandler = (id: string) => {
  const onConfirm = useAction(depositFixFinSelectedBankConfirmAction);
  const succeeded = useParamSelector(callManagerSucceededSelector, [DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL]);
  const loading = useParamSelector(callManagerStartedSelector, [DEPOSIT_FIX_FIN_SELECTED_BANK_CONFIRM_CALL_SYMBOL]);
  const bank = useParamSelector(depositFixFinFiatCurrentBankSelector, [id]);

  return {
    onConfirm,
    succeeded,
    loading,
    bank,
  };
};

export { useFixFinBankSelectedHandler, useFixFinSelectedBankConfirmHandler };
