// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { getMarketTypeListBySportId as baseGetMarketTypeList } from "../../Store/Feed/Model/Market/Market";
import { sortBy } from "../../Utils/SortBy";

const priorityTypes = [
  EMarketType.score_1x2,
  EMarketType.score_12,
  EMarketType.score_dc,
  EMarketType.score_odd_even,
  EMarketType.score_both_to_score_yes_no,
  EMarketType.score_ou,
];

const kironPriorityTypes = [
  EMarketType.score_1x2,
  EMarketType.score_dc,
  EMarketType.score_12,
  EMarketType.score_ou,
  EMarketType.winner_number_race_odd_even,
  EMarketType.winner_number_race_high_low,
  EMarketType.winner_number_race_odd_even_high_low,
  EMarketType.score_12_score,
];

const basketballTypes = [
  EMarketType.score_12,
  EMarketType.score_ah,
  EMarketType.score_odd_even,
  EMarketType.score_both_to_score_yes_no,
  EMarketType.score_ou,
];

const kironSports = [
  ESportCode.kiron_soccer,
  ESportCode.kiron_ice_hockey,
  ESportCode.kiron_table_tennis,
  ESportCode.kiron_badminton,
  ESportCode.kiron_archery,
  ESportCode.kiron_harness_racing,
  ESportCode.kiron_steeple_chase,
  ESportCode.kiron_horse_racing,
  ESportCode.kiron_hounds_racing,
  ESportCode.kiron_motor_racing,
  ESportCode.kiron_cricket,
].map((it) => sportCodeToIdMap[it]);

const getTypes = (sportId) => {
  if (sportId === sportCodeToIdMap[ESportCode.basketball]) {
    return basketballTypes;
  }

  if (kironSports.includes(sportId)) {
    return kironPriorityTypes;
  }

  return priorityTypes;
};

const getMarketTypeListBySportId = (sportId) => {
  const types = getTypes(sportId);

  return sortBy(
    (it) => types.indexOf(it),
    baseGetMarketTypeList(sportId).filter((type) => types.includes(type)),
  );
};

export { getMarketTypeListBySportId };
