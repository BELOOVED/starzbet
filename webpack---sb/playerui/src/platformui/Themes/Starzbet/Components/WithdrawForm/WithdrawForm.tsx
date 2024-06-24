import { useSelector } from "react-redux";
import { type ComponentType, createElement, memo } from "react";
import { type TVoidFn, useActionWithBind, withPreventDefault, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bankAccount_iban,
  platformui_starzbet_menu_button_withdraw,
  platformui_starzbet_title_paycellRegisteredNumber,
  platformui_starzbet_title_pepAccountNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { FormWithWrapper, selectIsFormSyncValid, submitFormAction, useFormName, useFormSelector } from "@sb/form-new";
import { EPlatform_PaymentMethodType } from "@sb/graphql-client";
import classes from "./WithdrawForm.module.css";
import { BaseModalCreator } from "../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useLocalizedPushPath } from "../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { platformBankingWithdrawPaymentMethodNonNullableSelector } from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../../../../Store/Banking/Models/PaymentMethodIdModel";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { platformWithdrawLoadingSelector } from "../../../../Store/Banking/Selectors/PlatformBankingLoaderSelectors";
import { WITHDRAW_FORM } from "../../../../Store/Banking/Utils/Variables";
import { bankingFormErrorFunction } from "../../../../Store/Banking/Utils/BankingFormErrorFunction";
import { getCryptoMethodsMap } from "../../../../Store/Banking/Models/FixFinCryptoModel";
import { WithdrawPrompt } from "../WithdrawPrompt/WithdrawPrompt";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";
import { PaymentAccountWithdrawForm } from "./PaymentAccountWithdrawForm/PaymentAccountWithdrawForm";
import { AstroPayWithdrawForm } from "./AstroPayWithdrawForm/AstroPayWithdrawForm";
import { MuchBetterWithdrawForm } from "./MuchBetterWithdrawForm/MuchBetterWithdrawForm";
import { FixFinCryptoWithdrawForm } from "./FixFinCryptoWithdrawForm/FixFinCryptoWithdrawForm";
import { FixFinFiatWithdrawalForm } from "./FixFinFiatWithdrawalForm/FixFinFiatWithdrawalForm";
import { PayRetailersPixWithdrawForm } from "./PayRetailersWithdrawForm/PayRetailersPixWithdrawForm";
import { PayRetailersBankWithdrawForm } from "./PayRetailersWithdrawForm/PayRetailersBankWithdrawForm";
import { VPagWithdrawForm } from "./VPagWithdrawForm/VPagWithdrawForm";
import { AnSpacePayWithdrawForm } from "./AnSpacePayWithdrawForm/AnSpacePayWithdrawForm";
import { FixFinWithPaymentAccountWithdrawForm } from "./FixFinWithPaymentAccountWithdrawForm/FixFinWithPaymentAccountWithdrawForm";
import { EmailWithdrawForm } from "./EmailWithdrawForm/EmailWithdrawForm";
import { BaseAmountForm } from "./BaseAmountForm/BaseAmountForm";
import { OneSEPAWithdrawForm } from "./OneIOWithdrawForm/OneSEPAWithdrawForm";
import { OneSWIFTWithdrawForm } from "./OneIOWithdrawForm/OneSWIFTWithdrawForm";
import { PaymentClipWithdrawForm } from "./PaymentClipWithdrawForm/PaymentClipWithdrawForm";
import { PayportWithdrawForm } from "./PayportWithdrawForm/PayportWithdrawForm";
import { FixFinPayFutureWithdrawForm } from "./FixFinFiatWithdrawalForm/FixFinPayFutureWithdrawForm";
import { ExxogateTestWithdrawForm } from "./ExxogateWithdrawForm/ExxogateTestWithdrawForm";
import { ExxogateImps9WithdrawForm } from "./ExxogateWithdrawForm/ExxogateImps9WithdrawForm";
import { ExxogateImps29WithdrawForm } from "./ExxogateWithdrawForm/ExxogateImps29WithdrawForm";
import { ExxogateImps41WithdrawForm } from "./ExxogateWithdrawForm/ExxogateImps41WithdrawForm";
import { ExxogateImps43WithdrawForm } from "./ExxogateWithdrawForm/ExxogateImps43WithdrawForm";

interface IWithdrawButtonProps {
  onSubmit: TVoidFn;
}

const WithdrawButton = memo<IWithdrawButtonProps>(({ onSubmit }) => {
  const [t] = useTranslation();
  const loading = useSelector(platformWithdrawLoadingSelector);

  return (
    <Button
      colorScheme={"orange-gradient"}
      onClick={withPreventDefault(onSubmit)}
      className={classes.withdrawButton}
      loading={loading}
    >
      {t(platformui_starzbet_menu_button_withdraw)}
    </Button>
  );
});
WithdrawButton.displayName = "WithdrawButton";

const FixFinFiatIBANWithdrawForm = withProps(FixFinFiatWithdrawalForm)({ headerTKey: platformui_starzbet_bankAccount_iban });

const formPerMethodMap: Partial<Record<TPaymentMethodId, ComponentType>> = {
  [PAYMENT_METHOD_ID_MAP.BANK_TRANSFER_WITHDRAWAL_ID]: PaymentAccountWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.KOLAY_PAY_HAVALE_WITHDRAWAL_ID]: PaymentAccountWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.ASTRO_PAY_WITHDRAWAL_ID]: AstroPayWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.MUCH_BETTER_WITHDRAWAL_ID]: MuchBetterWithdrawForm,

  ...getCryptoMethodsMap(EPlatform_PaymentMethodType.withdrawal, FixFinCryptoWithdrawForm),

  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_SISTEMNAKIT_PAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_PAYFIX]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_CEPPAY]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_VEGAPAY_PAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_VEGAPAY_HAVALE]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_SISTEMNAKIT_HAVALE]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_ANINDA_MEFETE]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_SANALPAY]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_ULTRAPAY_HAVALE]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_ULTRAPAY_PAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_ULTRAPAY_AUTO_PAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_PEP]:
    withProps(FixFinFiatWithdrawalForm)({ headerTKey: platformui_starzbet_title_pepAccountNumber }),
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_HAVALE]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_PAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_HAYHAY]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_PAYCELL]:
    withProps(FixFinFiatWithdrawalForm)({ headerTKey: platformui_starzbet_title_paycellRegisteredNumber }),
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_PARAZULA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_PAROLAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_PAYBOL]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MULTIPAY_PAPEL]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_POPYPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_KOLAYPAY_HAVALE]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TR_HAVALE_EFT]: FixFinWithPaymentAccountWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_KOLAYPAY_PAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_PAYQASA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_FINPAY_HAVALE]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_VEVO_HAVALE]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_VEVO_PARAZULA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_MYPAYZ]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_FIN2]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_SERIPAY1]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_PAYFUTURE]: FixFinPayFutureWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_PAPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_PAYFIX]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_PAYCO]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_ININAL]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_VIZYONPAY]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_AYPARA]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_SIPAY]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_PAYCELL]: FixFinFiatWithdrawalForm,
  [PAYMENT_METHOD_ID_MAP.FIX_FIN_FIAT_WITHDRAWAL_TURKPAY_BANK_TRANSFER]: FixFinFiatIBANWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.PAY_RETAILERS_PIX_WITHDRAWAL_ID]: PayRetailersPixWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.PAY_RETAILERS_WITHDRAWAL_ID]: PayRetailersBankWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.VPAG_PIX_WITHDRAWAL_ID]: VPagWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.AN_SPACE_PAY_PIX_WITHDRAWAL_ID]: AnSpacePayWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.LUXON_PAY_WITHDRAWAL_ID]: EmailWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.SKRILL_DIGITAL_WALLET_WITHDRAWAL_ID]: EmailWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.SKRILL_NETELLER_WITHDRAWAL_ID]: BaseAmountForm,
  [PAYMENT_METHOD_ID_MAP.SKRILL_PAYSAFECARD_WITHDRAWAL_ID]: BaseAmountForm,
  [PAYMENT_METHOD_ID_MAP.ONE_SEPA_WITHDRAWAL_ID]: OneSEPAWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.ONE_SWIFT_WITHDRAWAL_ID]: OneSWIFTWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.PAYMENT_CLIP_UPI_WITHDRAWAL_ID]: PaymentClipWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.PAY_PORT_WITHDRAWAL_ID]: PayportWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_TEST_WITHDRAWAL_ID]: ExxogateTestWithdrawForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_IMPS_9_WITHDRAWAL_ID]: ExxogateImps9WithdrawForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_IMPS_29_WITHDRAWAL_ID]: ExxogateImps29WithdrawForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_IMPS_41_WITHDRAWAL_ID]: ExxogateImps41WithdrawForm,
  [PAYMENT_METHOD_ID_MAP.EXXOGATE_IMPS_43_WITHDRAWAL_ID]: ExxogateImps43WithdrawForm,
};

const modal = (hideModal: TVoidFn) => <WithdrawPrompt hideModal={hideModal} />;

const WithdrawFormContent = memo(() => {
  const paymentMethodId = useSelector(platformBankingWithdrawPaymentMethodNonNullableSelector);
  const goToPending = useLocalizedPushPath(routeMap.bankingHistoryWithdrawalsRoute);

  const formContent = formPerMethodMap[paymentMethodId];
  const isFormValid = useFormSelector(selectIsFormSyncValid);
  const formName = useFormName();
  const submit = useActionWithBind(submitFormAction, formName);

  return (
    <BaseModalCreator modal={modal}>
      {
        (toggleModal) => (
          <div className={classes.formContainer}>
            <ThemedModalFormSubmitResult extractError={bankingFormErrorFunction} onSuccess={goToPending} />

            {formContent ? createElement(formContent) : null}

            <WithdrawButton onSubmit={isFormValid ? toggleModal : submit} />
          </div>
        )
      }
    </BaseModalCreator>
  );
});
WithdrawFormContent.displayName = "WithdrawFormContent";

const WithdrawForm = withProps(FormWithWrapper)({
  formName: WITHDRAW_FORM,
  content: WithdrawFormContent,
});

export { WithdrawForm };
