import { type EAge } from "@sb/betting-core/EAge";
import { type EGender } from "@sb/betting-core/EGender";
import { NIL_UUID } from "@sb/betting-core/NilUuid";
import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPreAggregator_Typename } from "../../../Core/Generated/Services/PreAggregator/Models/EPreAggregator_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPreAggregator_Team_Fragment } from "../../Generated/Services/PreAggregator/Types/TPreAggregator_Team_Fragment";

type TPreAggregator_Team_Record = TRecord & {
  externalId: string;
  scheduleId: string | null;
  name: string;
  hidden: boolean;
  sportId: string;
  sportName: string;
  age: null | EAge;
  gender: null | EGender;
  canBeLinked: boolean;
};

const PreAggregator_Team_Normalizer = normalizerCreator<TPreAggregator_Team_Fragment, TPreAggregator_Team_Record>(
  EPreAggregator_Typename.preAggregatorTeam,
  ERecordName.preAggregatorTeam,
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
      age: fragment.age,
      gender: fragment.gender,
      canBeLinked,
    });
  },
);

export type { TPreAggregator_Team_Record };
export { PreAggregator_Team_Normalizer };
