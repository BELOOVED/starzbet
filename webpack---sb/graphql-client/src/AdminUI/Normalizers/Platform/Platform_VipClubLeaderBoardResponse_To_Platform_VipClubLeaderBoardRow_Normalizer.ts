import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_VipClubLeaderBoardResponse_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubLeaderBoardResponse_Fragment";
import { Platform_VipClubLeaderBoardRow_Normalizer } from "./Platform_VipClubLeaderBoardRow_Normalizer";

type TPlatform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Record = TRecord & {
  ids: string[];
};

type TPlatform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_AdditionalData = { id: string; };

const Platform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Normalizer = normalizerCreator<
  TPlatform_VipClubLeaderBoardResponse_Fragment,
  TPlatform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Record,
  TPlatform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_AdditionalData
>(
  EPlatform_Typename.platformVipClubLeaderBoardResponse,
  ERecordName.platformVipClubLeaderBoardResponseToPlatformVipClubLeaderBoardRow,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    ids: fragment.rows.map(
      (row) =>
        Platform_VipClubLeaderBoardRow_Normalizer(recordsManager, row, null).id,
    ),
  }),
);

export type { TPlatform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Record };
export { Platform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Normalizer };
