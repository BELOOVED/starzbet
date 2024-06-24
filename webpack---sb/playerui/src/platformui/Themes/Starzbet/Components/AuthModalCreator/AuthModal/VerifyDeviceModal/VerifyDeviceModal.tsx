import clsx from "clsx";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { type TVoidFn, useAction, useActionWithBind, useParamSelector, usePersistCallback } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_button_resend,
  platformui_starzbet_button_resendToEmail,
  platformui_starzbet_button_resendToPhone,
  platformui_starzbet_button_submit,
  platformui_starzbet_placeholder_email,
  platformui_starzbet_placeholder_mobile,
  platformui_starzbet_verifyDevice_modalInfo_selectOption,
  platformui_starzbet_verifyDevice_modalInfo_subtitle,
  platformui_starzbet_verifyDevice_modalInfo_title,
  platformui_starzbet_verifyDevice_modalInfo_verify,
  platformui_starzbet_verifyDevice_newDevice,
  platformui_starzbet_verifyDevice_successTitle,
  platformui_starzbet_verifyDevice_weSentYouCode,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { FormWithWrapper, selectIsFormSubmittingSucceeded } from "@sb/form-new";
import type { TDeviceVerificationStrategyType } from "@sb/sdk/authprofile/model/authprofile/DeviceVerificationStrategyType";
import classes from "./VerifyDeviceModal.module.css";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Space } from "../../../../../../../common/Components/Space/Space";
import {
  isAvailableResendSelector,
  isSelectiveStrategySelector,
  resendSelectOptionsSelector,
  tokenReceiverSelector,
} from "../../../../../../Store/VerifyDevice/VerifyDeviceSelectors";
import {
  loginAfterVerifyDeviceAction,
  resendVerifyCodeAction,
  verifyDeviceInfoModalClosedAction,
} from "../../../../../../Store/VerifyDevice/VerifyDeviceActions";
import { useFormSubmitResult } from "../../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { VERIFY_DEVICE_FORM_NAME, VERIFY_DEVICES_FORM_PATH } from "../../../../../../Store/VerifyDevice/SubmitForm/Model";
import { authErrorExtractor } from "../../../../../../Store/Auth/Forms/AuthErrorExtractor";
import { ThemedModal } from "../../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../../ThemedModal/ThemedModalBody/ThemedModalBody";
import { ThemedModalText } from "../../../ThemedModal/ThemedModalText/ThemedModalText";
import { ThemedModalButtonsRow } from "../../../ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalTextBlock } from "../../../ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import { ThemedModalSuccessMessage } from "../../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { VerifyCode } from "../../../MyDetails/VerifyPhoneModal/VerifyCode/VerifyCode";

interface IButtonsGroupProps extends IInfoModalProps {
  isSelective: boolean;
}

const ButtonsGroup = memo<IButtonsGroupProps>(({ isSelective, openForm }) => {
  const [t] = useTranslation();
  const sendCode = useAction(resendVerifyCodeAction);

  const sendCodeHandler = (type: TDeviceVerificationStrategyType) => () => {
    sendCode(type);
    openForm();
  };

  return (
    <ThemedModalButtonsRow>
      {
        isSelective
          ? (
            <>
              <Button onClick={sendCodeHandler("EMAIL")} colorScheme={"blue-gradient"} wide>
                {t(platformui_starzbet_placeholder_email)}
              </Button>

              <Button onClick={sendCodeHandler("PHONE")} colorScheme={"orange-gradient"} wide>
                {t(platformui_starzbet_placeholder_mobile)}
              </Button>
            </>
          )
          : (
            <Button onClick={openForm} colorScheme={"orange-gradient"} wide>
              {t(platformui_starzbet_verifyDevice_modalInfo_verify)}
            </Button>
          )
      }
    </ThemedModalButtonsRow>
  );
});
ButtonsGroup.displayName = "ButtonsGroup";

interface IInfoModalProps {
  openForm: TVoidFn;
}

const InfoModal = memo<IInfoModalProps>(({ openForm }) => {
  const [t] = useTranslation();

  const closeModal = useActionWithBind(verifyDeviceInfoModalClosedAction);

  const messageReceiver = useSelector(tokenReceiverSelector);

  const isSelective = useSelector(isSelectiveStrategySelector);

  return (
    <ThemedModal>
      <ThemedModalHeader closeButtonClickHandler={closeModal}>
        <ThemedModalText>
          {t(platformui_starzbet_verifyDevice_newDevice)}
        </ThemedModalText>
      </ThemedModalHeader>

      <ThemedModalBody className={clsx(classes.modalBody, classes.infoModal)}>
        <ThemedModalTextBlock>
          <ThemedModalText size={"xl"} wide>{t(platformui_starzbet_verifyDevice_modalInfo_title)}</ThemedModalText>

          <ThemedModalText color={"dark"}>
            {
              t(
                isSelective
                  ? platformui_starzbet_verifyDevice_modalInfo_selectOption
                  : platformui_starzbet_verifyDevice_modalInfo_subtitle,
                {
                  value: messageReceiver,
                },
              )
            }
          </ThemedModalText>
        </ThemedModalTextBlock>

        <ButtonsGroup isSelective={isSelective} openForm={openForm} />
      </ThemedModalBody>
    </ThemedModal>
  );
});
InfoModal.displayName = "InfoModal";

const RESEND_TKEYS: Record<TDeviceVerificationStrategyType, TTKeys> = {
  PHONE: platformui_starzbet_button_resendToPhone,
  EMAIL: platformui_starzbet_button_resendToEmail,
  SELECTIVE: platformui_starzbet_button_resend,
};

const ResendButtons = memo(() => {
  const [t] = useTranslation();
  const resendCode = useAction(resendVerifyCodeAction);
  const options = useSelector(resendSelectOptionsSelector);

  const resendHandler = (type: TDeviceVerificationStrategyType) => () => {
    resendCode(type);
  };

  return (
    <>
      {
        options.map((type) => (
          <Button
            colorScheme={"secondary-grey"}
            onClick={resendHandler(type)}
            key={type}
            wide
          >
            {t(RESEND_TKEYS[type])}
          </Button>
        ))
      }
    </>
  );
});
ResendButtons.displayName = "ResendButtons";

const succeedMessageProps = {
  title: [platformui_starzbet_verifyDevice_successTitle] as const,
};

const FormContent = memo(() => {
  const [t] = useTranslation();
  const isAvailableResend = useSelector(isAvailableResendSelector);

  const { submitErrors, loading } = useFormSubmitResult(authErrorExtractor);

  return (
    <ThemedModalBody className={classes.modalBody}>
      <ThemedModalTextBlock>
        <ThemedModalText size={"xl"}>
          {t(platformui_starzbet_verifyDevice_weSentYouCode)}
        </ThemedModalText>

        <Space value={0} vertical alignCenter>
          <VerifyCode fieldPath={VERIFY_DEVICES_FORM_PATH.verifyCode} />

          <ThemedModalText color={"error"} size={"sm"} className={classes.error}>
            {submitErrors ? t(submitErrors.error) : null}
          </ThemedModalText>
        </Space>
      </ThemedModalTextBlock>

      <ThemedModalButtonsRow>
        {
          isAvailableResend
            ? <ResendButtons />
            : (
              <Button type={"submit"} colorScheme={"blue-gradient"} loading={loading}>
                {t(platformui_starzbet_button_submit)}
              </Button>
            )
        }
      </ThemedModalButtonsRow>
    </ThemedModalBody>
  );
});
FormContent.displayName = "FormContent";

const VerifyDeviceModalForm = memo(() => {
  const submitSucceeded = useParamSelector(selectIsFormSubmittingSucceeded, [VERIFY_DEVICE_FORM_NAME]);
  const login = useActionWithBind(loginAfterVerifyDeviceAction);
  const closeModal = useActionWithBind(verifyDeviceInfoModalClosedAction);

  const [t] = useTranslation();

  return submitSucceeded
    ? <ThemedModalSuccessMessage {...succeedMessageProps} hideModal={login} />
    : (
      <ThemedModal onCancel={closeModal}>
        <ThemedModalHeader closeButtonClickHandler={closeModal}>
          <ThemedModalText>
            {t(platformui_starzbet_verifyDevice_newDevice)}
          </ThemedModalText>
        </ThemedModalHeader>

        <FormWithWrapper
          formName={VERIFY_DEVICE_FORM_NAME}
          content={FormContent}
        />
      </ThemedModal>
    );
});
VerifyDeviceModalForm.displayName = "VerifyDeviceModalForm";

const VerifyDeviceModal = memo(() => {
  const [form, setForm] = useState(false);

  const openForm = usePersistCallback(() => setForm(true));

  return form
    ? <VerifyDeviceModalForm />
    : <InfoModal openForm={openForm} />;
});
VerifyDeviceModal.displayName = "VerifyDeviceModal";

export { VerifyDeviceModal };
