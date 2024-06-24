import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_BusinessKPISummary_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_BusinessKPISummary_Fragment";
import { Platform_BusinessKPIGroupingSet_Normalizer } from "./Platform_BusinessKPIGroupingSet_Normalizer";
import { Platform_BusinessKPIMeasures_Normalizer } from "./Platform_BusinessKPIMeasures_Normalizer";

type TPlatform_BusinessKPISummary_Record = TRecord & {
  dataId: string;
  groupId?: string | null;
}

type TPlatform_BusinessKPISummary_AdditionalData = { key: string; }

const Platform_BusinessKPISummary_Normalizer = normalizerCreator<
  TPlatform_BusinessKPISummary_Fragment,
  TPlatform_BusinessKPISummary_Record,
  TPlatform_BusinessKPISummary_AdditionalData
>(
  EPlatform_Typename.platformBusinessKPISummary,
  ERecordName.platformBusinessKPISummary,
  (recordsManager, fragment, additionalData) => {
    const dataId = `data_${additionalData.key}`;
    const businessKPISummary: TPlatform_BusinessKPISummary_Record = {
      id: `platformBusinessKPISummary_${additionalData.key}`,
      dataId: Platform_BusinessKPIMeasures_Normalizer(recordsManager, fragment.data, { key: dataId }).id,
    };

    if (hasOwnProperty(fragment, "group")) {
      const groupId = `group_${additionalData.key}`;
      businessKPISummary.groupId = fragment.group
        ? Platform_BusinessKPIGroupingSet_Normalizer(recordsManager, fragment.group, { id: groupId }).id
        : null;
    }

    return businessKPISummary;
  },
);

export type { TPlatform_BusinessKPISummary_Record };
export { Platform_BusinessKPISummary_Normalizer };
