import { AnyAction, Dispatch } from "redux";
import { finalize } from "rxjs/operators";

const finalizeHandleFactory = <Deps>(getDispatch: (deps: Deps) => Dispatch<AnyAction>) =>
  (deps: Deps) => (...actions: AnyAction[]) =>
    finalize<AnyAction>(() => {
      const dispatch = getDispatch(deps);
      
      actions.forEach((action) => {
        dispatch(action);
      });
    });

export { finalizeHandleFactory };
