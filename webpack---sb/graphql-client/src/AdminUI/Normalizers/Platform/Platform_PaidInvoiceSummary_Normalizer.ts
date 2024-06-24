import { type IMoney } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_PaidInvoiceSummary_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_PaidInvoiceSummary_Fragment";

type TPlatform_PaidInvoiceSummary_Record = TRecord & {
  paidInvoicesCount: null | number;
  paidInvoicesSum: null | IMoney;
}

type TPlatform_PaidInvoiceSummary_AdditionalData = {
  key: string;
}

const Platform_PaidInvoiceSummary_Normalizer = normalizerCreator<TPlatform_PaidInvoiceSummary_Fragment,
  TPlatform_PaidInvoiceSummary_Record,
  TPlatform_PaidInvoiceSummary_AdditionalData>(
    EPlatform_Typename.platformPaidInvoiceSummary,
    ERecordName.platformPaidInvoiceSummary,
    (_, fragment, additionalData) => ({
      id: `${additionalData.key}_paidInvoiceSummary`,
      paidInvoicesCount: fragment.paidInvoicesCount,
      paidInvoicesSum: fragment.paidInvoicesSum,
    }),
  );

export type { TPlatform_PaidInvoiceSummary_Record };
export { Platform_PaidInvoiceSummary_Normalizer };
