/* eslint-disable guard-for-in,no-restricted-syntax,no-param-reassign,no-var,vars-on-top,no-loop-func */
import {
  createCategory,
  createEvent,
  createMarket,
  createOutcome,
  createOutright,
  createOutrightOutcome,
  createScope,
  createScore,
  createSport,
  createTournament,
} from "../TreeToFlat";
import { IEventDiff, IFlatFeed, IMarketDiff, IOutcomeDiff, ISubscriptions, ITreeFeed } from "../Types";
import { clone, removeIdFromIndexMap, removeIdsFromIndexMap, TVersionCache } from "../Version";
import { apply, assertNotChanged, concatId, hasDiff, shouldUpdate } from "../Tools";
import { sportIdToCodeMap } from "../../SportsMapUtils";
import { Logger } from "../../Utils/Logger";

const removeAllOutcomesByIds = (cache: TVersionCache, deletedOutcomes, nextState) => {
  clone(cache, nextState, "outcomes");

  for (var outcomeId of deletedOutcomes) {
    delete nextState.outcomes[outcomeId];
  }
};

const removeAllMarketsByScope = (cache: TVersionCache, deletedMarkets, nextState) => {
  clone(cache, nextState, "markets");
  clone(cache, nextState, "marketToOutcomeMap");

  const deletedOutcomes = [];

  for (var marketId of deletedMarkets) {
    if (nextState.marketToOutcomeMap[marketId]) {
      deletedOutcomes.push(...nextState.marketToOutcomeMap[marketId]);
    }

    delete nextState.markets[marketId];
    delete nextState.marketToOutcomeMap[marketId];
  }

  removeAllOutcomesByIds(cache, deletedOutcomes, nextState);
};

const removeAllScoresByScope = (cache: TVersionCache, scopeId, nextState) => {
  clone(cache, nextState, "scores");

  for (var scoreId in nextState.scores) {
    if (!nextState.scores.hasOwnProperty(scoreId)) {
      continue;
    }

    if (nextState.scores[scoreId].scopeId === scopeId) {
      delete nextState.scores[scoreId];
    }
  }
};

const removeAllScopesByEvent = (cache: TVersionCache, eventId, nextState) => {
  clone(cache, nextState, "scopes");
  clone(cache, nextState, "scopeToScoreMap");
  clone(cache, nextState, "scopeToMarketMap");

  const deletedMarkets = [];

  for (var scopeId in nextState.scopes) {
    if (!nextState.scopes.hasOwnProperty(scopeId)) {
      continue;
    }

    if (nextState.scopes[scopeId].eventId === eventId) {
      delete nextState.scopes[scopeId];

      if (nextState.scopeToMarketMap[scopeId]) {
        deletedMarkets.push(...nextState.scopeToMarketMap[scopeId]);
      }

      delete nextState.scopeToScoreMap[scopeId];
      delete nextState.scopeToMarketMap[scopeId];

      removeAllScoresByScope(cache, scopeId, nextState);
    }
  }

  removeAllMarketsByScope(cache, deletedMarkets, nextState);
};

const removeAllEventsByTournament = (cache: TVersionCache, tournamentId, nextState) => {
  clone(cache, nextState, "events");
  clone(cache, nextState, "eventToMarketMap");
  clone(cache, nextState, "eventToScopeMap");

  for (var eventId in nextState.events) {
    if (!nextState.events.hasOwnProperty(eventId)) {
      continue;
    }

    if (nextState.events[eventId].tournamentId === tournamentId) {
      delete nextState.events[eventId];

      delete nextState.eventToMarketMap[eventId];
      delete nextState.eventToScopeMap[eventId];

      removeAllScopesByEvent(cache, eventId, nextState);
    }
  }
};

const removeAllOutrightsByTournament = (cache: TVersionCache, tournamentId, nextState) => {
  clone(cache, nextState, "outrights");
  clone(cache, nextState, "outrightToOutcomeMap");

  const deletedOutcomes = [];

  for (var outrightId in nextState.outrights) {
    if (!nextState.outrights.hasOwnProperty(outrightId)) {
      continue;
    }

    if (nextState.outrights[outrightId].tournamentId === tournamentId) {
      delete nextState.outrights[outrightId];

      if (nextState.outrightToOutcomeMap[outrightId]) {
        deletedOutcomes.push(...nextState.outrightToOutcomeMap[outrightId]);
      }

      delete nextState.outrightToOutcomeMap[outrightId];
    }
  }

  removeAllOutcomesByIds(cache, deletedOutcomes, nextState);
};

const removeAllTournamentsByCategory = (cache: TVersionCache, categoryId, nextState) => {
  clone(cache, nextState, "tournaments");
  clone(cache, nextState, "tournamentToEventMap");
  clone(cache, nextState, "tournamentToOutrightMap");

  for (var tournamentId in nextState.tournaments) {
    if (!nextState.tournaments.hasOwnProperty(tournamentId)) {
      continue;
    }

    if (nextState.tournaments[tournamentId].categoryId === categoryId) {
      delete nextState.tournaments[tournamentId];

      delete nextState.tournamentToEventMap[tournamentId];
      delete nextState.tournamentToOutrightMap[tournamentId];

      removeAllEventsByTournament(cache, tournamentId, nextState);
      removeAllOutrightsByTournament(cache, tournamentId, nextState);
    }
  }
};

const removeAllCategoriesBySport = (cache: TVersionCache, sportId, nextState) => {
  clone(cache, nextState, "categories");

  for (var categoryId in nextState.categories) {
    if (!nextState.categories.hasOwnProperty(categoryId)) {
      continue;
    }

    if (nextState.categories[categoryId].sportId === sportId) {
      delete nextState.categories[categoryId];

      removeAllTournamentsByCategory(cache, categoryId, nextState);
    }
  }
};

const removeSport = (cache: TVersionCache, nextState, diff, id: string) => {
  delete nextState.sports[id];

  removeAllCategoriesBySport(cache, id, nextState);
};

const removeCategory = (cache: TVersionCache, nextState, diff, id: string) => {
  delete nextState.categories[id];

  removeAllTournamentsByCategory(cache, id, nextState);
};

const removeTournament = (cache: TVersionCache, nextState, diff, id: string) => {
  delete nextState.tournaments[id];

  clone(cache, nextState, "tournamentToEventMap");

  delete nextState.tournamentToEventMap[id];

  clone(cache, nextState, "tournamentToOutrightMap");

  delete nextState.tournamentToOutrightMap[id];

  removeAllEventsByTournament(cache, id, nextState);

  removeAllOutrightsByTournament(cache, id, nextState);
};

const removeEvent = (cache: TVersionCache, nextState, diff, id, tournamentId: string) => {
  delete nextState.events[id];

  clone(cache, nextState, "eventToMarketMap");
  delete nextState.eventToMarketMap[id];

  clone(cache, nextState, "eventToScopeMap");
  delete nextState.eventToScopeMap[id];

  removeIdFromIndexMap(cache, nextState, "tournamentToEventMap", tournamentId, id);

  removeAllScopesByEvent(cache, id, nextState);
};

const removeOutright = (cache: TVersionCache, nextState, diff, id, tournamentId: string) => {
  delete nextState.outrights[id];

  removeIdFromIndexMap(cache, nextState, "tournamentToOutrightMap", tournamentId, id);

  removeAllOutcomesByIds(cache, nextState.outrightToOutcomeMap[id], nextState);

  clone(cache, nextState, "outrightToOutcomeMap");
  delete nextState.outrightToOutcomeMap[id];
};

const removeScope = (cache: TVersionCache, nextState, diff, id: string, eventId: string) => {
  delete nextState.scopes[id];

  if (nextState.scopeToMarketMap[id]) {
    removeAllMarketsByScope(cache, nextState.scopeToMarketMap[id], nextState);

    clone(cache, nextState, "scopeToMarketMap");

    removeIdsFromIndexMap(cache, nextState, "eventToMarketMap", eventId, nextState.scopeToMarketMap[id]);

    delete nextState.scopeToMarketMap[id];
  }

  clone(cache, nextState, "scopeToScoreMap");
  delete nextState.scopeToScoreMap[id];

  removeIdFromIndexMap(cache, nextState, "eventToScopeMap", eventId, id);

  removeAllScoresByScope(cache, id, nextState);
};

const removeScore = (cache: TVersionCache, nextState, diff, id: string, scopeId: string) => {
  delete nextState.scores[id];

  removeIdFromIndexMap(cache, nextState, "scopeToScoreMap", scopeId, id);
};

const removeMarket = (cache: TVersionCache, nextState, diff, id: string, eventId: string, scopeId: string) => {
  delete nextState.markets[id];

  removeAllOutcomesByIds(cache, nextState.marketToOutcomeMap[id], nextState);

  clone(cache, nextState, "marketToOutcomeMap");
  delete nextState.marketToOutcomeMap[id];

  removeIdFromIndexMap(cache, nextState, "eventToMarketMap", eventId, id);

  removeIdFromIndexMap(cache, nextState, "scopeToMarketMap", scopeId, id);
};

const removeOutcome = (cache: TVersionCache, nextState, diff, id: string, marketId: string) => {
  delete nextState.outcomes[id];

  removeIdFromIndexMap(cache, nextState, "marketToOutcomeMap", marketId, id);
};

const removeOutrightOutcome = (cache: TVersionCache, nextState, diff, id: string, outrightId: string) => {
  delete nextState.outcomes[id];

  removeIdFromIndexMap(cache, nextState, "outrightToOutcomeMap", outrightId, id);
};

const updateSport = (cache: TVersionCache, nextState, diff, sportId: string) => {
  clone(cache, nextState.sports, sportId);

  if (shouldUpdate(diff.priority)) {
    nextState.sports[sportId].priority = diff.priority;
  }
};

const updateCategory = (cache: TVersionCache, nextState, diff, categoryId: string) => {
  clone(cache, nextState.categories, categoryId);

  if (shouldUpdate(diff.priority)) {
    nextState.categories[categoryId].priority = diff.priority;
  }

  if (shouldUpdate(diff.name)) {
    nextState.categories[categoryId].name = diff.name;
  }

  if (shouldUpdate(diff.icon)) {
    nextState.categories[categoryId].icon = diff.icon;
  }

  if (shouldUpdate(diff.slug)) {
    nextState.categories[categoryId].slug = diff.slug;
  }
};

const updateTournament = (cache: TVersionCache, nextState, diff, tournamentId: string) => {
  clone(cache, nextState.tournaments, tournamentId);

  if (shouldUpdate(diff.name)) {
    nextState.tournaments[tournamentId].name = diff.name;
  }

  if (shouldUpdate(diff.slug)) {
    nextState.tournaments[tournamentId].slug = diff.slug;
  }

  if (shouldUpdate(diff.priority)) {
    nextState.tournaments[tournamentId].priority = diff.priority;
  }

  if (shouldUpdate(diff.cashOutAvailable)) {
    nextState.tournaments[tournamentId].cashOutAvailable = diff.cashOutAvailable;
  }
};

const updateEvent = (cache: TVersionCache, nextState, diff: IEventDiff, eventId: string) => {
  clone(cache, nextState.events, eventId);

  if (shouldUpdate(diff.status)) {
    nextState.events[eventId].status = diff.status;
  }

  if (shouldUpdate(diff.finishedAt)) {
    nextState.events[eventId].finishedAt = Number(diff.finishedAt);
  }

  if (shouldUpdate(diff.startTime)) {
    nextState.events[eventId].startTime = +diff.startTime;
  }

  if (shouldUpdate(diff.totalOutcomes)) {
    nextState.events[eventId].totalOutcomes = diff.totalOutcomes;
  }

  if (shouldUpdate(diff.participants)) {
    nextState.events[eventId].participants = diff.participants;
  }

  if (shouldUpdate(diff.extraInfo)) {
    nextState.events[eventId].extraInfo = diff.extraInfo;
  }

  if (shouldUpdate(diff.locked)) {
    nextState.events[eventId].locked = diff.locked;
  }

  if (shouldUpdate(diff.currentScope)) {
    nextState.events[eventId].currentScope = diff.currentScope;
  }
};

const updateOutright = (cache: TVersionCache, nextState, diff, outrightId: string) => {
  clone(cache, nextState.outrights, outrightId);

  if (shouldUpdate(diff.extraInfo)) {
    nextState.outrights[outrightId].extraInfo = diff.extraInfo;
  }

  if (shouldUpdate(diff.name)) {
    nextState.outrights[outrightId].name = diff.name;
  }

  if (shouldUpdate(diff.startTime)) {
    nextState.outrights[outrightId].startTime = diff.startTime;
  }

  if (shouldUpdate(diff.type)) {
    nextState.outrights[outrightId].type = diff.type;
  }

  if (shouldUpdate(diff.locked)) {
    nextState.outrights[outrightId].locked = diff.locked;
  }

  if(shouldUpdate(diff.translatesForManuallyCreated)){
    nextState.outrights[outrightId].translatesForManuallyCreated = diff.translatesForManuallyCreated;
  }
};

const updateScope = (cache: TVersionCache, nextState, diff, scopeId: string) => {
  clone(cache, nextState.scopes, scopeId);

  if (shouldUpdate(diff.type)) {
    nextState.scopes[scopeId].type = diff.type;
  }

  if (shouldUpdate(diff.number)) {
    nextState.scopes[scopeId].number = diff.number;
  }

  if (shouldUpdate(diff.locked)) {
    nextState.scopes[scopeId].locked = diff.locked;
  }
};

const updateScore = (cache: TVersionCache, nextState, diff, scoreId: string) => {
  clone(cache, nextState.scores, scoreId);

  if (shouldUpdate(diff.teamId)) {
    nextState.scores[scoreId].teamId = diff.teamId;
  }

  if (shouldUpdate(diff.type)) {
    nextState.scores[scoreId].type = diff.type;
  }

  if (shouldUpdate(diff.value)) {
    nextState.scores[scoreId].value = diff.value;
  }
};

const updateMarket = (cache: TVersionCache, nextState, diff: IMarketDiff, marketId: string) => {
  clone(cache, nextState.markets, marketId);

  if (shouldUpdate(diff.locked)) {
    nextState.markets[marketId].locked = diff.locked;
  }

  if(shouldUpdate(diff.translatesForManuallyCreated)){
    nextState.markets[marketId].translatesForManuallyCreated = diff.translatesForManuallyCreated;
  }

  assertNotChanged(nextState.markets[marketId].type, diff.type);

  assertNotChanged(nextState.markets[marketId].parameters, diff.parameters);
};

const updateOutcome = (cache: TVersionCache, nextState, diff: IOutcomeDiff, outcomeId: string) => {
  clone(cache, nextState.outcomes, outcomeId);

  if (shouldUpdate(diff.coefficient)) {
    nextState.outcomes[outcomeId].coefficient = diff.coefficient;
  }

  if (shouldUpdate(diff.locked)) {
    nextState.outcomes[outcomeId].locked = diff.locked;
  }

  if (shouldUpdate(diff.updatedAt)) {
    nextState.outcomes[outcomeId].updatedAt = diff.updatedAt;
  }

  if(shouldUpdate(diff.translatesForManuallyCreated)){
    nextState.outcomes[outcomeId].translatesForManuallyCreated = diff.translatesForManuallyCreated;
  }

  assertNotChanged(nextState.outcomes[outcomeId].parameters, diff.parameters);
};

const applySportDiff = (cache: TVersionCache, sports, prevState, nextState, sportId: string) => {
  clone(cache, nextState, "sports");

  apply(
    cache,
    prevState,
    nextState,
    sports[sportId].diff,
    sportId,
    "sports",
    createSport,
    updateSport,
    removeSport,
  );
};

export const applyCategoryDiff = (cache: TVersionCache, diff, prevState: IFlatFeed, nextState: IFlatFeed, categoryId: string, sportId: string) => {
  clone(cache, nextState, "categories");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    categoryId,
    "categories",
    createCategory,
    updateCategory,
    removeCategory,
    sportId,
  );
};

export const applyTournamentDiff = (cache: TVersionCache, diff, prevState, nextState, tournamentId: string, categoryId: string, sportId: string) => {
  clone(cache, nextState, "tournaments");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    tournamentId,
    "tournaments",
    createTournament,
    updateTournament,
    removeTournament,
    categoryId,
    sportId,
  );
};

export const applyEventDiff = (cache: TVersionCache, diff, prevState, nextState, eventId: string, tournamentId: string, categoryId: string, sportId: string) => {
  clone(cache, nextState, "events");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    eventId,
    "events",
    createEvent,
    updateEvent,
    removeEvent,
    tournamentId,
    categoryId,
    sportId,
  );
};

const applyOutrightDiff = (cache: TVersionCache, outrights, prevState, nextState, outrightId: string, tournamentId: string, categoryId: string, sportId: string) => {
  clone(cache, nextState, "outrights");

  apply(
    cache,
    prevState,
    nextState,
    outrights[outrightId].diff,
    outrightId,
    "outrights",
    createOutright,
    updateOutright,
    removeOutright,
    tournamentId,
    categoryId,
    sportId,
  );
};

export const applyScopeDiff = (cache: TVersionCache, diff, prevState, nextState, scopeId: string, eventId: string) => {
  clone(cache, nextState, "scopes");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    scopeId,
    "scopes",
    createScope,
    updateScope,
    removeScope,
    eventId,
  );
};

export const applyScoreDiff = (cache: TVersionCache, diff, prevState, nextState, scoreId: string, scopeId: string) => {
  clone(cache, nextState, "scores");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    scoreId,
    "scores",
    createScore,
    updateScore,
    removeScore,
    scopeId,
  );
};

export const applyMarketDiff = (cache: TVersionCache, diff, prevState, nextState, marketId: string, eventId: string, scopeId: string) => {
  clone(cache, nextState, "markets");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    marketId,
    "markets",
    createMarket,
    updateMarket,
    removeMarket,
    eventId,
    scopeId,
  );
};

export const applyOutcomeDiff = (cache: TVersionCache, diff, prevState, nextState, outcomeId: string, marketId: string) => {
  clone(cache, nextState, "outcomes");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    outcomeId,
    "outcomes",
    createOutcome,
    updateOutcome,
    removeOutcome,
    marketId,
  );
};

const applyOutrightOutcomeDiff = (cache: TVersionCache, diff, prevState, nextState, outcomeId: string, outrightId: string) => {
  clone(cache, nextState, "outcomes");

  apply(
    cache,
    prevState,
    nextState,
    diff,
    outcomeId,
    "outcomes",
    createOutrightOutcome,
    updateOutcome,
    removeOutrightOutcome,
    outrightId,
  );
};

export const updateFlat = (prevState: IFlatFeed, feed: ITreeFeed, subscriptions: ISubscriptions = {}) => {
  const { sports } = feed;
  const nextState = { ...prevState };

  const cache = new Map();

  for (var sportId in sports) {
    if (!sports.hasOwnProperty(sportId)) {
      continue;
    }

    if (!sportIdToCodeMap[sportId]) {
      Logger.error.reducer("Unknown sport with id:", sportId);
      continue;
    }

    // Sport
    if (hasDiff(sports[sportId])) {
      applySportDiff(cache, sports, prevState, nextState, sportId);
    }

    // Category
    const { categories } = sports[sportId];
    for (var categoryId in categories) {
      if (!categories.hasOwnProperty(categoryId)) {
        continue;
      }

      if (hasDiff(categories[categoryId])) {
        applyCategoryDiff(cache, categories[categoryId].diff, prevState, nextState, categoryId, sportId);
      }

      // Tournament
      const { tournaments } = categories[categoryId];
      for (var tournamentId in tournaments) {
        if (!tournaments.hasOwnProperty(tournamentId)) {
          continue;
        }

        if (hasDiff(tournaments[tournamentId])) {
          applyTournamentDiff(cache, tournaments[tournamentId].diff, prevState, nextState, tournamentId, categoryId, sportId);
        }

        // Event
        const { events } = tournaments[tournamentId];
        for (var eventId in events) {
          if (!events.hasOwnProperty(eventId)) {
            continue;
          }

          if (subscriptions.hasOwnProperty(eventId)) {
            continue;
          }

          if (hasDiff(events[eventId])) {
            applyEventDiff(cache, events[eventId].diff, prevState, nextState, eventId, tournamentId, categoryId, sportId);
          }

          // Scope
          const { scopes } = events[eventId];
          for (var scopeId in scopes) {
            if (!scopes.hasOwnProperty(scopeId)) {
              continue;
            }

            const realScopeId = concatId(eventId, scopeId);

            if (hasDiff(scopes[scopeId])) {
              applyScopeDiff(cache, scopes[scopeId].diff, prevState, nextState, realScopeId, eventId);
            }

            // Score
            const { scores } = scopes[scopeId];
            for (var scoreId in scores) {
              if (!scores.hasOwnProperty(scoreId)) {
                continue;
              }

              const realScoreId = concatId(realScopeId, scoreId);

              applyScoreDiff(cache, scores[scoreId], prevState, nextState, realScoreId, realScopeId);
            }

            // Market
            const { markets } = scopes[scopeId];
            for (var marketId in markets) {
              if (!markets.hasOwnProperty(marketId)) {
                continue;
              }

              const realMarketId = concatId(realScopeId, marketId);

              if (hasDiff(markets[marketId])) {
                applyMarketDiff(cache, markets[marketId].diff, prevState, nextState, realMarketId, eventId, realScopeId);
              }

              // Outcome
              const { outcomes } = markets[marketId];
              for (var outcomeId in outcomes) {
                if (!outcomes.hasOwnProperty(outcomeId)) {
                  continue;
                }

                const realOutcomeId = concatId(realMarketId, outcomeId);

                applyOutcomeDiff(cache, outcomes[outcomeId], prevState, nextState, realOutcomeId, realMarketId);
              }
            }
          }
        }


        //Outright
        const { outrights } = tournaments[tournamentId];
        for (var outrightId in outrights) {
          if (!outrights.hasOwnProperty(outrightId)) {
            continue;
          }

          if (hasDiff(outrights[outrightId])) {
            applyOutrightDiff(cache, outrights, prevState, nextState, outrightId, tournamentId, categoryId, sportId);
          }

          // Outcome
          const { outcomes } = outrights[outrightId];
          for (var outcomeId in outcomes) {
            if (!outcomes.hasOwnProperty(outcomeId)) {
              continue;
            }

            const realOutcomeId = concatId(outrightId, outcomeId);

            applyOutrightOutcomeDiff(cache, outcomes[outcomeId], prevState, nextState, realOutcomeId, outrightId);
          }
        }
      }
    }
  }

  cache.clear();

  return nextState;
};
