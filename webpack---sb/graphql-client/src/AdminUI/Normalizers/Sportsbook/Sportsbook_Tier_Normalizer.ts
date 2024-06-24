import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_Tier_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Tier_Fragment";
import { Sportsbook_Liability_Normalizer } from "./Sportsbook_Liability_Normalizer";

type TSportsbook_Tier_Record = TRecord & {
  name: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  liabilityIds: string[];
  playerId: null | string;
  matchersIds: null | string[];
  operatorId: null | string;
};

type TSportsbook_UpdateLogItem_AdditionalData = {
  id: string;
} | null;

const Sportsbook_Tier_Normalizer = normalizerCreator<
  TSportsbook_Tier_Fragment, TSportsbook_Tier_Record, TSportsbook_UpdateLogItem_AdditionalData
>(
  ESportsbook_Typename.sportsbookTier,
  ERecordName.sportsbookTier,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData ? additionalData.id : fragment.id;

    const matchersIds = fragment.matchers
      ? fragment.matchers.map((it) => recordNormalizer(
        recordsManager,
        it,
        {
          parentTypename: fragment.__typename,
          parentId: id,
        },
      ).id)
      : null;

    return ({
      id,
      createdAt: fragment.createdAt,
      updatedAt: fragment.updatedAt,
      enabled: fragment.enabled,
      name: fragment.name,
      liabilityIds: fragment.liabilities.map(
        (it) => Sportsbook_Liability_Normalizer(recordsManager, it, { key: id }).id,
      ),
      playerId: fragment.playerId,
      matchersIds,
      operatorId: fragment.operator
        ? recordNormalizer(
          recordsManager,
          fragment.operator,
          {
            parentTypename: fragment.__typename,
            parentId: id,
          },
        ).id
        : null,
    });
  },
);

export type { TSportsbook_Tier_Record };
export { Sportsbook_Tier_Normalizer };
