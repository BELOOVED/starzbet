import { memo } from "react";
import { isNotNil } from "@sb/utils";
import { platformui_starzbet_message_failed } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TWithHideModal } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { type TBankingFormError } from "../../../../../Store/Banking/Utils/BankingFormErrorFunction";
import { ThemedModalErrorMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const DepositShowErrorModal = memo<TWithHideModal & Partial<TBankingFormError>>(
  ({ error, option, hideModal }) => {
    const props = {
      title: [platformui_starzbet_message_failed] as const,
      subtitle: isNotNil(error) ? [error, option] as const : undefined,
      hideModal,
    };

    return <ThemedModalErrorMessage {...props} />;
  },
);
DepositShowErrorModal.displayName = "DepositShowErrorModal";

export { DepositShowErrorModal };
