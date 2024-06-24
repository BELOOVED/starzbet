import { TParticipants, IParticipant } from "./Feed/Types";

export const findTeamByShortId = (participants: TParticipants, shortId: string) => Object
  .values(participants)
  .find((team: IParticipant) => team.shortId === shortId);
