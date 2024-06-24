import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_BusinessKPIGroupingSet_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_BusinessKPIGroupingSet_Fragment";

type TPlatform_BusinessKPIGroupingSet_AdditionalData = { id: string; }

type TPlatform_BusinessKPIGroupingSet_Record = TRecord & {
  periodStart: string | null;
  periodEnd: string | null;
}

const Platform_BusinessKPIGroupingSet_Normalizer = normalizerCreator<
  TPlatform_BusinessKPIGroupingSet_Fragment,
  TPlatform_BusinessKPIGroupingSet_Record,
  TPlatform_BusinessKPIGroupingSet_AdditionalData
>(
  EPlatform_Typename.platformBusinessKPIGroupingSet,
  ERecordName.platformBusinessKPIGroupingSet,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    periodStart: fragment.periodStart,
    periodEnd: fragment.periodEnd,
  }),
);

export type { TPlatform_BusinessKPIGroupingSet_Record };
export { Platform_BusinessKPIGroupingSet_Normalizer };
