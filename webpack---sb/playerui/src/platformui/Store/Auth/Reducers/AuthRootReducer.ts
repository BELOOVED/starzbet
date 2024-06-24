import { createRootReducer } from "@sb/utils";
import { authInfoModalCloseAction, authInfoModalOpenAction, authNavigationDataSetAction, loginLockForTimeAction } from "../AuthActions";
import { loginLockTimeReducer } from "./LoginLockTimeReducer";
import { authInfoModalOpenReducer } from "./AuthInfoModalOpenReducer";
import { authInfoModalCloseReducer } from "./AuthInfoModalCloseReducer";
import { authNavigationDataReducer } from "./SetAuthNavigationData";

const authRootReducer = createRootReducer([
  [loginLockTimeReducer, loginLockForTimeAction],
  [authInfoModalOpenReducer, authInfoModalOpenAction],
  [authInfoModalCloseReducer, authInfoModalCloseAction],
  [authNavigationDataReducer, authNavigationDataSetAction],
]);

export { authRootReducer };
