import { type EMarketType } from "@sb/betting-core/MarketType";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TSportsbook_MarketRestriction_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_MarketRestriction_Fragment";

type TSportsbook_MarketRestriction_Record = TRecord & {
  sportId: string | null;
  categoryId: string | null;
  tournamentId: string | null;
  enabled: boolean | null;
  marketType: EMarketType | null;
  scopeType: EScopeType | null;
  scopeNumber: number | null;
  scopeHash: string | null;
}

const PART_SEPARATOR = ":";
const KEY_SEPARATOR = "*";

const Sportsbook_MarketRestriction_Normalizer = normalizerCreator<
  TSportsbook_MarketRestriction_Fragment,
  TSportsbook_MarketRestriction_Record
>(
  ESportsbook_Typename.sportsbookMarketRestriction,
  ERecordName.sportsbookMarketRestriction,
  (recordsManager, fragment) => {
    const idKey = [fragment.sportId, fragment.categoryId, fragment.tournamentId].join(PART_SEPARATOR);
    const scopeKey = [fragment.scopeType, fragment.scopeNumber, fragment.marketType].join(PART_SEPARATOR);
    const id  = idKey + KEY_SEPARATOR + scopeKey;

    return ({
      id,
      sportId: fragment.sportId,
      categoryId: fragment.categoryId,
      marketType: fragment.marketType,
      tournamentId: fragment.tournamentId,
      scopeType: fragment.scopeType,
      scopeNumber: fragment.scopeNumber,
      enabled: fragment.enabled,
      scopeHash: fragment.scopeHash,
    });
  },
);

export {
  type TSportsbook_MarketRestriction_Record,
  Sportsbook_MarketRestriction_Normalizer,
};
