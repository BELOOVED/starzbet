import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { type TPlatform_DepositByBonus_QueryNormalizationData } from "../../Generated/Services/Platform/Types/TPlatform_DepositByBonus_QueryNormalizationData";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_BonusDepositByBonus_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_BonusDepositByBonus_Fragment";

type TPlatform_BonusDepositByBonus_Record = TRecord & Omit<TPlatform_BonusDepositByBonus_Fragment, "__typename">;

const Platform_BonusDepositByBonus_Normalizer = normalizerCreator<
  TPlatform_BonusDepositByBonus_Fragment,
  TPlatform_BonusDepositByBonus_Record,
  TPlatform_DepositByBonus_QueryNormalizationData>(
    EPlatform_Typename.platformBonusDepositByBonus,
    ERecordName.platformBonusDepositByBonus,
    (recordsManager, fragment, additionalData) => {
      const id = additionalData.resultId;

      return { id, ...fragment };
    },
  );

export type { TPlatform_BonusDepositByBonus_Record };
export { Platform_BonusDepositByBonus_Normalizer };
