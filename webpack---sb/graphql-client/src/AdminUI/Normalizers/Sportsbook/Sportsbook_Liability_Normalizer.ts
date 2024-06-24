import { type EMarketType } from "@sb/betting-core/MarketType";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type ESportsbook_LiabilityType } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_LiabilityType";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TSportsbook_Liability_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Liability_Fragment";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { Sportsbook_LiabilityRule_Normalizer } from "./Sportsbook_LiabilityRule_Normalizer";

type TSportsbook_Liability_Record = TRecord & {
  type: ESportsbook_LiabilityType;
  live: boolean;
  ruleId: string;
  marketType: null | EMarketType;
  scopeHash: null | string;
}

type TSportsbook_Liability_AdditionalData = {
  key: string;
}

const Sportsbook_Liability_Normalizer = normalizerCreator<TSportsbook_Liability_Fragment,
  TSportsbook_Liability_Record, TSportsbook_Liability_AdditionalData>(
    ESportsbook_Typename.sportsbookLiability,
    ERecordName.sportsbookLiability,
    (recordsManager, fragment, { key }) => {
      const id = [key, fragment.type, fragment.marketType, fragment.live, fragment.scopeHash]
        .filter(Boolean)
        .join("-");

      return {
        id,
        type: fragment.type,
        live: fragment.live,
        marketType: fragment.marketType,
        ruleId: Sportsbook_LiabilityRule_Normalizer(recordsManager, fragment.rule, { key: id }).id,
        scopeHash: fragment.scopeHash,
      };
    },
  );

export type { TSportsbook_Liability_Record };
export { Sportsbook_Liability_Normalizer };
