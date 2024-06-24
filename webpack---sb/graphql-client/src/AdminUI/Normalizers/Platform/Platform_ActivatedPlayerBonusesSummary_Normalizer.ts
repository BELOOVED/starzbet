import { hasOwnProperty, type IMoney } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_ActivatedPlayerBonusesSummary_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_ActivatedPlayerBonusesSummary_Fragment";

type TPlatform_ActivatedPlayerBonusesSummary_Record = TRecord & Partial<{
    givenBonusesSum: IMoney | null;
    recipientsCount: number | null;
}>

type TPlatform_ActivatedPlayerBonusesSummary_AdditionalData = { key: string; }

const Platform_ActivatedPlayerBonusesSummary_Normalizer = normalizerCreator<
    TPlatform_ActivatedPlayerBonusesSummary_Fragment,
    TPlatform_ActivatedPlayerBonusesSummary_Record,
    TPlatform_ActivatedPlayerBonusesSummary_AdditionalData
>(
  EPlatform_Typename.platformActivatedPlayerBonusesSummary,
  ERecordName.platformActivatedPlayerBonusesSummary,
  (_, fragment, additionalData) => {
    const activatedPlayerBonusesSummary: TPlatform_ActivatedPlayerBonusesSummary_Record = { id: additionalData.key };

    if(hasOwnProperty(fragment, "givenBonusesSum")) {
      activatedPlayerBonusesSummary.givenBonusesSum = fragment.givenBonusesSum;
    }

    if(hasOwnProperty(fragment, "recipientsCount")) {
      activatedPlayerBonusesSummary.recipientsCount = fragment.recipientsCount;
    }

    return activatedPlayerBonusesSummary;
  },
);

export type { TPlatform_ActivatedPlayerBonusesSummary_Record };
export { Platform_ActivatedPlayerBonusesSummary_Normalizer };
