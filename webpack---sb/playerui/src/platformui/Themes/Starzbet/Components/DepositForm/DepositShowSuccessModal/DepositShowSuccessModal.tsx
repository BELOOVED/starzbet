import { memo } from "react";
import {
  platformui_starzbet_deposit_successMessageDeposit,
  platformui_starzbet_message_success,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useLocalizedPushPath } from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { ThemedModalSuccessMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const props = {
  title: [platformui_starzbet_message_success] as const,
  subtitle: [platformui_starzbet_deposit_successMessageDeposit] as const,
};

const DepositShowSuccessModal = memo(() => {
  const goToPending = useLocalizedPushPath(routeMap.bankingHistoryDepositsRoute);

  return <ThemedModalSuccessMessage {...props} hideModal={goToPending} />;
});
DepositShowSuccessModal.displayName = "DepositShowSuccessModal";

export { DepositShowSuccessModal };
