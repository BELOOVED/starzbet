import { Router as RouterBase } from "react-router-dom";
import { memo, type PropsWithChildren } from "react";
import { type History } from "./HistoryCompat";

interface IRouterProps extends PropsWithChildren {
  history: History;
}

const Router = memo<IRouterProps>(
  (props) => <RouterBase {...props} />,
);
Router.displayName = "Router";

export { Router };
