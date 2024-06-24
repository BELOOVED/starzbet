import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";

const virtualRacingSport = [
  sportCodeToIdMap[ESportCode.kiron_horse_racing],
  sportCodeToIdMap[ESportCode.kiron_hounds_racing],
  sportCodeToIdMap[ESportCode.kiron_motor_racing],
  sportCodeToIdMap[ESportCode.kiron_harness_racing],
  sportCodeToIdMap[ESportCode.kiron_steeple_chase],
];

const EVirtualRacingMarketTabEnum = {
  winner: "winner",
  forecast: "forecast",
  tricast: "tricast",
  swinger: "swinger",
};

const virtualRacingMarketTabNameMap = {
  [EVirtualRacingMarketTabEnum.winner]: [EMarketType.place_number_race_winner, EMarketType.place_number_race_place],
  [EVirtualRacingMarketTabEnum.forecast]: [EMarketType.place_number_race_forecast],
  [EVirtualRacingMarketTabEnum.tricast]: [EMarketType.place_number_race_tricast],
  [EVirtualRacingMarketTabEnum.swinger]: [EMarketType.place_number_race_swinger],
};

const virtualRacingMarketPerTabMap = {
  [EVirtualRacingMarketTabEnum.winner]: [EMarketType.place_number_race_winner, EMarketType.place_number_race_place],
  [EVirtualRacingMarketTabEnum.forecast]: [EMarketType.place_number_race_forecast, EMarketType.place_number_race_reverse_forecast],
  [EVirtualRacingMarketTabEnum.tricast]: [EMarketType.place_number_race_tricast, EMarketType.place_number_race_reverse_tricast],
  [EVirtualRacingMarketTabEnum.swinger]: [EMarketType.place_number_race_swinger],
};

const virtualRacingCastGroupMarketType = [
  [EMarketType.place_number_race_swinger],
  [EMarketType.place_number_race_forecast, EMarketType.place_number_race_reverse_forecast],
  [EMarketType.place_number_race_tricast, EMarketType.place_number_race_reverse_tricast],
];

const virtualRacingGroupMarketType = [
  [EMarketType.place_number_race_winner],
  [EMarketType.place_number_race_place],
  ...virtualRacingCastGroupMarketType,
];

const virtualRacingMarketGroupWithAny = [
  EMarketType.place_number_race_reverse_forecast,
  EMarketType.place_number_race_reverse_tricast,
  EMarketType.place_number_race_swinger,
];

const virtualCastPlaceCountMap: Partial<Record<EMarketGroup, number>> = {
  [EMarketGroup.race_forecast]: 2,
  [EMarketGroup.race_tricast]: 3,
  [EMarketGroup.race_swinger]: 2,
  [EMarketGroup.race_reverse_forecast]: 2,
  [EMarketGroup.race_reverse_tricast]: 3,
};

export {
  virtualRacingSport,
  EVirtualRacingMarketTabEnum,
  virtualRacingMarketPerTabMap,
  virtualRacingGroupMarketType,
  virtualRacingMarketGroupWithAny,
  virtualCastPlaceCountMap,
  virtualRacingCastGroupMarketType,
  virtualRacingMarketTabNameMap,
};
