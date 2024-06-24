import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { platformui_starzbet_myAccount_devices_successRemoveTitle } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useActionWithBind } from "@sb/utils";
import { loggedSelector } from "@sb/auth";
import { useModalCloseAction } from "../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { loadUserDevicesAction } from "../../../../../Store/VerifyDevice/VerifyDeviceActions";
import { ThemedModalSuccessMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const successText = [platformui_starzbet_myAccount_devices_successRemoveTitle] as const;

const RemoveDeviceSuccess = memo(() => {
  const updateDevices = useActionWithBind(loadUserDevicesAction);
  const closeModal = useModalCloseAction(EModal.removeDevice);
  const logged = useSelector(loggedSelector);

  const onClose = useCallback(
    () => {
      if (logged) {
        updateDevices();
      }

      closeModal();
    },
    [logged],
  );

  return <ThemedModalSuccessMessage hideModal={onClose} title={successText} />;
});
RemoveDeviceSuccess.displayName = "RemoveDeviceSuccess";

export { RemoveDeviceSuccess };
