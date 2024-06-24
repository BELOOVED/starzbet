import { EMPTY } from "rxjs";
import { routerEpic } from "@sb/router";
import { setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { platformLocalStorageKeys } from "../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { updatePasswordByEmailMatchOptions } from "../../PlatformMatchOptions";

const passwordResetRouterEpic = routerEpic({
  name: "passwordReset",
  match: getMatch<{ token: string; }>(updatePasswordByEmailMatchOptions),
  onStart: ({ params: { token } }) => () => {
    setLocalStorage(platformLocalStorageKeys.passwordRecoveryToken, token);

    return EMPTY;
  },
});

export { passwordResetRouterEpic };
