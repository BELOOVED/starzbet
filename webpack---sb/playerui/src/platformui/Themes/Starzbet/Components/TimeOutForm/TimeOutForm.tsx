import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_password_placeholder_enterPassword,
  platformui_starzbet_placeholder_pleaseSelect,
  platformui_starzbet_timeOut_coolOffPeriod,
  platformui_starzbet_timeOut_headline_period,
  platformui_starzbet_timeOut_setCoolOff,
  platformui_starzbet_timeOut_setCoolOffDate,
  platformui_starzbet_timeOut_title_noCustomTimeOuts,
  platformui_starzbet_timeOut_title_password,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { type TPlatform_TimeOutBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { FormWithWrapper, selectIsFormSubmittingStarted, useFormSelector } from "@sb/form-new";
import classes from "./TimeOutForm.module.css";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { useDateFormat } from "../../../../../common/Utils/ComponentsUtils/UseDateFormat";
import { timeOutBagSelector } from "../../../../Store/SelfProtection/Selectors/SelfProtectionSelectors";
import { TIME_OUT_INTERVAL_OPTIONS } from "../../../../Store/SelfProtection/Model/SelfProtectionInterval";
import { Until } from "../../../../Components/Until/Until";
import { Then } from "../../../../Components/Then/Until";
import { secToMs } from "../../../../Utils/SecToMs";
import { TIME_OUT_FORM } from "../../../../Store/SelfProtection/Form/TimeOut/TimeOutFormModel";
import { TIME_OUT_FORM_FIELD_PATHS } from "../../../../Store/SelfProtection/Form/TimeOut/TimeOutForm";
import { PeriodLimitOption } from "../../../../Components/SelfProtection/PeriodLimitOption";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const ExistingRulesContainer = memo<TPlatform_TimeOutBag_Fragment>(({
  activateAt,
  expiresIn,
}) => {
  const [t] = useTranslation();
  const expiredAt = Number(activateAt) + secToMs(expiresIn);
  const date = useDateFormat(expiredAt, "dd MMM yyyy • HH:mm");

  return (
    <div
      className={classes.existingRules} {...qaAttr(PlayerUIQaAttributes.ResponsibleGamblingPages.ExistingLimitMessage)}
    >
      <div className={classes.errorImage} />

      <Until expiredAt={expiredAt}>
        <div>
          {t(platformui_starzbet_timeOut_setCoolOffDate, { date })}
        </div>
      </Until>

      <Then startedAt={expiredAt}>
        {t(platformui_starzbet_timeOut_title_noCustomTimeOuts)}
      </Then>
    </div>
  );
});
ExistingRulesContainer.displayName = "ExistingRulesContainer";

const TimeOutFormContent = memo(() => {
  const [t] = useTranslation();
  const loading = useFormSelector(selectIsFormSubmittingStarted);

  return (
    <div className={classes.form}>
      <SelectField
        fieldPath={TIME_OUT_FORM_FIELD_PATHS.period}
        options={TIME_OUT_INTERVAL_OPTIONS}
        optionComponent={PeriodLimitOption}
        label={t(platformui_starzbet_timeOut_headline_period)}
        placeholder={t.plain(platformui_starzbet_placeholder_pleaseSelect)}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodOption}
      />

      <TextField
        fieldPath={TIME_OUT_FORM_FIELD_PATHS.password}
        label={t(platformui_starzbet_timeOut_title_password)}
        type={"password"}
        autoComplete={"new-password"}
        placeholder={t.plain(platformui_starzbet_password_placeholder_enterPassword)}
      />

      <ThemedModalFormSubmitResult />

      <Button
        loading={loading}
        type={"submit"}
        colorScheme={"orange-gradient"}
        className={classes.confirmButtonContainer}
        qaAttribute={PlayerUIQaAttributes.ResponsibleGamblingPages.SubmitButton}
        wide
      >
        {t(platformui_starzbet_timeOut_setCoolOff)}
      </Button>
    </div>
  );
});
TimeOutFormContent.displayName = "TimeOutFormContent";

const NewRule = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <div className={classes.textContainer}>
        <p className={classes.text}>{t(platformui_starzbet_timeOut_coolOffPeriod)}</p>
      </div>

      <FormWithWrapper
        formName={TIME_OUT_FORM}
        content={TimeOutFormContent}
      />
    </>
  );
});
NewRule.displayName = "NewRule";

const TimeOutForm = memo(() => {
  const bag = useSelector(timeOutBagSelector);

  return bag
    ? <ExistingRulesContainer {...bag} />
    : <NewRule />;
});
TimeOutForm.displayName = "TimeOutForm";

export { TimeOutForm };
