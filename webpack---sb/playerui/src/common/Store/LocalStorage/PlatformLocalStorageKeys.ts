import { createLocalStorageKeys } from "../../Utils/CreateLocalStorageKeys";

const platformLocalStorageKeys = createLocalStorageKeys(
  "@@platformui",
  [
    "passwordRecoveryToken",
    "lastRealityCheckTime",
    "casinoFavourites",
    "liveGamesFavourites",
    "liveCasinoFavourites",
    "virtualFavourites",
    "token",
    "hiddenBalance",
    "myDetailsAfterRegister",
    "testPlayer",
    "combineProviders",
    "lastClosedUserMessageId",
    "masterTabId",
    "vipClubActiveTab",
    "vipClubLeadersActivePeriod",
  ],
);

export { platformLocalStorageKeys };
