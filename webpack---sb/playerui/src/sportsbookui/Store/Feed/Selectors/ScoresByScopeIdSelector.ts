import { EScoreType } from "@sb/betting-core/EScoreType";
import { createMemoSelector } from "@sb/utils";
import { type EParticipantType } from "@sb/betting-core/EParticipantType";
import { scopeToScoreMapSelector, scoresSelector } from "./FeedSelectors";
import { participantsByScopeIdSelector } from "./ParticipantsByScopeIdSelector";

const scoresByScopeIdSelector = createMemoSelector(
  [
    scopeToScoreMapSelector,
    participantsByScopeIdSelector,
    scoresSelector,
    (_, scopeId: string) => scopeId,
    (_, __, participantType: EParticipantType) => participantType,
  ],
  (scopeToScoreMap, participants, scores, scopeId, participantType) => {
    const score = scopeToScoreMap[scopeId];

    if (!score) {
      return undefined;
    }

    return score
      .map((scoreId) => scores[scoreId])
      .find((score) => score?.type === EScoreType.score && score.teamId === participants[participantType]?.shortId)?.value;
  },
  {
    expensive: true,
  },
);

export { scoresByScopeIdSelector };
