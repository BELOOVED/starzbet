import { type AnyAction } from "redux";
import { EMPTY } from "rxjs";
import {
  createForm,
  createFormFieldPaths,
  disableExtension,
  form,
  type IFormAction,
  objectField,
  submittingExtension,
  type TFieldDefs,
  type TFormEpic,
  type TSyncValidator,
  validationExtension,
  withValidation,
} from "@sb/form-new";
import { type IMoney, type TSelector } from "@sb/utils";
import { type TCall } from "@sb/sdk";
import {
  platformui_withdrawValidate_error_maxAmount,
  platformui_withdrawValidate_error_minAmount,
} from "@sb/translates/platformui/CommonTKeys";
import { checkMoneyMultipleOf } from "../../../Utils/CheckInputs";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { FORM_MONEY_VALIDATION_IN_RANGE, formRequiredValidation, notZeroMoneyValidator } from "../../Form/Utils/FormValidations";
import { formResetDecorator, type TDecorator } from "../../Form/Utils/FormResetDecorator";
import { WITHDRAW_FORM } from "../Utils/Variables";
import {
  paymentMethodMaxPaymentAmountSelector,
  paymentMethodMinPaymentAmountSelector,
  platformBankingWithdrawPaymentMethodNonNullableSelector,
} from "../Selectors/PlatformBankingSelectors";
import { type TWithAmountFormModel } from "./BaseFormModel";
import { type TFormInitialStateSelector } from "./WithdrawFormInitialStateSelectorMap";
import { withdrawFormSubmitEpicFactory } from "./WithdrawFormSubmitEpicFactory";

const EMPTY_FIELDS: TFieldDefs = {};

const moneyRangeValidator: TSyncValidator<IMoney, TPlatformAppState> = (value, _, __, state) => {
  const paymentMethod = platformBankingWithdrawPaymentMethodNonNullableSelector(state);

  const min = paymentMethodMinPaymentAmountSelector(state, paymentMethod);
  const max = paymentMethodMaxPaymentAmountSelector(state, paymentMethod);

  return FORM_MONEY_VALIDATION_IN_RANGE(
    min,
    max,
    (value) => ({ tKey: platformui_withdrawValidate_error_minAmount, options: { value } }),
    (value) => ({ tKey: platformui_withdrawValidate_error_maxAmount, options: { value } }),
    value,
  );
};

const WITHDRAW_BASE_AMOUNT_FIELD: TFieldDefs<keyof TWithAmountFormModel> = {
  amount: objectField({
    extensions: withValidation(
      formRequiredValidation(),
      notZeroMoneyValidator,
      checkMoneyMultipleOf(10),
      moneyRangeValidator,
    ),
  }),
};

const WITHDRAW_BASE_AMOUNT_FIELD_PATHS = createFormFieldPaths(WITHDRAW_BASE_AMOUNT_FIELD);

const getWithdrawFormConfig = <K extends string, P, R>(
  fields: TFieldDefs<K, TPlatformAppState> = EMPTY_FIELDS,
  call: TCall<P, R>,
  payload: P | TSelector<TPlatformAppState, P>,
  onSuccess?: (value: R) => TPlatformEpic,
  decorators: TDecorator[] = [],
  epic: TFormEpic<IFormAction, AnyAction, TPlatformAppState> = () => EMPTY,
) => (initialStateSelector?: TFormInitialStateSelector) => {
    const decoratorList = [...decorators];

    if (initialStateSelector) {
      decoratorList.push(formResetDecorator(WITHDRAW_FORM, initialStateSelector));
    }

    return createForm<TPlatformAppState>({
      extensions: [submittingExtension, validationExtension, disableExtension],

      form: form({
        fields: {
          ...fields,
          ...WITHDRAW_BASE_AMOUNT_FIELD,
        },
      }),

      epics: [
        withdrawFormSubmitEpicFactory(
          WITHDRAW_FORM,
          call,
          payload,
          onSuccess,
        ),
        epic,
      ],

      decorators: decoratorList,
    });
  };

export { WITHDRAW_BASE_AMOUNT_FIELD, WITHDRAW_BASE_AMOUNT_FIELD_PATHS, getWithdrawFormConfig };
