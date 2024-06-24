import { type ComponentType, memo } from "react";
import { isNotNil, type TVoidFn } from "@sb/utils";
import type { TFuncWithPlain } from "@sb/translator";
import { type TExtractError, useFormSubmitResult } from "../../platformui/Store/Form/Hooks/UseFormSubmitResult";

interface IMessageProps {
  title?: Readonly<Parameters<TFuncWithPlain>>;
  subtitle?: Readonly<Parameters<TFuncWithPlain>>;
  hideModal: TVoidFn;
}

interface IFormSubmitResultFactoryProps extends Omit<IMessageProps, "hideModal"> {
  successTitle: string;
  successSubtitle?: string;
  errorTitle: string;
  errorSubtitle?: string;
  onSuccess?: TVoidFn;
  onError?: TVoidFn;
  extractError?: TExtractError;
  ErrorMessage: ComponentType<IMessageProps>;
  SuccessMessage: ComponentType<IMessageProps>;
}

const FormSubmitResultFactory = memo<IFormSubmitResultFactoryProps>(({
  successSubtitle,
  errorSubtitle,
  successTitle,
  errorTitle,
  onSuccess,
  onError,
  extractError,
  ErrorMessage,
  SuccessMessage,
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
      <ErrorMessage {...props} />
    );
  }

  if (submitSucceeded) {
    const props = {
      hideModal: onSuccess ?? reset,
      title: [successTitle] as const,
      subtitle: isNotNil(successSubtitle) ? [successSubtitle] as const : undefined,
    };

    return (
      <SuccessMessage {...props} />
    );
  }

  return null;
});
FormSubmitResultFactory.displayName = "FormSubmitResultFactory";

export { FormSubmitResultFactory, type  IFormSubmitResultFactoryProps };
