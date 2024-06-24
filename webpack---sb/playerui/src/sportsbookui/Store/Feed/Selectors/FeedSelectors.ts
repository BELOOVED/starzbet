import { createMemoSelector, createSimpleSelector, getNotNil, Time } from "@sb/utils";
import { availableMarketGroupList, marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { type EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { EPostfix } from "@sb/sdk";
import {
  type IExtraInfo,
  type IFlatCategory,
  type IFlatEvent,
  type IFlatOutright,
  type IFlatSport,
  type IFlatTournament,
} from "@sb/betting-core/Feed/Types";
import { type ESportsbook_BetTypeEnum } from "@sb/graphql-client";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type EOutrightType } from "@sb/betting-core/EOutrightType";
import { isFlatEventOutcome, isFlatOutrightOutcome } from "@sb/betting-core/Feed/Utils";
import { type EParticipantType } from "@sb/betting-core/EParticipantType";
import { routerLocationPathnameSelector } from "@sb/router";
import { isESportSport } from "@sb/betting-core/SportsMapUtils";
import { matchPath } from "@sb/react-router-compat";
import { type TPickByOutcome } from "../../../../platformui/Store/Bonuses/Utils/BonusMatchers";
import { Logger } from "../../../../common/Utils/Logger";
import { sortBy } from "../../../Utils/SortBy";
import { routeMap } from "../../../RouteMap/RouteMap";
import { betSlipPicksSelector } from "../../BetSlip/Selectors/BetSlipPicksSelectors";
import { VirtualGamePick } from "../../BetSlip/Model/BetPick";
import { type TMixAppState } from "../../CreateMixInitialState";
import { type TAppState } from "../../InitialState";
import { isVirtualPick } from "../../BetSlip/Model/Utils";
import { isKironRouteSelector } from "../../BetSlip/Selectors/BetSlipLocalStorageKeysSelector";
import { isWinnerYesNo } from "../Model/Outright";
import { type IWithFeed } from "../FeedState";
import { createPath, type ITree, list } from "../Model/Tree";

const scopesSelector = ({ feed: { mainLine: { scopes } } }: IWithFeed) => scopes;

const scoresSelector = ({ feed: { mainLine: { scores } } }: IWithFeed) => scores;

const categoriesSelector = ({ feed: { mainLine: { categories } } }: IWithFeed) => categories;

const tournamentsSelector = ({ feed: { mainLine: { tournaments } } }: IWithFeed) => tournaments;

const eventsSelector = ({ feed: { mainLine: { events } } }: IWithFeed) => events;

const outrightsSelector = ({ feed: { mainLine: { outrights } } }: IWithFeed) => outrights;

const sportsSelector = ({ feed: { mainLine: { sports } } }: IWithFeed) => sports;

const marketsSelector = ({ feed: { mainLine: { markets } } }: IWithFeed) => markets;

const outcomesSelector = ({ feed: { mainLine: { outcomes } } }: IWithFeed) => outcomes;

const feedVersionSelector = ({ feed: { version } }: IWithFeed) => version;

const lineReadySelector = ({ feed: { lineReady } }: IWithFeed) => lineReady;

const anyLineIsReadySelector = createSimpleSelector(
  [lineReadySelector],
  (linesReadyMap) => Object.values(linesReadyMap).some(Boolean),
);

// For favs
const erisLineIsReadySelector = createSimpleSelector(
  [lineReadySelector],
  (line) => line[EPostfix.erisgaming],
);

// BetSlip routes (some old themes on Mobile) is common for all lines
const lineIsReadySelector = createSimpleSelector(
  [
    lineReadySelector,
    isKironRouteSelector,
    routerLocationPathnameSelector,
    anyLineIsReadySelector,
  ],
  (lineReady, isKiron, pathname, anyLineIsReady) => {
    if (matchPath(pathname, routeMap.betSlip)) {
      return anyLineIsReady;
    }

    return lineReady[isKiron ? EPostfix.kiron : EPostfix.erisgaming];
  },
);

const outcomeByIdSelector = (state: IWithFeed, id: string) => outcomesSelector(state)[id];
const outcomeByIdNotNilSelector = createSimpleSelector(
  [outcomeByIdSelector],
  (outcome) => getNotNil(outcome, ["outcomeByIdNotNilSelector"], "outcome"),
);

const notOutrightOutcomeSelector = (state: TMixAppState, outcomeId: string) => {
  const outcome = outcomeByIdSelector(state, outcomeId);

  return !!outcome && !isFlatOutrightOutcome(outcome);
};

const marketByIdSelector = createMemoSelector(
  [
    marketsSelector,
    betSlipPicksSelector,
    (_, marketId: string) => marketId,
  ],
  (markets, picks, marketId) => {
    if (picks) {
      const virtualPick = picks.find((pick) => (pick.marketId === marketId) && (pick instanceof VirtualGamePick));

      if (virtualPick instanceof VirtualGamePick) {
        return virtualPick.market;
      }
    }

    return getNotNil(markets[marketId], ["Feed Selectors", "marketByIdSelector"], `Market by ${marketId}`);
  },
  {
    expensive: true,
  },
);

const selectMarketByOutcome = (s: IWithFeed, outcomeId: string) => {
  const outcome = outcomeByIdSelector(s, outcomeId);

  if (!outcome) {
    throw new Error(`[selectMarketByOutcome]: No outcome with id ${outcomeId} found`);
  }

  if (!isFlatEventOutcome(outcome)) {
    throw new Error(`[selectMarketByOutcome]: Outcome with id ${outcomeId} is outright outcome!`);
  }

  return marketByIdSelector(s, outcome.marketId);
};

const selectEventById = (state: IWithFeed, eventId: string) => eventsSelector(state)[eventId];

const notNilSelectEventById = (state: IWithFeed, eventId: string) =>
  getNotNil(selectEventById(state, eventId), ["Feed Selectors", "notNilSelectEventById"], "Event");

const selectFeedIdTreeByOutcomeId = (s: IWithFeed, outcomeId: string) => {
  const outcome = outcomeByIdSelector(s, outcomeId);
  if (!outcome || !isFlatEventOutcome(outcome)) {
    return undefined;
  }

  const market = marketByIdSelector(s, outcome.marketId);
  if (!market) {
    return undefined;
  }

  const event = selectEventById(s, market.eventId);
  if (!event) {
    return undefined;
  }

  return {
    marketId: outcome.marketId,
    eventId: market.eventId,
    tournamentId: event.tournamentId,
    categoryId: event.categoryId,
    sportId: event.sportId,
  };
};

const feedTreeByTournamentIdSelector = createMemoSelector(
  [(state: TAppState) => state, (_, id: string) => id],
  (s, id): ITree | undefined => {
    const tournament = tournamentByIdSelector(s, id);

    if (!tournament) {
      return undefined;
    }

    const category = categoryByIdSelector(s, tournament.categoryId);

    if (!category) {
      return undefined;
    }

    const sport = sportByIdSelector(s, tournament.sportId);

    if (!sport) {
      return undefined;
    }

    return {
      tournament,
      category,
      sport,
    };
  },
  {
    combinedEqual: "deepEqual",
  },
);

const pathByTreeSelector = createMemoSelector(
  [feedTreeByTournamentIdSelector,
    routerLocationPathnameSelector,
    (_, __, isOutright: boolean) => isOutright],
  (tree, pathname, isOutright) => {
    if (!tree) {
      throw new Error("Tree is undefined");
    }

    const it = list.find(({ path }) => matchPath(pathname, { path }));

    if (it) {
      return it.getRouteParams(createPath(tree, isOutright));
    }

    if (isESportSport.id(tree.sport.id)) {
      return list[3].getRouteParams(createPath(tree, isOutright));
    }

    return list[1].getRouteParams(createPath(tree, isOutright));
  },
);

const marketToOutcomeMapSelector = ({ feed: { mainLine: { marketToOutcomeMap } } }: IWithFeed) => marketToOutcomeMap;

const outrightToOutcomeMapSelector = ({ feed: { mainLine: { outrightToOutcomeMap } } }: IWithFeed) => outrightToOutcomeMap;

const eventToMarketMapSelector = ({ feed: { mainLine: { eventToMarketMap } } }: IWithFeed) => eventToMarketMap;

const eventToScopeMapSelector = ({ feed: { mainLine: { eventToScopeMap } } }: IWithFeed) => eventToScopeMap;

const scopeToScoreMapSelector = ({ feed: { mainLine: { scopeToScoreMap } } }: IWithFeed) => scopeToScoreMap;

const scopeToMarketMapSelector = ({ feed: { mainLine: { scopeToMarketMap } } }: IWithFeed) => scopeToMarketMap;

const tournamentToEventMapSelector = ({ feed: { mainLine: { tournamentToEventMap } } }: IWithFeed) => tournamentToEventMap;

const tournamentToOutrightMapSelector = ({ feed: { mainLine: { tournamentToOutrightMap } } }: IWithFeed) => tournamentToOutrightMap;

const totalOutrightsByTournamentIdSelector = createSimpleSelector(
  [
    tournamentToOutrightMapSelector,
    (_, tournamentId: string) => tournamentId,
  ],
  (tournamentToOutrightMap, tournamentId) => (tournamentToOutrightMap[tournamentId] || []).length,
);

const eventIdByOutcomeIdSelector = (state: IWithFeed, id: string) => {
  const outcome = outcomeByIdSelector(state, id);

  if (!outcome || !isFlatEventOutcome(outcome)) {
    return void 0;
  }

  const market = marketByIdSelector(state, outcome.marketId);

  if (!market) {
    return void 0;
  }

  return market.eventId;
};

const scopeByMarketIdSelector = createSimpleSelector(
  [
    marketsSelector,
    scopesSelector,
    betSlipPicksSelector,
    (_, marketId: string) => marketId,
  ],
  (markets, scopes, picks, marketId) => {
    if (picks) {
      const virtualPick = picks.find((pick) => (pick.marketId === marketId) && (isVirtualPick(pick)));

      if (isVirtualPick(virtualPick)) {
        return virtualPick.scope;
      }
    }

    const market = markets[marketId];

    return market ? scopes[market.scopeId] : undefined;
  },
);

const scopeByIdSelector = createSimpleSelector(
  [
    scopesSelector,
    betSlipPicksSelector,
    (_, id: string) => id,
  ],
  (scopes, picks, id) => {
    if (picks) {
      const virtualPick = picks.find((pick) => (pick instanceof VirtualGamePick) && (pick.scope?.id === id));

      if (isVirtualPick(virtualPick)) {
        return virtualPick.scope;
      }
    }

    return scopes[id];
  },
);

const coefficientByOutcomeIdSelector = createSimpleSelector(
  [
    outcomesSelector,
    betSlipPicksSelector,
    (_, outcomeId: string) => outcomeId,
  ],
  (outcomes, picks, outcomeId) => {
    if (picks) {
      const virtualPick = picks.find((pick) => (pick.outcomeId === outcomeId) && (pick instanceof VirtualGamePick));

      if (virtualPick) {
        return virtualPick.coefficient;
      }
    }

    const outcome = outcomes[outcomeId];

    if (!outcome) {
      throw new Error(`[coefficientByOutcomeIdSelector]: No outcome with id ${outcomeId} found`);
    }

    return (
      outcome.coefficient
    );
  },
);

const eventSubSubscribersSelector = ({ feed: { eventSub } }: IWithFeed) => eventSub.subscribers;

const eventSubSubscriptionsSelector = ({ feed: { eventSub } }: IWithFeed) => eventSub.subscriptions;

const eventSubFetchedSelector = ({ feed: { eventSub } }: IWithFeed) => eventSub.fetched;

//todo
const marketIdListByEventIdSelector = createMemoSelector(
  [
    eventToMarketMapSelector,
    marketsSelector,
    (_, eventId) => eventId,
  ],
  (eventToMarketMap, markets, eventId) => {
    const result: string[] = [];

    const idList = eventToMarketMap[eventId] || [];

    idList.forEach((marketId) => {
      const marketType = markets[marketId]?.type;

      if (!marketType) {
        Logger.warn.selector("[marketIdListByEventIdSelector]", `MarketType by market ${marketId} not found`);

        return;
      }

      const marketGroup = marketTypeToMarketGroupMap[marketType];

      if (!marketGroup) {
        Logger.warn.selector("[marketIdListByEventIdSelector]", `MarketGroup by market ${marketType} not found`);

        return;
      }

      if (!availableMarketGroupList.includes(marketGroup)) {
        Logger.warn.selector("[marketIdListByEventIdSelector]", `MarketGroup ${marketGroup} by market ${marketType} not supported on ui`);

        return;
      }

      result.push(marketId);
    });

    return result;
  },
);

const eventIdByMarketIdSelector = (state: IWithFeed, marketId: string) => {
  const market = marketByIdSelector(state, marketId);

  if (!market) {
    throw new Error(`[eventIdByMarketIdSelector]: Market ${marketId} not found`);
  }

  return market.eventId;
};

const eventByMarketIdSelector = (state: TAppState, marketId: string) => {
  const eventId = eventIdByMarketIdSelector(state, marketId);

  const event = eventByIdSelector(state, eventId);

  if (!event) {
    throw new Error(`[eventByMarketIdSelector]: Event ${eventId} not found`);
  }

  return event;
};

const participantsByMarketIdSelector = (state: TAppState, marketId: string) => (
  eventByMarketIdSelector(state, marketId).participants
);

const sportIdByEventIdSelector = createSimpleSelector(
  [
    eventsSelector,
    betSlipPicksSelector,
    (_, eventId: string) => eventId,
  ],
  (events, picks, eventId) => {
    if (picks) {
      const virtualPick = picks.find((pick) => (pick.eventId === eventId) && (pick instanceof VirtualGamePick));

      if (isVirtualPick(virtualPick)) {
        return virtualPick.sportId;
      }
    }

    return getNotNil(events[eventId], ["Feed Selectors", "sportIdByEventIdSelector"], "Event").sportId;
  },
);

const tournamentByIdSelector = (state: IWithFeed, tournamentId: string): IFlatTournament | undefined => (
  tournamentsSelector(state)[tournamentId]
);

const notNilTournamentByIdSelector = (state: IWithFeed, tournamentId: string): IFlatTournament =>
  getNotNil(tournamentsSelector(state)[tournamentId], ["FeedSelectors", "notNilTournamentByIdSelector"], "Tournament");

const eventIdByScopeIdSelector = (state: IWithFeed, scopeId: string) => (
  getNotNil(scopesSelector(state)[scopeId], ["FeedSelector", "eventIdByScopeIdSelector"], "Scope").eventId
);

const sportIdByScopeIdSelector = (state: IWithFeed, scopeId: string) => (
  getNotNil(eventsSelector(state)[eventIdByScopeIdSelector(state, scopeId)], ["FeedSelector", "sportIdByScopeIdSelector"], "Event").sportId
);

const scopeIdListByEventIdSelector = (state: IWithFeed, eventId: string) => eventToScopeMapSelector(state)[eventId] || [];

const participantsByEventIdSelector = createSimpleSelector(
  [
    eventsSelector,
    betSlipPicksSelector,
    (_, eventId: string) => eventId,
  ],
  (events, picks, eventId) => {
    if (picks) {
      const virtualPick = picks.find((pick) => (pick.eventId === eventId) && (pick instanceof VirtualGamePick));

      if (isVirtualPick(virtualPick)) {
        return virtualPick.participants;
      }
    }

    return events[eventId]?.participants;
  },
);

const participantShortIdSelector = (state: TAppState, eventId: string, type: EParticipantType) => (
  participantsByEventIdSelector(state, eventId)[type].shortId
);

const outcomeIdListByMarketIdSelector = (state: IWithFeed, marketId: string) => marketToOutcomeMapSelector(state)[marketId] || [];

const outcomeParametersByIdSelector = (state: IWithFeed, id: string, marketId: string, name: string) => {
  const outcome = outcomeByIdSelector(state, id);

  if (!outcome) {
    throw new Error(`[outcomeParametersByIdSelector:${name}]: No outcome with id ${id}, marketId:${marketId} found`);
  }

  return outcome.parameters;
};

const outcomeTranslatesByIdSelector = (state: TAppState, id: string) => {
  const picks = betSlipPicksSelector(state);
  const outcomes = outcomesSelector(state);

  const virtualPick = picks.find((pick) => pick.is(id) && (pick instanceof VirtualGamePick));

  if (virtualPick) {
    return null;
  }

  return outcomes[id]?.translatesForManuallyCreated;
};

const marketTypeByIdSelector = (state: IWithFeed, id: string) => marketByIdSelector(state, id).type;

const marketParametersByIdSelector = (state: IWithFeed, id: string) => marketByIdSelector(state, id).parameters;

const marketIdByTypeSelector = createSimpleSelector(
  [
    marketsSelector,
    (_, eventId) => eventId,
    (_, __, type) => type,
  ],
  (markets, eventId, type) => Object.values(markets).find((market) => market.type === type && market.eventId === eventId)?.id,
);

const eventStatusByIdSelector = (state: TMixAppState, id: string): EEventStatus => (
  getNotNil(eventsSelector(state)[id], ["Feed Selectors", "eventStatusByIdSelector"], "Event").status
);

const eventByIdSelector = createSimpleSelector(
  [
    eventsSelector,
    betSlipPicksSelector,
    (_, eventId: string) => eventId,
  ],
  (events, picks, eventId): IFlatEvent | undefined => {
    if (picks) {
      const virtualPick = picks.find((pick) => (pick.eventId === eventId) && (pick instanceof VirtualGamePick));

      if (isVirtualPick(virtualPick)) {
        // TODO BetSlip
        return virtualPick.event as IFlatEvent;
      }
    }

    return events[eventId];
  },
);

const eventByIdNotNilSelector = createSimpleSelector(
  [
    eventByIdSelector,
    (_: unknown, __: unknown, context?: string[]) => context ?? [],
  ],
  (event, context) => getNotNil(event, ["eventByIdNotNilSelector", ...context], "event"),
);

const eventStartTimeByIdSelector = (state: TAppState, eventId: string) => eventByIdSelector(state, eventId)?.startTime;
const eventTotalOutcomesByIdSelector = (state: TAppState, eventId: string) => eventByIdSelector(state, eventId)?.totalOutcomes;

const tournamentIdByEventIdSelector =
  (state: TAppState, eventId: string): string | undefined => eventByIdSelector(state, eventId)?.tournamentId;

const tournamentByEventIdNotNilSelector = createSimpleSelector(
  [
    tournamentIdByEventIdSelector,
    (_: unknown, __: unknown, context?: string[]) => context ?? [],
  ],
  (tournamentId, context) => getNotNil(tournamentId, ["tournamentByEventIdNotNilSelector", ...context], "tournamentId"),
);

const tournamentByEventIdSelector = createSimpleSelector(
  [
    tournamentsSelector,
    tournamentIdByEventIdSelector,
  ],
  (tournaments, tournamentId) => tournamentId ? tournaments[tournamentId] : undefined,
);

const outrightByIdSelector = (state: IWithFeed, outrightId: string): IFlatOutright | undefined => outrightsSelector(state)[outrightId];
const outrightByIdNotNilSelector = createSimpleSelector(
  [outrightByIdSelector],
  (outright) => getNotNil(outright, ["outrightByIdNotNilSelector"], "outright"),
);

const coefficientByIdSelector = (state: IWithFeed, id: string) => {
  const outcome = outcomeByIdSelector(state, id);

  if (!outcome) {
    throw new Error(`[coefficientByIdSelector]: No outcome with id ${id} found`);
  }

  return outcome.coefficient;
};

const sportByIdSelector = (state: IWithFeed, sportId: string): IFlatSport | undefined => sportsSelector(state)[sportId];

const categoryByIdSelector = (state: IWithFeed, categoryId: string): IFlatCategory | undefined => categoriesSelector(state)[categoryId];

const notNilCategoryByIdSelector = (state: IWithFeed, categoryId: string): IFlatCategory =>
  getNotNil(categoriesSelector(state)[categoryId], ["Feed Selectors", "notNilCategoryByIdSelector"], `Category by ID ${categoryId}`);

const categoryIconByIdSelector = (state: IWithFeed, categoryId: string) => notNilCategoryByIdSelector(state, categoryId).icon;

const extraInfoByEventSelector = (event: IFlatEvent | undefined) => {
  if (!event || !event.extraInfo) {
    return void 0;
  }

  return event.extraInfo;
};

const extraInfoByEventIdSelector = (state: TAppState, eventId: string) => {
  const event = eventByIdSelector(state, eventId);

  return extraInfoByEventSelector(event);
};

const hasStatisticsByExtraInfoSelector = (extraInfo: IExtraInfo | undefined) => !!extraInfo?.hasStatistics;

const videoUrlByExtraInfoSelector = (extraInfo: IExtraInfo | undefined): string | null | undefined => extraInfo?.videoUrl;

const hasStatisticsByEventIdSelector = (state: TAppState, eventId: string) =>
  hasStatisticsByExtraInfoSelector(extraInfoByEventIdSelector(state, eventId));

const eventHashStatisticsSelector = (event: IFlatEvent | undefined) => hasStatisticsByExtraInfoSelector(extraInfoByEventSelector(event));

const outcomeIdsByOutrightIdSelector = (state: IWithFeed, outrightId: string) => getNotNil(
  outrightToOutcomeMapSelector(state)[outrightId],
  ["Feed Selectors", "outcomeIdsByOutrightIdSelector"],
  `Outcome ids by outright id ${outrightId}`,
);

const outcomeIdsWinnerYesNoByOutrightIdSelector = createMemoSelector(
  [
    outcomeIdsByOutrightIdSelector,
    outcomesSelector,
  ],
  (outcomeIds, outcomes) => sortBy(
    (outcomeId: string) => {
      const outcome = outcomes[outcomeId];

      if (!outcome) {
        return -1;
      }

      const parameterOutcome = outcome.parameters.outcome;

      return parameterOutcome ? [EOutcomeEnumValue.yes, EOutcomeEnumValue.no].indexOf(parameterOutcome) : -1;
    },
    outcomeIds,
  ),
);

const outcomeIdsByOutrightIdAndTypeSelector = (type: EOutrightType) => isWinnerYesNo(type)
  ? outcomeIdsWinnerYesNoByOutrightIdSelector
  : outcomeIdsByOutrightIdSelector;

const videoUrlByEventIdSelector = (
  state: TAppState,
  eventId: string,
) => videoUrlByExtraInfoSelector(extraInfoByEventIdSelector(state, eventId));

const nextEventBySportIdSelector = createSimpleSelector(
  [
    eventsSelector,
    (_, sportId: string | undefined) => sportId,
  ],
  (events, sportId) => {
    const list = Object.values(events).filter((event) => event.sportId === sportId && Time.isFuture(event.startTime));

    return sortBy((event: IFlatEvent) => event.startTime, list)[0]?.id;
  },
);

const eventIdListByTournamentIdSelector = createSimpleSelector(
  [
    tournamentToEventMapSelector,
    (_, tournamentId) => tournamentId,
  ],
  (tournamentToEventMap, tournamentId) => tournamentToEventMap[tournamentId] || [],
);

const eventIdListByCategoryIdSelector = createMemoSelector(
  [
    eventsSelector,
    (_, categoryId: string) => categoryId,
  ],
  (events, categoryId) => Object.keys(events).filter((eventId) => events[eventId]?.categoryId === categoryId),
);

const liveEventIdListByCategoryIdSelector = createMemoSelector(
  [
    eventsSelector,
    (_, categoryId: string) => categoryId,
  ],
  (events, categoryId) =>
    Object.keys(events).filter((eventId) => {
      const event = events[eventId];

      if (!event) {
        return false;
      }

      return event.categoryId === categoryId && isLive(event.status);
    }),
);

const outrightIdListByTournamentIdSelector = createMemoSelector(
  [
    tournamentToOutrightMapSelector,
    (_, tournamentId: string) => tournamentId,
  ],
  (tournamentToOutright, tournamentId) => tournamentToOutright[tournamentId] || [],
);

const outrightIdListByCategoryIdSelector = createMemoSelector(
  [
    outrightsSelector,
    (_, categoryId: string) => categoryId,
  ],
  (outrights, categoryId) => Object.keys(outrights).filter((outrightId) => outrights[outrightId]?.categoryId === categoryId),
);

const eventIdListBySportIdSelector = (state: IWithFeed, sportId: string) => {
  const events = eventsSelector(state);

  return Object.keys(events).filter((eventId) => events[eventId]?.sportId === sportId);
};

const eventCountBySportIdSelector = (state: IWithFeed, sportId: string) => eventIdListBySportIdSelector(state, sportId).length;

const sportIdByOutcomeIdSelector = (state: TAppState, outcomeId: string) => {
  const outcome = outcomeByIdSelector(state, outcomeId);

  if (!outcome) {
    throw new Error(`outcome with id:${outcomeId} not found`);
  }

  if (isFlatOutrightOutcome(outcome)) {
    const outright = outrightByIdSelector(state, outcome.outrightId);

    if (!outright) {
      throw new Error(`outright with id:${outcome.outrightId} not found`);
    }

    return outright.sportId;
  }

  const market = marketByIdSelector(state, outcome.marketId);

  if (!market) {
    throw new Error(`market with id:${outcome.marketId} not found`);
  }

  const event = eventByIdSelector(state, market.eventId);

  if (!event) {
    throw new Error(`event with id:${market.eventId} not found`);
  }

  return event.sportId;
};

const concattedTournamentSlugsSelector = (state: IWithFeed, ids: string[]) => {
  const list: string[] = [];

  ids.forEach((id) => {
    const tournament = tournamentByIdSelector(state, id);

    if (tournament) {
      list.push(tournament.slug);
    }
  });

  return list.join(",");
};

const equalMarketGroupSelector = (state: IWithFeed, marketGroup: EMarketGroup, marketId: string) => {
  const market = marketByIdSelector(state, marketId);

  return market && marketTypeToMarketGroupMap[market.type] == marketGroup;
};

const isEventFetchedSelector = (state: IWithFeed, eventId: string) => eventSubFetchedSelector(state)[eventId];

const countOutrightsSelector = (state: IWithFeed) => Object.keys(outrightsSelector(state)).length;

const pickByOutcomeIdSelector = (state: TMixAppState, outcomeId: string, betType: ESportsbook_BetTypeEnum): TPickByOutcome => {
  const coefficient: number = coefficientByOutcomeIdSelector(state, outcomeId);
  const tree = selectFeedIdTreeByOutcomeId(state, outcomeId);
  if (!tree) {
    throw new Error("[pickByOutcomeIdSelector] tree is Nil");
  }

  const status = eventStatusByIdSelector(state, tree.eventId);
  const marketType: EMarketType = marketTypeByIdSelector(state, tree.marketId);

  return {
    coefficient,
    betType,
    sportId: tree.sportId,
    categoryId: tree.categoryId,
    tournamentId: tree.tournamentId,
    eventId: tree.eventId,
    marketType,
    live: isLive(status),
  };
};

export {
  scopesSelector,
  scoresSelector,
  categoriesSelector,
  tournamentsSelector,
  eventsSelector,
  outrightsSelector,
  sportsSelector,
  marketsSelector,
  outcomesSelector,
  feedVersionSelector,
  outcomeByIdSelector,
  outcomeByIdNotNilSelector,
  notOutrightOutcomeSelector,
  marketByIdSelector,
  selectMarketByOutcome,
  selectEventById,
  selectFeedIdTreeByOutcomeId,
  feedTreeByTournamentIdSelector,
  marketToOutcomeMapSelector,
  outrightToOutcomeMapSelector,
  eventToMarketMapSelector,
  eventToScopeMapSelector,
  scopeToScoreMapSelector,
  scopeToMarketMapSelector,
  tournamentToEventMapSelector,
  tournamentToOutrightMapSelector,
  eventIdByOutcomeIdSelector,
  scopeByMarketIdSelector,
  scopeByIdSelector,
  coefficientByOutcomeIdSelector,
  eventSubSubscribersSelector,
  eventSubSubscriptionsSelector,
  marketIdListByEventIdSelector,
  eventIdByMarketIdSelector,
  eventByMarketIdSelector,
  participantsByMarketIdSelector,
  sportIdByEventIdSelector,
  tournamentByIdSelector,
  sportIdByScopeIdSelector,
  scopeIdListByEventIdSelector,
  participantsByEventIdSelector,
  outcomeIdListByMarketIdSelector,
  outcomeParametersByIdSelector,
  marketTypeByIdSelector,
  marketParametersByIdSelector,
  marketIdByTypeSelector,
  eventStatusByIdSelector,
  eventByIdSelector,
  eventByIdNotNilSelector,
  eventStartTimeByIdSelector,
  eventTotalOutcomesByIdSelector,
  outrightByIdSelector,
  outrightByIdNotNilSelector,
  coefficientByIdSelector,
  categoryByIdSelector,
  categoryIconByIdSelector,
  hasStatisticsByEventIdSelector,
  outcomeIdsByOutrightIdAndTypeSelector,
  nextEventBySportIdSelector,
  eventIdListByTournamentIdSelector,
  eventIdListByCategoryIdSelector,
  outrightIdListByTournamentIdSelector,
  outrightIdListByCategoryIdSelector,
  eventCountBySportIdSelector,
  liveEventIdListByCategoryIdSelector,
  sportIdByOutcomeIdSelector,
  eventHashStatisticsSelector,
  concattedTournamentSlugsSelector,
  participantShortIdSelector,
  outcomeTranslatesByIdSelector,
  equalMarketGroupSelector,
  lineIsReadySelector,
  isEventFetchedSelector,
  eventSubFetchedSelector,
  countOutrightsSelector,
  pickByOutcomeIdSelector,
  videoUrlByEventIdSelector,
  tournamentIdByEventIdSelector,
  tournamentByEventIdNotNilSelector,
  tournamentByEventIdSelector,
  totalOutrightsByTournamentIdSelector,
  notNilCategoryByIdSelector,
  notNilTournamentByIdSelector,
  notNilSelectEventById,
  pathByTreeSelector,
  anyLineIsReadySelector,
  erisLineIsReadySelector,
};
