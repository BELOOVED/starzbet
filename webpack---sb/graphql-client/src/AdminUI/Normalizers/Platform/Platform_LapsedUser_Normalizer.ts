import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_LapseUser_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_LapseUser_Fragment";

type TPlatform_LapsedUser_Record = TRecord & {
  playerId: string;
  lastVisitTime: string;
};

const Platform_LapsedUser_Normalizer = normalizerCreator<
  TPlatform_LapseUser_Fragment,
  TPlatform_LapsedUser_Record
>(
  EPlatform_Typename.platformLapsedUser,
  ERecordName.platformLapsedUser,
  (recordsManager, fragment) => {
    if (fragment.player) {
      recordNormalizer(recordsManager, fragment.player, null);
    }

    return {
      id: fragment.playerId,
      playerId: fragment.playerId,
      lastVisitTime: fragment.lastVisitTime,
    };
  },
);

export type { TPlatform_LapsedUser_Record };
export { Platform_LapsedUser_Normalizer };
