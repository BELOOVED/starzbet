// @ts-nocheck
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { shared_outcomeOtherValue_other } from "@sb/translates/shared/SharedTKeys";
import { moreOutcomeValue } from "../../Store/Feed/Model/Outcome/MoreOutcomeValue";
import { getTeamShortIdList } from "../../Store/Feed/Model/Event";

const ScoreNormalizer = memo(({ outcomeParameters, participants }) => {
  const [t] = useTranslation();

  if (Object.values(outcomeParameters).some((p) => p === moreOutcomeValue)) {
    return t(shared_outcomeOtherValue_other);
  }

  const scores = getTeamShortIdList(participants).map((teamId) => outcomeParameters[teamId]);

  return (
    scores.join(" - ")
  );
});
ScoreNormalizer.displayName = "ScoreNormalizer";

export { ScoreNormalizer };
