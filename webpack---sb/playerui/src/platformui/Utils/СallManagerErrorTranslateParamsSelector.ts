import { callManagerErrorSelector, type TCallManagerSymbol, type TWithCallManagerState } from "@sb/call-manager";
import { type TErrorMap, type TFuncWithPlain } from "@sb/translator";
import { isNil, type TExplicitAny } from "@sb/utils";
import { extractErrorMessage, isResponseErrors } from "@sb/network-bus/Utils";

const callManagerErrorTranslateParamsSelectorFactory = <
  TKey extends string,
  Code extends string,
>(
    errorMap: TErrorMap<TKey, Code, Record<Code, TExplicitAny>>,
  ) => (
    state: TWithCallManagerState,
    callSymbol: TCallManagerSymbol,
    callSymbolId?: string,
  ): Parameters<TFuncWithPlain<TKey>> | undefined => {
    const error = callManagerErrorSelector(state, callSymbol, callSymbolId)?.value;

    if (isNil(error)) {
      return undefined;
    }

    if (isResponseErrors(error)) {
      const code = error[0].code as Code;

      if (code in errorMap) {
        return errorMap[code](error[0].context);
      }

      return errorMap.fallback(error[0].message);
    }

    return errorMap.fallback(extractErrorMessage(error));
  };

export { callManagerErrorTranslateParamsSelectorFactory };
