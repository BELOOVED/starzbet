import { type ComponentType, memo } from "react";
import { useSelector } from "react-redux";
import { FormWithWrapper } from "@sb/form-new";
import { useAction, useParamSelector } from "@sb/utils";
import {
  platformui_starzbet_updateEmail_codeStep_button,
  platformui_starzbet_updateEmail_codeStep_subtitle,
  platformui_starzbet_updateEmail_codeStep_title,
  platformui_starzbet_updateEmail_emailStep_button,
  platformui_starzbet_updateEmail_header,
  platformui_starzbet_updateEmail_success_subtitle,
  platformui_starzbet_updateEmail_success_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./UpdateEmailModal.module.css";
import {
  UPDATE_PLAYER_EMAIL_FORM_EMAIL_FIELD_PATH,
  UPDATE_PLAYER_EMAIL_FORM_NAME,
  UPDATE_PLAYER_EMAIL_FORM_VERIFICATION_CODE_FIELD_PATH,
} from "../../../../../../common/Store/Player/PlayerVariables";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useModalCloseAction } from "../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EUpdatePlayerEmailStep } from "../../../../../../common/Store/Player/Model/EUpdatePlayerEmailStep";
import { notNilModalDataSelector } from "../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { updatePlayerEmailRequestAction } from "../../../../../../common/Store/Player/PlayerActions";
import { updatePlayerEmailRequestLoadingSelector } from "../../../../../../common/Store/Player/Selectors/UpdatePlayerEmailFormSelectors";
import { isPrivatePlayerSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { playerPhoneNumberSelector } from "../../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalSuccessMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ThemedModalText } from "../../ThemedModal/ThemedModalText/ThemedModalText";
import { VerifyCode } from "../VerifyPhoneModal/VerifyCode/VerifyCode";

const SUCCESS_MODAL_PROPS = {
  title: [platformui_starzbet_updateEmail_success_title] as const,
  subtitle: [platformui_starzbet_updateEmail_success_subtitle] as const,
};

const SucceedModal = memo(() => {
  const close = useModalCloseAction(EModal.updateEmail);
  const { submitSucceeded } = useFormSubmitResult();

  return submitSucceeded ? <ThemedModalSuccessMessage {...SUCCESS_MODAL_PROPS} hideModal={close} /> : null;
});
SucceedModal.displayName = "SucceedModal";

const EmailStepButton = memo(() => {
  const nextStep = useAction(updatePlayerEmailRequestAction);
  const isPrivatePlayer = useSelector(isPrivatePlayerSelector);
  const loading = useSelector(updatePlayerEmailRequestLoadingSelector);

  const [t] = useTranslation();

  return (
    <Button
      colorScheme={"orange-gradient"}
      onClick={isPrivatePlayer ? undefined : nextStep}
      type={isPrivatePlayer ? "submit" : "button"}
      loading={loading}
    >
      {t(platformui_starzbet_updateEmail_emailStep_button)}
    </Button>
  );
});
EmailStepButton.displayName = "EmailStepButton";

const EmailContent = memo(() => (
  <>
    <TextField
      fieldPath={UPDATE_PLAYER_EMAIL_FORM_EMAIL_FIELD_PATH}
      name={"email"}
      autoComplete={"off"}
      spellCheck={"false"}
      type={"email"}
    />

    <EmailStepButton />

    <SucceedModal />
  </>
));
EmailContent.displayName = "EmailContent";

const CodeContent = memo(() => {
  const phoneNumber = useSelector(playerPhoneNumberSelector);
  const [t] = useTranslation();

  return (
    <>
      <ThemedModalText wide size={"lg"}>
        {t(platformui_starzbet_updateEmail_codeStep_title)}
      </ThemedModalText>

      <ThemedModalText wide color={"success"} size={"lg"}>
        {phoneNumber}
      </ThemedModalText>

      <ThemedModalText wide size={"md"}>
        {t(platformui_starzbet_updateEmail_codeStep_subtitle)}
      </ThemedModalText>

      <VerifyCode fieldPath={UPDATE_PLAYER_EMAIL_FORM_VERIFICATION_CODE_FIELD_PATH} />

      <Button colorScheme={"orange-gradient"} type={"submit"}>
        {t(platformui_starzbet_updateEmail_codeStep_button)}
      </Button>

      <SucceedModal />
    </>
  );
});
CodeContent.displayName = "CodeContent";

const STEP_TO_FORM_CONTENT_MAP: Record<EUpdatePlayerEmailStep, ComponentType> = {
  [EUpdatePlayerEmailStep.EMAIL]: EmailContent,
  [EUpdatePlayerEmailStep.CODE]: CodeContent,
};

const ModalBody = memo(() => {
  const step = useParamSelector(notNilModalDataSelector<EUpdatePlayerEmailStep>, [EModal.updateEmail, "step"]);

  return (
    <FormWithWrapper
      formName={UPDATE_PLAYER_EMAIL_FORM_NAME}
      fallbackContent={Loader}
      content={STEP_TO_FORM_CONTENT_MAP[step]}
    />
  );
});
ModalBody.displayName = "ModalBody";

const UpdateEmailModal = memo(() => {
  const onCancel = useModalCloseAction(EModal.updateEmail);
  const [t] = useTranslation();

  return (
    <ThemedModal onCancel={onCancel} className={classes.updateEmailModal}>
      <ThemedModalHeader closeButtonClickHandler={onCancel}>
        <ThemedModalText size={"md"}>
          {t(platformui_starzbet_updateEmail_header)}
        </ThemedModalText>
      </ThemedModalHeader>

      <ModalBody />
    </ThemedModal>
  );
});
UpdateEmailModal.displayName = "UpdateEmailModal";

const UPDATE_EMAIL_MODAL_MAP = {
  [EModal.updateEmail]: <UpdateEmailModal />,
};

export { UPDATE_EMAIL_MODAL_MAP };
