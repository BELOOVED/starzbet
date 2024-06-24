import { useSelector } from "react-redux";
import { memo } from "react";
import { useAction, useParamSelector, withCondition, withStopPropagation } from "@sb/utils";
import {
  platformui_starzbet_button_skip,
  platformui_starzbet_button_submit,
  platformui_starzbet_verifySmsCode_error_wrongCode,
  platformui_starzbet_verifySmsCode_text_submitSucceeded,
  platformui_starzbet_verifySmsCode_title_mobileNumberVerified,
  platformui_starzbet_verifySmsCode_title_onNumber,
  platformui_starzbet_verifySmsCode_title_weSentYouAnSmsCode,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { FormWithWrapper, selectIsFormSubmittingSucceeded } from "@sb/form-new";
import classes from "./VerifyPhoneModal.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { hideVerifyPhoneModalAction } from "../../../../../../common/Store/Player/PlayerActions";
import { phoneVerificationTokenSelectors } from "../../../../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { verifyPhoneModalSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Space } from "../../../../../../common/Components/Space/Space";
import { VERIFY_CODE_FORM_NAME, VERIFY_CODE_FORM_PATH } from "../../../../../Store/VerifyCode/Model";
import { useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { authErrorExtractor } from "../../../../../Store/Auth/Forms/AuthErrorExtractor";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../ThemedModal/ThemedModalBody/ThemedModalBody";
import { ThemedModalTextBlock } from "../../ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import { ThemedModalText } from "../../ThemedModal/ThemedModalText/ThemedModalText";
import { ThemedModalButtonsRow } from "../../ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalSuccessMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { VerifyCode } from "./VerifyCode/VerifyCode";

const succeedMessageProps = {
  title: [platformui_starzbet_verifySmsCode_title_mobileNumberVerified] as const,
  subtitle: [platformui_starzbet_verifySmsCode_text_submitSucceeded] as const,
};

const FormContent = memo(() => {
  const hide = useAction(hideVerifyPhoneModalAction);
  const [t] = useTranslation();
  const phoneNumber = useSelector(phoneVerificationTokenSelectors.phoneNumber);

  const { submitErrors, loading } = useFormSubmitResult(authErrorExtractor);

  return (
    <ThemedModalBody>
      <Space value={0} vertical alignCenter>
        <VerifyCode fieldPath={VERIFY_CODE_FORM_PATH.verifyCode} hideError />

        <ThemedModalText
          color={"error"}
          size={"sm"}
          className={classes.error}
          {...qaAttr(PlayerUIQaAttributes.Modal.Validation)}
        >
          {submitErrors ? t(platformui_starzbet_verifySmsCode_error_wrongCode) : null}
        </ThemedModalText>

        <ThemedModalTextBlock>
          <ThemedModalText size={"xl"} qaAttribute={PlayerUIQaAttributes.Modal.Title}>
            {t(platformui_starzbet_verifySmsCode_title_weSentYouAnSmsCode)}
          </ThemedModalText>

          <ThemedModalText qaAttribute={PlayerUIQaAttributes.Modal.SubTitle}>
            {t(platformui_starzbet_verifySmsCode_title_onNumber)}
            &nbsp;
            {phoneNumber}
          </ThemedModalText>
        </ThemedModalTextBlock>
      </Space>

      <ThemedModalButtonsRow>
        <Button
          type={"submit"}
          colorScheme={"blue-gradient"}
          qaAttribute={PlayerUIQaAttributes.Modal.SubmitButton}
          loading={loading}
          wide={IS_MOBILE_CLIENT_SIDE}
        >
          {t(platformui_starzbet_button_submit)}
        </Button>

        <Button
          colorScheme={"secondary-grey"}
          onClick={withStopPropagation(hide)}
          qaAttribute={PlayerUIQaAttributes.Modal.OkButton}
          wide={IS_MOBILE_CLIENT_SIDE}
        >
          {t(platformui_starzbet_button_skip)}
        </Button>
      </ThemedModalButtonsRow>
    </ThemedModalBody>
  );
});
FormContent.displayName = "FormContent";

const VerifyPhoneModal = withCondition(
  verifyPhoneModalSelector,
  memo(() => {
    const hide = useAction(hideVerifyPhoneModalAction);
    const submitSucceeded = useParamSelector(selectIsFormSubmittingSucceeded, [VERIFY_CODE_FORM_NAME]);

    return (
      submitSucceeded
        ? <ThemedModalSuccessMessage {...succeedMessageProps} hideModal={hide} />
        : (
          <ThemedModal onCancel={hide}>
            <ThemedModalHeader closeButtonClickHandler={hide} />

            <FormWithWrapper formName={VERIFY_CODE_FORM_NAME} content={FormContent} />
          </ThemedModal>
        )
    );
  }),
);
VerifyPhoneModal.displayName = "VerifyPhoneModal";

export { VerifyPhoneModal };
