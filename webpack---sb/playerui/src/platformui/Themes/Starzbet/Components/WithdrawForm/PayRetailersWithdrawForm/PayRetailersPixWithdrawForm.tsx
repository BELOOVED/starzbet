import { memo } from "react";
import { platformui_starzbet_placeholder_enterText, platformui_starzbet_title_pix } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { PAY_RETAILERS_PIX_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/PayRetailers/PayRetailersForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const PayRetailersPixWithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={PAY_RETAILERS_PIX_FORM_FIELD_PATHS.pix}
          label={t(platformui_starzbet_title_pix)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <AmountField />
      </div>
    </>
  );
});
PayRetailersPixWithdrawForm.displayName = "PayRetailersPixWithdrawForm";

export { PayRetailersPixWithdrawForm };
