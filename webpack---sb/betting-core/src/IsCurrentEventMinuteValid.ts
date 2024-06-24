import { ESportCode } from "./ESportCode";
import { sportCodeToIdMap } from "./SportsMapUtils";

type TRawMinute = string | null | undefined;
type TValidMinute = `${number}`;

const sportsWithMinute = [
  sportCodeToIdMap[ESportCode.soccer],
  sportCodeToIdMap[ESportCode.bandy],
  sportCodeToIdMap[ESportCode.basketball],
  sportCodeToIdMap[ESportCode.floorball],
  sportCodeToIdMap[ESportCode.futsal],
  sportCodeToIdMap[ESportCode.handball],
  sportCodeToIdMap[ESportCode.netball],
  sportCodeToIdMap[ESportCode.e_ice_hockey],
  sportCodeToIdMap[ESportCode.e_basketball],
  sportCodeToIdMap[ESportCode.e_soccer],
  sportCodeToIdMap[ESportCode.e_ice_hockey],
  sportCodeToIdMap[ESportCode.beach_soccer],
  sportCodeToIdMap[ESportCode.field_hockey],
];

const withMinute = (sportId: string) => sportsWithMinute.includes(sportId);

const isCurrentEventMinuteValid = (currentMinute: TRawMinute, sportId: string): currentMinute is TValidMinute =>
  withMinute(sportId) && Boolean(currentMinute) && currentMinute !== "pause";

export { TRawMinute, TValidMinute, isCurrentEventMinuteValid };
