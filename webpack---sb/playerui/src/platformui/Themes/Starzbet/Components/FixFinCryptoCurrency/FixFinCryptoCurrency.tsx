import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import type { TPlatform_AvailablePaymentMethod_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EPlatform_PaymentMethodType } from "@sb/graphql-client";
import {
  platformui_starzbet_placeholder_selectMethod,
  platformui_starzbet_title_max,
  platformui_starzbet_title_min,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./FixFinCryptoCurrency.module.css";
import { LinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { bankingFixFinCryptoSubProvidersSelector } from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { toFormatPlayerMoneyInBag } from "../../../../Utils/PlayerMoneyBag";
import {
  FIX_FIN_CRYPTO_CURRENCY_TO_NETWORK_MAP,
  FIX_FIN_CRYPTO_SUB_PROVIDER_ID_TO_CURRENCY_MAP,
} from "../../../../Store/Banking/Models/FixFinCryptoModel";
import { type TPaymentMethodId } from "../../../../Store/Banking/Models/PaymentMethodIdModel";
import { paymentMethodsLoadingSelector } from "../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { type TPaymentMethodRoute } from "../../../../Store/Banking/Models/TPaymentMethodRoute";
import { PaymentMethodIcon } from "../PaymentMethodIcon/PaymentMethodIcon";

interface IPaymentMethodItemProps extends TPlatform_AvailablePaymentMethod_Fragment {
  to: TPaymentMethodRoute;
}

const CryptoCurrencyCard = memo<IPaymentMethodItemProps>(({
  to,
  id,
  minPaymentAmount,
  maxPaymentAmount,
}) => {
  const [t] = useTranslation();

  const playerCurrency = useSelector(playerCurrencySelector);
  const cryptoCurrency = FIX_FIN_CRYPTO_SUB_PROVIDER_ID_TO_CURRENCY_MAP[id];

  const params = { paymentMethodId: id };

  return (
    <LinkLocalized className={classes.paymentMethodCard} to={to} params={params}>
      <div className={classes.paymentMethodCardHeader}>
        <PaymentMethodIcon paymentMethodId={id as TPaymentMethodId} />

        <div>
          {cryptoCurrency}

          {" ("}

          {cryptoCurrency ? FIX_FIN_CRYPTO_CURRENCY_TO_NETWORK_MAP[cryptoCurrency] : null}

          {")"}
        </div>
      </div>

      <div className={classes.paymentMethodDescription}>
        <div className={clsx(classes.paymentMethodDescriptionItem, classes.min)}>
          <div className={classes.paymentMethodDescriptionTitle}>
            {t(platformui_starzbet_title_min)}
          </div>

          <div className={classes.paymentMethodDescriptionValue}>
            {toFormatPlayerMoneyInBag(minPaymentAmount, playerCurrency)}
          </div>
        </div>

        <div className={clsx(classes.paymentMethodDescriptionItem, classes.max)}>
          <div className={classes.paymentMethodDescriptionTitle}>
            {t(platformui_starzbet_title_max)}
          </div>

          <div className={classes.paymentMethodDescriptionValue}>
            {toFormatPlayerMoneyInBag(maxPaymentAmount, playerCurrency)}
          </div>
        </div>
      </div>

      <div className={classes.paymentMethodFooter}>
        {t(platformui_starzbet_placeholder_selectMethod)}
      </div>
    </LinkLocalized>
  );
});
CryptoCurrencyCard.displayName = "CryptoCurrencyCard";

const CryptCurrencyList = memo<IFixFinCryptoCurrencyProps>(({ methodType, ...props }) => {
  const subProviderList = useParamSelector(bankingFixFinCryptoSubProvidersSelector, [methodType]);

  return (
    <>
      {subProviderList.map((paymentAccount) => <CryptoCurrencyCard {...paymentAccount} {...props} key={paymentAccount.id} />)}
    </>
  );
});
CryptCurrencyList.displayName = "CryptCurrencyList";

interface IFixFinCryptoCurrencyProps {
  methodType: EPlatform_PaymentMethodType;
  to: TPaymentMethodRoute;
}

const FixFinCryptoCurrency = memo<IFixFinCryptoCurrencyProps>((props) => {
  const methodLoading = useSelector(paymentMethodsLoadingSelector);

  if (methodLoading) {
    return (
      <Loader />
    );
  }

  return (
    <CryptCurrencyList {...props} />
  );
});
FixFinCryptoCurrency.displayName = "FixFinCryptoCurrency";

export { FixFinCryptoCurrency };
