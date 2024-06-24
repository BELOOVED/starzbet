import { memo, type ReactNode } from "react";
import { useParamSelector, withProps } from "@sb/utils";
import type { EParticipantType } from "@sb/betting-core/EParticipantType";
import { useMainScoreValueByEventIdSelector } from "../../Store/Feed/Hooks/UseMainScoreValueByEventIdSelector";
import { normalizeScore } from "../../Store/Feed/Model/Score";
import { scoresByScopeIdSelector } from "../../Store/Feed/Selectors/ScoresByScopeIdSelector";

interface IScoreValueByScopeProps {
  scopeId: string;
  type: EParticipantType;
  noop: ReactNode;
}

const ScoreValueByScope = memo<IScoreValueByScopeProps>(({ scopeId, type, noop }) => {
  const score = useParamSelector(scoresByScopeIdSelector, [scopeId, type]);

  return normalizeScore(score) || noop;
});
ScoreValueByScope.displayName = "ScoreValueByScope";

interface IScoreValueProps {
  eventId: string;
  type: EParticipantType;
  noop: ReactNode;
}

const ScoreValue = memo<IScoreValueProps>(({ eventId, type, noop }) => {
  const score = useMainScoreValueByEventIdSelector(eventId, type);

  return normalizeScore(score) || noop;
});
ScoreValue.displayName = "ScoreValue";

const DashScoreValue = withProps(ScoreValue)({ noop: "" });
const DashScoreValueByScope = withProps(ScoreValueByScope)({ noop: "" });

DashScoreValue.displayName = "DashScoreValue";

export {
  DashScoreValue,
  DashScoreValueByScope,
};
