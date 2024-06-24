//@ts-nocheck
import { hasOwnProperty, isNotEmpty, isNotNil } from "@sb/utils";
import {
  eventByIdSelector,
  eventSubFetchedSelector,
  eventSubSubscribersSelector,
  eventSubSubscriptionsSelector,
  eventToMarketMapSelector,
  eventToScopeMapSelector,
  marketsSelector,
  marketToOutcomeMapSelector,
  outcomesSelector,
  scopesSelector,
  scopeToMarketMapSelector,
  selectEventById,
} from "../../Selectors/FeedSelectors";
import { isMainScope } from "../../Model/Scope";
import { inMainLine } from "../../Model/Market/Market";
import { type IWithFeed } from "../../FeedState";

const cleanMainLine = (state, eventId) => {
  const scopes = { ...scopesSelector(state) };
  const markets = { ...marketsSelector(state) };
  const outcomes = { ...outcomesSelector(state) };
  const eventToMarketMap = { ...eventToMarketMapSelector(state) };
  const eventToScopeMap = { ...eventToScopeMapSelector(state) };
  const scopeToMarketMap = { ...scopeToMarketMapSelector(state) };
  const marketToOutcomeMap = { ...marketToOutcomeMapSelector(state) };

  const { sportId } = eventByIdSelector(state, eventId);

  const scopeIdList = eventToScopeMap[eventId].filter(
    (scopeId) => !isMainScope(scopes[scopeId].type),
  );

  const removeMarket = (marketId) => {
    const scopeId = markets[marketId].scopeId;

    delete markets[marketId];

    marketToOutcomeMap[marketId].forEach((outcomeId) => {
      delete outcomes[outcomeId];
    });

    delete marketToOutcomeMap[marketId];

    eventToMarketMap[eventId] = isNotNil(eventToMarketMap[eventId])
      ? eventToMarketMap[eventId].filter((it) => it !== marketId)
      : [];

    scopeToMarketMap[scopeId] = isNotNil(scopeToMarketMap[scopeId])
      ? scopeToMarketMap[scopeId].filter((it) => it !== marketId)
      : [];
  };

  scopeIdList.forEach((scopeId) => {
    scopeToMarketMap[scopeId]?.forEach(removeMarket);

    delete scopeToMarketMap[scopeId];
  });

  (eventToMarketMap[eventId] || []).forEach((marketId) => {
    const { type, scopeId } = markets[marketId];

    if (!inMainLine(sportId, scopes[scopeId].type)?.includes(type)) {
      removeMarket(marketId);
    }
  });

  return {
    ...state.feed.mainLine,
    markets,
    outcomes,
    eventToMarketMap,
    scopeToMarketMap,
    marketToOutcomeMap,
  };
};
const removeSubscriberHandler = (state: IWithFeed, eventId: string, subscriber) => {
  const curSubscribers = eventSubSubscribersSelector(state);

  if (!hasOwnProperty(curSubscribers, eventId)) {
    return state;
  }

  const withoutSubscriber = curSubscribers[eventId].filter((subs) => subs !== subscriber);

  const subscribers = { ...curSubscribers };
  const subscriptions = { ...eventSubSubscriptionsSelector(state) };
  const fetched = { ...eventSubFetchedSelector(state) };
  let mainLine = state.feed.mainLine;

  if (isNotEmpty(withoutSubscriber)) {
    subscribers[eventId] = withoutSubscriber;
  } else {
    delete subscriptions[eventId];
    delete subscribers[eventId];
    delete fetched[eventId];

    if (isNotNil(selectEventById(state, eventId))) {
      mainLine = cleanMainLine(state, eventId);
    }
  }

  return ({
    ...state,
    feed: {
      ...state.feed,
      mainLine,
      eventSub: {
        ...state.feed.eventSub,
        subscribers,
        subscriptions,
        fetched,
      },
    },
  });
};

export { removeSubscriberHandler };
