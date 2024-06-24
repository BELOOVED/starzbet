import { composeHasPathParsers, parseEventId, parseScopeNumber, parseScopeType } from "@sb/betting-core/ParseHashPath";
import { type TNullable } from "@sb/utils";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { type EBettingStatus } from "@sb/betting-core/EBettingStatus";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_Scope_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Scope_Fragment";
import { Sportsbook_Score_Normalizer } from "./Sportsbook_Score_Normalizer";
import { Sportsbook_Market_Normalizer } from "./Sportsbook_Market_Normalizer";

type TSportsbook_Scope_Record = TRecord & {
  eventId: string;
  finishedAt: TNullable<number>;
  type: EScopeType;
  number: number;
  bettingStatus: EBettingStatus;
}

const Sportsbook_Scope_Normalizer = normalizerCreator<TSportsbook_Scope_Fragment, TSportsbook_Scope_Record>(
  ESportsbook_Typename.sportsbookScope,
  ERecordName.sportsbookScope,
  (recordsManager, fragment) => {
    fragment.scores.forEach((scoreFragment) => Sportsbook_Score_Normalizer(recordsManager, scoreFragment, null));

    fragment.markets.forEach((marketFragment) => Sportsbook_Market_Normalizer(recordsManager, marketFragment, null));

    const {
      eventId,
      scopeType,
      scopeNumber,
    } = composeHasPathParsers(
      parseEventId,
      parseScopeType,
      parseScopeNumber,
    )(fragment.hashPath);

    return {
      id: fragment.hashPath,
      finishedAt: fragment.finishedAt ? Number.parseInt(fragment.finishedAt) : null,
      eventId,
      bettingStatus: fragment.bettingStatus.status,
      type: scopeType,
      number: scopeNumber,
    };
  },
);

export type { TSportsbook_Scope_Record };
export { Sportsbook_Scope_Normalizer };
