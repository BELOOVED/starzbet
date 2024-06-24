import { EScopeType } from "@sb/betting-core/EScopeType";
import { EScoreType } from "@sb/betting-core/EScoreType";
import { createMemoSelector, createSimpleSelector } from "@sb/utils";
import { sortBy } from "../../../Utils/SortBy";
import {
  participantShortIdSelector,
  scopeIdListByEventIdSelector,
  scopesSelector,
  scopeToScoreMapSelector,
  scoresSelector,
} from "./FeedSelectors";

const currentGameScopeIdSelector = createSimpleSelector(
  [
    scopesSelector,
    scopeIdListByEventIdSelector,
  ],
  (scopes, scopeIdList) => (
    sortBy(
      (scopeId: string) => scopes[scopeId]?.number,
      scopeIdList.filter((scopeId) => scopes[scopeId]?.type === EScopeType.game),
    ).at(-1)
  ),
);

const currentGameScoreSelector = createMemoSelector(
  [
    currentGameScopeIdSelector,
    scopeToScoreMapSelector,
    scoresSelector,
    participantShortIdSelector,
  ],
  (gameId, scopeToScoreMap, scores, shortId) => {
    if (!gameId) {
      return null;
    }

    const scoreIds = scopeToScoreMap[gameId] || [];

    if (scoreIds.length === 0) {
      return null;
    }

    const score = scoreIds
      .map((scoreId) => scores[scoreId])
      .find((score) => score?.type === EScoreType.score && score.teamId === shortId);

    if (!score) {
      return null;
    }

    return score.value;
  },
  {
    expensive: true,
  },
);

export { currentGameScoreSelector };

