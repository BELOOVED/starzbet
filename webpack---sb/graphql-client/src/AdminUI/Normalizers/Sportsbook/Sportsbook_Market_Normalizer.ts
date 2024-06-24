import {
  composeHasPathParsers,
  parseEventId,
  parseMarketType,
  parseScopeId,
  parseScopeNumber,
  parseScopeType,
  parseScoreType,
} from "@sb/betting-core/ParseHashPath";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { deprecatedGetNotNil, type TExplicitAny } from "@sb/utils";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { type EScoreType } from "@sb/betting-core/EScoreType";
import { type EBettingStatus } from "@sb/betting-core/EBettingStatus";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type ESportsBook_TradingTime } from "../../../Core/Generated/Services/Common/Models/ESportsBook_TradingTime";
import { type TTranslateRecord_Fragment } from "../../../Core/Generated/Services/Common/Types/TTranslateRecord_Fragment";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TSportsbook_Market_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Market_Fragment";
import { Sportsbook_Outcome_Normalizer } from "./Sportsbook_Outcome_Normalizer";

type TSportsbook_Market_Record = TRecord & {
  eventId: string;
  scopeId: string;
  scopeType: EScopeType;
  scopeNumber: number;
  scoreType: EScoreType;
  bettingStatus: EBettingStatus;
  type: EMarketType;
  /**
   * Name present only in market with market group custom
   * For now there is only one market type of custom group - fact_custom
   */
  name: null | TTranslateRecord_Fragment[];
  parameters: Record<string, TExplicitAny>;
  tradingTime: ESportsBook_TradingTime;
  /**
   * @deprecated Will be removed soon. Use property "parameters instead"
   */
  parameterBag: {
    parameters: Record<string, TExplicitAny>;
  };
  /**
   * @deprecated Will be removed soon
   */
  scope: {
    parameterBag: {
      type: string;
      number: number;
    };
  };
}

const Sportsbook_Market_Normalizer = normalizerCreator<TSportsbook_Market_Fragment, TSportsbook_Market_Record>(
  ESportsbook_Typename.sportsbookMarket,
  ERecordName.sportsbookMarket,
  (recordsManager, fragment) => {
    if (fragment.outcomes) {
      fragment.outcomes.forEach((outcome) =>
        Sportsbook_Outcome_Normalizer(recordsManager, outcome, null));
    }

    const {
      eventId,
      scopeId,
      scopeType,
      scopeNumber,
      scoreType,
      marketType,
    } = composeHasPathParsers(
      parseEventId,
      parseScopeId,
      parseScopeType,
      parseScopeNumber,
      parseScoreType,
      parseMarketType,
    )(fragment.hashPath);

    const name = marketTypeToMarketGroupMap[marketType] === EMarketGroup.custom
      ? deprecatedGetNotNil(fragment.translatesForManuallyCreated)
      : null;

    // @ts-ignore FIXME @strong-ts
    const parameters: Record<string, unknown> = JSON.parse(fragment.parameterBag.parameters);

    return {
      id: fragment.hashPath,
      eventId,
      scopeId,
      scopeType,
      scopeNumber,
      scoreType,
      bettingStatus: fragment.bettingStatus.status,
      tradingTime: fragment.tradingTime,
      type: marketType,
      name,
      parameters,
      parameterBag: {
        parameters,
      },
      scope: {
        parameterBag: {
          type: fragment.scope.parameterBag.type,
          number: fragment.scope.parameterBag.number,
        },
      },
    };
  },
);

export type { TSportsbook_Market_Record };
export { Sportsbook_Market_Normalizer };
