import { type ComponentType, createElement, memo } from "react";
import {
  platformui_starzbet_deposit_redirectModal_clickedText,
  platformui_starzbet_deposit_redirectModal_clickHere,
  platformui_starzbet_deposit_redirectModal_or,
  platformui_starzbet_deposit_redirectModal_text,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useModalWithRedirect } from "../../../../../Store/Banking/Hooks/UseModalWithRedirect";
import { PAYMENT_METHOD_ID_MAP, type TPaymentMethodId } from "../../../../../Store/Banking/Models/PaymentMethodIdModel";
import { ThemedModalPrompt } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalPrompt";
import { AnSpacePaySuccessModal } from "../AnSpasePaySuccessModal/AnSpacePaySuccessModal";

const DepositModalBase = memo(() => {
  const { hideModal, seconds, goToLink } = useModalWithRedirect();

  const props = {
    iconVariant: "success" as const,
    title: seconds === 0
      ? [platformui_starzbet_deposit_redirectModal_clickedText] as const
      : [platformui_starzbet_deposit_redirectModal_text, { count: seconds }] as const,
    subtitle: [platformui_starzbet_deposit_redirectModal_or] as const,
    onOk: goToLink,
    okButtonText: [platformui_starzbet_deposit_redirectModal_clickHere] as const,
    onCancel: hideModal,
  };

  return <ThemedModalPrompt {...props} />;
});
DepositModalBase.displayName = "DepositModalBase";

const redirectModalMap: Partial<Record<TPaymentMethodId, ComponentType>> = {
  [PAYMENT_METHOD_ID_MAP.AN_SPACE_PAY_PIX_DEPOSIT_ID]: AnSpacePaySuccessModal,
};

interface IDepositModalWithRedirectProps {
  paymentMethodId: TPaymentMethodId;
}

const DepositModalWithRedirect = memo<IDepositModalWithRedirectProps>(({ paymentMethodId }) => {
  const modal = redirectModalMap[paymentMethodId] ?? DepositModalBase;

  return createElement(modal);
});
DepositModalWithRedirect.displayName = "DepositModalWithRedirect";

export { DepositModalWithRedirect };
