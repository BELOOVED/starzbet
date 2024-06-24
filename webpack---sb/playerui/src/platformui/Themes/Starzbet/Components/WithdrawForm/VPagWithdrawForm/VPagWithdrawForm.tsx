import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_placeholder_enterCpf,
  platformui_starzbet_placeholder_enterEmail,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_selectType,
  platformui_starzbet_title_cpf,
  platformui_starzbet_title_email,
  platformui_starzbet_title_mobileNumber,
  platformui_starzbet_title_pixType,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EPlatform_VpagPixType } from "@sb/graphql-client";
import { isNotNil } from "@sb/utils";
import { selectFieldValue, useFormSelector } from "@sb/form-new";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { type ISelectOption } from "../../../../../../common/Components/Field/SelectModel";
import { VPAG_FORM_FIELD_PATHS, VPAG_TYPE_OPTIONS } from "../../../../../Store/Banking/Form/VPag/VPagForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const placeholderMap: Record<EPlatform_VpagPixType, string> = {
  [EPlatform_VpagPixType.phone]: platformui_starzbet_placeholder_enterMobileNumber,
  [EPlatform_VpagPixType.email]: platformui_starzbet_placeholder_enterEmail,
  [EPlatform_VpagPixType.cpf]: platformui_starzbet_placeholder_enterCpf,
};

const titleMap: Record<EPlatform_VpagPixType, string> = {
  [EPlatform_VpagPixType.phone]: platformui_starzbet_title_mobileNumber,
  [EPlatform_VpagPixType.email]: platformui_starzbet_title_email,
  [EPlatform_VpagPixType.cpf]: platformui_starzbet_title_cpf,
};

const VPagPixTypeOption = memo<ISelectOption<EPlatform_VpagPixType>>(({
  value,
}) => {
  const [t] = useTranslation();

  return t(titleMap[value]);
});

const VPagPixTypeSelect = memo(() => {
  const [t] = useTranslation();

  return (
    <SelectField<EPlatform_VpagPixType>
      fieldPath={VPAG_FORM_FIELD_PATHS.type}
      options={VPAG_TYPE_OPTIONS}
      placeholder={t.plain(platformui_starzbet_placeholder_selectType)}
      label={t(platformui_starzbet_title_pixType)}
      optionComponent={VPagPixTypeOption}
    />
  );
});
VPagPixTypeSelect.displayName = "VPagPixTypeSelect";

interface IVPagPixValueProps {
  pixType: EPlatform_VpagPixType;
}

const VPagPixValue = memo<IVPagPixValueProps>(({ pixType }) => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={VPAG_FORM_FIELD_PATHS.value}
      label={t(titleMap[pixType])}
      placeholder={t.plain(placeholderMap[pixType])}
    />
  );
});
VPagPixValue.displayName = "VPagPixValue";

const VPagWithdrawForm = memo(() => {
  const pixType = useFormSelector(selectFieldValue<EPlatform_VpagPixType>, [VPAG_FORM_FIELD_PATHS.type]);

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <VPagPixTypeSelect />

        {isNotNil(pixType) ? <VPagPixValue pixType={pixType} /> : null}

        <AmountField />
      </div>
    </>
  );
});
VPagWithdrawForm.displayName = "VPagWithdrawForm";

export { VPagWithdrawForm };
