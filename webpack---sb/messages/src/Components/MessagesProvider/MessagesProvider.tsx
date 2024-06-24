import { deepEqual } from "fast-equals";
import { type ComponentType, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { type IWithId, useAction } from "@sb/utils";
import { type TMessagePosition } from "../../Types/TMessagePosition";
import { currentMessagesPositionsSelector } from "../../Store/Selectors/MessagesSelectors";
import { setMessageFallbackPositionAction } from "../../Store/Actions/MessagesActions";
import { MessagesContainerByPosition } from "../MessagesContainerByPosition/MessagesContainerByPosition";

interface IMessagesContainerProps {
  component: ComponentType<IWithId>;
  defaultPosition?: TMessagePosition;
  className?: string;
}

/**
 * On mount defaultPosition to be set to message store.
 * This component selects all unique positions of existing messages and render containers for each.
 *
 * Example:
 *  There are two messages with `top-left` position and three messages with `bottom-right` position.
 *
 *  MessageProvider render 2 containers:
 *    1 `top-left` with 2 messages inside;
 *    1 `bottom-right` container with 3 messages inside.
 */
const MessagesProvider = memo<IMessagesContainerProps>(({
  component,
  defaultPosition = "top-center",
  className,
}) => {
  const positions = useSelector(currentMessagesPositionsSelector, deepEqual);

  const setDefaultPosition = useAction(setMessageFallbackPositionAction);

  useEffect(
    () => {
      setDefaultPosition({ position: defaultPosition });
    },
    [defaultPosition],
  );

  return (
    <>
      {
        positions.map((position) => (
          <MessagesContainerByPosition
            key={position}
            component={component}
            position={position}
            className={className}
          />
        ))
      }
    </>
  );
});
MessagesProvider.displayName = "MessagesProvider";

export { MessagesProvider };
