import { useSelector } from "react-redux";
import { EPlatform_PlayerPaymentAccountType } from "@sb/graphql-client";
import { usePersist } from "@sb/utils";
import { routeMap } from "../../../RouteMap/RouteMap";
import { paymentAccountKindPerPaymentMethodId } from "../../PaymentAccount/Models/PaymentAccountEditFormModel";
import { platformBankingWithdrawPaymentMethodSelector } from "../Selectors/PlatformBankingSelectors";

const usePaymentAccountHandler = () => {
  const paymentMethodId = useSelector(platformBankingWithdrawPaymentMethodSelector);

  return usePersist(
    () => {
      if (!paymentMethodId) {
        return { to: routeMap.bankingPaymentAccountsRoute };
      }

      const accountKind = paymentAccountKindPerPaymentMethodId[paymentMethodId];

      if (accountKind) {
        return {
          to: routeMap.bankingPaymentAccountCreateKindRoute,
          params: {
            accountType: EPlatform_PlayerPaymentAccountType.bankAccount,
            accountKind: accountKind,
          },
        };
      }

      return { to: routeMap.bankingPaymentAccountsRoute };
    },
  );
};

export { usePaymentAccountHandler };
