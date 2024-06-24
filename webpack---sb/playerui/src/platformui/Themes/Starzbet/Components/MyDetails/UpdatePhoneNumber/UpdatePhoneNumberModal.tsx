import { type ComponentType, memo } from "react";
import { useSelector } from "react-redux";
import { FormWithWrapper } from "@sb/form-new";
import { useAction, useParamSelector } from "@sb/utils";
import {
  platformui_starzbet_updatePhoneNumber_codeStep_button,
  platformui_starzbet_updatePhoneNumber_codeStep_subtitle,
  platformui_starzbet_updatePhoneNumber_codeStep_title,
  platformui_starzbet_updatePhoneNumber_header,
  platformui_starzbet_updatePhoneNumber_phoneStep_button,
  platformui_starzbet_updatePhoneNumber_success_subtitle,
  platformui_starzbet_updatePhoneNumber_success_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./UpdatePhoneNumberModal.module.css";
import {
  UPDATE_PLAYER_PHONE_NUMBER_FORM_NAME,
  UPDATE_PLAYER_PHONE_NUMBER_FORM_PHONE_NUMBER_FIELD,
  UPDATE_PLAYER_PHONE_NUMBER_FORM_VERIFICATION_CODE_FIELD,
} from "../../../../../../common/Store/Player/PlayerVariables";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useModalCloseAction } from "../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { PhoneNumberField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/PhoneNumberField";
import { notNilModalDataSelector } from "../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { EUpdatePlayerPhoneNumberStep } from "../../../../../../common/Store/Player/Model/EUpdatePlayerPhoneNumberStep";
import { updatePlayerPhoneNumberRequestAction } from "../../../../../../common/Store/Player/PlayerActions";
import {
  updatePlayerPhoneNumberRequestLoadingSelector,
} from "../../../../../../common/Store/Player/Selectors/UpdatePlayerPhoneNumberFormSelectors";
import { emailFromTokenSelector } from "../../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalSuccessMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ThemedModalText } from "../../ThemedModal/ThemedModalText/ThemedModalText";
import { VerifyCode } from "../VerifyPhoneModal/VerifyCode/VerifyCode";

const SUCCESS_MODAL_PROPS = {
  title: [platformui_starzbet_updatePhoneNumber_success_title] as const,
  subtitle: [platformui_starzbet_updatePhoneNumber_success_subtitle] as const,
};

const SucceedModal = memo(() => {
  const close = useModalCloseAction(EModal.updatePhoneNumber);
  const { submitSucceeded } = useFormSubmitResult();

  return submitSucceeded ? <ThemedModalSuccessMessage {...SUCCESS_MODAL_PROPS} hideModal={close} /> : null;
});
SucceedModal.displayName = "SucceedModal";

const PhoneStepButton = memo(() => {
  const nextStep = useAction(updatePlayerPhoneNumberRequestAction);
  const loading = useSelector(updatePlayerPhoneNumberRequestLoadingSelector);
  const [t] = useTranslation();

  return (
    <Button
      colorScheme={"orange-gradient"}
      type={"button"}
      onClick={nextStep}
      loading={loading}
    >
      {t(platformui_starzbet_updatePhoneNumber_phoneStep_button)}
    </Button>
  );
});
PhoneStepButton.displayName = "PhoneStepButton";

const PhoneContent = memo(() => (
  <>
    <PhoneNumberField fieldPath={UPDATE_PLAYER_PHONE_NUMBER_FORM_PHONE_NUMBER_FIELD} />

    <PhoneStepButton />
  </>
));
PhoneContent.displayName = "PhoneContent";

const CodeContent = memo(() => {
  const email = useSelector(emailFromTokenSelector);
  const [t] = useTranslation();

  return (
    <>
      <ThemedModalText wide size={"lg"}>
        {t(platformui_starzbet_updatePhoneNumber_codeStep_title)}
      </ThemedModalText>

      <ThemedModalText wide color={"success"} size={"lg"}>
        {email}
      </ThemedModalText>

      <ThemedModalText wide size={"md"}>
        {t(platformui_starzbet_updatePhoneNumber_codeStep_subtitle)}
      </ThemedModalText>

      <VerifyCode fieldPath={UPDATE_PLAYER_PHONE_NUMBER_FORM_VERIFICATION_CODE_FIELD} />

      <Button colorScheme={"orange-gradient"} type={"submit"}>
        {t(platformui_starzbet_updatePhoneNumber_codeStep_button)}
      </Button>

      <SucceedModal />
    </>
  );
});
CodeContent.displayName = "CodeContent";

const ModalBody = memo(() => {
  const step = useParamSelector(notNilModalDataSelector<EUpdatePlayerPhoneNumberStep>, [EModal.updatePhoneNumber, "step"]);

  return (
    <FormWithWrapper
      formName={UPDATE_PLAYER_PHONE_NUMBER_FORM_NAME}
      fallbackContent={Loader}
      content={STEP_TO_FORM_CONTENT_MAP[step]}
    />
  );
});
ModalBody.displayName = "ModalBody";

const STEP_TO_FORM_CONTENT_MAP: Record<EUpdatePlayerPhoneNumberStep, ComponentType> = {
  [EUpdatePlayerPhoneNumberStep.PHONE]: PhoneContent,
  [EUpdatePlayerPhoneNumberStep.CODE]: CodeContent,
};

const UpdatePhoneNumberModal = memo(() => {
  const onCancel = useModalCloseAction(EModal.updatePhoneNumber);
  const [t] = useTranslation();

  return (
    <ThemedModal onCancel={onCancel} className={classes.updatePhoneNumberModal}>
      <ThemedModalHeader closeButtonClickHandler={onCancel}>
        <ThemedModalText size={"md"}>
          {t(platformui_starzbet_updatePhoneNumber_header)}
        </ThemedModalText>
      </ThemedModalHeader>

      <ModalBody />
    </ThemedModal>
  );
});
UpdatePhoneNumberModal.displayName = "UpdatePhoneNumberModal";

const UPDATE_PHONE_NUMBER_MODAL_MAP = {
  [EModal.updatePhoneNumber]: <UpdatePhoneNumberModal />,
};

export { UPDATE_PHONE_NUMBER_MODAL_MAP };
