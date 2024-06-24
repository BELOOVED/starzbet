import { type ComponentType, createElement, memo } from "react";
import { isEmpty } from "@sb/utils";
import {
  useEsportLiveSportIdListSelector,
  useEsportPreLiveSportIdListSelector,
  useNotEsportLiveSportIdListSelector,
  useNotEsportPreLiveSportIdListWithOutrightsSelector,
} from "../../Store/Feed/Hooks/UseSportIdListSelector";
import { type IWithSportIdList } from "../../Model/Bet";
import { type TSportId } from "../../Store/MarketFilter/Model/MarketPreset";

interface ISportMenuContainerProps {
  child: ComponentType<IWithSportIdList>;
  sortFn?: (args: unknown) => string[];
}

interface IBaseSportMenuContainerProps extends ISportMenuContainerProps {
  hook: (args: unknown) => TSportId[];
}

const SportMenuContainer = memo<IBaseSportMenuContainerProps>(({ child, hook, sortFn }) => {
  const sportIdList = hook(sortFn);

  return isEmpty(sportIdList) ? null : createElement(child, { sportIdList });
});
SportMenuContainer.displayName = "SportMenuContainer";

const PreLiveSportMenuContainer = memo<ISportMenuContainerProps>((props) => (
  createElement(SportMenuContainer, { ...props, hook: useNotEsportPreLiveSportIdListWithOutrightsSelector })
));
PreLiveSportMenuContainer.displayName = "PreLiveSportMenuContainer";

const LiveSportMenuContainer = memo<ISportMenuContainerProps>((props) => (
  createElement(SportMenuContainer, { ...props, hook: useNotEsportLiveSportIdListSelector })
));
LiveSportMenuContainer.displayName = "LiveSportMenuContainer";

const ESportPreLiveSportMenuContainer = memo<ISportMenuContainerProps>((props) => (
  createElement(SportMenuContainer, { ...props, hook: useEsportPreLiveSportIdListSelector })
));
ESportPreLiveSportMenuContainer.displayName = "ESportPreLiveSportMenuContainer";

const ESportLiveSportMenuContainer = memo<ISportMenuContainerProps>((props) => (
  createElement(SportMenuContainer, { ...props, hook: useEsportLiveSportIdListSelector })
));
ESportLiveSportMenuContainer.displayName = "ESportLiveSportMenuContainer";

export {
  PreLiveSportMenuContainer,
  LiveSportMenuContainer,
  ESportPreLiveSportMenuContainer,
  ESportLiveSportMenuContainer,
  type ISportMenuContainerProps,
};
