import type { DynamicStore } from "@sb/dynamic-store";
import { distinctUntilChanged, skip } from "@sb/dynamic-store";
import { dropFormField, setFormFieldValue } from "@sb/form-new";
import type { TPlatformAppState } from "../../PlatformInitialState";
import {
  isPaymentAccountCreateBankAccountFormRouteSelector,
  paymentAccountCreateAccountKindSelector,
} from "../Selectors/PaymentAccountSelectors";
import { PAYMENT_ACCOUNT_CREATE_FORM } from "../Models/Variables";
import { PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS } from "./PaymentAccountBaseFormModel";

const paymentAccountCreateFormListenAccountKindDecorator = <S extends TPlatformAppState>(dynamicStore: DynamicStore<S>) => {
  dynamicStore.addDecorator(
    dynamicStore.createDecorator(
      paymentAccountCreateAccountKindSelector,
      (state) => {
        const value = paymentAccountCreateAccountKindSelector(state);

        if (value) {
          return setFormFieldValue(state, PAYMENT_ACCOUNT_CREATE_FORM, PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS.accountKind, value);
        }

        return dropFormField(state, PAYMENT_ACCOUNT_CREATE_FORM, PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS.accountKind);
      },
      distinctUntilChanged(),
      skip(1),
    ),
    isPaymentAccountCreateBankAccountFormRouteSelector,
  );
};

export { paymentAccountCreateFormListenAccountKindDecorator };
