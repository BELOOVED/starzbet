import { memo } from "react";
import { platformui_title_wrong } from "@sb/translates/platformui/CommonTKeys";
import { platformui_starzbet_message_success } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { sportsbookui_starzbet_subTitle_complete } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { isNotNil, type TVoidFn } from "@sb/utils";
import { type TExtractError, useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { ThemedModalErrorMessage, ThemedModalSuccessMessage } from "../ThemedModalPrefabs/ThemedModalMessage";

interface IThemedModalFormSubmitResultProps {
  successTitle?: string;
  successSubtitle?: string | null;
  errorTitle?: string;
  errorSubtitle?: string;
  onSuccess?: TVoidFn;
  onError?: TVoidFn;
  extractError?: TExtractError;
}

const ThemedModalFormSubmitResult = memo<IThemedModalFormSubmitResultProps>(({
  successSubtitle = sportsbookui_starzbet_subTitle_complete,
  errorSubtitle,
  successTitle = platformui_starzbet_message_success,
  errorTitle = platformui_title_wrong,
  onSuccess,
  onError,
  extractError,
}) => {
  const {
    submitSucceeded,
    reset,
    submitErrors,
  } = useFormSubmitResult(extractError);

  if (submitErrors) {
    const props = {
      hideModal: onError ?? reset,
      title: [errorTitle] as const,
      subtitle: [errorSubtitle || submitErrors.error, submitErrors.option] as const,
    };

    return (
      <ThemedModalErrorMessage {...props} />
    );
  }

  if (submitSucceeded) {
    const props = {
      hideModal: onSuccess ?? reset,
      title: [successTitle] as const,
      subtitle: isNotNil(successSubtitle) ? [successSubtitle] as const : undefined,
    };

    return (
      <ThemedModalSuccessMessage {...props} />
    );
  }

  return null;
});
ThemedModalFormSubmitResult.displayName = "ThemedModalFormSubmitResult";

export { ThemedModalFormSubmitResult };
