import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TSportsbook_TierUpdateLogResult_Fragment,
} from "../../Generated/Services/Sportsbook/Types/TSportsbook_TierUpdateLogResult_Fragment";
import {
  type TSportsbook_TierUpdateLog_QueryNormalizationData,
} from "../../Generated/Services/Sportsbook/Types/TSportsbook_TierUpdateLog_QueryNormalizationData";
import { Sportsbook_TierUpdateLogItem_Normalizer } from "./Sportsbook_TierUpdateLogItem_Normalizer";

type TSportsbook_TierUpdateLogResult_Record = TRecord & {
  ids: string[];
}

const Sportsbook_TierUpdateLogResult_Normalizer = normalizerCreator<TSportsbook_TierUpdateLogResult_Fragment,
  TSportsbook_TierUpdateLogResult_Record, TSportsbook_TierUpdateLog_QueryNormalizationData>(
    ESportsbook_Typename.sportsbookTierUpdateLogResult,
    ERecordName.sportsbookTierUpdateLogResult,
    (recordsManager, fragment, { resultId: id }) => ({
      id,
      ids: fragment.items.map((item) => Sportsbook_TierUpdateLogItem_Normalizer(recordsManager, item, null).id),
    }),
  );

export type { TSportsbook_TierUpdateLogResult_Record };
export { Sportsbook_TierUpdateLogResult_Normalizer };
