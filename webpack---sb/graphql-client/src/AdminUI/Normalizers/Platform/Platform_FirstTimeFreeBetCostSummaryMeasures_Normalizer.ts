import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeFreeBetCostSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeFreeBetCostSummaryMeasures_Fragment";

type TPlatform_FirstTimeFreeBetCostSummaryMeasures_Record = TRecord & Partial<{
  ftFreeBetCost: null | TMoney_Fragment;
}>

type TPlatform_FirstTimeFreeBetCostSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeFreeBetCostSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeFreeBetCostSummaryMeasures_Fragment,
  TPlatform_FirstTimeFreeBetCostSummaryMeasures_Record,
  TPlatform_FirstTimeFreeBetCostSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeFreeBetCostSummaryMeasures,
  ERecordName.platformFirstTimeFreeBetCostSummaryMeasures,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    ftFreeBetCost: fragment.ftFreeBetCost,
  }),
);

export type { TPlatform_FirstTimeFreeBetCostSummaryMeasures_Record };
export { Platform_FirstTimeFreeBetCostSummaryMeasures_Normalizer };
