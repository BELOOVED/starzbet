import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_TierUpdateLogItem_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_TierUpdateLogItem_Fragment";
import { Sportsbook_Tier_Normalizer } from "./Sportsbook_Tier_Normalizer";

type TSportsbook_TierUpdateLogItem_Record = TRecord & {
  id: string;
  comment: string;
  /* Relation parent child */
  tierCurrentValueId: string;
  createdAt: null | string;
  /* Relation parent child */
  tierPreviousValueId: null | string;
}

const Sportsbook_TierUpdateLogItem_Normalizer = normalizerCreator<TSportsbook_TierUpdateLogItem_Fragment,
  TSportsbook_TierUpdateLogItem_Record>(
    ESportsbook_Typename.sportsbookTierUpdateLogItem,
    ERecordName.sportsbookTierUpdateLogItem,
    (recordsManager, fragment) => ({
      id: fragment.id,
      tierPreviousValueId: fragment.tierPreviousValue
        ? Sportsbook_Tier_Normalizer(recordsManager, fragment.tierPreviousValue, { id: `${fragment.tierCurrentValue.id}_${fragment.id}_previousLog` }).id
        : null,
      tierCurrentValueId: Sportsbook_Tier_Normalizer(recordsManager, fragment.tierCurrentValue, { id: `${fragment.tierCurrentValue.id}_${fragment.id}_currentLog` }).id,
      comment: fragment.comment,
      createdAt: fragment.createdAt,
    }),
  );

export type { TSportsbook_TierUpdateLogItem_Record };
export { Sportsbook_TierUpdateLogItem_Normalizer };
