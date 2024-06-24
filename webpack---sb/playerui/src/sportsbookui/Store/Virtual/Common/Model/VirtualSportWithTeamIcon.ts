import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";

const virtualSportWithTeamIcon = [
  sportCodeToIdMap[ESportCode.kiron_soccer],
  sportCodeToIdMap[ESportCode.kiron_ice_hockey],
  sportCodeToIdMap[ESportCode.kiron_cricket],
];

const isVirtualSportWithTeamIcon = (sportId: string) =>
  virtualSportWithTeamIcon.includes(sportId);

export { isVirtualSportWithTeamIcon };
