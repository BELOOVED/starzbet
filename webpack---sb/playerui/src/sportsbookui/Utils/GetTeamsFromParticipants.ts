import { getNotNil } from "@sb/utils";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import type { TBaseParticipant } from "@sb/betting-core/Feed/Types";
import { type IParticipant } from "../Model/Event";

const getTeamsFromParticipants = (participants: TBaseParticipant, context: string[] = []): [IParticipant, IParticipant] => {
  const team1 = getNotNil(
    participants[EParticipantType.team1],
    ["getTeamsFromParticipants", ...context],
    "team1",
  );
  const team2 = getNotNil(
    participants[EParticipantType.team2],
    ["getTeamsFromParticipants", ...context],
    "team2",
  );

  return [team1, team2];
};

export { getTeamsFromParticipants };
