import { memo, type ReactElement } from "react";
import { useSelector } from "react-redux";
import { loggedSelector } from "@sb/auth";
import { WhenHydrationFinished } from "../../Client/Core/Components/WhenHydrationFinished/WhenHydrationFinished";

interface ILoggedContainerProps {
  logged: ReactElement | null;
  notLogged: ReactElement | null;
}

const LoggedContainer = memo<ILoggedContainerProps>(({ logged, notLogged }) => {
  const playerLogged = useSelector(loggedSelector);

  return (
    <WhenHydrationFinished>
      {
        playerLogged
          ? logged
          : notLogged
      }
    </WhenHydrationFinished>
  );
});
LoggedContainer.displayName = "LoggedContainer";

export { LoggedContainer };
