import { createSimpleSelector } from "@sb/utils";
import { type TBaseParticipant } from "@sb/betting-core/Feed/Types";
import { eventsSelector, scopesSelector } from "./FeedSelectors";

const EMPTY_PARTICIPANTS = {};

const participantsByScopeIdSelector = createSimpleSelector(
  [
    scopesSelector,
    eventsSelector,
    (_, scopeId: string) => scopeId,
  ],
  (scopes, events, scopeId): Record<string, never> | TBaseParticipant => {
    const eventId = scopes[scopeId]?.eventId;

    if (!eventId) {
      return EMPTY_PARTICIPANTS;
    }

    return events[eventId]?.participants ?? EMPTY_PARTICIPANTS;
  },
);

export { participantsByScopeIdSelector };
