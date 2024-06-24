import { memo } from "react";
import {
  platformui_starzbet_password_placeholder_enterPassword,
  platformui_starzbet_placeholder_pleaseSelect,
  platformui_starzbet_realityCheck_update,
  platformui_starzbet_realityChecks_message_realityCheckExpires,
  platformui_starzbet_realityChecks_message_realityCheckWillBeActive,
  platformui_starzbet_realityChecks_title_changeRealityCheck,
  platformui_starzbet_realityChecks_title_existingRealityCheckSetting,
  platformui_starzbet_realityChecks_title_realityChecks1,
  platformui_starzbet_realityChecks_title_realityChecks2,
  platformui_starzbet_realityChecks_title_realityChecks3,
  platformui_starzbet_timeOut_title_password,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useParamSelector } from "@sb/utils";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import type { TPlatform_RealityCheckByTimeBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { FormWithWrapper, selectIsFormSubmittingStarted, useFormSelector } from "@sb/form-new";
import classes from "./RealityCheckForm.module.css";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { useDateFormat } from "../../../../../common/Utils/ComponentsUtils/UseDateFormat";
import {
  activateAtNoLimitSelector,
  canAddBagSelector,
  currentBagSelector,
  nextBagSelector,
} from "../../../../Store/SelfProtection/Selectors/SelfProtectionSelectors";
import { useFormatDuration } from "../../../../Store/SelfProtection/Hooks/UseFormatDuration";
import { Until } from "../../../../Components/Until/Until";
import { RealityChecksCurrentPeriod } from "../../../../Components/RealityChecksCurrentPeriod/RealityChecksCurrentPeriod";
import { REALITY_CHECK_FORM } from "../../../../Store/SelfProtection/Form/RealityCheck/RealityCheckFormModel";
import { REALITY_CHECK_FORM_FIELD_PATHS } from "../../../../Store/SelfProtection/Form/RealityCheck/RealityCheckForm";
import { REALITY_CHECK_PERIOD_OPTIONS } from "../../../../Store/SelfProtection/Model/SelfProtectionInterval";
import { PeriodLimitOption } from "../../../../Components/SelfProtection/PeriodLimitOption";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const NextRealityCheck = memo<TPlatform_RealityCheckByTimeBag_Fragment>(({ period, activateAt }) => {
  const [t] = useTranslation();

  const periodDuration = useFormatDuration(period);

  const date = useDateFormat(activateAt, "dd MMM yyyy • HH:mm");

  return (
    <div {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.NewRealityCheckMessage)}>
      <Until expiredAt={activateAt}>
        {t(platformui_starzbet_realityChecks_message_realityCheckWillBeActive, { period: periodDuration, date })}
      </Until>
    </div>
  );
});
NextRealityCheck.displayName = "NextRealityCheck";

const ExpiredRealityCheck = memo<TPlatform_RealityCheckByTimeBag_Fragment>(({ period }) => {
  const [t] = useTranslation();

  const activateAtNoLimit = useParamSelector(activateAtNoLimitSelector, [EPlatform_SelfProtectionBagType.realityCheckByTimeBag]);

  const periodDurationCurrent = useFormatDuration(period);

  const date = useDateFormat(activateAtNoLimit, "dd MMM yyyy • HH:mm");

  return (
    <div>
      <Until expiredAt={activateAtNoLimit}>
        {t(platformui_starzbet_realityChecks_message_realityCheckExpires, { period: periodDurationCurrent, date })}
      </Until>
    </div>
  );
});
ExpiredRealityCheck.displayName = "ExpiredRealityCheck";

const RealityCheckFormContent = memo(() => {
  const [t] = useTranslation();

  const loading = useFormSelector(selectIsFormSubmittingStarted);

  const canAddRealityCheckBag = useParamSelector(canAddBagSelector, [EPlatform_SelfProtectionBagType.realityCheckByTimeBag]);

  return (
    <div className={classes.form}>
      <SelectField
        fieldPath={REALITY_CHECK_FORM_FIELD_PATHS.period}
        options={REALITY_CHECK_PERIOD_OPTIONS}
        optionComponent={PeriodLimitOption}
        label={t(platformui_starzbet_realityChecks_title_changeRealityCheck)}
        placeholder={t.plain(platformui_starzbet_placeholder_pleaseSelect)}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodOption}
      />

      <TextField
        fieldPath={REALITY_CHECK_FORM_FIELD_PATHS.password}
        label={t(platformui_starzbet_timeOut_title_password)}
        type={"password"}
        autoComplete={"new-password"}
        placeholder={t.plain(platformui_starzbet_password_placeholder_enterPassword)}
      />

      <ThemedModalFormSubmitResult />

      <Button
        colorScheme={"orange-gradient"}
        type={"submit"}
        className={classes.button}
        loading={loading}
        disabled={!canAddRealityCheckBag}
        qaAttribute={PlayerUIQaAttributes.ResponsibleGamblingPages.SubmitButton}
        wide
      >
        {t(platformui_starzbet_realityCheck_update)}
      </Button>
    </div>
  );
});
RealityCheckFormContent.displayName = "RealityCheckFormContent";

const RealityCheckForm = memo(() => {
  const [t] = useTranslation();

  const nextBag = useParamSelector(
    nextBagSelector.type<TPlatform_RealityCheckByTimeBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.realityCheckByTimeBag],
  );

  const currentBag = useParamSelector(
    currentBagSelector.type<TPlatform_RealityCheckByTimeBag_Fragment>(),
    [EPlatform_SelfProtectionBagType.realityCheckByTimeBag],
  );
  const activateAtNoLimit = useParamSelector(activateAtNoLimitSelector, [EPlatform_SelfProtectionBagType.realityCheckByTimeBag]);

  const periodDuration = useFormatDuration(currentBag?.period);

  return (
    <>
      <p className={classes.realityRules}>{t(platformui_starzbet_realityChecks_title_realityChecks1)}</p>

      <p className={classes.realityRules}>{t(platformui_starzbet_realityChecks_title_realityChecks2)}</p>

      <p className={classes.realityRules}>{t(platformui_starzbet_realityChecks_title_realityChecks3)}</p>

      {
        periodDuration
          ? (
            <div className={classes.existingRealityWrapper}>
              <div className={classes.errorImage} />

              <div>
                <span className={classes.span}>
                  {t(platformui_starzbet_realityChecks_title_existingRealityCheckSetting)}
                </span>

                <span
                  className={classes.currentReality}
                  {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingRealityCheckPeriod)}
                >
                  <RealityChecksCurrentPeriod />
                </span>

                {nextBag ? <NextRealityCheck {...nextBag} /> : null}

                {(currentBag && activateAtNoLimit) ? <ExpiredRealityCheck {...currentBag} /> : null}
              </div>
            </div>
          )
          : null
      }

      <FormWithWrapper
        formName={REALITY_CHECK_FORM}
        content={RealityCheckFormContent}
      />
    </>
  );
});
RealityCheckForm.displayName = "RealityCheckForm";

export { RealityCheckForm };
