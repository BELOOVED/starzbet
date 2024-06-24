import { IFlatEvent, IFlatFeed, IFlatMarket, IFlatScope, IFlatScore, IFlatTournament } from "../Types";
import { EChangeType } from "../../EChangeType";
import {
  applyEventDiff,
  applyMarketDiff,
  applyOutcomeDiff,
  applyScopeDiff,
  applyScoreDiff,
  applyTournamentDiff,
} from "../UpdateFlat/UpdateFlat";
import { EOutcomeResult } from "../../EOutcomeResult";
import { isNil } from "@sb/utils";

interface IFlatOutcomesWithResult {
  id: string;
  marketId: string;
  coefficient: string;
  locked: boolean;
  parameters: Record<string, string>;
  result: EOutcomeResult;
}

export interface IFinishedEvent {
  tournament: Omit<IFlatTournament, "slug">;
  event: Omit<IFlatEvent, "currentScope">;
  scopes: IFlatScope[];
  scores: IFlatScore[];
  markets: IFlatMarket[];
  outcomes: IFlatOutcomesWithResult[];
}

export const addFinishedEvents = (prevState: IFlatFeed, feed: IFinishedEvent[]) => {
  const nextState = { ...prevState };

  const cache = new Map();

  feed.forEach(({
                  event,
                  tournament,
                  scopes,
                  markets,
                  outcomes,
                  scores,
                }) => {
    const eventId = event.id;
    const tournamentId = event.tournamentId;
    const categoryId = event.categoryId;
    const sportId = event.sportId;

    applyTournamentDiff(cache, { ...tournament, changeType: EChangeType.CREATE }, prevState, nextState, tournamentId, categoryId, sportId);

    applyEventDiff(cache, { ...event, changeType: EChangeType.CREATE }, prevState, nextState, eventId, tournamentId, categoryId, sportId);

    scopes.forEach((scope) => {
      const scopeId = scope.id;

      applyScopeDiff(cache, { ...scope, changeType: EChangeType.CREATE }, prevState, nextState, scopeId, eventId);
    });

    scores.forEach((score) => {
      const realScopeId = score.scopeId;
      const scoreId = score.id;

      applyScoreDiff(cache, { ...score, changeType: EChangeType.CREATE }, prevState, nextState, scoreId, realScopeId);
    });

    markets.forEach((market) => {
      const realScopeId = market.scopeId;
      const marketId = market.id;

      applyMarketDiff(cache, { ...market, changeType: EChangeType.CREATE }, prevState, nextState, marketId, eventId, realScopeId);
    });

    outcomes.forEach((outcome) => {
      const realMarketId = outcome.marketId;
      const outcomeId = outcome.id;

      applyOutcomeDiff(cache, { ...outcome, changeType: EChangeType.CREATE }, prevState, nextState, outcomeId, realMarketId);
    });
  });

  cache.clear();

  return nextState;
};

export const removeFinishedEvents = (prevState: IFlatFeed, eventIds: string[]) => {
  const nextState = { ...prevState };

  const cache = new Map();

  for (const eventId of eventIds) {
    const event = prevState.events[eventId];

    if (isNil(event)) {
      continue;
    }

    const tournamentId = event.tournamentId;
    const categoryId = event.categoryId;
    const sportId = event.sportId;

    applyEventDiff(cache, {
      ...event,
      changeType: EChangeType.REMOVE,
    }, prevState, nextState, eventId, tournamentId, categoryId, sportId);
  }

  cache.clear();

  return nextState;
};
