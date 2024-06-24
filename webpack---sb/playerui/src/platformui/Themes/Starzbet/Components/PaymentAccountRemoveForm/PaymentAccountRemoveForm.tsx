import { memo } from "react";
import { withProps } from "@sb/utils";
import { FormWithWrapper } from "@sb/form-new";
import {
  platformui_starzbet_button_no,
  platformui_starzbet_button_yes,
  platformui_starzbet_paymentAccount_removeAccount_areYouSure,
  platformui_starzbet_paymentAccount_removeAccount_subtitle,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./PaymentAccountRemoveForm.module.css";
import { DeleteIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/DeleteIcon/DeleteIcon";
import { useModalOpenAction } from "../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../common/Store/Modal/Model/EModal";
import { PAYMENT_ACCOUNT_REMOVE_FORM } from "../../../../Store/PaymentAccount/Models/Variables";
import { usePaymentAccountRemoveFormModal } from "../../../../Store/PaymentAccount/Hooks/UsePaymentAccountRemoveFormModal";
import { ThemedModalPrompt } from "../ThemedModal/ThemedModalPrefabs/ThemedModalPrompt";
import { ThemedModalFormSubmitResult } from "../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";

const MODAL_PROPS = {
  title: [platformui_starzbet_paymentAccount_removeAccount_areYouSure],
  subtitle: [platformui_starzbet_paymentAccount_removeAccount_subtitle],
  okButtonText: [platformui_starzbet_button_yes],
  cancelButtonText: [platformui_starzbet_button_no],
  iconVariant: "warning",
} as const;

const PaymentAccountRemovePrompt = memo(() => {
  const formHandler = usePaymentAccountRemoveFormModal();

  return <ThemedModalPrompt {...formHandler} {...MODAL_PROPS} />;
});
PaymentAccountRemovePrompt.displayName = "PaymentAccountRemovePrompt";

const PaymentAccountRemoveFormModal = withProps(FormWithWrapper)({
  formName: PAYMENT_ACCOUNT_REMOVE_FORM,
  content: PaymentAccountRemovePrompt,
});

const PaymentAccountRemoveFormContent = memo<IWithId>(({ id }) => {
  const openModal = useModalOpenAction(EModal.paymentAccountRemove, id);

  return (
    <DeleteIcon
      size={"s"}
      onClick={openModal}
      className={classes.icon}
      {...qaAttr(PlayerUIQaAttributes.PaymentAccountsPage.DeleteCardButton)}
    />
  );
});
PaymentAccountRemoveFormContent.displayName = "PaymentAccountRemoveFormContent";

const PaymentAccountRemoveForm = memo<IWithId>(({ id }) => (
  <FormWithWrapper
    formName={PAYMENT_ACCOUNT_REMOVE_FORM}
    content={withProps(PaymentAccountRemoveFormContent)({ id })}
  />
));
PaymentAccountRemoveForm.displayName = "PaymentAccountRemoveForm";

/**
 * On Root Page for not duplicate Result modal
 */
const PaymentAccountRemoveSubmitResult = withProps(FormWithWrapper)({
  formName: PAYMENT_ACCOUNT_REMOVE_FORM,
  content: ThemedModalFormSubmitResult,
});

export {
  PaymentAccountRemoveForm,
  PaymentAccountRemoveSubmitResult,
  PaymentAccountRemoveFormModal,
};
