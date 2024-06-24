import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type EPlatform_VipClubLeaderBoardPeriod } from "../../../Core/Generated/Services/Platform/Models/EPlatform_VipClubLeaderBoardPeriod";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_VipClubLeaderBoardResponse_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubLeaderBoardResponse_Fragment";
import {
  Platform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Normalizer,
} from "./Platform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Normalizer";

type TPlatform_VipClubLeaderBoardResponse_AdditionalData = { id: string; }

type TPlatform_VipClubLeaderBoardResponse_Record = TRecord & {
  rowsId: string;
  period: EPlatform_VipClubLeaderBoardPeriod;
  size: number;
  total: number;
  version: number;
  minPoint: string;
}

const Platform_VipClubLeaderBoardResponse_Normalizer = normalizerCreator<
  TPlatform_VipClubLeaderBoardResponse_Fragment,
  TPlatform_VipClubLeaderBoardResponse_Record,
  TPlatform_VipClubLeaderBoardResponse_AdditionalData
>(
  EPlatform_Typename.platformVipClubLeaderBoardResponse,
  ERecordName.platformVipClubLeaderBoardResponse,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.id,
    rowsId: Platform_VipClubLeaderBoardResponse_To_Platform_VipClubLeaderBoardRow_Normalizer(
      recordsManager,
      fragment,
      { id: additionalData.id },
    ).id,
    period: fragment.period,
    size: fragment.size,
    total: fragment.total,
    version: fragment.version,
    minPoint: fragment.minPoint,
  }),
);

export type { TPlatform_VipClubLeaderBoardResponse_Record };
export { Platform_VipClubLeaderBoardResponse_Normalizer };
