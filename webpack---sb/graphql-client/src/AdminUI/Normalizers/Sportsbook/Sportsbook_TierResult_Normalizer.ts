import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { type TSportsbook_Tiers_QueryNormalizationData } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Tiers_QueryNormalizationData";
import { type TSportsbook_TierResult_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_TierResult_Fragment";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { Sportsbook_Tier_Normalizer } from "./Sportsbook_Tier_Normalizer";

type TSportsbook_TierResult_Record = TRecord & {
  ids: string[];
}

const Sportsbook_TierResult_Normalizer = normalizerCreator<TSportsbook_TierResult_Fragment, TSportsbook_TierResult_Record,
  TSportsbook_Tiers_QueryNormalizationData>(
    ESportsbook_Typename.sportsbookTierResult,
    ERecordName.pageInfo,
    (recordsManager, fragment, { resultId: id }) => ({
      id,
      ids: fragment.items.map((item) => Sportsbook_Tier_Normalizer(recordsManager, item, null).id),
    }),
  );

export type { TSportsbook_TierResult_Record };
export { Sportsbook_TierResult_Normalizer };
