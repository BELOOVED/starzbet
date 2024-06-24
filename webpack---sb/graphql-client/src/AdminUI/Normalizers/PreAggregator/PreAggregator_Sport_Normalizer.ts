import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPreAggregator_Typename } from "../../../Core/Generated/Services/PreAggregator/Models/EPreAggregator_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPreAggregator_Sport_Fragment } from "../../Generated/Services/PreAggregator/Types/TPreAggregator_Sport_Fragment";

type TPreAggregator_Sport_Record = TRecord & {
  externalId: string;
  scheduleId: string | null;
  name: string;
  hidden: boolean;
};

const PreAggregator_Sport_Normalizer = normalizerCreator<TPreAggregator_Sport_Fragment, TPreAggregator_Sport_Record>(
  EPreAggregator_Typename.preAggregatorSport,
  ERecordName.preAggregatorSport,
  (recordsManager, fragment) => ({
    id: fragment.entityId.id,
    externalId: fragment.entityId.externalId,
    scheduleId: fragment.entityId.scheduleId,
    name: fragment.name,
    hidden: fragment.hidden,
  }),
);

export type { TPreAggregator_Sport_Record };
export { PreAggregator_Sport_Normalizer };
