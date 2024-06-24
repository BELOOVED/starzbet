import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeBonusCostSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeBonusCostSummaryMeasures_Fragment";

type TPlatform_FirstTimeBonusCostSummaryMeasures_Record = TRecord & Partial<{
  ftBonusCost: null | TMoney_Fragment;
}>

type TPlatform_FirstTimeBonusCostSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeBonusCostSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeBonusCostSummaryMeasures_Fragment,
  TPlatform_FirstTimeBonusCostSummaryMeasures_Record,
  TPlatform_FirstTimeBonusCostSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeBonusCostSummaryMeasures,
  ERecordName.platformFirstTimeBonusCostSummaryMeasures,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    ftBonusCost: fragment.ftBonusCost,
  }),
);

export type { TPlatform_FirstTimeBonusCostSummaryMeasures_Record };
export { Platform_FirstTimeBonusCostSummaryMeasures_Normalizer };
