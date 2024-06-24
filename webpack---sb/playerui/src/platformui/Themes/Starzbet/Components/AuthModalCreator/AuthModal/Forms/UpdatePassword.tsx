import { memo, useEffect } from "react";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_button_submit,
  platformui_starzbet_placeholder_password,
  platformui_starzbet_updatePasswordSucceed_title_yourPasswordWasSuccessfullyUpdated,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { FormWithWrapper } from "@sb/form-new";
import { platformui_error_failed } from "@sb/translates/platformui/CommonTKeys";
import classes from "../AuthModal.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import {
  RedirectLocalized,
} from "../../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { useModalCloseAction } from "../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useLocalizedPushPath } from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { useCountdown } from "../../../../../../Hooks/UseCountdown";
import { TIME_TO_REDIRECT } from "../../../../../../Store/Auth/Forms/UpdatePasswordByEmail/TimeToRedirect";
import { UPDATE_PASSWORD_FORM_NAME, UPDATE_PASSWORD_FORM_PATH } from "../../../../../../Store/Auth/Forms/UpdatePasswordByEmail/Model";
import { useFormSubmitResult } from "../../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { authErrorExtractor } from "../../../../../../Store/Auth/Forms/AuthErrorExtractor";
import { LoginArrow } from "../../../Icons/LoginArrow";
import { ThemedModalFormSubmitResult } from "../../../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";
import { PasswordAuthInput } from "../AuthInputs";

const PasswordInput = withProps(PasswordAuthInput)({
  fieldPath: UPDATE_PASSWORD_FORM_PATH.newPassword,
  tKey: platformui_starzbet_placeholder_password,
});

const RedirectAfterUpdate = memo(() => {
  const closeModal = useModalCloseAction(EModal.auth);
  const [timeLeft] = useCountdown(TIME_TO_REDIRECT);

  useEffect(
    () => {
      if (!IS_MOBILE_CLIENT_SIDE && timeLeft === 0) {
        closeModal();
      }
    },
    [timeLeft],
  );

  return timeLeft === 0
    ? <RedirectLocalized to={routeMap.root} />
    : null;
});
RedirectAfterUpdate.displayName = "RedirectAfterUpdate";

const UpdatePasswordByEmailFormContent = memo(() => {
  const [t] = useTranslation();

  const closeModal = useModalCloseAction(EModal.auth);

  const goToRoot = useLocalizedPushPath(routeMap.root);

  const { loading, submitSucceeded, submitErrors } = useFormSubmitResult(authErrorExtractor);

  return (
    <div className={classes.loginForm}>
      <PasswordInput />

      <ThemedModalFormSubmitResult
        errorTitle={platformui_error_failed}
        errorSubtitle={submitErrors ? submitErrors.error : ""}
        onSuccess={IS_MOBILE_CLIENT_SIDE ? goToRoot : closeModal}
        successSubtitle={platformui_starzbet_updatePasswordSucceed_title_yourPasswordWasSuccessfullyUpdated}
      />

      {submitSucceeded ? <RedirectAfterUpdate /> : null}

      <Button
        disabled={submitSucceeded}
        className={classes.button}
        contentClassName={classes.mainButtonContent}
        colorScheme={"blue-gradient"}
        loading={loading}
        type={"submit"}
      >
        {t(platformui_starzbet_button_submit)}

        <LoginArrow />
      </Button>
    </div>
  );
});
UpdatePasswordByEmailFormContent.displayName = "UpdatePasswordByEmailFormContent";

const UpdatePasswordByEmailForm = withProps(FormWithWrapper)({
  formName: UPDATE_PASSWORD_FORM_NAME,
  content: UpdatePasswordByEmailFormContent,
});

export { UpdatePasswordByEmailForm };
