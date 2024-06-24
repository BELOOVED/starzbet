import { type ComponentType, createElement, memo } from "react";
import { useParamSelector } from "@sb/utils";
import { eventByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { type IWithEvent } from "../../Model/Bet";

interface IEventContainerProps {
  eventId: string;
  contentView: ComponentType<IWithEvent>;
  emptyView?: ComponentType;
}

const EventContainer = memo<IEventContainerProps>(({
  eventId,
  contentView,
  emptyView,
  ...rest
}) => {
  const event = useParamSelector(eventByIdSelector, [eventId]);

  if (!event) {
    return emptyView
      ? createElement(emptyView)
      : null;
  }

  return createElement(contentView, { event, ...rest });
});
EventContainer.displayName = "EventContainer";

export { EventContainer };
