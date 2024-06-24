import { memo } from "react";
import { type TVoidFn, useActionWithBind } from "@sb/utils";
import {
  platformui_starzbet_button_no,
  platformui_starzbet_button_yes,
  platformui_starzbet_myAccount_devices_removeSubtitle,
  platformui_starzbet_myAccount_devices_removeTitle,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { removeDeviceAction } from "../../../../../Store/VerifyDevice/VerifyDeviceActions";
import { ThemedModalPrompt } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalPrompt";

const promptProps = {
  title: [platformui_starzbet_myAccount_devices_removeTitle],
  subtitle: [platformui_starzbet_myAccount_devices_removeSubtitle],
  okText: [platformui_starzbet_button_yes],
  noText: [platformui_starzbet_button_no],
} as const;

interface IPromptModalProps extends IWithId {
  closeModal: TVoidFn;
}

const PromptModal = memo<IPromptModalProps>(({ id, closeModal }) => {
  const removeDevice = useActionWithBind(removeDeviceAction, id);

  return (
    <ThemedModalPrompt
      {...promptProps}
      onOk={removeDevice}
      onCancel={closeModal}
    />
  );
});
PromptModal.displayName = "PromptModal";

export { PromptModal };
