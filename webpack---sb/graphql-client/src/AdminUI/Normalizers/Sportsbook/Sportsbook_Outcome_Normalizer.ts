import { type EScopeType } from "@sb/betting-core/EScopeType";
import { type EScoreType } from "@sb/betting-core/EScoreType";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { type EBettingStatus } from "@sb/betting-core/EBettingStatus";
import { type EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { type TOutcomeParameters } from "@sb/betting-core/TOutcomeParameters";
import { type TExplicitAny } from "@sb/utils";
import {
  composeHasPathParsers,
  parseEventId,
  parseMarketId,
  parseMarketType,
  parseScopeId,
  parseScopeNumber,
  parseScopeType,
  parseScoreType,
} from "@sb/betting-core/ParseHashPath";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { type TTranslateRecord_Fragment } from "../../../Core/Generated/Services/Common/Types/TTranslateRecord_Fragment";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_Outcome_Fragment } from  "../../Generated/Services/Sportsbook/Types/TSportsbook_Outcome_Fragment";
import { Sportsbook_OutcomeStats_Normalizer } from "./Sportsbook_OutcomeStats_Normalizer";

type TSportsbook_Outcome_Record = TRecord & {
  eventId: string;
  scopeId: string;
  scopeType: EScopeType;
  scopeNumber: number;
  scoreType: EScoreType;
  marketId: string;
  marketType: EMarketType;
  kind: EOutcomeKind;
  bettingStatus: EBettingStatus;
  coefficient: number;
  result: EOutcomeResult;
  parameters: TOutcomeParameters;
  name: null | TTranslateRecord_Fragment[];
  /**
   * @deprecated Will be removed soon. Use property "parameters instead"
   */
  parameterBag: {
    parameters: Record<string, TExplicitAny>;
  };
  outcomeStatsId: string;
}

const Sportsbook_Outcome_Normalizer = normalizerCreator<TSportsbook_Outcome_Fragment, TSportsbook_Outcome_Record>(
  ESportsbook_Typename.sportsbookOutcome,
  ERecordName.sportsbookOutcome,
  (recordsManager, fragment) => {
    const additionalData: TRecordNormalizerAdditionalData = {
      parentTypename: fragment.__typename,
      parentId: fragment.hashPath,
    };

    if (fragment.outcomeStats) {
      Sportsbook_OutcomeStats_Normalizer(recordsManager, fragment.outcomeStats, additionalData);
    }

    const {
      eventId,
      scopeId,
      scopeType,
      scopeNumber,
      scoreType,
      marketId,
      marketType,
    } = composeHasPathParsers(
      parseEventId,
      parseScopeId,
      parseScopeType,
      parseScopeNumber,
      parseScoreType,
      parseMarketId,
      parseMarketType,
    )(fragment.hashPath);

    const parameters = JSON.parse(fragment.parameterBag.parameters) as TOutcomeParameters;

    return {
      id: fragment.hashPath,
      eventId,
      scopeId,
      scopeType,
      scopeNumber,
      scoreType,
      marketId,
      marketType,
      kind: parameters["@kind"] as EOutcomeKind,
      bettingStatus: fragment.bettingStatus.status,
      coefficient: fragment.coefficient,
      result: fragment.result.gqlResult,
      name: fragment.translatesForManuallyCreated,
      parameters,
      parameterBag: {
        parameters,
      },
      outcomeStatsId: fragment.hashPath,
    };
  },
);

export type { TSportsbook_Outcome_Record };
export { Sportsbook_Outcome_Normalizer };
