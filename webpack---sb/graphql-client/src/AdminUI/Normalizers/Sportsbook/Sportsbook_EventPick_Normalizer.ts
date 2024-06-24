import { type EEventStatus } from "@sb/betting-core/EEventStatus";
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
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { type EScoreType } from "@sb/betting-core/EScoreType";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type TOutcomeParameters } from "@sb/betting-core/TOutcomeParameters";
import { type EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { deprecatedGetNotNil } from "@sb/utils";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { type TMarketParameters } from "@sb/betting-core/TMarketParameters";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer, type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { type TTranslateRecord_Fragment } from "../../../Core/Generated/Services/Common/Types/TTranslateRecord_Fragment";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_EventPick_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_EventPick_Fragment";
import { type TSportsbook_EventInfo_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_EventInfo_Fragment";
import { Sportsbook_Score_Normalizer } from "./Sportsbook_Score_Normalizer";

type TSportsbook_EventPick_Record = TRecord & TRecordNormalizerAdditionalData & {
  banker: boolean;
  autoResettleAllowed: boolean;
  eventInfo: Omit<TSportsbook_EventInfo_Fragment, "scores">;
  eventStatus: EEventStatus;
  settledAt: string | null;
  coefficient: number;
  oddAfterDelay: number | null;
  result: string;
  eventOutcomeHashPath: string;
  eventId: string;
  scopeId: string;
  scopeType: EScopeType;
  scopeNumber: number;
  scoreType: EScoreType;
  marketId: string;
  marketType: EMarketType;
  outcomeName: TTranslateRecord_Fragment[] | null;
  outcomeKind: EOutcomeKind;
  outcomeParameters: TOutcomeParameters;
  marketName: TTranslateRecord_Fragment[] | null;
  marketParameters: TMarketParameters;
}

const Sportsbook_EventPick_Normalizer = normalizerCreator<
    TSportsbook_EventPick_Fragment,
    TSportsbook_EventPick_Record,
    TRecordNormalizerAdditionalData
>(
  ESportsbook_Typename.sportsbookEventPick,
  ERecordName.sportsbookEventPick,
  (recordsManager, fragment, additionalData) => {
    recordNormalizer(recordsManager, fragment.event, null);

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
    )(fragment.eventOutcomeHashPath);

    const outcomeParameters = JSON.parse(fragment.parameterBag.parameters) as TOutcomeParameters;

    const marketName = marketTypeToMarketGroupMap[marketType] === EMarketGroup.custom
      ? deprecatedGetNotNil(fragment.marketTranslatesForManuallyCreated)
      : null;
    const marketParameters = JSON.parse(fragment.marketParameterBag.parameters) as TMarketParameters;

    const { scores, ...restEventInfo } = fragment.eventInfo;

    scores.forEach((score) => Sportsbook_Score_Normalizer(recordsManager, score, null));

    return {
      id: fragment.id,
      banker: fragment.banker,
      autoResettleAllowed: fragment.autoResettleAllowed,
      eventInfo: restEventInfo,
      eventStatus: fragment.eventStatus,
      settledAt: fragment.settledAt,
      coefficient: fragment.coefficient,
      oddAfterDelay: fragment.oddAfterDelay,
      result: fragment.result,
      eventOutcomeHashPath: fragment.eventOutcomeHashPath,
      eventId,
      scopeId,
      scopeType,
      scopeNumber,
      scoreType,
      marketId,
      marketType,
      outcomeName: fragment.translatesForManuallyCreated,
      outcomeKind: outcomeParameters["@kind"] as EOutcomeKind,
      outcomeParameters,
      marketName,
      marketParameters,
      ...additionalData,
    };
  },
);

export type { TSportsbook_EventPick_Record };
export { Sportsbook_EventPick_Normalizer };
