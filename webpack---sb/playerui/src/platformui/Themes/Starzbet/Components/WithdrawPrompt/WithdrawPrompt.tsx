import { memo } from "react";
import {
  platformui_starzbet_button_no,
  platformui_starzbet_button_yes,
  platformui_starzbet_withdraw_button_confirmWithdraw,
  platformui_starzbet_withdraw_confirmWithdrawQuestion,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { submitFormAction, useFormName } from "@sb/form-new";
import { useActionWithBind } from "@sb/utils";
import { type TWithHideModal } from "../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { ThemedModalPrompt } from "../ThemedModal/ThemedModalPrefabs/ThemedModalPrompt";

const WithdrawPrompt = memo<TWithHideModal>(({ hideModal }) => {
  const formName = useFormName();
  const submit = useActionWithBind(submitFormAction, formName);

  const onOk = () => {
    hideModal();
    submit();
  };

  const props = {
    title: [platformui_starzbet_withdraw_button_confirmWithdraw] as const,
    subtitle: [platformui_starzbet_withdraw_confirmWithdrawQuestion] as const,
    okButtonText: [platformui_starzbet_button_yes] as const,
    cancelButtonText: [platformui_starzbet_button_no] as const,
    onOk,
    onCancel: hideModal,
    iconVariant: "warning" as const,
  };

  return <ThemedModalPrompt {...props} />;
});
WithdrawPrompt.displayName = "WithdrawPrompt";

export { WithdrawPrompt };
