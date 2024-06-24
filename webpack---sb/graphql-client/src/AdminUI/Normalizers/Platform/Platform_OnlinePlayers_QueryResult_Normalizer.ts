import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_OnlinePlayers_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_OnlinePlayers_QueryNormalizationData";
import { type TPlatform_OnlinePlayers_QueryResult } from "../../Generated/Services/Platform/Types/TPlatform_OnlinePlayers_QueryResult";
import { Platform_OnlinePlayers_Normalizer } from "./Platform_OnlinePlayers_Normalizer";

type TPlatform_OnlinePlayers_QueryResult_Record = TRecord & {
    onlinePlayersId: string;
}

const Platform_OnlinePlayers_QueryResult_Normalizer = normalizerCreator<
    TPlatform_OnlinePlayers_QueryResult,
    TPlatform_OnlinePlayers_QueryResult_Record,
    TPlatform_OnlinePlayers_QueryNormalizationData
>(
  "Platform_OnlinePlayers_QueryResult",
  ERecordName.platformOnlinePlayersQueryResult,
  (recordsManager, result, additionalData) => ({
    id: additionalData.resultId,
    onlinePlayersId: Platform_OnlinePlayers_Normalizer(
      recordsManager,
      result.platform.OnlinePlayers,
      { key: additionalData.resultId },
    ).id,
  }),
);

export type { TPlatform_OnlinePlayers_QueryResult_Record };
export { Platform_OnlinePlayers_QueryResult_Normalizer };
