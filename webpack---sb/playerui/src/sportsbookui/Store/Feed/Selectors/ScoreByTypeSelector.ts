import { createSimpleSelector } from "@sb/utils";
import { type EParticipantType } from "@sb/betting-core/EParticipantType";
import { type EScoreType } from "@sb/betting-core/EScoreType";
import { scoresByEventIdSelectorFactory } from "../Hooks/UseScoresByEventIdSelector";
import { participantsByEventIdSelector } from "./FeedSelectors";

const scoreByTypeSelector = createSimpleSelector(
  [
    scoresByEventIdSelectorFactory,
    participantsByEventIdSelector,
    (_, __, participantType: EParticipantType) => participantType,
    (_, __, ___, scoreType: EScoreType) => scoreType,
  ],
  (scoresList, participants, participantType, scoreType) => {
    const scores = scoresList.filter(({ type }) => type === scoreType);

    return scores.find((score) => score.teamId === participants[participantType].shortId)?.value;
  },
);

export { scoreByTypeSelector };
