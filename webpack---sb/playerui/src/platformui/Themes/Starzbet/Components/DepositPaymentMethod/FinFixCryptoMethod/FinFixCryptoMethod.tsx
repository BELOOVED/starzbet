import { withProps } from "@sb/utils";
import { EPlatform_PaymentMethodType } from "@sb/graphql-client";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { FixFinCurrencyList } from "../../FixFinCurrencyList/FixFinCurrencyList";

const FinFixCryptoMethod = withProps(FixFinCurrencyList)({
  methodType: EPlatform_PaymentMethodType.deposit,
  to: routeMap.depositPaymentMethodRoute,
});

export { FinFixCryptoMethod };
