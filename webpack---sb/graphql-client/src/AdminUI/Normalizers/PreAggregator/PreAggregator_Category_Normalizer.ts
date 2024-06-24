import { NIL_UUID } from "@sb/betting-core/NilUuid";
import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPreAggregator_Typename } from "../../../Core/Generated/Services/PreAggregator/Models/EPreAggregator_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPreAggregator_Category_Fragment } from "../../Generated/Services/PreAggregator/Types/TPreAggregator_Category_Fragment";

type TPreAggregator_Category_Record = TRecord & {
  externalId: string;
  scheduleId: string | null;
  name: string;
  hidden: boolean;
  sportId: string;
  sportName: string;
  canBeLinked: boolean;
};

const PreAggregator_Category_Normalizer = normalizerCreator<TPreAggregator_Category_Fragment, TPreAggregator_Category_Record>(
  EPreAggregator_Typename.preAggregatorCategory,
  ERecordName.preAggregatorCategory,
  (recordsManager, fragment) => {
    const canBeLinked = fragment.sportId.scheduleId !== null && fragment.sportId.scheduleId !== NIL_UUID;

    return ({
      id: fragment.entityId.id,
      externalId: fragment.entityId.externalId,
      scheduleId: fragment.entityId.scheduleId,
      name: fragment.name,
      hidden: fragment.hidden,
      sportId: recordNormalizer(recordsManager, fragment.sportId, null).id,
      sportName: fragment.sportName,
      canBeLinked,
    });
  },
);

export type { TPreAggregator_Category_Record };
export { PreAggregator_Category_Normalizer };
