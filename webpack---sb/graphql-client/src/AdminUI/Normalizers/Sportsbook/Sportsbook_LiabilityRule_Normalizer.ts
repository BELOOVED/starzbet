import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type ESportsbook_LiabilityRuleType } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_LiabilityRuleType";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_LiabilityRule_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_LiabilityRule_Fragment";

type TSportsbook_LiabilityRule_Record = TRecord & {
  type: ESportsbook_LiabilityRuleType;
  percent: null | string;
  amount: null | TMoney_Fragment;
}

type TSportsbook_LiabilityRule_AdditionalData = {
  key : string;
}

const Sportsbook_LiabilityRule_Normalizer = normalizerCreator<TSportsbook_LiabilityRule_Fragment, TSportsbook_LiabilityRule_Record,
  TSportsbook_LiabilityRule_AdditionalData>(
    ESportsbook_Typename.sportsbookLiabilityRule,
    ERecordName.sportsbookLiabilityRule,
    (recordsManager, fragment, additionalData) => ({
      id: `${additionalData.key}_LiabilityRule`,
      percent: fragment.percent,
      type: fragment.type,
      amount: fragment.amount,
    }),
  );

export type { TSportsbook_LiabilityRule_Record };
export { Sportsbook_LiabilityRule_Normalizer };
