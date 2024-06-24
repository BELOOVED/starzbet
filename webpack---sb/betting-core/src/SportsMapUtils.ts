import { keys } from "@sb/utils/Keys";
import { ESportCode } from "./ESportCode";
import { ESportKind } from "./ESportKind";
import { sportsMap } from "./SportsMap";
import { deprecatedGetNotNil, isNotNil, TNil, TRequireOnlyOne } from "@sb/utils";

type TIsKindArg = TRequireOnlyOne<{
  code: ESportCode | TNil;
  id: string | TNil;
}>;

const sportCodeToIdMap = {} as Record<ESportCode, string>;
const sportIdToCodeMap = {} as Record<string, ESportCode>;

const baseSportIds: string[] = [];
const virtualSportIds: string[] = [];
const eSportIds: string[] = [];
const allSportIds: string[] = [];

const sportResolver = ({ id, code }: TIsKindArg) => {
  if (isNotNil(id)) {
    const sportCode = deprecatedGetNotNil(sportIdToCodeMap[id], `[sportResolver] Sport Code by ID ${id}`);

    return deprecatedGetNotNil(sportsMap[sportCode], `[sportResolver] Sport by Code through ID ${sportCode} ${id}`);
  }

  if (isNotNil(code)) {
    return deprecatedGetNotNil(sportsMap[code], `[sportResolver] Sport by Code ${code}`);
  }

  return null;
}

const isKindFactory = (kind: ESportKind) => ({
  id: (id: TIsKindArg["id"]) => sportResolver({ id })?.kind === kind,
  code: (code: TIsKindArg["code"]) => sportResolver({ code })?.kind === kind,
});

const isBaseSport = isKindFactory(ESportKind.base);
const isVirtualSport = isKindFactory(ESportKind.virtual);
const isESportSport = isKindFactory(ESportKind.esport);

Object.values(sportsMap).forEach((sport) => {
  sportCodeToIdMap[sport.code] = sport.uuid;
  sportIdToCodeMap[sport.uuid] = sport.code;

  allSportIds.push(sport.uuid);

  if (isBaseSport.id(sport.uuid)) {
    baseSportIds.push(sport.uuid);
  }

  if (isESportSport.id(sport.uuid)) {
    eSportIds.push(sport.uuid);
  }

  if (isVirtualSport.id(sport.uuid)) {
    virtualSportIds.push(sport.uuid);
  }
});

const prioritizedSportCodes = keys(sportsMap)
  .sort((a, b) => {
    const aPriority = sportsMap[a].priority;
    const bPriority = sportsMap[b].priority;

    if (aPriority < bPriority) {
      return 1;
    }

    if (aPriority > bPriority) {
      return -1;
    }

    return 0
  });

export {
  sportCodeToIdMap,
  sportIdToCodeMap,
  isBaseSport,
  isESportSport,
  isVirtualSport,
  eSportIds,
  virtualSportIds,
  baseSportIds,
  allSportIds,
  prioritizedSportCodes,
}
