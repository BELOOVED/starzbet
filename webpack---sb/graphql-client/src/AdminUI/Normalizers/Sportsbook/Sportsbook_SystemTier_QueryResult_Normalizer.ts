import { deprecatedGetNotNil } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TSportsbook_SystemTier_QueryResult } from "../../Generated/Services/Sportsbook/Types/TSportsbook_SystemTier_QueryResult";
import {
  type TSportsbook_SystemTier_QueryNormalizationData,
} from "../../Generated/Services/Sportsbook/Types/TSportsbook_SystemTier_QueryNormalizationData";
import { Sportsbook_Tier_Normalizer } from "./Sportsbook_Tier_Normalizer";

type TSportsbook_SystemTier_QueryResult_Record = TRecord & {
  systemTierId: string;
}

const Sportsbook_SystemTier_QueryResult_Normalizer = normalizerCreator<TSportsbook_SystemTier_QueryResult,
  TSportsbook_SystemTier_QueryResult_Record,
  TSportsbook_SystemTier_QueryNormalizationData>(
    "Sportsbook_SystemTier_QueryResult",
    ERecordName.sportsbookSystemTierQueryResult,
    (recordsManager, result, additionalData) => ({
    /**
     * TODO @lebedev
     * ID must be passed here id normalization data
     * But type have no such field - remove deprecatedGetNotNil when type will be fixed
     */
      // @ts-ignore
      id: deprecatedGetNotNil(additionalData?.id, "Sportsbook_SystemTier_QueryResult ID"),
      systemTierId: Sportsbook_Tier_Normalizer(recordsManager, result.sportsbook.SystemTier, null).id,
    }),
  );

export type { TSportsbook_SystemTier_QueryResult_Record };
export { Sportsbook_SystemTier_QueryResult_Normalizer };
