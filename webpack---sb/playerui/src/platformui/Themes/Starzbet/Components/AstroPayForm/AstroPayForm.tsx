import clsx from "clsx";
import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { isNotEmpty, useParamSelector, withProps } from "@sb/utils";
import {
  platformui_starzbet_placeholder_enterPhoneNumber,
  platformui_starzbet_placeholder_selectAccount,
  platformui_starzbet_title_astroPayAccount,
  platformui_starzbet_title_astroPayMobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { selectFieldValue, simpleValueExtractor, useFormSelector } from "@sb/form-new";
import classes from "./AstroPayForm.module.css";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { type ISelectOption } from "../../../../../common/Components/Field/SelectModel";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { FieldCreator, type TFieldChildProps } from "../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../common/Themes/Starzbet/Components/Field/Field";
import {
  astroPayBankAccountsOptionsSelector,
  bankingAstroPayBankAccountOptionInfoSelector,
} from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import {
  ASTRO_PAY_FORM_BANK_ACCOUNT_FIELD_PATHS,
  ASTRO_PAY_FORM_FIELD_PATHS,
  ASTRO_PAY_FORM_PHONE_NUMBER_FIELD_PATHS,

} from "../../../../Store/Banking/Form/AstroPay/AstroPayForm";
import { ASTRO_PAY_TAB_LIST, astroPayTabTranslateMap, EAstroPayTab } from "../../../../Store/Banking/Models/AstroPayFormModel";

const PhoneNumberItem = memo(() => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={ASTRO_PAY_FORM_PHONE_NUMBER_FIELD_PATHS}
      label={t(platformui_starzbet_title_astroPayMobileNumber)}
      placeholder={t.plain(platformui_starzbet_placeholder_enterPhoneNumber)}
    />
  );
});
PhoneNumberItem.displayName = "PhoneNumberItem";

const OptionComponent = memo<IAstroPayFormProps & ISelectOption<string>>(({ value, bankAccountTitle }) => {
  const [t] = useTranslation();
  const accountInfo = useParamSelector(bankingAstroPayBankAccountOptionInfoSelector, [value]);

  return (
    <>
      {t(bankAccountTitle, { value: accountInfo })}
    </>
  );
});
OptionComponent.displayName = "OptionComponent";

const SelectBankAccount = memo<IAstroPayFormProps>(({ bankAccountTitle }) => {
  const [t] = useTranslation();

  const options = useSelector(astroPayBankAccountsOptionsSelector);

  return (
    <SelectField<string>
      fieldPath={ASTRO_PAY_FORM_BANK_ACCOUNT_FIELD_PATHS}
      options={options}
      label={t(platformui_starzbet_title_astroPayAccount)}
      placeholder={t.plain(platformui_starzbet_placeholder_selectAccount)}
      optionComponent={withProps(OptionComponent)({ bankAccountTitle })}
    />
  );
});
SelectBankAccount.displayName = "SelectBankAccount";

const Tabs = memo<TFieldChildProps<EAstroPayTab>>(({ value, onChange }) => {
  const [t] = useTranslation();

  const changeTabHandler = (tab: EAstroPayTab) => () => onChange(tab);

  return (
    <div className={classes.tabs}>
      {
        ASTRO_PAY_TAB_LIST.map((tab) => (
          <div className={clsx(classes.tab, value === tab && classes.tabActive)} key={tab} onClick={changeTabHandler(tab)}>
            {t(astroPayTabTranslateMap[tab])}
          </div>
        ))
      }
    </div>
  );
});
Tabs.displayName = "Tabs";

const formContentPerTab: Record<EAstroPayTab, ComponentType<IAstroPayFormProps>> = {
  [EAstroPayTab.bankAccount]: SelectBankAccount,
  [EAstroPayTab.phoneNumber]: PhoneNumberItem,
};

const FormWithBankSelect = memo<IAstroPayFormProps>((props) => {
  const activeTab = useFormSelector(selectFieldValue<EAstroPayTab>, [ASTRO_PAY_FORM_FIELD_PATHS.formType]);

  return (
    <div className={classes.formGroupItem}>
      <FieldCreator<EAstroPayTab>
        ThemedField={Field}
        valueExtractor={simpleValueExtractor}
        fieldPath={ASTRO_PAY_FORM_FIELD_PATHS.formType}
        ghost
        hideError
      >
        {
          (props) => (
            <Tabs {...props} />
          )
        }
      </FieldCreator>

      <div className={classes.formGroupItem}>
        {activeTab ? createElement<IAstroPayFormProps>(formContentPerTab[activeTab], props) : null}
      </div>
    </div>
  );
});
FormWithBankSelect.displayName = "FormWithBankSelect";

interface IAstroPayFormProps {
  bankAccountTitle: string;
}

const AstroPayForm = memo<IAstroPayFormProps>((props) => {
  const bankAccounts = useSelector(astroPayBankAccountsOptionsSelector);

  if (isNotEmpty(bankAccounts)) {
    return (
      <FormWithBankSelect {...props} />
    );
  }

  return (
    <div className={classes.formGroupItem}>
      <PhoneNumberItem />
    </div>
  );
});
AstroPayForm.displayName = "AstroPayForm";

export { AstroPayForm };
