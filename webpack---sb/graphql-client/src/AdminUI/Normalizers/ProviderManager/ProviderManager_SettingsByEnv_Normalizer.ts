import { type TExplicitAny } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EProviderManager_Typename } from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TProviderManager_SettingsByEnv_Fragment,
} from "../../Generated/Services/ProviderManager/Types/TProviderManager_SettingsByEnv_Fragment";

type TProviderManager_SettingsByEnv_Record = TRecord & {
  data: Record<string, TExplicitAny>;
  createdAt: string;
  operatorId: string | null;
  noteToActionId: string | null;
}

const ProviderManager_SettingsByEnv_Normalizer = normalizerCreator<
  TProviderManager_SettingsByEnv_Fragment,
  TProviderManager_SettingsByEnv_Record
>(
  EProviderManager_Typename.providerManagerSettingsByEnv,
  ERecordName.providerManagerSettingsByEnv,
  (recordsManager, fragment) => {
    if (fragment.operator) {
      recordNormalizer(recordsManager, fragment.operator, null);
    }

    if (fragment.noteToAction) {
      recordNormalizer(recordsManager, fragment.noteToAction, null);
    }

    return {
      id: fragment.id,
      data: JSON.parse(fragment.data) as Record<string, TExplicitAny>,
      createdAt: fragment.createdAt,
      operatorId: fragment.operatorId,
      noteToActionId: fragment.noteToActionId,
    };
  },
);

export type { TProviderManager_SettingsByEnv_Record };
export { ProviderManager_SettingsByEnv_Normalizer };
