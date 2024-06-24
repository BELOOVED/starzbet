import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { type ISelectOption } from "../../../common/Components/Field/SelectModel";
import {
  type EPaymentAccountBankAccount,
  paymentAccountBankAccountTranslateMap,
} from "../../Store/PaymentAccount/Models/PaymentAccountTypeModel";

const PaymentAccountBankAccountOption = memo<ISelectOption<EPaymentAccountBankAccount>>((option) => {
  const [t] = useTranslation();

  return t(paymentAccountBankAccountTranslateMap[option.value]);
});
PaymentAccountBankAccountOption.displayName = "PaymentAccountBankAccountOption";

export { PaymentAccountBankAccountOption };
