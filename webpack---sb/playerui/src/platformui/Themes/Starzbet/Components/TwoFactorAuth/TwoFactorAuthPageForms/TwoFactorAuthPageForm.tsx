import clsx from "clsx";
import { memo } from "react";
import {
  platformui_starzbet_2fa_enterCode_placeholder,
  platformui_starzbet_button_submit,
  platformui_starzbet_regSteps_signIn,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { withProps } from "@sb/utils";
import { FormWithWrapper, useFormName } from "@sb/form-new";
import { platformui_error_failed, type TCommonTKeys } from "@sb/translates/platformui/CommonTKeys";
import classes from "./TwoFactorAuthPageForm.module.css";
import { Space } from "../../../../../../common/Components/Space/Space";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { authErrorExtractor } from "../../../../../Store/Auth/Forms/AuthErrorExtractor";
import {
  TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_CONFIRM_FORM_NAME,
  TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTHS_FORM_PATH,
} from "../../../../../Store/TwoFactorAuth/SubmitForm/Model";
import { getFormErrorTKey } from "../../../../../Store/Form/Utils/GetFormErrorTKey";
import { ThemedModalErrorMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { TwoFactorAuthSuccessModal } from "./SuccessModal";

const title: readonly [translateKey: TCommonTKeys] = [platformui_error_failed];

const FormContent = memo(() => {
  const {
    submitErrors,
    submitSucceeded,
    loading,
    reset,
  } = useFormSubmitResult(authErrorExtractor);

  const [t] = useTranslation();
  const subtitle = getFormErrorTKey(submitErrors?.error);

  const formName = useFormName();
  const isConfirmForm = formName === TWO_FACTOR_AUTH_CONFIRM_FORM_NAME;

  return (
    <Space vertical value={1}>
      {submitErrors ? <ThemedModalErrorMessage hideModal={reset} title={title} subtitle={subtitle} /> : null}

      {submitSucceeded && !isConfirmForm ? <TwoFactorAuthSuccessModal /> : null}

      <TextField
        fieldPath={TWO_FACTOR_AUTHS_FORM_PATH.oneTimePassword}
        placeholder={t.plain(platformui_starzbet_2fa_enterCode_placeholder)}
        ghost
      />

      <Button
        colorScheme={"orange-gradient"}
        type={"submit"}
        loading={loading}
        className={clsx(classes.button, isConfirmForm && classes.confirmButton)}
        capitalize
      >
        {t(isConfirmForm ? platformui_starzbet_regSteps_signIn : platformui_starzbet_button_submit)}
      </Button>
    </Space>
  );
});
FormContent.displayName = "FormContent";

const twoFactorAuthFormFactory = (formName: string) => withProps(FormWithWrapper)(
  {
    formName,
    content: FormContent,
  },
);

const TwoFactorAuthActivateForm = twoFactorAuthFormFactory(TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME);
const TwoFactorAuthDeactivateForm = twoFactorAuthFormFactory(TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME);
const TwoFactorAuthConfirmForm = twoFactorAuthFormFactory(TWO_FACTOR_AUTH_CONFIRM_FORM_NAME);

export { TwoFactorAuthActivateForm, TwoFactorAuthDeactivateForm, TwoFactorAuthConfirmForm };
