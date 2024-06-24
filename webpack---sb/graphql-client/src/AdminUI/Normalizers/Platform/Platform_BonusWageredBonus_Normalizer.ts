import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_BonusWageredBonus_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_BonusWageredBonus_Fragment";
import { type TPlatform_WageredBonus_QueryNormalizationData } from "../../Generated/Services/Platform/Types/TPlatform_WageredBonus_QueryNormalizationData";

type TPlatform_BonusWageredBonus_Record = TRecord & Omit<TPlatform_BonusWageredBonus_Fragment, "__typename">;

const Platform_BonusWageredBonus_Normalizer = normalizerCreator<
  TPlatform_BonusWageredBonus_Fragment,
  TPlatform_BonusWageredBonus_Record,
  TPlatform_WageredBonus_QueryNormalizationData>(
    EPlatform_Typename.platformBonusWageredBonus,
    ERecordName.platformBonusWageredBonus,
    (recordsManager, fragment, additionalData) => {
      const id = additionalData.resultId;

      return { id, ...fragment };
    },
  );

export type { TPlatform_BonusWageredBonus_Record };
export { Platform_BonusWageredBonus_Normalizer };
