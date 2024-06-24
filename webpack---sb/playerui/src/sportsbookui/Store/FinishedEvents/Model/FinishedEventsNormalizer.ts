import type { TSportsbook_Event_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IFinishedEvent } from "@sb/betting-core/Feed/FinishedEvents/UpdateFinishedEvents";
import { getNotNil, isRecordOfString } from "@sb/utils";
import { type IParticipant } from "@sb/betting-core/Feed/Types";
import { type EParticipantType } from "@sb/betting-core/EParticipantType";
import { type TSportId } from "../../MarketFilter/Model/MarketPreset";

const finishedEventNormalizer = (fragment: TSportsbook_Event_Fragment): IFinishedEvent => {
  const participants: Record<Partial<EParticipantType>, IParticipant> = fragment.participant
    .reduce(
      (acc, participants, index) => ({
        ...acc,
        [`team${index + 1}`]: {
          name: participants.team.name,
          shortId: participants.shortId,
          teamId: participants.team.id,
        },
      }),
      {} as Record<Partial<EParticipantType>, IParticipant>,
    );

  const notNilFragmentScopes = getNotNil(
    fragment.scopes,
    ["finishedEventNormalizer"],
    "Fragment scopes",
  );

  const result: IFinishedEvent = {
    event: {
      id: fragment.id,
      categoryId: fragment.category.id,
      locked: true,
      sportId: fragment.sport.id as TSportId,
      startTime: fragment.startTime,
      status: fragment.eventStatus,
      totalOutcomes: 0,
      tournamentId: fragment.tournament.id,
      extraInfo: {
        eventName: fragment.name,
      },
      participants,
    },
    markets: [],
    outcomes: [],
    scopes: [],
    scores: [],
    tournament: {
      id: fragment.tournament.id,
      categoryId: fragment.category.id,
      sportId: fragment.sport.id as TSportId,
      cashOutAvailable: fragment.tournament.cashOutAvailable,
      priority: fragment.tournament.priority,
      name: fragment.tournament.name,
    },
  };

  notNilFragmentScopes.forEach((scope) => {
    const mainScope = {
      id: scope.hashPath,
      eventId: fragment.id,
      locked: true,
      number: scope.parameterBag.number,
      type: scope.parameterBag.type,
    };

    result.scopes.push(mainScope);

    scope.scores.forEach((el) => {
      const score = {
        id: el.hashPath,
        scopeId: scope.hashPath,
        teamId: el.participantShortId,
        value: +el.value.value,
        type: el.scoreType,
      };

      result.scores.push(score);
    });

    scope.markets.forEach((market) => {
      const parsedMarketParams = JSON.parse(market.parameterBag.parameters);

      if (!isRecordOfString(parsedMarketParams)) {
        return;
      }

      result.markets.push({
        id: market.hashPath,
        locked: true,
        scopeId: scope.hashPath,
        type: market.marketType,
        eventId: fragment.id,
        parameters: parsedMarketParams,
      });

      result.event.totalOutcomes += market.outcomes.length;

      market.outcomes.forEach((outcome) => {
        const parsedOutcomeParams = JSON.parse(outcome.parameterBag.parameters);

        if (!isRecordOfString(parsedOutcomeParams)) {
          return;
        }

        result.outcomes.push({
          id: outcome.hashPath,
          locked: true,
          coefficient: outcome.coefficient.toString(),
          marketId: market.hashPath,
          parameters: parsedOutcomeParams,
          result: outcome.result.gqlResult,
        });
      });
    });
  });

  return result;
};

const finishedEventsNormalizer = (node: TSportsbook_Event_Fragment[]): IFinishedEvent[] => node.map(finishedEventNormalizer);

export {
  finishedEventsNormalizer,
};
