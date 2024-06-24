/* eslint-disable guard-for-in,no-restricted-syntax,no-param-reassign */
import {
  ICategoryDiff,
  IEventDiff,
  IFlatCategory,
  IFlatEvent, IFlatEventOutcome,
  IFlatFeed,
  IFlatMarket,
  IFlatOutright, IFlatOutrightOutcome,
  IFlatScope,
  IFlatScore,
  IFlatSport,
  IFlatTournament,
  IMarketDiff,
  IOutcomeDiff,
  IOutrightDiff,
  IScopeDiff,
  IScoreDiff,
  ISportDiff,
  ITournamentDiff,
  ITreeFeed,
} from "./Types";
import { initVersionedRecord, setVersion, TVersionCache } from "./Version";
import { sportIdToCodeMap } from "../SportsMapUtils";
import { addToIndex, concatId } from "./Tools";
import { Logger } from "../Utils/Logger";

export const createSport = (cache: TVersionCache, nextState: IFlatFeed, diff: ISportDiff, sportId: string) => {
  setVersion(diff, 0);

  nextState.sports[sportId] = diff as any as IFlatSport;

  nextState.sports[sportId].id = sportId;

  delete diff.changeType;
};

export const createCategory = (cache: TVersionCache, nextState: IFlatFeed, diff: ICategoryDiff, categoryId: string, sportId: string) => {
  setVersion(diff, 0);

  nextState.categories[categoryId] = diff as any as IFlatCategory;

  nextState.categories[categoryId].id = categoryId;
  nextState.categories[categoryId].sportId = sportId;

  delete diff.changeType;
};

export const createTournament = (cache: TVersionCache, nextState: IFlatFeed, diff: ITournamentDiff, tournamentId: string, categoryId: string, sportId: string) => {
  setVersion(diff, 0);

  nextState.tournaments[tournamentId] = diff as any as IFlatTournament;

  nextState.tournaments[tournamentId].id = tournamentId;
  nextState.tournaments[tournamentId].sportId = sportId;
  nextState.tournaments[tournamentId].categoryId = categoryId;

  delete diff.changeType;
};

export const createEvent = (cache: TVersionCache, nextState: IFlatFeed, diff: IEventDiff, eventId: string, tournamentId: string, categoryId: string, sportId: string) => {
  nextState.events[eventId] = diff as any as IFlatEvent;

  nextState.events[eventId].startTime = +diff.startTime;

  nextState.events[eventId].id = eventId;

  nextState.events[eventId].sportId = sportId;
  nextState.events[eventId].categoryId = categoryId;
  nextState.events[eventId].tournamentId = tournamentId;

  addToIndex(cache, nextState, "tournamentToEventMap", tournamentId, eventId);

  setVersion(diff, 0);

  delete diff.changeType;
};

export const createOutright = (cache: TVersionCache, nextState: IFlatFeed, diff: IOutrightDiff, outrightId: string, tournamentId: string, categoryId: string, sportId: string) => {
  nextState.outrights[outrightId] = diff as any as IFlatOutright;

  nextState.outrights[outrightId].id = outrightId;

  nextState.outrights[outrightId].sportId = sportId;
  nextState.outrights[outrightId].categoryId = categoryId;
  nextState.outrights[outrightId].tournamentId = tournamentId;

  addToIndex(cache, nextState, "tournamentToOutrightMap", tournamentId, outrightId);

  setVersion(diff, 0);

  delete diff.changeType;
};

export const createScope = (cache: TVersionCache, nextState: IFlatFeed, diff: IScopeDiff, scopeId: string, eventId: string) => {
  nextState.scopes[scopeId] = diff as any as IFlatScope;

  nextState.scopes[scopeId].id = scopeId;

  nextState.scopes[scopeId].eventId = eventId;

  addToIndex(cache, nextState, "eventToScopeMap", eventId, scopeId);

  setVersion(diff, 0);

  delete diff.changeType;
};

export const createScore = (cache: TVersionCache, nextState: IFlatFeed, diff: IScoreDiff, scoreId: string, scopeId: string) => {
  nextState.scores[scoreId] = diff as any as IFlatScore;

  nextState.scores[scoreId].id = scoreId;

  nextState.scores[scoreId].scopeId = scopeId;

  addToIndex(cache, nextState, "scopeToScoreMap", scopeId, scoreId);

  setVersion(diff, 0);

  delete diff.changeType;
};

export const createMarket = (cache: TVersionCache, nextState: IFlatFeed, diff: IMarketDiff, marketId: string, eventId: string, scopeId: string) => {
  nextState.markets[marketId] = diff as any as IFlatMarket;

  if (!diff.parameters) {
    Logger.warn.reducer("createMarket", "Market don't have props");
  }
  nextState.markets[marketId].parameters = nextState.markets[marketId].parameters ?? {};

  nextState.markets[marketId].id = marketId;

  nextState.markets[marketId].eventId = eventId;
  nextState.markets[marketId].scopeId = scopeId;

  addToIndex(cache, nextState, "eventToMarketMap", eventId, marketId);

  addToIndex(cache, nextState, "scopeToMarketMap", scopeId, marketId);

  delete diff.changeType;

  setVersion(diff, 0);
};

export const createOutcome = (cache: TVersionCache, nextState: IFlatFeed, diff: IOutcomeDiff, outcomeId: string, marketId: string) => {
  const outcome = (nextState.outcomes[outcomeId] as IFlatEventOutcome) = diff as any as IFlatEventOutcome;

  outcome.id = outcomeId;

  outcome.marketId = marketId;

  addToIndex(cache, nextState, "marketToOutcomeMap", marketId, outcomeId);

  setVersion(diff, 0);

  delete diff.changeType;
};

export const createOutrightOutcome = (cache: TVersionCache, nextState: IFlatFeed, diff: IOutcomeDiff, outcomeId: string, outrightId: string) => {
  const outcome = (nextState.outcomes[outcomeId] as IFlatOutrightOutcome) = diff as any as IFlatOutrightOutcome;

  outcome.id = outcomeId;

  outcome.outrightId = outrightId;

  addToIndex(cache, nextState, "outrightToOutcomeMap", outrightId, outcomeId);

  setVersion(diff, 0);

  delete diff.changeType;
};

export const treeToFlat = (feed: ITreeFeed) => {
  const flat: IFlatFeed = {
    sports: initVersionedRecord(),
    categories: initVersionedRecord(),
    tournaments: initVersionedRecord(),
    events: initVersionedRecord(),
    outrights: initVersionedRecord(),
    scopes: initVersionedRecord(),
    scores: initVersionedRecord(),
    markets: initVersionedRecord(),
    outcomes: initVersionedRecord(),

    eventToMarketMap: initVersionedRecord(),
    eventToScopeMap: initVersionedRecord(),
    scopeToScoreMap: initVersionedRecord(),
    scopeToMarketMap: initVersionedRecord(),
    marketToOutcomeMap: initVersionedRecord(),
    outrightToOutcomeMap: initVersionedRecord(),
    tournamentToEventMap: initVersionedRecord(),
    tournamentToOutrightMap: initVersionedRecord(),
  };

  const {sports} = feed;

  const cache = new Map();

  for (const sportId in sports) {
    if (sports.hasOwnProperty(sportId)) {
      if (!sportIdToCodeMap[sportId]) {
        Logger.error.reducer("treeToFlat", `Unknown sport with id: ${sportId}`);

        continue;
      }

      createSport(cache, flat, sports[sportId].diff, sportId);

      const {categories} = sports[sportId];
      for (const categoryId in categories) {
        if (categories.hasOwnProperty(categoryId)) {
          createCategory(cache, flat, categories[categoryId].diff, categoryId, sportId);

          const {tournaments} = categories[categoryId];
          for (const tournamentId in tournaments) {
            if (tournaments.hasOwnProperty(tournamentId)) {
              createTournament(cache, flat, tournaments[tournamentId].diff, tournamentId, categoryId, sportId);

              const {events, outrights} = tournaments[tournamentId];
              for (const eventId in events) {
                if (events.hasOwnProperty(eventId)) {
                  createEvent(cache, flat, events[eventId].diff, eventId, tournamentId, categoryId, sportId);

                  const {scopes} = events[eventId];
                  for (const scopeId in scopes) {
                    if (scopes.hasOwnProperty(scopeId)) {
                      const realScopeId = concatId(eventId, scopeId);

                      createScope(cache, flat, scopes[scopeId].diff, realScopeId, eventId);

                      const {scores} = scopes[scopeId];
                      for (const scoreId in scores) {
                        if (scores.hasOwnProperty(scoreId)) {
                          const realScoreId = concatId(realScopeId, scoreId);

                          createScore(cache, flat, scores[scoreId], realScoreId, realScopeId);
                        }
                      }

                      const {markets} = scopes[scopeId];
                      for (const marketId in markets) {
                        if (markets.hasOwnProperty(marketId)) {
                          const realMarketId = concatId(realScopeId, marketId);

                          createMarket(cache, flat, markets[marketId].diff, realMarketId, eventId, realScopeId);

                          const {outcomes} = markets[marketId];
                          for (const outcomeId in outcomes) {
                            if (outcomes.hasOwnProperty(outcomeId)) {
                              const realOutcomeId = concatId(realMarketId, outcomeId);

                              createOutcome(cache, flat, outcomes[outcomeId], realOutcomeId, realMarketId);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }

              for (const outrightId in outrights) {
                if (outrights.hasOwnProperty(outrightId)) {
                  createOutright(cache, flat, outrights[outrightId].diff, outrightId, tournamentId, categoryId, sportId);

                  const {outcomes} = outrights[outrightId];

                  for (const outcomeId in outcomes) {
                    if (outcomes.hasOwnProperty(outcomeId)) {
                      const realOutcomeId = concatId(outrightId, outcomeId);

                      createOutrightOutcome(cache, flat, outcomes[outcomeId], realOutcomeId, outrightId);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  cache.clear();

  return flat;
};
