import { memo } from "react";
import { useSelector } from "react-redux";
import { platformui_starzbet_title_deposit, platformui_starzbet_title_depositNote } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import {
  paymentMethodDepositCurrentNameSelector,
  paymentMethodDepositNoteSelector,
} from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { paymentMethodsLoadingSelector } from "../../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { DepositFormContent } from "../../../Components/DepositPaymentMethod/DepositPaymentMethod";
import { PaymentMethodContainer } from "../../Components/PaymentMethodContainer/PaymentMethodContainer";

const DepositPaymentMethod = memo(() => {
  const loading = useSelector(paymentMethodsLoadingSelector);

  return (
    <PaymentMethodContainer
      headerTKey={platformui_starzbet_title_deposit}
      backPath={routeMap.depositRoute}
      noteTKey={platformui_starzbet_title_depositNote}
      noteSelector={paymentMethodDepositNoteSelector}
      currentMethodSelector={paymentMethodDepositCurrentNameSelector}
    >
      {!loading ? <DepositFormContent /> : <Loader />}
    </PaymentMethodContainer>
  );
});
DepositPaymentMethod.displayName = "DepositPaymentMethod";

export { DepositPaymentMethod };
