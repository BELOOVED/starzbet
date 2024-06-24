import { type IMoney } from "@sb/utils/Money";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_VipClubTournamentWinner_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubTournamentWinner_Fragment";

type TPlatform_VipClubTournamentWinner_Record = TRecord & {
  paidAt: string | null;
  playerId: string;
  playerMaskedName: string;
  prize: IMoney;
  transactionId: string;
  place: number;
}

const Platform_VipClubTournamentWinner_Normalizer = normalizerCreator<
  TPlatform_VipClubTournamentWinner_Fragment,
  TPlatform_VipClubTournamentWinner_Record
>(
  EPlatform_Typename.platformVipClubTournamentWinner,
  ERecordName.platformVipClubTournamentWinner,
  (recordsManager, fragment) => {
    if (fragment.player) {
      recordNormalizer(recordsManager, fragment.player, null);
    }

    return {
      id: fragment.place.toString(),
      paidAt: fragment.paidAt,
      playerId: fragment.playerId,
      playerMaskedName: fragment.playerMaskedName,
      prize: fragment.prize,
      transactionId: fragment.transactionId,
      place: fragment.place,
    };
  },
);

export type { TPlatform_VipClubTournamentWinner_Record };
export { Platform_VipClubTournamentWinner_Normalizer };
