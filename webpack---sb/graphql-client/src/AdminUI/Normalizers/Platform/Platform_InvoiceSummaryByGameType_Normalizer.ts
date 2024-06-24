import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer, type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_InvoiceSummaryByGameType_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_InvoiceSummaryByGameType_Fragment";

type TPlatform_InvoiceSummaryByGameType_Record = TRecord & {
  invoiceId: string;
  gameTypeId: string;
  productsSummaryId: string;
  calculationDetailsId: string;
}

const Platform_InvoiceSummaryByGameType_Normalizer = normalizerCreator<TPlatform_InvoiceSummaryByGameType_Fragment,
  TPlatform_InvoiceSummaryByGameType_Record,
  TRecordNormalizerAdditionalData>(
    EPlatform_Typename.platformInvoiceSummaryByGameType,
    ERecordName.platformInvoiceSummaryByGameType,
    (recordsManager, fragment, additionalData) => {
      const productsSummaryId = recordNormalizer(
        recordsManager,
        fragment.productsSummary,
        null,
      ).id;

      return {
        id: `${additionalData.parentId}_invoiceSummaryByGameType`,
        invoiceId: additionalData.parentId,
        gameTypeId: fragment.gameTypeId,
        productsSummaryId,
        // TODO Bondarenko Remove ts-ignore
        // @ts-ignore
        calculationDetailsId: recordNormalizer(recordsManager, fragment.calculationDetails, null).id,
      };
    },
  );

export type { TPlatform_InvoiceSummaryByGameType_Record };
export { Platform_InvoiceSummaryByGameType_Normalizer };
