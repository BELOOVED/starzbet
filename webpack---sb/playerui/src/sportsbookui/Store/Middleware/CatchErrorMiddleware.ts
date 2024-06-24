import { type AnyAction, type Dispatch, type MiddlewareAPI } from "redux";
import { Logger } from "../../../common/Utils/Logger";

const catchErrorMiddleware = (store: MiddlewareAPI) =>
  (next: Dispatch) =>
    (action: AnyAction) => {
      const prevState = store.getState();

      try {
        return next(action);
      } catch (e) {
        Logger.error.reducer("Error after action:", e, action);

        return prevState;
      }
    };

export { catchErrorMiddleware };
