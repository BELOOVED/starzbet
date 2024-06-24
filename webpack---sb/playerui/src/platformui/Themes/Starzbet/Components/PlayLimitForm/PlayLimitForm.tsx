import { memo } from "react";
import {
  platformui_starzbet_banking_title_choosePlayLimits,
  platformui_starzbet_depositLimit_headline_limit,
  platformui_starzbet_depositLimit_headline_period,
  platformui_starzbet_depositLimit_message_limitExpires,
  platformui_starzbet_depositLimit_message_limitWillBeActive,
  platformui_starzbet_depositLimit_title_depositLimit1,
  platformui_starzbet_depositLimit_title_depositLimit2,
  platformui_starzbet_depositLimit_title_password,
  platformui_starzbet_password_placeholder_enterPassword,
  platformui_starzbet_playLimit_update,
  platformui_starzbet_selfExclusion_form_title_period,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, isNotNil, Money, useParamSelector } from "@sb/utils";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import type { TPlatform_PlayLimitBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { FormWithWrapper, selectIsFormSubmittingStarted, useFormSelector } from "@sb/form-new";
import classes from "./PlayLimitForm.module.css";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
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
import { PLAY_LIMIT_FORM } from "../../../../Store/SelfProtection/Form/PlayLimit/PlayLimitFormModel";
import { PLAY_LIMIT_FORM_FIELD_PATHS } from "../../../../Store/SelfProtection/Form/PlayLimit/PlayLimitForm";
import { PeriodLimitOption } from "../../../../Components/SelfProtection/PeriodLimitOption";
import { DepositLimitOption } from "../../../../Components/SelfProtection/DepositLimitOption";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const PlayLimitFormContent = memo(() => {
  const [t] = useTranslation();

  const loading = useFormSelector(selectIsFormSubmittingStarted);

  const canAddBag = useParamSelector(canAddBagSelector, [EPlatform_SelfProtectionBagType.playLimitBag]);

  return (
    <div className={classes.form}>
      <SelectField
        fieldPath={PLAY_LIMIT_FORM_FIELD_PATHS.period}
        options={DEPOSIT_LIMIT_INTERVAL}
        optionComponent={PeriodLimitOption}
        label={t(platformui_starzbet_depositLimit_headline_period)}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodOption}
      />

      <SelectField
        fieldPath={PLAY_LIMIT_FORM_FIELD_PATHS.amount}
        options={DEPOSIT_LIMIT_AMOUNT_OPTIONS}
        optionComponent={DepositLimitOption}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.LimitSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.LimitOption}
        label={t(platformui_starzbet_depositLimit_headline_limit)}
      />

      <TextField
        fieldPath={PLAY_LIMIT_FORM_FIELD_PATHS.password}
        label={t(platformui_starzbet_depositLimit_title_password)}
        type={"password"}
        autoComplete={"new-password"}
        placeholder={t.plain(platformui_starzbet_password_placeholder_enterPassword)}
      />

      <ThemedModalFormSubmitResult />

      <Button
        colorScheme={"orange-gradient"}
        type={"submit"}
        disabled={!canAddBag}
        className={classes.submitButtonContainer}
        loading={loading}
        qaAttribute={PlayerUIQaAttributes.ResponsibleGamblingPages.SubmitButton}
        wide
      >
        {t(platformui_starzbet_playLimit_update)}
      </Button>
    </div>
  );
});
PlayLimitFormContent.displayName = "PlayLimitFormContent";

const ExpiredLimit = memo<TPlatform_PlayLimitBag_Fragment>(({
  sum,
  period,
}) => {
  const [t] = useTranslation();

  const periodDuration = useFormatDuration(period);
  const activateAtNoLimit = useParamSelector(activateAtNoLimitSelector, [EPlatform_SelfProtectionBagType.playLimitBag]);

  const date = useDateFormat(activateAtNoLimit, "dd MMM yyyy • HH:mm");

  const money = isNotNil(sum) ? Money.toFormat(sum, EMoneyFormat.symbolLeft) : "-";

  const limit = `${periodDuration} / ${money}`;

  return (
    <div className={classes.existingLimit}>
      {t(platformui_starzbet_depositLimit_message_limitExpires, { limit, date })}
    </div>
  );
});
ExpiredLimit.displayName = "ExpiredLimit";

const PlannedLimit = memo<TPlatform_PlayLimitBag_Fragment>(({
  period,
  activateAt,
  sum,
}) => {
  const [t] = useTranslation();

  const periodDuration = useFormatDuration(period);

  const date = useDateFormat(activateAt, "dd MMM yyyy • HH:mm");

  const money = Money.toFormat(sum, EMoneyFormat.symbolLeft);

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

      <div
        className={classes.existingLimit} {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitMessage)}
      >
        <div className={classes.errorImage} />

        {t(platformui_starzbet_depositLimit_message_limitWillBeActive, { date })}
      </div>
    </Until>

  );
});
PlannedLimit.displayName = "PlannedLimit";

const PlayLimitForm = memo(() => {
  const [t] = useTranslation();

  const activateAtNoLimit = useParamSelector(activateAtNoLimitSelector, [EPlatform_SelfProtectionBagType.playLimitBag]);

  const currentBag = useParamSelector(
    currentBagSelector.type<TPlatform_PlayLimitBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.playLimitBag],
  );
  const nextBag = useParamSelector(
    nextBagSelector.type<TPlatform_PlayLimitBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.playLimitBag],
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
        {t(platformui_starzbet_banking_title_choosePlayLimits)}
      </p>

      {nextBag ? <PlannedLimit {...nextBag} /> : null}

      {currentBag && activateAtNoLimit ? <ExpiredLimit {...currentBag} /> : null}

      <FormWithWrapper
        formName={PLAY_LIMIT_FORM}
        content={PlayLimitFormContent}
      />
    </>
  );
});
PlayLimitForm.displayName = "PlayLimitForm";

export { PlayLimitForm };
