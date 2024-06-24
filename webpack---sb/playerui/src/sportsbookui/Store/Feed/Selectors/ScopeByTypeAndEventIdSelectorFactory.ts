import { createSimpleSelector } from "@sb/utils";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { scopeIdListByEventIdSelector, scopesSelector } from "./FeedSelectors";

const scopeByTypeAndEventIdSelectorFactory = createSimpleSelector(
  [
    scopesSelector,
    scopeIdListByEventIdSelector,
    (_, __: string, scopeType: EScopeType) => scopeType,
  ],
  (scopes, scopeIdList, scopeType) => {
    const scopeId = scopeIdList.find((scopeId) => scopes[scopeId]?.type === scopeType);

    return scopeId ? scopes[scopeId] : undefined;
  },
);

export { scopeByTypeAndEventIdSelectorFactory };
