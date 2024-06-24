import { merge, type Observable, of, pipe } from "rxjs";
import { catchError } from "rxjs/operators";
import { getNotNil, isArray, isNotNil, isString, type TExplicitAny } from "@sb/utils";
import { type TFuncWithPlain } from "@sb/translator";
import { submitFormFailedAction } from "@sb/form-new";
import { callManagerFailedAction, type TCallManagerSymbolPair } from "@sb/call-manager";
import { extractErrorMessage, isResponseErrors } from "@sb/network-bus/Utils";
import { createLogger } from "@sb/logger";
import { appServiceShowErrorMessageAction } from "./MessagesActions";

const Logger = createLogger("adminui-utils");

type TGetParameters<T> = (context: TExplicitAny) => Parameters<TFuncWithPlain<T>>

type TCodeToGetParametersMap<T> = { fallback: TGetParameters<T>; } & Record<string, TGetParameters<T>>

const isCodeToGetParametersMap = <T>(
  arg: Parameters<TFuncWithPlain<T>> | [TCodeToGetParametersMap<T>],
): arg is [TCodeToGetParametersMap<T>] => !isString(arg[0]) && isNotNil((arg[0] as TCodeToGetParametersMap<T>).fallback);

const handleOnError = <T extends string>(
  parameters: Parameters<TFuncWithPlain<T>>,
  error: Error,
  onError?: (error: Error) => Observable<TExplicitAny>,
) => {
  if (onError) {
    return merge(
      of(appServiceShowErrorMessageAction(...parameters)),
      onError(error),
    );
  }

  return of(appServiceShowErrorMessageAction(...parameters));
};

const handleErrorFactory = <T extends string>() => (
  tParameters: Parameters<TFuncWithPlain<T>> | [TCodeToGetParametersMap<T>],
  onError?: (error: Error) => Observable<TExplicitAny>,
  maxLength = 150,
) => pipe(
  catchError((error: Error) => {
    Logger.warn.epic("handleErrorFactory", error);
    if (isCodeToGetParametersMap<T>(tParameters)) {
      const [codeToGetParametersMap] = tParameters;
      if (isResponseErrors(error) && codeToGetParametersMap[error[0].code]) {
        const handleCode = getNotNil(codeToGetParametersMap[error[0].code], ["adminui-utils, HandleErrorFactory"], "handleCode");

        const parameters = handleCode(error[0].context);

        return handleOnError(parameters, error, onError);
      }
      const [key, options, ...restParameters] = codeToGetParametersMap.fallback(error);

      const errorMessage = extractErrorMessage(error, maxLength);

      const enhancedOptions: typeof options = {
        error: errorMessage,
        ...options,
      };

      return handleOnError([key, enhancedOptions, ...restParameters], error, onError);
    }
    const [key, options, ...restParameters] = tParameters;

    const errorMessage = extractErrorMessage(error, maxLength);

    const enhancedOptions: typeof options = {
      error: errorMessage,
      ...options,
    };

    return handleOnError([key, enhancedOptions, ...restParameters], error, onError);
  }),
);

const handleLoadingErrorFactory = <K extends string>() => {
  const handleError = handleErrorFactory<K>();

  return (symbolPair: TCallManagerSymbolPair) =>
    (...tParameters: Parameters<TFuncWithPlain<K>> | [TCodeToGetParametersMap<K>]) =>
      handleError(
        tParameters,
        (error) => of(
          isArray(symbolPair)
            ? callManagerFailedAction(symbolPair[0], extractErrorMessage(error, 150), symbolPair[1])
            : callManagerFailedAction(symbolPair, extractErrorMessage(error, 150)),
        ),
      );
};

const handleFormSubmittingErrorFactory = <K extends string>() => {
  const handleError = handleErrorFactory<K>();

  return (formName: string) =>
    (...tParameters: Parameters<TFuncWithPlain<K>> | [TCodeToGetParametersMap<K>]) =>
      handleError(tParameters, () => of(submitFormFailedAction(formName)));
};

const handleError = handleErrorFactory();
const handleLoadingError = handleLoadingErrorFactory();

export type { TCodeToGetParametersMap };

export {
  handleErrorFactory,
  handleLoadingErrorFactory,
  handleFormSubmittingErrorFactory,
  handleError,
  handleLoadingError,
};
