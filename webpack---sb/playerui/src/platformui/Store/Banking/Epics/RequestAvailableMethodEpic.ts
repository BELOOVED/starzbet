import { type EPlatform_PaymentMethodType } from "@sb/graphql-client";
import {
  platformAvailablePaymentMethodsQueryOptionalFields,
  query_Platform_AvailablePaymentMethods,
} from "@sb/graphql-client/PlayerUI";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlDataSelector } from "../../Root/Selectors/GraphQlSelectors";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { platformAvailablePaymentMethodsReceiveAction } from "../BankingActions";
import { PAYMENT_METHODS_LOADING_SYMBOL } from "../Utils/Variables";

type TRequestAvailableMethodEpic = (methodType: EPlatform_PaymentMethodType) => TPlatformEpic

const requestAvailableMethodEpic: TRequestAvailableMethodEpic = (methodType) => gqlLoadingFactory(
  PAYMENT_METHODS_LOADING_SYMBOL,
  query_Platform_AvailablePaymentMethods,
  {
    optionalFields: platformAvailablePaymentMethodsQueryOptionalFields,
    variables: { methodType },
  },
  platformAvailablePaymentMethodsReceiveAction,
  (response) => [graphQlDataSelector(response).AvailablePaymentMethods],
);

export { requestAvailableMethodEpic };
