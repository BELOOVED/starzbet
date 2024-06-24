import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_banking_title_chooseSelfExclusion,
  platformui_starzbet_password_placeholder_enterPassword,
  platformui_starzbet_placeholder_pleaseSelect,
  platformui_starzbet_selfExclusion_form_title_exclusionEnd,
  platformui_starzbet_selfExclusion_form_title_exclusionStart,
  platformui_starzbet_selfExclusion_form_title_period,
  platformui_starzbet_selfExclusion_form_title_product,
  platformui_starzbet_selfExclusion_responsible,
  platformui_starzbet_selfExclusion_set,
  platformui_starzbet_selfExclusion_warning,
  platformui_starzbet_timeOut_title_password,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { type TPlatform_SelfExclusionBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { FormWithWrapper, selectIsFormSubmittingStarted, useFormSelector } from "@sb/form-new";
import classes from "./SelfExclusionForm.module.css";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useDateFormat } from "../../../../../common/Utils/ComponentsUtils/UseDateFormat";
import { selfExclusionBagsSelector } from "../../../../Store/SelfProtection/Selectors/SelfProtectionSelectors";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import {
  assertsSelfExclusionProduct,
  SELF_EXCLUSION_FORM,
  SELF_EXCLUSION_PERIOD_OPTIONS,
  SELF_EXCLUSION_PRODUCT_OPTIONS,
} from "../../../../Store/SelfProtection/Form/SelfExclusion/SelfExclusionFormModel";
import { SelfExclusionProductOption } from "../../../../Components/SelfProtection/SelfExclusionProductOption";
import { SELF_EXCLUSION_FORM_FIELD_PATHS } from "../../../../Store/SelfProtection/Form/SelfExclusion/SelfExclusionForm";
import { PeriodLimitOption } from "../../../../Components/SelfProtection/PeriodLimitOption";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const SelfExclusionFormContent = memo(() => {
  const [t] = useTranslation();

  const loading = useFormSelector(selectIsFormSubmittingStarted);

  return (
    <div className={classes.form}>
      <SelectField
        fieldPath={SELF_EXCLUSION_FORM_FIELD_PATHS.product}
        options={SELF_EXCLUSION_PRODUCT_OPTIONS}
        optionComponent={SelfExclusionProductOption}
        label={t(platformui_starzbet_selfExclusion_form_title_product)}
        placeholder={t.plain(platformui_starzbet_placeholder_pleaseSelect)}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.ProductSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.ProductOption}
      />

      <SelectField
        fieldPath={SELF_EXCLUSION_FORM_FIELD_PATHS.period}
        options={SELF_EXCLUSION_PERIOD_OPTIONS}
        optionComponent={PeriodLimitOption}
        label={t(platformui_starzbet_selfExclusion_form_title_period)}
        placeholder={t.plain(platformui_starzbet_placeholder_pleaseSelect)}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodOption}
      />

      <TextField
        fieldPath={SELF_EXCLUSION_FORM_FIELD_PATHS.password}
        label={t(platformui_starzbet_timeOut_title_password)}
        type={"password"}
        autoComplete={"new-password"}
        placeholder={t.plain(platformui_starzbet_password_placeholder_enterPassword)}
      />

      <ThemedModalFormSubmitResult />

      <Button
        colorScheme={"orange-gradient"}
        type={"submit"}
        loading={loading}
        className={classes.confirmButtonContainer}
        qaAttribute={PlayerUIQaAttributes.ResponsibleGamblingPages.SubmitButton}
        wide
      >
        {t(platformui_starzbet_selfExclusion_set)}
      </Button>
    </div>
  );
});
SelfExclusionFormContent.displayName = "SelfExclusionFormContent";

const SelfExclusionBag = memo<TPlatform_SelfExclusionBag_Fragment>(({
  product,
  activateAt,
  expiresIn,
}) => {
  assertsSelfExclusionProduct(product);
  const finalValue = +activateAt + (expiresIn * 1000);

  const [t] = useTranslation();

  const dateToStart = useDateFormat(activateAt, "dd-MM-yyyy");

  const dateToEnd = useDateFormat(finalValue, "dd-MM-yyyy");

  return (
    <div className={classes.table}>
      <div className={classes.tableTop}>
        <div>
          <Ellipsis>{t(platformui_starzbet_selfExclusion_form_title_product)}</Ellipsis>
        </div>

        <div>
          <Ellipsis>{t(platformui_starzbet_selfExclusion_form_title_exclusionStart)}</Ellipsis>
        </div>

        <div>
          <Ellipsis>{t(platformui_starzbet_selfExclusion_form_title_exclusionEnd)}</Ellipsis>
        </div>
      </div>

      <div className={classes.tableBottom}>
        <div>
          <Ellipsis {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitedProduct)}>
            <SelfExclusionProductOption value={product} />
          </Ellipsis>
        </div>

        <div {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitPeriodStart)}>{dateToStart}</div>

        <div {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitPeriodEnd)}>{expiresIn ? dateToEnd : "∞"}</div>
      </div>
    </div>
  );
});
SelfExclusionBag.displayName = "SelfExclusionBag";

const SelfExclusionForm = memo(() => {
  const [t] = useTranslation();

  const bags = useSelector(selfExclusionBagsSelector);

  return (
    <>
      <div className={classes.text}>
        <p>
          {t(platformui_starzbet_selfExclusion_warning)}
        </p>

        <p>
          {t(platformui_starzbet_selfExclusion_responsible)}
        </p>
      </div>

      <p className={classes.SelfExclusionTitle}>
        {t(platformui_starzbet_banking_title_chooseSelfExclusion)}
      </p>

      {bags ? <SelfExclusionBag {...bags} /> : null}

      <FormWithWrapper
        formName={SELF_EXCLUSION_FORM}
        content={SelfExclusionFormContent}
      />
    </>
  );
});
SelfExclusionForm.displayName = "SelfExclusionForm";

export { SelfExclusionForm };
