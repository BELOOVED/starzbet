import clsx from "clsx";
import { deepEqual } from "fast-equals";
import { type ComponentType, createElement, Fragment, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type IWithId } from "@sb/utils";
import classes from "./MessagesContainerByPosition.module.css";
import { deleteMessageAction } from "../../Store/Actions/MessagesActions";
import { type TMessagePosition } from "../../Types/TMessagePosition";
import { messageByIdSelector, messagesIdsByPositionSelector } from "../../Store/Selectors/MessagesSelectors";

interface IPositionContainerProps {
  component: ComponentType<IWithId>;
  position: TMessagePosition;
  className?: string;
}

const positionToClassMap: Record<TMessagePosition, string | undefined> = {
  "top-left": classes.messagesContainerByPositionTopLeft,
  "top-center": classes.messagesContainerByPositionTopCenter,
  "top-right": classes.messagesContainerByPositionTopRight,
  "bottom-left": classes.messagesContainerByPositionBottomLeft,
  "bottom-center": classes.messagesContainerByPositionBottomCenter,
  "bottom-right": classes.messagesContainerByPositionBottomRight,
};

const AutoClose = memo<IWithId>(({
  id,
}) => {
  const message = useSelector(messageByIdSelector(id));
  const dispatch = useDispatch();

  useEffect(
    () => {
      const timeoutId = setTimeout(
        () => {
          dispatch(deleteMessageAction({ id }));
        },
        message.autoClose,
      );

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [message],
  );

  return null;
});
AutoClose.displayName = "AutoClose";

const MessagesContainerByPosition = memo<IPositionContainerProps>(({
  component,
  position,
  className,
}) => {
  const messagesIds = useSelector(messagesIdsByPositionSelector(position), deepEqual);

  const containerClassName = clsx(
    classes.messagesContainerByPosition,
    positionToClassMap[position],
    className,
  );

  return (
    <div className={containerClassName}>
      {
        messagesIds.map((id) => (
          <Fragment key={id}>
            <AutoClose id={id} />

            {createElement(component, { id })}
          </Fragment>
        ))
      }
    </div>
  );
});
MessagesContainerByPosition.displayName = "MessagesContainerByPosition";

export { MessagesContainerByPosition };
