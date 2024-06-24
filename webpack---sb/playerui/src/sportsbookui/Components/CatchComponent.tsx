import { Children, Component, type ErrorInfo, type FC, type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { type TVoidFn, useAction } from "@sb/utils";
import { Logger } from "../../common/Utils/Logger";
import { restartNumberSelector } from "../Store/App/Selectors/AppSelectors";
import { appErrorAction } from "../Store/App/AppActions";

interface ICatchProps extends PropsWithChildren {
  onError: TVoidFn;
}

interface ICatchState {
  hasError: boolean;
}

class Catch extends Component<ICatchProps, ICatchState> {
  override state: ICatchState = { hasError: false };

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Logger.error.react("ComponentDidCatch", error, errorInfo);

    this.setState(() => ({ hasError: true }));

    this.props.onError();
  }

  override render() {
    if (this.state.hasError) {
      return null;
    }

    return Children.only(this.props.children);
  }
}

const CatchComponent: FC<PropsWithChildren> = ({
  children,
}) => {
  const restartNumber = useSelector(restartNumberSelector);
  const appError = useAction(appErrorAction);

  return (
    <Catch key={restartNumber} onError={appError}>
      {children}
    </Catch>
  );
};
CatchComponent.displayName = "CatchComponent";

export { CatchComponent };
