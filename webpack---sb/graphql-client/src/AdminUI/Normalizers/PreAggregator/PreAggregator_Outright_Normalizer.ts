import { NIL_UUID } from "@sb/betting-core/NilUuid";
import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPreAggregator_Typename } from "../../../Core/Generated/Services/PreAggregator/Models/EPreAggregator_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPreAggregator_Outright_Fragment } from "../../Generated/Services/PreAggregator/Types/TPreAggregator_Outright_Fragment";

type TPreAggregator_Outright_Record = TRecord & {
  externalId: string;
  scheduleId: string | null;
  name: string;
  hidden: boolean;
  sportId: string;
  sportName: string;
  categoryId: string;
  categoryName: string;
  tournamentId: string;
  tournamentName: string;
  canBeLinked: boolean;
};

const PreAggregator_Outright_Normalizer = normalizerCreator<TPreAggregator_Outright_Fragment, TPreAggregator_Outright_Record>(
  EPreAggregator_Typename.preAggregatorOutright,
  ERecordName.preAggregatorOutright,
  (recordsManager, fragment) => {
    const canBeLinked = fragment.tournamentId.scheduleId !== null && fragment.tournamentId.scheduleId !== NIL_UUID;

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
      tournamentId: recordNormalizer(recordsManager, fragment.tournamentId, null).id,
      tournamentName: fragment.tournamentName,
      canBeLinked,
    });
  },
);

export type { TPreAggregator_Outright_Record };
export { PreAggregator_Outright_Normalizer };
