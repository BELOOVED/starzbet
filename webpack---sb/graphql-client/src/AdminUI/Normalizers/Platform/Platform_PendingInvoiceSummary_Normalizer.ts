import { type IMoney } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_PendingInvoiceSummary_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_PendingInvoiceSummary_Fragment";

type TPlatform_PendingInvoiceSummary_Record = TRecord & {
  pendingInvoicesCount: null | number;
  pendingInvoicesSum: null | IMoney;
}

type TPlatform_PendingInvoiceSummary_AdditionalData = {
  key: string;
}

const Platform_PendingInvoiceSummary_Normalizer = normalizerCreator<TPlatform_PendingInvoiceSummary_Fragment,
  TPlatform_PendingInvoiceSummary_Record,
  TPlatform_PendingInvoiceSummary_AdditionalData>(
    EPlatform_Typename.platformPendingInvoiceSummary,
    ERecordName.platformPendingInvoiceSummary,
    (recordsManager, fragment, additionalData) => ({
      id: `${additionalData.key}_pendingInvoiceSummary`,
      pendingInvoicesCount: fragment.pendingInvoicesCount,
      pendingInvoicesSum: fragment.pendingInvoicesSum,
    }),
  );

export type { TPlatform_PendingInvoiceSummary_Record };
export { Platform_PendingInvoiceSummary_Normalizer };
