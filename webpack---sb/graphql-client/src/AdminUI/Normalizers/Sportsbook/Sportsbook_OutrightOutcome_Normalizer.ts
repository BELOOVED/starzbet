import { type TOutcomeParameters } from "@sb/betting-core/TOutcomeParameters";
import { parseOutrightId } from "@sb/betting-core/ParseHashPath";
import { type EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { type EBettingStatus } from "@sb/betting-core/EBettingStatus";
import { type EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { type TExplicitAny } from "@sb/utils";
import { type TTranslateRecord_Fragment } from "../../../Core/Generated/Services/Common/Types/TTranslateRecord_Fragment";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_OutrightOutcome_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_OutrightOutcome_Fragment";

type TSportsbook_OutrightOutcome_Record = TRecord & {
  outrightId: string;
  kind: EOutcomeKind;
  coefficient: number;
  bettingStatus: EBettingStatus;
  result: EOutcomeResult;
  name: null | TTranslateRecord_Fragment[];
  parameters: TOutcomeParameters;
  /**
   * @deprecated Will be removed soon. Use property "parameters instead"
   */
  parameterBag: {
    parameters: Record<string, TExplicitAny>;
  };
}

const Sportsbook_OutrightOutcome_Normalizer = normalizerCreator<TSportsbook_OutrightOutcome_Fragment, TSportsbook_OutrightOutcome_Record>(
  ESportsbook_Typename.sportsbookOutrightOutcome,
  ERecordName.sportsbookOutrightOutcome,
  (recordsManager, fragment) => {
    const parameters = JSON.parse(fragment.parameterBag.parameters) as TOutcomeParameters;
    const { outrightId } = parseOutrightId(fragment.hashPath);

    return {
      id: fragment.hashPath,
      outrightId,
      kind: parameters["@kind"] as EOutcomeKind,
      coefficient: fragment.coefficient,
      bettingStatus: fragment.bettingStatus.status,
      result: fragment.result.gqlResult,
      name: fragment.translatesForManuallyCreated,
      parameters,
      parameterBag: {
        parameters,
      },
    };
  },
);

export type { TSportsbook_OutrightOutcome_Record };
export { Sportsbook_OutrightOutcome_Normalizer };
