import { createMemoSelector, getNotNil, useParamSelector } from "@sb/utils";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { sortBy } from "../../../Utils/SortBy";
import { eventToScopeMapSelector, scopesSelector, scopeToScoreMapSelector, sportIdByEventIdSelector } from "../Selectors/FeedSelectors";
import { statsWidgetScopePerSport } from "../Model/Scope";

const statsWidgetScopesByEventIdSelector = createMemoSelector(
  [
    (_, eventId: string) => eventId,
    sportIdByEventIdSelector,
    eventToScopeMapSelector,
    scopeToScoreMapSelector,
    scopesSelector,
  ],
  (eventId, sportId, eventToScopeMap, scopeToScoreMap, scopes) => {
    const code = sportIdToCodeMap[sportId];
    if (!code) {
      return [];
    }

    const scopeType = statsWidgetScopePerSport[code];
    if (!scopeType) {
      return [];
    }

    return sortBy(
      ({ number }) => number,
      (eventToScopeMap[eventId] || [])
        .filter((scopeId) => scopes[scopeId]?.type === scopeType && (scopeToScoreMap[scopeId] || []).length !== 0)
        .map((scopeId) => getNotNil(scopes[scopeId], ["statsWidgetScopesByEventIdSelector"], `scopes by ${scopeId}`)),
    );
  },
);

const useStatsWidgetScopesByEventIdSelector = (eventId: string) => useParamSelector(
  statsWidgetScopesByEventIdSelector,
  [eventId],
);

export { useStatsWidgetScopesByEventIdSelector };
