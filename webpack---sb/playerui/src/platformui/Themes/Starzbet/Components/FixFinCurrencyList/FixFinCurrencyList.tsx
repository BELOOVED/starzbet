import { memo } from "react";
import { platformui_starzbet_banking_title_chooseCryptoCurrency } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { type EPlatform_PaymentMethodType } from "@sb/graphql-client";
import classes from "./FixFinCurrencyList.module.css";
import { smoothScrollToTop } from "../../../../Utils/ScrollToTop";
import { type TPaymentMethodRoute } from "../../../../Store/Banking/Models/TPaymentMethodRoute";
import { FixFinCryptoCurrency } from "../FixFinCryptoCurrency/FixFinCryptoCurrency";

interface IFixFinCurrencyListProps {
  methodType: EPlatform_PaymentMethodType;
  to: TPaymentMethodRoute;
}

const FixFinCurrencyList = memo<IFixFinCurrencyListProps>((props) => {
  const [t] = useTranslation();
  smoothScrollToTop();

  return (
    <>
      <div className={classes.chooseCurrencyTitle}>
        {t(platformui_starzbet_banking_title_chooseCryptoCurrency)}
      </div>

      <div className={classes.paymentMethodList}>
        <FixFinCryptoCurrency {...props} />
      </div>
    </>
  );
});
FixFinCurrencyList.displayName = "FixFinCurrencyList";

export { FixFinCurrencyList };
