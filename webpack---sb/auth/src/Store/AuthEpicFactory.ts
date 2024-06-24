import { combineEpics } from "redux-observable";
import type { IClock } from "@sb/utils/TimeUtils/IClock";
import { type IServer, type IStorage, type TAuthEpic } from "../Types/AuthTypes";
import { tokenRecoveryEpicFactory } from "./Epics/TokenRecoveryEpicFactory";
import { refreshTokenEpicFactory } from "./Epics/RefreshTokenEpicFactory";
import { loginEpicFactory } from "./Epics/LoginEpicFactory";
import { logoutEpicFactory } from "./Epics/LogoutEpicFactory";
import { keepAliveEpicFactory } from "./Epics/KeepAliveEpicFactory";
import { syncWithStorageEpicFactory } from "./Epics/SyncWithStorageEpicFactory";
import { whenTabIsLeaderEpic } from "./Epics/TabStatusWatcherFactory";
import { syncRefreshStatusEpic } from "./Epics/SyncRefreshStatusEpic";

const authEpicFactory = (
  server: IServer,
  storage: IStorage,
  clock: IClock = Date,
  withKeepAlive = false,
): TAuthEpic => {
  const epics = [
    tokenRecoveryEpicFactory(server, storage, clock),
    whenTabIsLeaderEpic(refreshTokenEpicFactory(server, clock)),
    loginEpicFactory(server),
    logoutEpicFactory(server),
    syncWithStorageEpicFactory(storage),
    syncRefreshStatusEpic,
  ];

  if (withKeepAlive) {
    epics.push(
      whenTabIsLeaderEpic(keepAliveEpicFactory(server, clock)),
    );
  }

  return combineEpics(...epics);
};

export { authEpicFactory };
