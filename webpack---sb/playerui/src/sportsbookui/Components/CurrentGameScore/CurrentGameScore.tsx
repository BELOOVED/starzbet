import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { type EParticipantType } from "@sb/betting-core/EParticipantType";
import { currentGameScoreSelector } from "../../Store/Feed/Selectors/CurrentGameScoreSelector";

interface ICurrentGameScoreProps {
  eventId: string;
  participantType: EParticipantType;
}

const CurrentGameScore = memo<ICurrentGameScoreProps>(({ eventId, participantType }) => {
  const score = useParamSelector(currentGameScoreSelector, [eventId, participantType]);

  if (score === null) {
    return null;
  }

  return score === 50 ? "A" : score;
});
CurrentGameScore.displayName = "CurrentGameScore";

export { CurrentGameScore };
