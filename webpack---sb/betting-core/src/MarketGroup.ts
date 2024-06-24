import { EScoreType } from "./EScoreType";
import { EMarketGroup } from "./EMarketGroup";
import { EMarketType } from "./MarketType";

export const marketGroupsWithYesNo = [
  EMarketGroup.both_to_score_yes_no,
  EMarketGroup.team_to_score_yes_no_team,
  EMarketGroup.draw,
  EMarketGroup.win_to_nil_team,
  EMarketGroup.exact_number_yes_no,
  EMarketGroup.exact_number_yes_no_team,
  EMarketGroup.range_number_yes_no,
  EMarketGroup.range_number_yes_no_team,
  EMarketGroup.cs_one_of_win_yes_no,
  EMarketGroup.team_to_score_in_both_halves_yes_no_team,
  EMarketGroup.team_to_win_both_halves_yes_no_team,
  EMarketGroup.team_to_win_either_half_yes_no_team,
  EMarketGroup.team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketGroup.team_to_win_by_exact_number_yes_no_team,
  EMarketGroup.team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketGroup.both_to_score_and_o_yes_no,
  EMarketGroup.both_to_score_and_u_yes_no,
  EMarketGroup.extra_inning_yes_no,
  EMarketGroup.both_to_score_and_win_team_yes_no,
  EMarketGroup.to_score_in_range,
  EMarketGroup.to_score_in_range_team,
  EMarketGroup.some_lose_first_set_and_win_match_yes_no,
  EMarketGroup.some_set_clean_win_in_match_yes_no,
  EMarketGroup.overtime_yes_no,
  EMarketGroup.team_win_first_half_and_match_yes_no_team,
  EMarketGroup.team_win_first_quarter_and_match_yes_no_team,
  EMarketGroup.to_win_all_scopes_team_yes_no,
];

export const marketGroupsWithTotal = [
  EMarketGroup.ou,
  EMarketGroup.ou_team,
  EMarketGroup.interval_ou,
  EMarketGroup.interval_ou_team,
  EMarketGroup.o_win_team,
  EMarketGroup.o_win_draw_team,
  EMarketGroup.u_win_team,
  EMarketGroup.u_win_draw_team,
  EMarketGroup.o_draw,
  EMarketGroup.u_draw,
  EMarketGroup.both_to_score_and_o_yes_no,
  EMarketGroup.both_to_score_and_u_yes_no,
];

export const intervalMarketGroupList = [
  EMarketGroup.interval_1x2,
  EMarketGroup.interval_dc,
  EMarketGroup.interval_ah,
  EMarketGroup.interval_ou,
  EMarketGroup.interval_ou_team,
];

export const teamMarketGroupList = [
  EMarketGroup.ou_team,
  EMarketGroup.interval_ou_team,
  EMarketGroup.odd_even_team,
  EMarketGroup.u_win_draw_team,
  EMarketGroup.u_win_team,
  EMarketGroup.o_win_team,
  EMarketGroup.o_win_team,
  EMarketGroup.o_win_draw_team,
  EMarketGroup.win_to_nil_team,
  EMarketGroup.range_number_team,
  EMarketGroup.range_number_yes_no_team,
  EMarketGroup.exact_number_team,
  EMarketGroup.exact_number_yes_no_team,
  EMarketGroup.both_to_score_and_win_team_yes_no,
  EMarketGroup.team_to_score_in_both_halves_yes_no_team,
  EMarketGroup.team_to_win_both_halves_yes_no_team,
  EMarketGroup.team_to_win_either_half_yes_no_team,
  EMarketGroup.team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketGroup.team_to_win_by_exact_number_yes_no_team,
  EMarketGroup.team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketGroup.team_to_score_yes_no_team,
  EMarketGroup.to_score_in_range_team,
  EMarketGroup.to_win_all_scopes_team_yes_no,
  EMarketGroup.team_win_first_quarter_and_match_yes_no_team,
  EMarketGroup.team_win_first_half_and_match_yes_no_team,
];

export const availableMarketGroupList = [
  EMarketGroup._1x2,
  EMarketGroup._1x2_early_payout,
  EMarketGroup._12,
  EMarketGroup._1x2_ou,
  EMarketGroup._1x2_teams_to_score,
  EMarketGroup.dc,
  EMarketGroup.ah,
  EMarketGroup.ou,
  EMarketGroup.cs,
  EMarketGroup.odd_even,
  EMarketGroup.odd_even_team,
  EMarketGroup.ou_team,
  EMarketGroup.o_win_team,
  EMarketGroup.o_win_draw_team,
  EMarketGroup.u_win_team,
  EMarketGroup.u_win_draw_team,
  EMarketGroup.o_draw,
  EMarketGroup.u_draw,
  EMarketGroup.win_to_nil_team,
  EMarketGroup.range_number,
  EMarketGroup.range_number_team,
  EMarketGroup.exact_number_team,
  EMarketGroup.range_number_yes_no,
  EMarketGroup.range_number_yes_no_team,
  EMarketGroup.exact_number,
  EMarketGroup.exact_number_team,
  EMarketGroup.exact_number_yes_no,
  EMarketGroup.exact_number_yes_no_team,
  EMarketGroup.ht_ft,
  EMarketGroup.both_to_score_yes_no,
  EMarketGroup.team_to_score_yes_no_team,
  EMarketGroup.draw,
  EMarketGroup.to_score_first,
  EMarketGroup.team_to_win_by_exact_number_yes_no_team,
  EMarketGroup.both_to_score_and_o_yes_no,
  EMarketGroup.both_to_score_and_u_yes_no,
  EMarketGroup.team_to_win_both_halves_yes_no_team,
  EMarketGroup.team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketGroup.team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketGroup.team_to_win_either_half_yes_no_team,
  EMarketGroup.team_to_score_in_both_halves_yes_no_team,
  EMarketGroup.interval_1x2,
  EMarketGroup.interval_dc,
  EMarketGroup.interval_ah,
  EMarketGroup.interval_ou,
  EMarketGroup.interval_ou_team,
  EMarketGroup.to_score_x,
  EMarketGroup.to_score_last,
  EMarketGroup.both_to_score_and_win_team_yes_no,
  EMarketGroup.to_score_in_range,
  EMarketGroup.to_score_in_range_team,
  EMarketGroup.to_score_x_in_range,
  EMarketGroup.some_lose_first_set_and_win_match_yes_no,
  EMarketGroup.some_set_clean_win_in_match_yes_no,
  EMarketGroup.overtime_yes_no,
  EMarketGroup.team_win_first_half_and_match_yes_no_team,
  EMarketGroup.team_win_first_quarter_and_match_yes_no_team,
  EMarketGroup.to_win_all_scopes_team_yes_no,
  EMarketGroup.highest_scopes_score,
  EMarketGroup.highest_scope_score,
  EMarketGroup.race_winner,
  EMarketGroup.race_place,
  EMarketGroup.race_forecast,
  EMarketGroup.race_tricast,
  EMarketGroup.race_reverse_forecast,
  EMarketGroup.race_reverse_tricast,
  EMarketGroup.race_swinger,
  EMarketGroup.race_odd_even,
  EMarketGroup.race_high_low,
  EMarketGroup.race_odd_even_high_low,
  EMarketGroup.odd_even_high_low,
  EMarketGroup._12_score,
  EMarketGroup.longest_consecutive,
  EMarketGroup.to_score_race,
  EMarketGroup.roulette_odd_even,
  EMarketGroup.roulette_red_black,
  EMarketGroup.roulette_numbers,
  EMarketGroup.win_most_periods,
  EMarketGroup.triple_result,
  EMarketGroup.winning_margin,
  EMarketGroup.custom,
];

const deleteStart = (initialStr: string, deletedStr: string) => {
  if (initialStr.startsWith(deletedStr)) {
    return initialStr.slice(deletedStr.length);
  }

  return initialStr;
};

const parseMarketGroup = (marketType: EMarketType) =>
  Object.values(EScoreType)
    .reduce<EMarketGroup>(
      (acc, scoreType) => deleteStart(acc, `${scoreType}_`) as EMarketGroup,
      marketType as unknown as EMarketGroup,
    );

export const marketTypeToMarketGroupMap = Object.values(EMarketType).reduce((acc, marketType) => ({
  ...acc,
  [marketType]: parseMarketGroup(marketType),
}), {} as Record<EMarketType, EMarketGroup>);

export const marketGroupToMarketTypeMap = Object.values(EMarketType).reduce((acc, marketType) => {
  const marketGroup = parseMarketGroup(marketType);

  return {
    ...acc,
    [marketGroup]: (acc[marketGroup] || []).concat(marketType),
  };
}, {} as Record<EMarketGroup, EMarketType[]>);

export const toMarketTypes = (groups: EMarketGroup[]) => groups.flatMap((group) => marketGroupToMarketTypeMap[group]);
