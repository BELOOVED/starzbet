import { EScopeType } from "@sb/betting-core/EScopeType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { createMemoSelector, getNotNil, isNil, type TSelector } from "@sb/utils";
import { type IFlatScope, type IFlatScore, type TVersionedRecord } from "@sb/betting-core/Feed/Types";
import { type TAppState } from "../../InitialState";
import { scopeToScoreMapSelector, scoresSelector, sportIdByEventIdSelector } from "../Selectors/FeedSelectors";
import { scopeByTypeAndEventIdSelectorFactory } from "../Selectors/ScopeByTypeAndEventIdSelectorFactory";

const withScopeType = (selector: TSelector<TAppState, IFlatScope | undefined, [string, EScopeType]>, scopeType: EScopeType) =>
  (state: TAppState, eventId: string) => selector(state, eventId, scopeType);

const getScoreFactory = (scores: TVersionedRecord<IFlatScore>, ctx: string) => (scoreId: string) =>
  getNotNil(scores[scoreId], ["getScoreFactory", ctx], "score");

const EMPTY_SCORES: IFlatScore[] = [];

const scoresByEventIdSelectorFactory = createMemoSelector(
  [
    withScopeType(scopeByTypeAndEventIdSelectorFactory, EScopeType.full_event),
    withScopeType(scopeByTypeAndEventIdSelectorFactory, EScopeType.over_times),
    withScopeType(scopeByTypeAndEventIdSelectorFactory, EScopeType.normal_time),
    scopeToScoreMapSelector,
    scoresSelector,
    sportIdByEventIdSelector,
  ],
  (fullEvent, overTimes, normalTime, scopeToScoreMap, scores, sportId): IFlatScore[] => {
    const getScore = getScoreFactory(scores, "scoresByEventIdSelectorFactory");
    if (sportId === sportCodeToIdMap[ESportCode.kiron_soccer] && normalTime) {
      const scoresByScope = scopeToScoreMap[normalTime.id];

      return isNil(scoresByScope) ? EMPTY_SCORES : scoresByScope.map(getScore);
    }

    if (overTimes) {
      const scoresByScope = scopeToScoreMap[overTimes.id];

      return isNil(scoresByScope) ? EMPTY_SCORES : scoresByScope.map(getScore);
    }

    if (!fullEvent) {
      return EMPTY_SCORES;
    }

    const scoresByScope = scopeToScoreMap[fullEvent.id];

    return isNil(scoresByScope) ? EMPTY_SCORES : scoresByScope.map(getScore);
  },
);

export { scoresByEventIdSelectorFactory };
