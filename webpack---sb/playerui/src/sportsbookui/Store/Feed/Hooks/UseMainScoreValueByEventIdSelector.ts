import { createSimpleSelector, useParamSelector } from "@sb/utils";
import { type EParticipantType } from "@sb/betting-core/EParticipantType";
import { participantsByEventIdSelector } from "../Selectors/FeedSelectors";
import { mainScoresByEventIdSelector } from "../Selectors/MainScoresByEventIdSelector";

const mainScoreValueByEventIdSelectorFactory = createSimpleSelector(
  [
    mainScoresByEventIdSelector,
    participantsByEventIdSelector,
    (_, __, participantType) => participantType,
  ],
  (mainScores, participants, participantType) =>
    mainScores.find((score) => score.teamId === participants[participantType].shortId)?.value,
);

const useMainScoreValueByEventIdSelector = (
  eventId: string,
  participantType: EParticipantType,
) => useParamSelector(mainScoreValueByEventIdSelectorFactory, [eventId, participantType]);

export { useMainScoreValueByEventIdSelector };
