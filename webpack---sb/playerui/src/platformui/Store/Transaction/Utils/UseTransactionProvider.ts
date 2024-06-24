import type { TPlatform_TransactionDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import { useTranslation } from "@sb/translator";
import {
  platformui_history_provider_manual,
  platformui_history_provider_vipClubCashback,
} from "@sb/translates/platformui/CommonTKeys";
import { gameProviderName, isGameProvider } from "../../../../common/Store/Provider/ProviderModel";
import { isTransactionRequestDetails } from "./IsTransactionRequestDetails";
import { isVipClubRequestDetails } from "./IsVipClubRequestDetails";

const useTransactionProvider = (
  details: TPlatform_TransactionDetails_Fragment | null,
  provider: EProviderCode | null,
) => {
  const [t] = useTranslation();
  // Transaction games
  if (provider && isGameProvider(provider)) {
    return gameProviderName[provider];
  }

  // Payment transaction
  if (isTransactionRequestDetails(details) && details.paymentMethod) {
    return details.paymentMethod.name;
  }

  // Vip Club Cashback
  if (isVipClubRequestDetails(details)) {
    return t(platformui_history_provider_vipClubCashback);
  }

  // For `Correction`, `Rollback` temporary fallback
  // todo^Stahavetz research
  return t(platformui_history_provider_manual);
};

export { useTransactionProvider };
