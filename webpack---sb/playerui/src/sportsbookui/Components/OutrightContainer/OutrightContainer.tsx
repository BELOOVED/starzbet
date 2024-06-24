import { type ComponentType, createElement, type FC, memo, type ReactElement } from "react";
import { useParamSelector } from "@sb/utils";
import { type IFlatOutright } from "@sb/betting-core/Feed/Types";
import { outrightByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { type IWithOutright } from "../../Model/Bet";

interface IOutrightContainerProps extends IWithId {
  empty?: ComponentType;
  children: (outright: IFlatOutright) => ReactElement;
}

const OutrightContainer: FC<IOutrightContainerProps> = ({ id, empty, children }) => {
  const outright = useParamSelector(outrightByIdSelector, [id]);

  if (!outright) {
    return empty ? createElement(empty) : null;
  }

  return children(outright);
};
OutrightContainer.displayName = "OutrightContainer";

interface INewOutrightContainerProps {
  outrightId: string;
  contentView: ComponentType<IWithOutright>;
  emptyView?: ComponentType;
}

const NewOutrightContainer = memo<INewOutrightContainerProps>(({
  outrightId,
  contentView,
  emptyView,
}) => {
  const outright = useParamSelector(outrightByIdSelector, [outrightId]);

  if (!outright) {
    return emptyView ? createElement(emptyView) : null;
  }

  return createElement(contentView, { outright });
});
NewOutrightContainer.displayName = "NewOutrightContainer";

export { OutrightContainer, NewOutrightContainer };
