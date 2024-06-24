import type {
  TPlatform_TransactionDetails_Fragment,
  TPlatform_TxRequestTransactionDetails_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type TNullable } from "@sb/utils";

// details null for old casino transaction
const isVipClubRequestDetails = (
  details: TNullable<TPlatform_TransactionDetails_Fragment>,
): details is TPlatform_TxRequestTransactionDetails_Fragment => !!details && details.payload?.__typename === "Platform_VipClubCashbackRequestData";

export { isVipClubRequestDetails };
