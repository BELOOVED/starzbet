import { createRootReducer, simpleReducer } from "@sb/utils";
import { setAuthenticatedAction } from "./WsAuthActions";

const setAuthenticatedReducer = simpleReducer(["authenticated"], ["wsAuth", "authenticated"]);

const wsAuthRootReducer = createRootReducer([
  [setAuthenticatedReducer, setAuthenticatedAction],
]);

export { wsAuthRootReducer };
