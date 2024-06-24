import { memo } from "react";
import { useSelector } from "react-redux";
import { isNil } from "@sb/utils";
import { depositActiveBankAccountIdSelector } from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { DepositBankAccount } from "../../DepositBankAccount/DepositBankAccount";
import { DepositForm } from "../../DepositForm/DepositForm";

const DepositBankAccountMethod = memo(() => {
  const bankAccount = useSelector(depositActiveBankAccountIdSelector);

  if (isNil(bankAccount)) {
    return (
      <DepositBankAccount />
    );
  }

  return (
    <DepositForm />
  );
});
DepositBankAccountMethod.displayName = "DepositBankAccountMethod";

export { DepositBankAccountMethod };
