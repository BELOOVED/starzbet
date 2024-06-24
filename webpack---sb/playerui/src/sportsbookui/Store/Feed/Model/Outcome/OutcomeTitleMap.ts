// @ts-nocheck
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { outcomeEnumValueTKeys } from "@sb/betting-core/SharedTKeys/OutcomeEnumValueTKeys";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { dcViewEnumText, outcomeViewEnum, outcomeViewEnumText } from "./OutcomeViewEnum";

const outcomeParameter = " ";

const total = [outcomeParameter, outcomeEnumValueTKeys[EOutcomeEnumValue.over], outcomeEnumValueTKeys[EOutcomeEnumValue.under]];

const yesNo = [outcomeEnumValueTKeys[EOutcomeEnumValue.yes], outcomeEnumValueTKeys[EOutcomeEnumValue.no]];

const yesNoTotal = [outcomeParameter, outcomeEnumValueTKeys[EOutcomeEnumValue.yes], outcomeEnumValueTKeys[EOutcomeEnumValue.no]];

const score1x2 = [
  outcomeViewEnumText[outcomeViewEnum.team1],
  outcomeViewEnumText[EOutcomeEnumValue.draw],
  outcomeViewEnumText[outcomeViewEnum.team2],
];

const doubleChance = [
  dcViewEnumText[outcomeViewEnum.team1Draw],
  dcViewEnumText[outcomeViewEnum.team2Draw],
  dcViewEnumText[outcomeViewEnum.team1Team2],
];

const handicap = [outcomeParameter, outcomeViewEnumText[outcomeViewEnum.team1], outcomeViewEnumText[outcomeViewEnum.team2]];

const oddEven = [outcomeEnumValueTKeys[EOutcomeEnumValue.odd], outcomeEnumValueTKeys[EOutcomeEnumValue.even]];

const highLow = [outcomeEnumValueTKeys[EOutcomeEnumValue.high], outcomeEnumValueTKeys[EOutcomeEnumValue.low]];

const oddEvenLowHigh = [
  outcomeEnumValueTKeys[EOutcomeEnumValue.odd_high],
  outcomeEnumValueTKeys[EOutcomeEnumValue.odd_low],
  outcomeEnumValueTKeys[EOutcomeEnumValue.even_high],
  outcomeEnumValueTKeys[EOutcomeEnumValue.even_low],
];

const score1no2 = [
  outcomeViewEnumText[outcomeViewEnum.team1],
  outcomeViewEnumText[EOutcomeEnumValue.no],
  outcomeViewEnumText[outcomeViewEnum.team2],
];

const score12score = [
  outcomeViewEnumText[outcomeViewEnum.team1Equal],
  outcomeViewEnumText[outcomeViewEnum.team1Over],
  outcomeViewEnumText[outcomeViewEnum.team2Equal],
  outcomeViewEnumText[outcomeViewEnum.team2Over],
];

const outcomeTitleMap = {
  [EMarketGroup._1x2]: score1x2,
  [EMarketGroup._12]: [outcomeViewEnumText[outcomeViewEnum.team1], outcomeViewEnumText[outcomeViewEnum.team2]],
  [EMarketGroup.dc]: doubleChance,
  [EMarketGroup.ah]: handicap,
  [EMarketGroup.ou]: total,
  [EMarketGroup.odd_even]: oddEven,
  [EMarketGroup.odd_even_team]: oddEven,
  [EMarketGroup.ou_team]: total,
  [EMarketGroup.u_win_team]: yesNoTotal,
  [EMarketGroup.u_win_draw_team]: yesNoTotal,
  [EMarketGroup.o_win_team]: yesNoTotal,
  [EMarketGroup.o_win_draw_team]: yesNoTotal,
  [EMarketGroup.o_draw]: yesNoTotal,
  [EMarketGroup.u_draw]: yesNoTotal,
  [EMarketGroup.win_to_nil_team]: yesNo,
  [EMarketGroup.range_number_yes_no]: yesNo,
  [EMarketGroup.range_number_yes_no_team]: yesNo,
  [EMarketGroup.exact_number_yes_no]: yesNo,
  [EMarketGroup.exact_number_yes_no_team]: yesNo,
  [EMarketGroup.both_to_score_yes_no]: yesNo,
  [EMarketGroup.team_to_score_in_both_halves_yes_no_team]: yesNo,
  [EMarketGroup.team_to_win_both_halves_yes_no_team]: yesNo,
  [EMarketGroup.team_to_win_either_half_yes_no_team]: yesNo,
  [EMarketGroup.team_to_win_by_exact_number_yes_no_team]: yesNo,
  [EMarketGroup.team_to_win_by_exact_number_or_draw_yes_no_team]: yesNo,
  [EMarketGroup.team_to_score_yes_no_team]: yesNo,
  [EMarketGroup.draw]: yesNo,
  [EMarketGroup.both_to_score_and_o_yes_no]: yesNoTotal,
  [EMarketGroup.both_to_score_and_u_yes_no]: yesNoTotal,
  [EMarketGroup.extra_inning_yes_no]: yesNo,
  [EMarketGroup.to_score_first]: score1no2,
  [EMarketGroup.team_win_first_half_and_not_to_lose_yes_no_team]: yesNo,
  [EMarketGroup.interval_1x2]: score1x2,
  [EMarketGroup.interval_dc]: doubleChance,
  [EMarketGroup.interval_ah]: handicap,
  [EMarketGroup.interval_ou]: total,
  [EMarketGroup.interval_ou_team]: total,
  [EMarketGroup.to_score_x]: score1no2,
  [EMarketGroup.to_score_last]: score1no2,
  [EMarketGroup.both_to_score_and_win_team_yes_no]: yesNo,
  [EMarketGroup.to_score_in_range]: yesNo,
  [EMarketGroup.to_score_in_range_team]: yesNo,
  [EMarketGroup.some_lose_first_set_and_win_match_yes_no]: yesNo,
  [EMarketGroup.some_set_clean_win_in_match_yes_no]: yesNo,
  [EMarketGroup.overtime_yes_no]: yesNo,
  [EMarketGroup.team_win_first_half_and_match_yes_no_team]: yesNo,
  [EMarketGroup.team_win_first_quarter_and_match_yes_no_team]: yesNo,
  [EMarketGroup.to_win_all_scopes_team_yes_no]: yesNo,
  [EMarketGroup.race_odd_even]: oddEven,
  [EMarketGroup.race_high_low]: highLow,
  [EMarketGroup.race_odd_even_high_low]: oddEvenLowHigh,
  [EMarketGroup._12_score]: score12score,
};

const outcomeTitleByMarketType = <T = unknown>(marketType: EMarketType, paramMap = {}, overrideMap?): T[] => {
  if (!marketType || !marketTypeToMarketGroupMap[marketType]) {
    return [];
  }

  const group = marketTypeToMarketGroupMap[marketType];

  const titleMap = overrideMap ? { ...outcomeTitleMap, ...overrideMap } : outcomeTitleMap;

  const list = titleMap[group] || [];

  if (paramMap[group]) {
    return list.map((it) => it === outcomeParameter ? paramMap[group] : it);
  }

  return (
    list
  );
};

export { outcomeTitleByMarketType };
