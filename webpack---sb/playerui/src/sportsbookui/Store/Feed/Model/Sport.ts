import { sportsMap } from "@sb/betting-core/SportsMap";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { ESportKind } from "@sb/betting-core/ESportKind";
import { sportCodeToIdMap, sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { sportCodeTKeys } from "@sb/betting-core/SharedTKeys/SportCodeTKeys";
import { ascend, descend, getNotNil } from "@sb/utils";
import type { IFlatSport } from "@sb/betting-core/Feed/Types";
import { IS_STARZBET_IN } from "../../../../ServerEnvironment";
import { baseSortWith } from "../../../Utils/SortWith";

const isBaseSportKind = (sportKind: ESportKind) => sportKind === ESportKind.base;

const isVirtualSportKind = (sportKind: ESportKind) => sportKind === ESportKind.virtual;

const getSportKindById = (sportId: string): ESportKind => sportsMap[sportIdToCodeMap[sportId]!].kind;

const isEsport = (sportId: string | undefined) => !!sportId && getSportKindById(sportId) === ESportKind.esport;

const isVirtual = (sportId: string) => !!sportId && isVirtualSportKind(getSportKindById(sportId));

const isVirtualGame = (sportId: string) => sportId && [
  ESportCode.kiron_roulette,
  ESportCode.kiron_keno,
  ESportCode.kiron_racing_roulette,
  ESportCode.kiron_lucky_loot,
].includes(sportIdToCodeMap[sportId] as ESportCode);

const virtualSportIdOrder = [
  sportCodeToIdMap[ESportCode.kiron_soccer],
  sportCodeToIdMap[ESportCode.kiron_horse_racing],
  sportCodeToIdMap[ESportCode.kiron_hounds_racing],
  sportCodeToIdMap[ESportCode.kiron_ice_hockey],
  sportCodeToIdMap[ESportCode.kiron_keno],
  sportCodeToIdMap[ESportCode.kiron_table_tennis],
  sportCodeToIdMap[ESportCode.kiron_steeple_chase],
  sportCodeToIdMap[ESportCode.kiron_roulette],
  sportCodeToIdMap[ESportCode.kiron_harness_racing],
  sportCodeToIdMap[ESportCode.kiron_motor_racing],
  sportCodeToIdMap[ESportCode.kiron_lucky_loot],
  sportCodeToIdMap[ESportCode.kiron_racing_roulette],
];

virtualSportIdOrder.splice(
  IS_STARZBET_IN ? 0 : 3,
  0,
  sportCodeToIdMap[ESportCode.kiron_cricket],
);

const isBaseSport = (sportId: string) => !!sportId && isBaseSportKind(getSportKindById(sportId));

const getSportTKeyById = (sportId: string) => {
  const sportCode = getNotNil(sportIdToCodeMap[sportId], ["Feed", "Model", "Sport", "getSportTKeyById"], `Sport Code by ID ${sportId}`);

  const key = sportCodeTKeys[sportCode];

  return key || sportCode;
};

const sortSportByPriority = (list: IFlatSport[]) => baseSortWith(
  [
    descend(({ priority }) => priority),
    ascend(({ id }) => getSportTKeyById(id)),
  ],
  list,
);

const sortByPriority = (sports: Record<string, IFlatSport>, sportIdList: string[]): string[] => baseSortWith(
  [
    descend((sportId) => sports[sportId]!.priority),
    ascend((sportId) => getSportTKeyById(sportId)),
  ],
  sportIdList,
);

const sortByAlphabet = (sports: Record<string, IFlatSport>, sportIdList: string[]): string[] => baseSortWith(
  [
    ascend((sportId) => getSportTKeyById(sportId)),
    descend((sportId) => sports[sportId]!.priority),
  ],
  sportIdList,
);

export {
  isEsport,
  isBaseSport,
  isVirtual,
  getSportTKeyById,
  sortSportByPriority,
  sortByPriority,
  sortByAlphabet,
  isVirtualGame,
  getSportKindById,
  virtualSportIdOrder,
};
