import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_accountClosure_button_closeAccount,
  platformui_starzbet_accountClosure_title_accountClosure1,
  platformui_starzbet_accountClosure_title_accountClosure2,
  platformui_starzbet_accountClosure_title_accountClosure3,
  platformui_starzbet_accountClosure_title_accountClosure4,
  platformui_starzbet_accountClosure_title_durationOfTheAccountClosure,
  platformui_starzbet_accountClosure_title_selectTheMainReasonForClosure,
  platformui_starzbet_accountClosure_warning_ifYouWishToReopen,
  platformui_starzbet_banking_title_chooseAccountClosure,
  platformui_starzbet_depositLimit_title_password,
  platformui_starzbet_password_placeholder_enterPassword,
  platformui_starzbet_placeholder_pleaseSelect,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { FormWithWrapper, selectIsFormSubmittingStarted, useFormSelector } from "@sb/form-new";
import { type TPlatform_CloseAccountBag_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./AccountClosureForm.module.css";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { useDateFormat } from "../../../../../common/Utils/ComponentsUtils/UseDateFormat";
import { ACCOUNT_CLOSURE_PERIOD_OPTIONS } from "../../../../Store/SelfProtection/Model/SelfProtectionInterval";
import { closeAccountBagSelector } from "../../../../Store/SelfProtection/Selectors/SelfProtectionSelectors";
import {
  ACCOUNT_CLOSURE_FORM,
  ACCOUNT_CLOSURE_REASON_OPTIONS,
} from "../../../../Store/SelfProtection/Form/AccountClosure/AccountClosureFormModel";
import { ACCOUNT_CLOSURE_FORM_FIELD_PATHS } from "../../../../Store/SelfProtection/Form/AccountClosure/AccountClosureForm";
import { PeriodLimitOption } from "../../../../Components/SelfProtection/PeriodLimitOption";
import { AccountClosureReasonOption } from "../../../../Components/SelfProtection/AccountClosureReasonOption";
import { WarningCard } from "../../Desktop/Components/WarningCard/WarningCard";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const DurationCard = memo<TPlatform_CloseAccountBag_Fragment>(({
  activateAt,
  expiresIn,
}) => {
  const time = +activateAt + (expiresIn * 1000);
  const duration = useDateFormat(time, "dd MMM yyyy • HH:mm");

  return (
    <WarningCard text={`Your account closure time will finish: ${duration}`} />
  );
});
DurationCard.displayName = "DurationCard";

const AccountClosureFormContent = memo(() => {
  const [t] = useTranslation();

  const loading = useFormSelector(selectIsFormSubmittingStarted);

  return (
    <div className={classes.form}>
      <SelectField
        fieldPath={ACCOUNT_CLOSURE_FORM_FIELD_PATHS.period}
        options={ACCOUNT_CLOSURE_PERIOD_OPTIONS}
        optionComponent={PeriodLimitOption}
        label={t(platformui_starzbet_accountClosure_title_durationOfTheAccountClosure)}
        placeholder={t.plain(platformui_starzbet_placeholder_pleaseSelect)}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.PeriodOption}
      />

      <SelectField
        fieldPath={ACCOUNT_CLOSURE_FORM_FIELD_PATHS.reason}
        options={ACCOUNT_CLOSURE_REASON_OPTIONS}
        optionComponent={AccountClosureReasonOption}
        label={t(platformui_starzbet_accountClosure_title_selectTheMainReasonForClosure)}
        placeholder={t.plain(platformui_starzbet_placeholder_pleaseSelect)}
        qaAttributeSelect={PlayerUIQaAttributes.ResponsibleGamblingPages.ReasonSelect}
        qaAttributeOption={PlayerUIQaAttributes.ResponsibleGamblingPages.ReasonOption}
      />

      <TextField
        fieldPath={ACCOUNT_CLOSURE_FORM_FIELD_PATHS.password}
        label={t(platformui_starzbet_depositLimit_title_password)}
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
        qaAttribute={PlayerUIQaAttributes.ResponsibleGamblingPages.SubmitButton}
        wide
      >
        {t(platformui_starzbet_accountClosure_button_closeAccount)}
      </Button>
    </div>
  );
});
AccountClosureFormContent.displayName = "AccountClosureFormContent";

const AccountClosureForm = memo(() => {
  const [t] = useTranslation();

  const bag = useSelector(closeAccountBagSelector);

  return (
    <>
      <p className={classes.closureText}>
        {t(platformui_starzbet_accountClosure_title_accountClosure1)}
      </p>

      <p className={classes.closureText}>{t(platformui_starzbet_accountClosure_title_accountClosure2)}</p>

      <p className={classes.closureText}>{t(platformui_starzbet_accountClosure_title_accountClosure3)}</p>

      <p className={classes.closureText}>{t(platformui_starzbet_accountClosure_title_accountClosure4)}</p>

      <p className={classes.accountClosureTitle}>
        {t(platformui_starzbet_banking_title_chooseAccountClosure)}
      </p>

      {
        bag
          ? <DurationCard {...bag} />
          : <WarningCard text={t(platformui_starzbet_accountClosure_warning_ifYouWishToReopen)} />
      }

      <FormWithWrapper
        formName={ACCOUNT_CLOSURE_FORM}
        content={AccountClosureFormContent}
      />
    </>
  );
});
AccountClosureForm.displayName = "AccountClosureForm";

export { AccountClosureForm };
