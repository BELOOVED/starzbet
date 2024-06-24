import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_VipClubTournamentWinners_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubTournamentWinners_QueryResult";
import {
  type TPlatform_VipClubTournamentWinners_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubTournamentWinners_QueryNormalizationData";
import { Platform_VipClubTournamentWinner_Normalizer } from "./Platform_VipClubTournamentWinner_Normalizer";

type TPlatform_VipClubTournamentWinners_QueryResult_Record = TRecord & {
  ids: string[];
}

const Platform_VipClubTournamentWinners_QueryResult_Normalizer = normalizerCreator<
  TPlatform_VipClubTournamentWinners_QueryResult,
  TPlatform_VipClubTournamentWinners_QueryResult_Record,
  TPlatform_VipClubTournamentWinners_QueryNormalizationData
>(
  "Platform_VipClubTournamentWinners_QueryResult",
  ERecordName.platformVipClubTournamentWinnersQueryResult,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.resultId,
    ids: fragment.platform.VipClubTournamentWinners.map(
      (response) =>
        Platform_VipClubTournamentWinner_Normalizer(
          recordsManager,
          response,
          null,
        ).id,
    ),
  }),
);

export type { TPlatform_VipClubTournamentWinners_QueryResult_Record };
export { Platform_VipClubTournamentWinners_QueryResult_Normalizer };
