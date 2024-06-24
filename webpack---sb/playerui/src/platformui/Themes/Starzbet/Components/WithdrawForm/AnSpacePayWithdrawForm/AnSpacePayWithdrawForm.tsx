import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_placeholder_enterCpf,
  platformui_starzbet_placeholder_enterEmail,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectType,
  platformui_starzbet_title_cpf,
  platformui_starzbet_title_email,
  platformui_starzbet_title_evp,
  platformui_starzbet_title_mobileNumber,
  platformui_starzbet_title_pixType,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EPlatform_AnSpacePayPixKeyType } from "@sb/graphql-client";
import { isNotNil } from "@sb/utils";
import { selectFieldValue, useFormSelector } from "@sb/form-new";
import classes from "../WithdrawForm.module.css";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { type ISelectOption } from "../../../../../../common/Components/Field/SelectModel";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { AN_SPACE_PAY_FORM_FIELD_PATHS, AN_SPACE_PAY_TYPE_OPTIONS } from "../../../../../Store/Banking/Form/AnSpacePay/AnSpacePayForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const placeholderMap: Record<EPlatform_AnSpacePayPixKeyType, string> = {
  [EPlatform_AnSpacePayPixKeyType.telefone]: platformui_starzbet_placeholder_enterMobileNumber,
  [EPlatform_AnSpacePayPixKeyType.email]: platformui_starzbet_placeholder_enterEmail,
  [EPlatform_AnSpacePayPixKeyType.cpfcnpj]: platformui_starzbet_placeholder_enterCpf,
  [EPlatform_AnSpacePayPixKeyType.evp]: platformui_starzbet_placeholder_enterText,
};

const titleMap: Record<EPlatform_AnSpacePayPixKeyType, string> = {
  [EPlatform_AnSpacePayPixKeyType.telefone]: platformui_starzbet_title_mobileNumber,
  [EPlatform_AnSpacePayPixKeyType.email]: platformui_starzbet_title_email,
  [EPlatform_AnSpacePayPixKeyType.cpfcnpj]: platformui_starzbet_title_cpf,
  [EPlatform_AnSpacePayPixKeyType.evp]: platformui_starzbet_title_evp,
};

const AnSpacePayPixTypeOption = memo<ISelectOption<EPlatform_AnSpacePayPixKeyType>>(({
  value,
}) => {
  const [t] = useTranslation();

  return t(titleMap[value]);
});
AnSpacePayPixTypeOption.displayName = "AnSpacePayPixTypeOption";

const AnSpacePayPixTypeSelect = memo(() => {
  const [t] = useTranslation();

  return (
    <SelectField<EPlatform_AnSpacePayPixKeyType>
      fieldPath={AN_SPACE_PAY_FORM_FIELD_PATHS.type}
      options={AN_SPACE_PAY_TYPE_OPTIONS}
      placeholder={t.plain(platformui_starzbet_placeholder_selectType)}
      label={t(platformui_starzbet_title_pixType)}
      optionComponent={AnSpacePayPixTypeOption}
    />
  );
});
AnSpacePayPixTypeSelect.displayName = "AnSpacePayPixTypeSelect";

interface IAnSpacePayPixValueProps {
  pixType: EPlatform_AnSpacePayPixKeyType;
}

const AnSpacePayPixValue = memo<IAnSpacePayPixValueProps>(({ pixType }) => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={AN_SPACE_PAY_FORM_FIELD_PATHS.value}
      label={t(titleMap[pixType])}
      placeholder={t.plain(placeholderMap[pixType])}
    />
  );
});
AnSpacePayPixValue.displayName = "AnSpacePayPixValue";

const AnSpacePayWithdrawForm = memo(() => {
  const pixType = useFormSelector(selectFieldValue<EPlatform_AnSpacePayPixKeyType>, [AN_SPACE_PAY_FORM_FIELD_PATHS.type]);

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <AnSpacePayPixTypeSelect />

        {isNotNil(pixType) ? <AnSpacePayPixValue pixType={pixType} /> : null}

        <AmountField />
      </div>
    </>
  );
});
AnSpacePayWithdrawForm.displayName = "AnSpacePayWithdrawForm";

export { AnSpacePayWithdrawForm };
