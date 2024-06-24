import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_OnlinePlayers_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_OnlinePlayers_Fragment";

type TPlatform_OnlinePlayers_Record = TRecord & {
  byRole: TPlatform_OnlinePlayers_Fragment["byRole"];
}

type TPlatform_OnlinePlayers_AdditionalData = { key: string; }

const Platform_OnlinePlayers_Normalizer = normalizerCreator<
    TPlatform_OnlinePlayers_Fragment,
    TPlatform_OnlinePlayers_Record,
    TPlatform_OnlinePlayers_AdditionalData
>(
  EPlatform_Typename.platformOnlinePlayers,
  ERecordName.platformOnlinePlayers,
  (_, fragment, additionalData) =>
    ({ id: additionalData.key, byRole: fragment.byRole }),
);

export type { TPlatform_OnlinePlayers_Record };
export { Platform_OnlinePlayers_Normalizer };
