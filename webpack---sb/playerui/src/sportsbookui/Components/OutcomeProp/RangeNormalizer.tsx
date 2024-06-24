import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { shared_outcomeOtherValue_and_more } from "@sb/translates/shared/SharedTKeys";
import { type TExplicitAny } from "@sb/utils";
import { moreOutcomeValue } from "../../Store/Feed/Model/Outcome/MoreOutcomeValue";

interface IRangeNormalizerProps {
  outcomeParameters?: Record<string, TExplicitAny>;
}
const RangeNormalizer = memo<IRangeNormalizerProps>(({ outcomeParameters }) => {
  const [t] = useTranslation();

  const { from, to } = outcomeParameters;

  if (to === moreOutcomeValue) {
    return (
      <>
        {`${from} `}

        {t(shared_outcomeOtherValue_and_more)}
      </>
    );
  }

  return `${from} - ${to}`;
});
RangeNormalizer.displayName = "RangeNormalizer";

export { RangeNormalizer };
