import { useCallback, useState } from "react";
import { useAction, useActionWithBind, usePersistCallback } from "@sb/utils";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { platformBankingMethodSelectedAction } from "../BankingActions";
import { type TFixFinFiatBankAccount } from "../Models/FixFinFiatModel";
import { DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL } from "../Utils/Variables";

const useFixFinFiatMethodSelectedHandler = () => {
  const [currentBankAccount, setCurrentBankAccount] = useState<TFixFinFiatBankAccount | null>(null);

  const methodSelected = useAction(platformBankingMethodSelectedAction);

  const onSelect = usePersistCallback((bankAccount: TFixFinFiatBankAccount) => setCurrentBankAccount(bankAccount));
  const onSubmit = useCallback(
    () => {
      if (currentBankAccount) {
        methodSelected(currentBankAccount.id, currentBankAccount.type);
      }
    },
    [currentBankAccount],
  );

  const handlerError = useActionWithBind(callManagerRemoveSymbolAction, [DEPOSIT_FIX_FIN_METHOD_SELECTED_CALL_SYMBOL]);

  return {
    onSelect,
    currentBankAccount,
    onSubmit,
    handlerError,
  };
};

export { useFixFinFiatMethodSelectedHandler };
