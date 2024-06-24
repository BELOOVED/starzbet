import { distinctUntilChanged, map } from "rxjs/operators";
import { filter, ignoreElements, merge, tap } from "rxjs";
import { isCreator } from "@sb/utils";
import { loggedOutAction } from "@sb/auth";
import { type TPlatformEpic } from "../../../../platformui/Store/Root/Epic/TPlatformEpic";
import { platformLocalStorageKeys } from "../../LocalStorage/PlatformLocalStorageKeys";
import { setLocalStorage } from "../../LocalStorage/localStorageKeys";
import { hasProfileAndWalletSelector } from "../Selectors/ProfileSelectors";
import { playerDetailsSelectors } from "../Selectors/PlayerSelectors";

const testPlayerEpic: TPlatformEpic = (action$, state$, dependencies) => merge(
  state$.pipe(
    map(hasProfileAndWalletSelector),
    distinctUntilChanged(),
    filter(Boolean),
    tap(() => {
      const testPlayer = playerDetailsSelectors.testPlayer(state$.value);

      if (testPlayer) {
        setLocalStorage(platformLocalStorageKeys.testPlayer, true);

        dependencies.graphQLClient.bypassCache = true;
      }
    }),
    ignoreElements(),
  ),
  action$.pipe(
    isCreator(loggedOutAction),
    tap(() => {
      localStorage.removeItem(platformLocalStorageKeys.testPlayer);

      dependencies.graphQLClient.bypassCache = false;
    }),
    ignoreElements(),
  ),
);

export { testPlayerEpic };
