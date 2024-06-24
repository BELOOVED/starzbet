import { type ECurrencyCode, hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FinancialsSummaryGroupingSet_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FinancialsSummaryGroupingSet_Fragment";

type TPlatform_FinancialsSummaryGroupingSet_AdditionalData = { id: string; }

type TPlatform_FinancialsSummaryGroupingSet_Record = TRecord & Partial<{
  periodStart: string | null;
  periodEnd: string | null;
  counterCurrency: ECurrencyCode | null;
  paymentMethodId: string | null;
}>

const Platform_FinancialsSummaryGroupingSet_Normalizer = normalizerCreator<
  TPlatform_FinancialsSummaryGroupingSet_Fragment,
  TPlatform_FinancialsSummaryGroupingSet_Record,
  TPlatform_FinancialsSummaryGroupingSet_AdditionalData
>(
  EPlatform_Typename.platformFinancialsSummaryGroupingSet,
  ERecordName.platformFinancialsSummaryGroupingSet,
  (recordsManager, fragment, additionalData) => {
    const financialsSummaryGroupingSet: TPlatform_FinancialsSummaryGroupingSet_Record = { id: additionalData.id };

    if(hasOwnProperty(fragment, "periodStart")) {
      financialsSummaryGroupingSet.periodStart = fragment.periodStart;
    }

    if(hasOwnProperty(fragment, "periodEnd")) {
      financialsSummaryGroupingSet.periodEnd = fragment.periodEnd;
    }

    if(hasOwnProperty(fragment, "counterCurrency")) {
      financialsSummaryGroupingSet.counterCurrency = fragment.counterCurrency;
    }

    if(hasOwnProperty(fragment, "paymentMethod")) {
      financialsSummaryGroupingSet.paymentMethodId = fragment.paymentMethod
        ? recordNormalizer(recordsManager, fragment.paymentMethod, null).id
        : null;
    }

    return financialsSummaryGroupingSet;
  },
);

export type { TPlatform_FinancialsSummaryGroupingSet_Record };
export { Platform_FinancialsSummaryGroupingSet_Normalizer };
