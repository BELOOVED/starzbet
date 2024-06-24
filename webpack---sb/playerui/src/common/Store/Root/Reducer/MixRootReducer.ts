import { combineMaps, mergeReducer, rootSymbol } from "@sb/utils";
import { authReducer } from "@sb/auth";
import { messagesReducer } from "@sb/messages";
import { routerReducer } from "@sb/router";
import { chatReducer } from "@sb/chat";
import { platformRootReducers } from "../../../../platformui/Store/Root/Reducers/PlatformRootReducer";
import { rootReducers } from "./RootReducer";

const mixRootReducer = () => combineMaps({
  router: routerReducer,
  messages: messagesReducer,
  ...chatReducer,
  [rootSymbol]: mergeReducer(
    ...rootReducers,
    ...platformRootReducers,
    authReducer,
  ),
});

export { mixRootReducer };
