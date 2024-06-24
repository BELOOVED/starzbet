import { routeMap, type TRoutePath } from "../../../../platformui/RouteMap/RouteMap";

enum EPermissionKey {
    allowBingo = "allowBingo",
    allowCasino = "allowCasino",
    allowESports ="allowESports",
    allowGames = "allowGames",
    allowLiveCasino = "allowLiveCasino",
    allowSports = "allowSports",
    allowVirtual = "allowVirtual",
}

type TPermissions = Record<EPermissionKey, boolean>;

const stubPermissions: TPermissions = {
  allowBingo: true,
  allowCasino: true,
  allowESports: true,
  allowGames: true,
  allowLiveCasino: true,
  allowSports: true,
  allowVirtual: true,
};

const permissionsPagesMap: Record<EPermissionKey, TRoutePath[]> = {
  [EPermissionKey.allowBingo]: [routeMap.bingo],
  [EPermissionKey.allowCasino]: [routeMap.casino],
  [EPermissionKey.allowESports]: [routeMap.esport],
  [EPermissionKey.allowGames]: [routeMap.games],
  [EPermissionKey.allowLiveCasino]: [routeMap.liveCasino],
  [EPermissionKey.allowSports]: [routeMap.preLive, routeMap.live],
  [EPermissionKey.allowVirtual]: [routeMap.virtual],
};

export { stubPermissions, EPermissionKey, permissionsPagesMap };
export type { TPermissions };
