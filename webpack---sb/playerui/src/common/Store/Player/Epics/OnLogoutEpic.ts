import { tap } from "rxjs";
import { map } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { type TPlatformEpic } from "../../../../platformui/Store/Root/Epic/TPlatformEpic";
import { removedTokenAction } from "../../../../platformui/Store/Auth/AuthActions";
import { vipClubPlayerStateRemoveAction } from "../../../../platformui/Store/VipClub/VipClubActions";
import { platformLocalStorageKeys } from "../../LocalStorage/PlatformLocalStorageKeys";

const onLogoutEpic: TPlatformEpic = (action$) => action$.pipe(
  isCreator(removedTokenAction),
  tap(() => {
    localStorage.removeItem(platformLocalStorageKeys.lastRealityCheckTime);
  }),
  map(vipClubPlayerStateRemoveAction),
);

export { onLogoutEpic };
