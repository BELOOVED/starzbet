import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_2fa_backupCodes,
  platformui_starzbet_2fa_success_text,
  platformui_starzbet_2fa_success_title,
  platformui_starzbet_2fa_successDeactivate_title,
  platformui_starzbet_button_ok,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { getNotNil, useActionWithBind } from "@sb/utils";
import { useFormName } from "@sb/form-new";
import classes from "./TwoFactorAuthPageForm.module.css";
import { Space } from "../../../../../../common/Components/Space/Space";
import { twoFactorAuthChangeAction } from "../../../../../../common/Store/Player/PlayerActions";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { TickIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { twoFactorAuthDataSelectors } from "../../../../../Store/TwoFactorAuth/TwoFactorAuthSelectors";
import { useDownloadBackupCodes } from "../../../../../Store/TwoFactorAuth/Hooks/UseDownloadBackupCodes";
import {
  TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
} from "../../../../../Store/TwoFactorAuth/SubmitForm/Model";
import { DownloadIcon } from "../../Icons/DownloadIcon";
import { Copy } from "../../Copy/Copy";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalTextBlock } from "../../ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import { ThemedModalText } from "../../ThemedModal/ThemedModalText/ThemedModalText";
import { ThemedModalButtonsRow } from "../../ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalSuccessMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../ThemedModal/ThemedModalBody/ThemedModalBody";

const Download = memo(() => {
  const download = useDownloadBackupCodes();

  return (
    <div onClick={download} className={classes.download}>
      <DownloadIcon width={18} height={18} />
    </div>
  );
});
Download.displayName = "Download";

interface IBackupCodesProps {
  secretKeys: string[];
}

const BackupCodes = memo<IBackupCodesProps>(({ secretKeys }) => {
  const [t] = useTranslation();

  return (
    <Space value={16} vertical className={classes.backupCodes}>
      <Space value={8} alignCenter spaceBetween>
        <div className={classes.backupCodesTitle}>{t(platformui_starzbet_2fa_backupCodes)}</div>

        <Space value={8} alignCenter>
          <Copy text={secretKeys.join("\n")} />

          <Download />
        </Space>
      </Space>

      <Space value={12} vertical>
        {secretKeys.map((secret) => <div key={secret}>{secret}</div>)}
      </Space>
    </Space>
  );
});
BackupCodes.displayName = "BackupCodes";

const SuccessWithSecretKeys = memo(() => {
  const [t] = useTranslation();
  const secretKeys = useSelector(twoFactorAuthDataSelectors.backupCodes);
  const closeSuccessModal = useActionWithBind(twoFactorAuthChangeAction);

  return (
    <ThemedModal onCancel={closeSuccessModal} className={classes.successModal}>
      <ThemedModalHeader closeButtonClickHandler={closeSuccessModal} />

      <ThemedModalBody>
        <TickIcon height={IS_MOBILE_CLIENT_SIDE ? 35 : 45} width={IS_MOBILE_CLIENT_SIDE ? 35 : 45} color={"validation"} />

        <ThemedModalTextBlock>
          <ThemedModalText size={"xl"}>{t(platformui_starzbet_2fa_success_title)}</ThemedModalText>

          {
            secretKeys
              ? (
                <>
                  <ThemedModalText size={"md"}>{t(platformui_starzbet_2fa_success_text)}</ThemedModalText>

                  <BackupCodes secretKeys={secretKeys} />
                </>
              )
              : null
          }
        </ThemedModalTextBlock>

        <ThemedModalButtonsRow>
          <Button colorScheme={"orange-gradient"} onClick={closeSuccessModal} wide>{t(platformui_starzbet_button_ok)}</Button>
        </ThemedModalButtonsRow>
      </ThemedModalBody>
    </ThemedModal>
  );
});
SuccessWithSecretKeys.displayName = "SuccessWithSecretKeys";

const SUCCESS_DEACTIVATE_TITLE: [TTKeys] = [platformui_starzbet_2fa_successDeactivate_title];

const SuccessDisable = memo(() => {
  const closeSuccessModal = useActionWithBind(twoFactorAuthChangeAction);

  return <ThemedModalSuccessMessage title={SUCCESS_DEACTIVATE_TITLE} hideModal={closeSuccessModal} />;
});
SuccessDisable.displayName = "SuccessDisable";

const SUCCESS_MODALS: Record<string, ComponentType> = {
  [TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME]: SuccessWithSecretKeys,
  [TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME]: SuccessDisable,
};

const TwoFactorAuthSuccessModal = memo(() => {
  const formName = useFormName();
  const successModal = getNotNil(SUCCESS_MODALS[formName], ["TwoFactorAuthSuccessModal"], `Success modal for ${formName}`);

  return createElement(successModal);
});
TwoFactorAuthSuccessModal.displayName = "TwoFactorAuthSuccessModal";

export { TwoFactorAuthSuccessModal };
