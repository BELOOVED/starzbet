// @ts-nocheck
import { type ComponentType, createElement, memo } from "react";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { useParamSelector } from "@sb/utils";
import { sportMenuActiveSelector } from "../../Store/SportMenu/Selectors/SportMenuActiveSelector";
import { useSportMenuActions } from "../../Store/SportMenu/Hooks/UseSportMenuActions";
import {
  liveCategoryIdListSelector,
  preLiveCategoryIdListSelector,
  preLiveCategoryIdListWithOutrightsSelector,
} from "../../Store/SportMenu/Selectors/PreLiveCategoryIdListSelectors";
import { routeMap } from "../../RouteMap/RouteMap";
import { type ISportMenuItemProps } from "../../Store/SportMenu/Model/SportMenu";

interface IConstructorProps {
  sportId: string;
  child: ComponentType<ISportMenuItemProps>;
}

const PreLiveConstructorSportMenuItemContainer = memo<IConstructorProps>(({ sportId, child }) => {
  const active = useParamSelector(sportMenuActiveSelector, [sportId]);

  const toggleActive = useSportMenuActions(sportId, active);

  const categoryIdList = useParamSelector(preLiveCategoryIdListSelector, [sportId]);

  return createElement(
    child,
    {
      active,
      toggleActive,
      sportId,
      categoryIdList,
    },
  );
});
PreLiveConstructorSportMenuItemContainer.displayName = "PreLiveConstructorSportMenuItemContainer";

interface IContainerProps extends IConstructorProps {
  eventFilterFn?: () => boolean;
}

const PreLiveSportMenuItemContainer = memo<IContainerProps>(({ sportId, child, eventFilterFn }) => {
  const active = useParamSelector(sportMenuActiveSelector, [sportId]);

  const toggleActive = useSportMenuActions(sportId, active);

  const categoryIdList = useParamSelector(preLiveCategoryIdListWithOutrightsSelector, [sportId, eventFilterFn]);

  return createElement(
    child,
    {
      active,
      toggleActive,
      sportId,
      categoryIdList,
    },
  );
});
PreLiveSportMenuItemContainer.displayName = "PreLiveSportMenuItemContainer";

const ExpendableLiveSportMenuItemContainer = memo<IContainerProps>(({ sportId, child, eventFilterFn }) => {
  const active = useParamSelector(sportMenuActiveSelector, [sportId]);

  const toggleActive = useSportMenuActions(sportId, active);

  const categoryIdList = useParamSelector(liveCategoryIdListSelector, [sportId, eventFilterFn]);

  return createElement(
    child,
    {
      active,
      toggleActive,
      sportId,
      categoryIdList,
      isLive: true,
    },
  );
});
ExpendableLiveSportMenuItemContainer.displayName = "ExpendableLiveSportMenuItemContainer";

const LiveSportMenuItemContainer = memo(({ sportId, child }) => {
  const params = { sportSlug: sportIdToCodeMap[sportId] };

  return createElement(child, { sportId, to: routeMap.live.sport, params });
});
LiveSportMenuItemContainer.displayName = "LiveSportMenuItemContainer";

export {
  PreLiveConstructorSportMenuItemContainer,
  PreLiveSportMenuItemContainer,
  LiveSportMenuItemContainer,
  ExpendableLiveSportMenuItemContainer,
};
