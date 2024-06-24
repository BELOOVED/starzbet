import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_VipClubLeaderBoardRow_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_VipClubLeaderBoardRow_Fragment";

type TPlatform_VipClubLeaderBoardRow_Record = TRecord & {
  place: number;
  playerId: string;
  points: string;
}

const Platform_VipClubLeaderBoardRow_Normalizer = normalizerCreator<
  TPlatform_VipClubLeaderBoardRow_Fragment,
  TPlatform_VipClubLeaderBoardRow_Record
>(
  EPlatform_Typename.platformVipClubLeaderBoardRow,
  ERecordName.platformVipClubLeaderBoardRow,
  (recordsManager, fragment) => {
    recordNormalizer(recordsManager, fragment.player, null);

    return {
      id: fragment.place.toString(),
      place: fragment.place,
      playerId: fragment.playerId,
      points: fragment.points,
    };
  },
);

export type { TPlatform_VipClubLeaderBoardRow_Record };
export { Platform_VipClubLeaderBoardRow_Normalizer };
