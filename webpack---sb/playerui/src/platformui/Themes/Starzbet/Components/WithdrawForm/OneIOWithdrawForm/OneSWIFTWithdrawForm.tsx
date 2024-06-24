import clsx from "clsx";
import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_accountNumber,
  platformui_starzbet_title_bic,
  platformui_starzbet_title_paymentAccountName,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { selectFieldValue, simpleValueExtractor, useFormSelector } from "@sb/form-new";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { FieldCreator, type TFieldChildProps } from "../../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../../common/Themes/Starzbet/Components/Field/Field";
import {
  type EOneSWIFTFormType,
  isOneSWIFTPaymentAccountForm,
  ONE_SWIFT_FORM_ACCOUNT_NUMBER_FIELD_PATH,
  ONE_SWIFT_FORM_BIC_FIELD_PATH,
  ONE_SWIFT_FORM_FIELD_PATHS,
  ONE_SWIFT_FORM_NAME_FIELD_PATH,
  ONE_SWIFT_FORM_TYPE_TABS,
  ONE_SWIFT_TAB_TRANSLATE_MAP,
} from "../../../../../Store/Banking/Form/OneIO/OneIOForm";
import { PlayerPaymentAccountField } from "../PlayerPaymentAccountField/PlayerPaymentAccountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const FormTypeTabs = memo<TFieldChildProps<EOneSWIFTFormType>>(({ value, onChange }) => {
  const [t] = useTranslation();
  const onSelect = (value: EOneSWIFTFormType) => () => onChange(value);

  return (
    <div className={classes.tabs}>
      {
        ONE_SWIFT_FORM_TYPE_TABS.map((tab) => (
          <div className={clsx(classes.tab, tab === value && classes.active)} key={tab} onClick={onSelect(tab)}>
            {t(ONE_SWIFT_TAB_TRANSLATE_MAP[tab])}
          </div>
        ))
      }
    </div>
  );
});
FormTypeTabs.displayName = "FormTypeTabs";

const OneSWITFTBaseForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={ONE_SWIFT_FORM_ACCOUNT_NUMBER_FIELD_PATH}
        label={t(platformui_starzbet_title_accountNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={ONE_SWIFT_FORM_BIC_FIELD_PATH}
        label={t(platformui_starzbet_title_bic)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />
    </>
  );
});
OneSWITFTBaseForm.displayName = "OneSWITFTBaseForm";

const OneSWIFTWithdrawForm = memo(() => {
  const [t] = useTranslation();
  const formType = useFormSelector(selectFieldValue.type<EOneSWIFTFormType>(), [ONE_SWIFT_FORM_FIELD_PATHS.formType]);

  return (
    <>
      <FieldCreator<EOneSWIFTFormType>
        ThemedField={Field}
        fieldPath={ONE_SWIFT_FORM_FIELD_PATHS.formType}
        valueExtractor={simpleValueExtractor}
        ghost
        hideError
      >
        {(props) => <FormTypeTabs {...props} />}
      </FieldCreator>

      {isOneSWIFTPaymentAccountForm(formType) ? <PlayerPaymentAccountField fieldPath={ONE_SWIFT_FORM_FIELD_PATHS.details} /> : null}

      <AccountInfo />

      <div className={classes.form}>
        {!isOneSWIFTPaymentAccountForm(formType) ? <OneSWITFTBaseForm /> : null}

        <TextField
          fieldPath={ONE_SWIFT_FORM_NAME_FIELD_PATH}
          label={t(platformui_starzbet_title_paymentAccountName)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <AmountField />
      </div>
    </>
  );
});
OneSWIFTWithdrawForm.displayName = "OneSWIFTWithdrawForm";

export { OneSWIFTWithdrawForm };
