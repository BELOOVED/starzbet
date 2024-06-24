import { DynamicStore } from "@sb/dynamic-store";
import {
  paymentAccountCreateFormListenAccountKindDecorator,
} from "../../platformui/Store/PaymentAccount/Form/PaymentAccountCreateFormDecorator";
import { type TMixAppState } from "./CreateMixInitialState";
import { addBetSlipChangeCurrencyDecorator } from "./BetSlip/DynamicStore/AddBetSlipChangeCurrencyDecorator";

const mixDynamicStore = new DynamicStore<TMixAppState>();

addBetSlipChangeCurrencyDecorator(mixDynamicStore);
paymentAccountCreateFormListenAccountKindDecorator(mixDynamicStore);

export { mixDynamicStore };
