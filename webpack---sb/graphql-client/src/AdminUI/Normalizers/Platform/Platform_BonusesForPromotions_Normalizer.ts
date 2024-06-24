import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import {
  type TPlatform_BonusesForPromotions_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_BonusesForPromotions_QueryResult";
import type {
  TPlatform_BonusesForPromotions_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_BonusesForPromotions_QueryNormalizationData";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";

type TPlatform_BonusesForPromotions_Record = TRecord & {
  ids: string[];
}

const Platform_BonusesForPromotions_Normalizer = normalizerCreator<TPlatform_BonusesForPromotions_QueryResult,
  TPlatform_BonusesForPromotions_Record,
  TPlatform_BonusesForPromotions_QueryNormalizationData>(
    "Platform_BonusesForPromotions_QueryResult",
    ERecordName.platformBonusesForPromotions,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.resultId,
      ids: fragment.platform.BonusesForPromotions.map((bonus) => recordNormalizer(recordsManager, bonus, null).id),
    }),
  );

export type { TPlatform_BonusesForPromotions_Record };
export { Platform_BonusesForPromotions_Normalizer };
