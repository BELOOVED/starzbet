import { from, throwError } from "rxjs";
import { type TCall } from "@sb/sdk";
import { isFunction, isNotEmpty, type TSelector } from "@sb/utils";
import { newError } from "@sb/network-bus/Utils";
import { EErrorType } from "@sb/network-bus/Model";
import { platformConfigSystemLocaleSelector } from "../../../../common/Store/Config/Selectors/ConfigSelectors";
import { formSubmitEpicFactory, type TFormCreateCall } from "../../../Utils/FormSubmitEpicFactory";
import { getTranslatedText } from "../../../Components/TranslateRecord/TranslateRecord";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { activePlayerBonusesSelector } from "../../Bonuses/Selectors/BonusesSelectors";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import {
  getAvailablePaymentMethodByIdSelectors,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../Selectors/PlatformBankingSelectors";
import { PAYMENT_ERROR_CODES_MAP } from "../Utils/BankingFormErrorFunction";

const callObservableFactory = <P, R>(
  call: TCall<P, R>,
  payload: P | TSelector<TPlatformAppState, P>,
): TFormCreateCall<R> => (state, deps) => {
    const paymentMethodId = platformBankingWithdrawPaymentMethodNonNullableSelector(state);
    const forbiddenDuringActiveBonus = getAvailablePaymentMethodByIdSelectors.forbiddenDuringActiveBonus(state, paymentMethodId);
    const activeBonuses = activePlayerBonusesSelector(state);

    /**
   * Prevent call, when `forbiddenDuringActiveBonus` and `activeBonuses` exist, throw error
   */
    if (forbiddenDuringActiveBonus && isNotEmpty(activeBonuses)) {
      const locale = localeSelector(state);
      const systemLocale = platformConfigSystemLocaleSelector(state);

      return throwError(() => newError(
        EErrorType.SHOWABLE,
        PAYMENT_ERROR_CODES_MAP.payment_management__withdrawal_exception_withdrawal_is_forbidden_during_active_bonus,
        "Withdrawal is forbidden during an active bonus",
        {
          activatedPlayerBonusNames: activeBonuses
            .map(
              (bonus) => getTranslatedText(bonus.bonusName, locale, systemLocale),
            ),
        },
      ));
    }
    const platformHttp = deps.platformHttpApi;

    return from(platformHttp._callToPlatform(call, isFunction(payload) ? payload(state) : payload));
  };

const withdrawFormSubmitEpicFactory = <P, R>(
  formName: string,
  call: TCall<P, R>,
  payload: P | TSelector<TPlatformAppState, P>,
  onSuccess?: (value: R) => TPlatformEpic,
): TPlatformEpic => formSubmitEpicFactory({
    formName,
    createCall: callObservableFactory(call, payload),
    onSuccess,
  });

export { withdrawFormSubmitEpicFactory };

