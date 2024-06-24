import { type EAge } from "@sb/betting-core/EAge";
import { type EGender } from "@sb/betting-core/EGender";
import { NIL_UUID } from "@sb/betting-core/NilUuid";
import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPreAggregator_Typename } from "../../../Core/Generated/Services/PreAggregator/Models/EPreAggregator_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPreAggregator_Tournament_Fragment } from "../../Generated/Services/PreAggregator/Types/TPreAggregator_Tournament_Fragment";

type TPreAggregator_Tournament_Record = TRecord & {
  externalId: string;
  scheduleId: string | null;
  name: string;
  hidden: boolean;
  sportId: string;
  sportName: string;
  categoryId: string;
  categoryName: string;
  age: null | EAge;
  gender: null | EGender;
  canBeLinked: boolean;
};

const PreAggregator_Tournament_Normalizer = normalizerCreator<TPreAggregator_Tournament_Fragment, TPreAggregator_Tournament_Record>(
  EPreAggregator_Typename.preAggregatorTournament,
  ERecordName.preAggregatorTournament,
  (recordsManager, fragment) => {
    const canBeLinked = fragment.categoryId.scheduleId !== null && fragment.categoryId.scheduleId !== NIL_UUID;

    return ({
      id: fragment.entityId.id,
      externalId: fragment.entityId.externalId,
      scheduleId: fragment.entityId.scheduleId,
      name: fragment.name,
      hidden: fragment.hidden,
      sportId: recordNormalizer(recordsManager, fragment.sportId, null).id,
      sportName: fragment.sportName,
      categoryId: recordNormalizer(recordsManager, fragment.categoryId, null).id,
      categoryName: fragment.categoryName,
      age: fragment.age,
      gender: fragment.gender,
      canBeLinked,
    });
  },
);

export type { TPreAggregator_Tournament_Record };
export { PreAggregator_Tournament_Normalizer };
