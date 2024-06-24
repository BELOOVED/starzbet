// @ts-nocheck
import { createElement, memo } from "react";
import { type TComponent, useParamSelector } from "@sb/utils";
import { type IWithStartTime } from "../../../common/IWith";
import { useSportMenuCategoryActions } from "../../Store/SportMenu/Hooks/UseSportMenuCategoryActions";
import {
  liveEventIdListSelectorFactory,
  preLiveEventIdListSelector,
} from "../../Store/SportMenu/Selectors/EventIdListByCategoryIdSelector";
import {
  liveTournamentIdListByCategoryIdSelector,
  preLiveTournamentIdListByCategoryIdSelector,
} from "../../Store/SportMenu/Selectors/TournamentIdListByCategoryIdSelector";
import { sportMenuCategoryActiveSelector } from "../../Store/SportMenu/Selectors/SportMenuCategoryActiveSelector";
import { type ICategoryProps } from "../../Store/SportMenu/Model/SportMenu";

interface ILiveSportMenuCategoryContainerProps extends Partial<ICategoryProps> {
  categoryId: string;
  child: TComponent<ICategoryProps>;
}

interface IPreLiveSportMenuCategoryContainerProps extends ILiveSportMenuCategoryContainerProps {
  eventFilterFn?: (args: IWithStartTime) => boolean;
}

const PreLiveSportMenuCategoryContainer = memo<IPreLiveSportMenuCategoryContainerProps>(({
  categoryId,
  child,
  eventFilterFn,
  ...rest
}) => {
  const active = useParamSelector(sportMenuCategoryActiveSelector, [categoryId]);

  const toggleActive = useSportMenuCategoryActions(categoryId, active);

  const eventIdList = useParamSelector(preLiveEventIdListSelector, [categoryId]);

  const tournamentIdList = useParamSelector(preLiveTournamentIdListByCategoryIdSelector, [categoryId, eventFilterFn]);

  return createElement(
    child,
    {
      active,
      toggleActive,
      eventIdList,
      tournamentIdList,
      categoryId,
      ...rest,
    },
  );
});
PreLiveSportMenuCategoryContainer.displayName = "PreLiveSportMenuCategoryContainer";

const LiveSportMenuCategoryContainer = memo<ILiveSportMenuCategoryContainerProps>(({ categoryId, child, ...rest }) => {
  const active = useParamSelector(sportMenuCategoryActiveSelector, [categoryId]);

  const toggleActive = useSportMenuCategoryActions(categoryId, active);

  const eventIdList = useParamSelector(liveEventIdListSelectorFactory, [categoryId]);

  const tournamentIdList = useParamSelector(liveTournamentIdListByCategoryIdSelector, [categoryId]);

  return createElement(
    child,
    {
      active,
      toggleActive,
      eventIdList,
      tournamentIdList,
      categoryId,
      isLive: true,
      ...rest,
    },
  );
});
LiveSportMenuCategoryContainer.displayName = "LiveSportMenuCategoryContainer";

export { PreLiveSportMenuCategoryContainer, LiveSportMenuCategoryContainer };
