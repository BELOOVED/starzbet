import { type EParticipantShortId } from "@sb/betting-core/EParticipantShortId";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { type EScoreType } from "@sb/betting-core/EScoreType";
import {
  composeHasPathParsers,
  parseEventId,
  parseScopeId,
  parseScopeNumber,
  parseScopeType,
  parseScoreType,
} from "@sb/betting-core/ParseHashPath";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_Score_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Score_Fragment";

type TSportsbook_Score_Record = TRecord & {
  participantShortId: EParticipantShortId;
  eventId: string;
  scopeType: EScopeType;
  scopeNumber: number;
  type: EScoreType;
  value: number;
  scopeId: string;
}

const Sportsbook_Score_Normalizer = normalizerCreator<TSportsbook_Score_Fragment, TSportsbook_Score_Record>(
  ESportsbook_Typename.sportsbookScore,
  ERecordName.sportsbookScore,
  (recordsManager, fragment) => {
    const {
      eventId,
      scopeId,
      scopeType,
      scopeNumber,
      scoreType,
    } = composeHasPathParsers(
      parseEventId,
      parseScopeId,
      parseScopeType,
      parseScopeNumber,
      parseScoreType,
    )(fragment.hashPath);

    const value = fragment.value.type === "float"
      ? Number.parseFloat(fragment.value.value)
      : Number.parseInt(fragment.value.value);

    return {
      id: fragment.hashPath,
      participantShortId: fragment.participantShortId,
      eventId,
      scopeId,
      scopeType,
      scopeNumber,
      type: scoreType,
      value,
    };
  },
);

export type { TSportsbook_Score_Record };
export { Sportsbook_Score_Normalizer };
