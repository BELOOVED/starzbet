import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { type EParticipantType } from "@sb/betting-core/EParticipantType";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { NIL_UUID } from "@sb/betting-core/NilUuid";
import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPreAggregator_Typename } from "../../../Core/Generated/Services/PreAggregator/Models/EPreAggregator_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPreAggregator_Event_Fragment } from "../../Generated/Services/PreAggregator/Types/TPreAggregator_Event_Fragment";

type TEventScope = {
  type: EScopeType;
  number: number;
}

type TParticipant = {
  teamId: string;
  teamExternalId: string;
  teamScheduleId: string;
  name: string;
  teamLinked: boolean;
}

type TParticipants = Partial<Record<EParticipantType, TParticipant>>;

type TPreAggregator_Event_Record = TRecord & {
  externalId: string;
  scheduleId: string | null;
  name: string;
  hidden: boolean;
  startTime: string;
  eventStatus: EEventStatus;
  currentScope: TEventScope;
  participants: TParticipants;
  sportId: string;
  sportName: string;
  categoryId: string;
  categoryName: string;
  tournamentId: string;
  tournamentName: string;
  canBeLinked: boolean;
};

const PreAggregator_Event_Normalizer = normalizerCreator<TPreAggregator_Event_Fragment, TPreAggregator_Event_Record>(
  EPreAggregator_Typename.preAggregatorEvent,
  ERecordName.preAggregatorEvent,
  (recordsManager, fragment) => {
    const parentLinked = fragment.tournamentId.scheduleId !== null && fragment.tournamentId.scheduleId !== NIL_UUID;

    const allParticipantsLinked = fragment.participants.reduce(
      (acc, participant) => {
        if (acc) {
          return participant.teamId.scheduleId !== null && participant.teamId.scheduleId !== NIL_UUID;
        }

        return false;
      },
      true,
    );

    const currentScope = {
      type: fragment.currentScope.type,
      number: fragment.currentScope.number,
    };

    const participants: TParticipants = fragment.participants.reduce(
      (acc: TParticipants, participant): TParticipants => ({
        ...acc,
        [participant.type]: {
          name: participant.name,
          teamId: participant.teamId.id,
          teamScheduleId: participant.teamId.scheduleId,
          teamExternalId: participant.teamId.externalId,
          teamLinked: participant.teamId.scheduleId !== null && participant.teamId.scheduleId !== NIL_UUID,
        },
      }),
{} as TParticipants,
    );

    return ({
      id: fragment.entityId.id,
      externalId: fragment.entityId.externalId,
      scheduleId: fragment.entityId.scheduleId,
      name: fragment.name,
      hidden: fragment.hidden,
      startTime: fragment.startTime,
      eventStatus: fragment.eventStatus,
      currentScope,
      participants,
      sportId: recordNormalizer(recordsManager, fragment.sportId, null).id,
      sportName: fragment.sportName,
      categoryId: recordNormalizer(recordsManager, fragment.categoryId, null).id,
      categoryName: fragment.categoryName,
      tournamentId: recordNormalizer(recordsManager, fragment.tournamentId, null).id,
      tournamentName: fragment.tournamentName,
      canBeLinked: parentLinked && allParticipantsLinked,
    });
  },
);

export type {
  TPreAggregator_Event_Record,
  TEventScope,
  TParticipants,
  TParticipant,
};
export { PreAggregator_Event_Normalizer };
