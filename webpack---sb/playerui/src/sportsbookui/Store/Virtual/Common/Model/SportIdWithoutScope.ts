import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { virtualRacingSport } from "./VirtualRacingSport";

const sportIdsWithoutScope = [
  ...virtualRacingSport,
  sportCodeToIdMap[ESportCode.kiron_lucky_loot],
  sportCodeToIdMap[ESportCode.kiron_keno],
  sportCodeToIdMap[ESportCode.kiron_racing_roulette],
  sportCodeToIdMap[ESportCode.kiron_roulette],
];

export { sportIdsWithoutScope };
