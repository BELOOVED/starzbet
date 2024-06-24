import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_VipClubLeaderBoard_QueryResult } from "../../Generated/Services/Platform/Types/TPlatform_VipClubLeaderBoard_QueryResult";
import {
  type TPlatform_VipClubLeaderBoard_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubLeaderBoard_QueryNormalizationData";
import { Platform_VipClubLeaderBoardResponse_Normalizer } from "./Platform_VipClubLeaderBoardResponse_Normalizer";

type TPlatform_VipClubLeaderBoard_QueryResult_Record = TRecord & {
  ids: string[];
}

const Platform_VipClubLeaderBoard_QueryResult_Normalizer = normalizerCreator<
  TPlatform_VipClubLeaderBoard_QueryResult,
  TPlatform_VipClubLeaderBoard_QueryResult_Record,
  TPlatform_VipClubLeaderBoard_QueryNormalizationData
>(
  "Platform_VipClubLeaderBoard_QueryResult",
  ERecordName.platformVipClubLeaderBoardQueryResult,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.resultId,
    ids: fragment.platform.VipClubLeaderBoard.map(
      (response) =>
        Platform_VipClubLeaderBoardResponse_Normalizer(
          recordsManager,
          response,
          { id: response.period },
        ).id,
    ),
  }),
);

export type { TPlatform_VipClubLeaderBoard_QueryResult_Record };
export { Platform_VipClubLeaderBoard_QueryResult_Normalizer };
