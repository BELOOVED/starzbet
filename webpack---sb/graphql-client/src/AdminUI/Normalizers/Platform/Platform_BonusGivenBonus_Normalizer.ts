import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_BonusGivenBonus_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_BonusGivenBonus_Fragment";
import { type TPlatform_BonusGiven_QueryNormalizationData } from "../../Generated/Services/Platform/Types/TPlatform_BonusGiven_QueryNormalizationData";

type TPlatform_BonusGivenBonus_Record = TRecord & Omit<TPlatform_BonusGivenBonus_Fragment, "__typename">;

const Platform_BonusGivenBonus_Normalizer = normalizerCreator<
  TPlatform_BonusGivenBonus_Fragment,
  TPlatform_BonusGivenBonus_Record,
  TPlatform_BonusGiven_QueryNormalizationData>(
    EPlatform_Typename.platformBonusGivenBonus,
    ERecordName.platformBonusGivenBonus,
    (recordsManager, fragment, additionalData) => {
      const id = additionalData.resultId;

      return { id, ...fragment };
    },
  );

export type { TPlatform_BonusGivenBonus_Record };
export { Platform_BonusGivenBonus_Normalizer };
