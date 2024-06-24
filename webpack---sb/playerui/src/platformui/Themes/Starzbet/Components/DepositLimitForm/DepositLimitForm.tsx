import { memo } from "react";
import {
  platformui_starzbet_banking_title_chooseDepositLimits,
  platformui_starzbet_depositLimit_headline_limit,
  platformui_starzbet_depositLimit_headline_period,
  platformui_starzbet_depositLimit_message_limitExpires,
  platformui_starzbet_depositLimit_message_limitWillBeActive,
  platformui_starzbet_depositLimit_title_depositLimit1,
  platformui_starzbet_depositLimit_title_depositLimit2,
  platformui_starzbet_depositLimit_title_password,
  platformui_starzbet_depositLimit_updatelimit,
  platformui_starzbet_password_placeholder_enterPassword,
  platformui_starzbet_selfExclusion_form_title_period,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, Money, useParamSelector } from "@sb/utils";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import type { TPlatform_MaxDepositBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { FormWithWrapper, selectIsFormSubmittingStarted, useFormSelector } from "@sb/form-new";
import classes from "./DepositLimitForm.module.css";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { useDateFormat } from "../../../../../common/Utils/ComponentsUtils/UseDateFormat";
import { DEPOSIT_LIMIT_AMOUNT_OPTIONS } from "../../../../Store/SelfProtection/Model/DepositLimitOptions";
import {
  activateAtNoLimitSelector,
  canAddBagSelector,
  currentBagSelector,
  nextBagSelector,
} from "../../../../Store/SelfProtection/Selectors/SelfProtectionSelectors";
import { Until } from "../../../../Components/Until/Until";
import { useFormatDuration } from "../../../../Store/SelfProtection/Hooks/UseFormatDuration";
import { DEPOSIT_LIMIT_INTERVAL } from "../../../../Store/SelfProtection/Model/SelfProtectionInterval";
import { DEPOSIT_LIMIT_FORM_FIELD_PATHS } from "../../../../Store/SelfProtection/Form/DepositLimit/DepositLimitForm";
import { DepositLimitOption } from "../../../../Components/SelfProtection/DepositLimitOption";
import { DEPOSIT_LIMIT_FORM } from "../../../../Store/SelfProtection/Form/DepositLimit/DepositLimitFormModel";
import { PeriodLimitOption } from "../../../../Components/SelfProtection/PeriodLimitOption";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const DepositLimitFormContent = memo(() => {
  const [t] = useTranslation();
  const canAddMaxDepositBag = useParamSelector(canAddBagSelector, [EPlatform_SelfProtectionBagType.maxDepositBag]);
  const loading = useFormSelector(selectIsFormSubmittingStarted);

  return (
    <div className={classes.form}>
      <SelectField
        fieldPath={DEPOSIT_LIMIT_FORM_FIELD_PATHS.period}
        options={DEPOSIT_LIMIT_INTERVAL}
        optionComponent={PeriodLimitOption}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodOption}
        label={t(platformui_starzbet_depositLimit_headline_period)}
      />

      <SelectField
        fieldPath={DEPOSIT_LIMIT_FORM_FIELD_PATHS.amount}
        options={DEPOSIT_LIMIT_AMOUNT_OPTIONS}
        optionComponent={DepositLimitOption}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.LimitSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.LimitOption}
        label={t(platformui_starzbet_depositLimit_headline_limit)}
      />

      <TextField
        fieldPath={DEPOSIT_LIMIT_FORM_FIELD_PATHS.password}
        label={t(platformui_starzbet_depositLimit_title_password)}
        type={"password"}
        autoComplete={"new-password"}
        placeholder={t.plain(platformui_starzbet_password_placeholder_enterPassword)}
      />

      <ThemedModalFormSubmitResult />

      <Button
        colorScheme={"orange-gradient"}
        type={"submit"}
        disabled={!canAddMaxDepositBag}
        loading={loading}
        className={classes.submitButtonContainer}
        qaAttribute={PlayerUIQaAttributes.ResponsibleGamblingPages.SubmitButton}
        wide
      >
        {t(platformui_starzbet_depositLimit_updatelimit)}
      </Button>
    </div>
  );
});
DepositLimitFormContent.displayName = "DepositLimitFormContent";

const ExpiredLimit = memo<TPlatform_MaxDepositBag_Fragment>(({
  maxDepositPerPeriod,
  period,
}) => {
  const [t] = useTranslation();

  const activateAtNoLimit = useParamSelector(activateAtNoLimitSelector, [EPlatform_SelfProtectionBagType.maxDepositBag]);

  const periodDuration = useFormatDuration(period);

  const date = useDateFormat(activateAtNoLimit, "dd MMM yyyy • HH:mm");

  const money = Money.toFormat(maxDepositPerPeriod, EMoneyFormat.symbolLeft);

  const limit = `${periodDuration} / ${money}`;

  return (
    <div className={classes.existingLimit}>
      {t(platformui_starzbet_depositLimit_message_limitExpires, { limit, date })}
    </div>
  );
});
ExpiredLimit.displayName = "ExpiredLimit";

const PlannedLimit = memo<TPlatform_MaxDepositBag_Fragment>(({
  period,
  activateAt,
  maxDepositPerPeriod,
}) => {
  const [t] = useTranslation();

  const periodDuration = useFormatDuration(period);

  const date = useDateFormat(activateAt, "dd MMM yyyy • HH:mm");

  const money = Money.toFormat(maxDepositPerPeriod, EMoneyFormat.symbolLeft);

  return (
    <Until expiredAt={activateAt}>
      <div className={classes.table}>
        <div className={classes.tableTop}>
          <div>{t(platformui_starzbet_selfExclusion_form_title_period)}</div>

          <div>{t(platformui_starzbet_depositLimit_headline_limit)}</div>
        </div>

        <div className={classes.tableBottom}>
          <div {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitPeriod)}>
            {periodDuration}
          </div>

          <div {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitAmount)}>
            {money}
          </div>
        </div>
      </div>

      <div className={classes.existingLimit} {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitMessage)}>
        <div className={classes.errorImage} />

        {t(platformui_starzbet_depositLimit_message_limitWillBeActive, { date })}
      </div>
    </Until>
  );
});
PlannedLimit.displayName = "PlannedLimit";

const DepositLimitForm = memo(() => {
  const [t] = useTranslation();

  const activateAtNoLimit = useParamSelector(activateAtNoLimitSelector, [EPlatform_SelfProtectionBagType.maxDepositBag]);

  const currentBag = useParamSelector(
    currentBagSelector.type<TPlatform_MaxDepositBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.maxDepositBag],
  );
  const nextBag = useParamSelector(
    nextBagSelector.type<TPlatform_MaxDepositBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.maxDepositBag],
  );

  return (
    <>
      <p className={classes.text}>
        {t(platformui_starzbet_depositLimit_title_depositLimit1)}
      </p>

      <p className={classes.text}>
        {t(platformui_starzbet_depositLimit_title_depositLimit2)}
      </p>

      <p className={classes.depositLimitTitle}>
        {t(platformui_starzbet_banking_title_chooseDepositLimits)}
      </p>

      {nextBag ? <PlannedLimit {...nextBag} /> : null}

      {currentBag && activateAtNoLimit ? <ExpiredLimit {...currentBag} /> : null}

      <FormWithWrapper
        formName={DEPOSIT_LIMIT_FORM}
        content={DepositLimitFormContent}
      />
    </>
  );
});
DepositLimitForm.displayName = "DepositLimitForm";

export { DepositLimitForm };
