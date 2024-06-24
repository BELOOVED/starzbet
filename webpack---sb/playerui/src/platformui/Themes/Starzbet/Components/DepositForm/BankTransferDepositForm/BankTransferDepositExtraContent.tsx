import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { isVoid } from "@sb/utils";
import { platformui_starzbet_title_depositNote } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { bankTransferAccountDepositNodeTextSelector } from "../../../../../Store/Banking/Form/BankTransfer/BankTransferAccountSelectors";
import { PaymentNoteLabel } from "../../PaymentNoteLabel/PaymentNoteLabel";

const BankTransferDepositExtraContent = memo(() => {
  const [t] = useTranslation();
  const depositNote = useSelector(bankTransferAccountDepositNodeTextSelector);

  if (isVoid(depositNote)) {
    return null;
  }

  return (
    <PaymentNoteLabel header={t(platformui_starzbet_title_depositNote)} content={depositNote} className={classes.labelWrapper} />
  );
});
BankTransferDepositExtraContent.displayName = "BankTransferDepositExtraContent";

export { BankTransferDepositExtraContent };
