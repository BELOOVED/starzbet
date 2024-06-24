import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_title_withdraw,
  platformui_starzbet_title_withdrawalNote,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import {
  paymentMethodWithdrawalCurrentNameSelector,
  paymentMethodWithdrawalNoteSelector,
} from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { paymentMethodsLoadingSelector } from "../../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { WithdrawFormContent } from "../../../Components/WithdrawPaymentMethod/WithdrawPaymentMethod";
import { PaymentMethodContainer } from "../../Components/PaymentMethodContainer/PaymentMethodContainer";

const WithdrawPaymentMethod = memo(() => {
  const loading = useSelector(paymentMethodsLoadingSelector);

  return (
    <PaymentMethodContainer
      backPath={routeMap.withdrawRoute}
      headerTKey={platformui_starzbet_title_withdraw}
      noteTKey={platformui_starzbet_title_withdrawalNote}
      noteSelector={paymentMethodWithdrawalNoteSelector}
      currentMethodSelector={paymentMethodWithdrawalCurrentNameSelector}
    >
      {
        !loading
          ? (
            <WithdrawFormContent />
          )
          : null
      }
    </PaymentMethodContainer>
  );
});
WithdrawPaymentMethod.displayName = "WithdrawPaymentMethod";

export { WithdrawPaymentMethod };
