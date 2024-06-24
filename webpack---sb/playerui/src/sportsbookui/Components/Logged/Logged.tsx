// @ts-nocheck
import { useSelector } from "react-redux";
import { loggedSelector } from "@sb/auth";

const Logged = ({ children }) => {
  const logged = useSelector(loggedSelector);

  return (
    logged
      ? children
      : null
  );
};
Logged.displayName = "Logged";

const NotLogged = ({ children }) => {
  const logged = useSelector(loggedSelector);

  return (
    logged
      ? null
      : children
  );
};
NotLogged.displayName = "NotLogged";

export { Logged, NotLogged };
