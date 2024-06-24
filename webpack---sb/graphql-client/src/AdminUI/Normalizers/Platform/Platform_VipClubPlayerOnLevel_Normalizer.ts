import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_VipClubPlayerPerLevel_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubPlayerPerLevel_QueryResult";
import {
  type TPlatform_VipClubPlayerOnLevel_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubPlayerOnLevel_Fragment";
import { type TPlatform_VipClubPlayerPerLevel_QueryNormalizationData } from "../../Generated/Services/Platform/Types/TPlatform_VipClubPlayerPerLevel_QueryNormalizationData";

type TPlatform_VipClubPlayerOnLevel_Record = TRecord & {
  data: TPlatform_VipClubPlayerOnLevel_Fragment[];
};

const Platform_VipClubPlayerOnLevel_Normalizer = normalizerCreator<
  TPlatform_VipClubPlayerPerLevel_QueryResult,
  TPlatform_VipClubPlayerOnLevel_Record,
  TPlatform_VipClubPlayerPerLevel_QueryNormalizationData>(
    "Platform_VipClubPlayerPerLevel_QueryResult",
    ERecordName.platformVipClubPlayerOnLevel,
    (_, result, { resultId }) => {
      const record: TPlatform_VipClubPlayerOnLevel_Record = { id: resultId, data: result.platform.VipClubPlayerPerLevel };

      return record;
    },
  );

export type { TPlatform_VipClubPlayerOnLevel_Record };
export { Platform_VipClubPlayerOnLevel_Normalizer };
