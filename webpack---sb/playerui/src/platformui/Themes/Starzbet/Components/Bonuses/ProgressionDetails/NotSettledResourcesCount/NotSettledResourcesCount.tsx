import { memo } from "react";
import { isNil, useParamSelector, withParamCondition } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_progressionTable_openRoundsBetsCount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import {
  notSettledBonusResourcesCountSelector,
  notSettledBonusResourcesCountVisibleSelector,
} from "../../../../../../Store/Bonuses/Selectors/NotSettledBonusResourcesSelectors";
import { useNotSettledBonusResources } from "../../../../../../Store/Bonuses/Hooks/UseNotSettledBonusResources";

interface INotSettledResourcesCountProps {
  playerBonusId: string;
  className?: string;
}

const NotSettledResourcesCount = withParamCondition(
  notSettledBonusResourcesCountVisibleSelector,
  ["playerBonusId"],
  memo<INotSettledResourcesCountProps>(({ playerBonusId, className }) => {
    const [t] = useTranslation();

    useNotSettledBonusResources(playerBonusId);

    const count = useParamSelector(notSettledBonusResourcesCountSelector, [playerBonusId]);

    return (
      <span className={className}>
        {t(platformui_starzbet_bonus_progressionTable_openRoundsBetsCount)}

        {": "}

        {isNil(count) ? "..." : count}
      </span>
    );
  }),
);
NotSettledResourcesCount.displayName = "NotSettledResourcesCount";

export { NotSettledResourcesCount };
