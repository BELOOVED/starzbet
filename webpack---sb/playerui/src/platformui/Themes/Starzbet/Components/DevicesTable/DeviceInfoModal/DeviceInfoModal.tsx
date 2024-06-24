import { memo, type ReactNode, useReducer } from "react";
import {
  platformui_starzbet_accountVerification_button_remove,
  platformui_starzbet_myAccount_devices_browser,
  platformui_starzbet_myAccount_devices_device,
  platformui_starzbet_myAccount_devices_deviceDetails,
  platformui_starzbet_myAccount_devices_ipAddress,
  platformui_starzbet_myAccount_devices_lastLogin,
  platformui_starzbet_myAccount_devices_location,
  platformui_starzbet_myAccount_devices_verifiedAt,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import type { TPlatform_SelfPlayerDevices_Fragment } from "@sb/graphql-client/PlayerUI";
import { useTranslation } from "@sb/translator";
import { not, type TVoidFn } from "@sb/utils";
import { type TSharedKey } from "@sb/translates/shared/SharedTKeys";
import classes from "./DeviceInfoModal.module.css";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { TrashIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TrashIcon/TrashIcon";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../ThemedModal/ThemedModalBody/ThemedModalBody";
import { PromptModal } from "./PromptModal";

type TDeviceInfoModal = Omit<TPlatform_SelfPlayerDevices_Fragment, "__typename" | "countryCode"> & {
  closeModal: TVoidFn;
  countryKey: TSharedKey | "-";
}

interface IModalButtonProps {
  closeHandler: TVoidFn;
}

const ModalButton = memo<IModalButtonProps>(({ closeHandler }) => {
  const [t] = useTranslation();

  return (
    <Button colorScheme={"secondary-grey"} contentClassName={classes.buttonContent} onClick={closeHandler}>
      <TrashIcon />

      <div>{t(platformui_starzbet_accountVerification_button_remove)}</div>
    </Button>
  );
});
ModalButton.displayName = "ModalButton";

interface IModalRowProps {
  title: TTKeys;
  info: ReactNode;
  isNumber?: boolean;
}

const ModalRow = memo<IModalRowProps>(({ info, title, isNumber = false }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.row}>
      <div>{t(title)}</div>

      <div className={isNumber ? classes.number : undefined}>{info}</div>
    </div>
  );
});
ModalRow.displayName = "ModalRow";

const DeviceInfoModal = memo<TDeviceInfoModal>(({
  countryKey,
  hostAddress,
  lastLogin,
  closeModal,
  id,
  device,
  browser,
  verifiedAt,
}) => {
  const [t] = useTranslation();
  const [remove, toggleRemove] = useReducer(not<boolean>, false);

  return (
    <ThemedModal onCancel={closeModal}>
      <ThemedModalHeader closeButtonClickHandler={closeModal}>
        <div className={classes.header}>
          {t(platformui_starzbet_myAccount_devices_deviceDetails)}
        </div>
      </ThemedModalHeader>

      <ThemedModalBody className={classes.modalBody}>
        <ModalRow title={platformui_starzbet_myAccount_devices_device} info={device} />

        <ModalRow title={platformui_starzbet_myAccount_devices_ipAddress} info={hostAddress} isNumber />

        <ModalRow title={platformui_starzbet_myAccount_devices_browser} info={browser} />

        <ModalRow title={platformui_starzbet_myAccount_devices_location} info={t(countryKey)} />

        {
          lastLogin
            ? (
              <ModalRow
                title={platformui_starzbet_myAccount_devices_lastLogin}
                info={<DateFormat date={+lastLogin} format={"dd.MM.yyyy HH:mm:ss"} />}
                isNumber
              />
            )
            : null
        }

        {
          verifiedAt
            ? (
              <ModalRow
                title={platformui_starzbet_myAccount_devices_verifiedAt}
                info={<DateFormat date={+verifiedAt} format={"dd.MM.yyyy HH:mm:ss"} />}
                isNumber
              />
            )
            : null
        }
      </ThemedModalBody>

      <ModalButton closeHandler={toggleRemove} />

      {remove ? <PromptModal closeModal={closeModal} id={id} /> : null}
    </ThemedModal>
  );
});
DeviceInfoModal.displayName = "DeviceInfoModal";

export { DeviceInfoModal };
