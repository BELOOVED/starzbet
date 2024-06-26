// @ts-nocheck
import {
  sportsbookui_additionalMarket_tab_all,
  sportsbookui_additionalMarket_tab_goals,
  sportsbookui_additionalMarket_tab_halves,
  sportsbookui_additionalMarket_tab_handicaps,
  sportsbookui_additionalMarket_tab_main,
  sportsbookui_additionalMarket_tab_match,
  sportsbookui_additionalMarket_tab_minutes,
  sportsbookui_additionalMarket_tab_periods,
  sportsbookui_additionalMarket_tab_popular,
  sportsbookui_additionalMarket_tab_quarters,
  sportsbookui_additionalMarket_tab_set,
  sportsbookui_additionalMarket_tab_statBets,
  sportsbookui_additionalMarket_tab_teams,
  sportsbookui_additionalMarket_tab_teamTotals,
  sportsbookui_additionalMarket_tab_totals,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { EScopeType } from "@sb/betting-core/EScopeType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { type TExplicitAny } from "@sb/utils";
import { isMainScope, mainScopes } from "../Scope";
import { marketIntervalTypes, marketTeamTypes, marketTypesWithHandicap, marketTypesWithTeamTotal, marketTypesWithTotal } from "./Market";

// TODO - Add normal enum

const marketTabEnum = {
  all: "all",
  popular: "popular",
  goals: "goals",
  teams: "teams",
  minutes: "minutes",
  statBets: "statBets",
  match: "match",
  totals: "totals",
  teamTotals: "teamTotals",
  handicaps: "handicaps",
  halves: "halves",
  quarters: "quarters",
  set: "set",
  main: "main",
  periods: "periods",
} as const;

const priorityForAll = [
  EMarketType.fact_custom,
  EMarketType.score_1x2,
  EMarketType.score_1x2_early_payout,
  EMarketType.score_interval_1x2,
  EMarketType.score_12,
  EMarketType.score_dc,
  EMarketType.score_interval_dc,
  EMarketType.score_to_score_first,
  EMarketType.score_to_score_x,
  EMarketType.score_to_score_last,
  EMarketType.score_ou,
  EMarketType.score_interval_ou,
  EMarketType.game_ou,
  EMarketType.point_ou,
  EMarketType.score_both_to_score_yes_no,
  EMarketType.score_ah,
  EMarketType.score_interval_ah,
  EMarketType.game_ah,
  EMarketType.point_ah,
  EMarketType.score_ht_ft,
  EMarketType.score_cs,
  EMarketType.score_ou_team,
  EMarketType.score_interval_ou_team,
  EMarketType.game_ou_team,
  EMarketType.point_ou_team,
  EMarketType.score_both_to_score_and_win_team_yes_no,
  EMarketType.score_o_win_team,
  EMarketType.point_o_win_team,
  EMarketType.game_o_win_team,
  EMarketType.score_u_win_team,
  EMarketType.point_u_win_team,
  EMarketType.game_u_win_team,
  EMarketType.score_o_win_draw_team,
  EMarketType.score_u_win_draw_team,
  EMarketType.score_team_to_score_yes_no_team,
  EMarketType.score_win_to_nil_team,
  EMarketType.score_team_to_win_either_half_yes_no_team,
  EMarketType.score_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.score_exact_number,
  EMarketType.score_exact_number_team,
  EMarketType.score_exact_number_yes_no,
  EMarketType.score_exact_number_yes_no_team,
  EMarketType.score_team_to_score_in_both_halves_yes_no_team,
  EMarketType.score_team_to_win_both_halves_yes_no_team,
  EMarketType.shot_on_goal_1x2,
  EMarketType.shot_on_goal_dc,
  EMarketType.shot_on_goal_ou,
  EMarketType.shot_on_goal_ah,
  EMarketType.shot_on_goal_cs,
  EMarketType.shot_on_goal_odd_even,
  EMarketType.shot_on_goal_odd_even_team,
  EMarketType.shot_on_goal_u_win_team,
  EMarketType.shot_on_goal_o_win_team,
  EMarketType.shot_on_goal_o_win_draw_team,
  EMarketType.shot_on_goal_u_win_draw_team,
  EMarketType.shot_on_goal_u_draw,
  EMarketType.shot_on_goal_o_draw,
  EMarketType.shot_on_goal_win_to_nil_team,
  EMarketType.shot_on_goal_range_number,
  EMarketType.shot_on_goal_range_number_team,
  EMarketType.shot_on_goal_range_number_yes_no,
  EMarketType.shot_on_goal_range_number_yes_no_team,
  EMarketType.shot_on_goal_ht_ft,
  EMarketType.shot_on_goal_draw,
  EMarketType.shot_on_goal_both_to_score_yes_no,
  EMarketType.shot_on_goal_exact_number,
  EMarketType.shot_on_goal_exact_number_team,
  EMarketType.shot_on_goal_exact_number_yes_no,
  EMarketType.shot_on_goal_exact_number_yes_no_team,
  EMarketType.shot_on_goal_team_to_score_yes_no_team,
  EMarketType.shot_on_goal_both_to_score_and_o_yes_no,
  EMarketType.shot_on_goal_both_to_score_and_u_yes_no,
  EMarketType.shot_on_goal_team_to_score_in_both_halves_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_both_halves_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_either_half_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_by_exact_number_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.shot_on_goal_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.shot_on_goal_to_score_first,
  EMarketType.shot_on_goal_to_score_x_in_range,
  EMarketType.shot_on_goal_to_score_last,
  EMarketType.shot_on_goal_to_score_in_range,
  EMarketType.shot_on_goal_to_score_in_range_team,
  EMarketType.shot_on_goal_interval_1x2,
  EMarketType.shot_on_goal_interval_ah,
  EMarketType.shot_on_goal_interval_ou,
  EMarketType.shot_on_goal_interval_ou_team,
  EMarketType.shot_on_goal_interval_dc,
  EMarketType.shot_on_goal_to_score_x,
  EMarketType.shot_on_goal_both_to_score_and_win_team_yes_no,
  EMarketType.corner_1x2,
  EMarketType.corner_dc,
  EMarketType.corner_ah,
  EMarketType.corner_ou,
  EMarketType.corner_ou_team,
  EMarketType.corner_cs,
  EMarketType.corner_odd_even,
  EMarketType.corner_odd_even_team,
  EMarketType.corner_u_win_team,
  EMarketType.corner_o_win_team,
  EMarketType.corner_o_win_draw_team,
  EMarketType.corner_u_win_draw_team,
  EMarketType.corner_u_draw,
  EMarketType.corner_o_draw,
  EMarketType.corner_win_to_nil_team,
  EMarketType.corner_range_number,
  EMarketType.corner_range_number_team,
  EMarketType.corner_range_number_yes_no,
  EMarketType.corner_range_number_yes_no_team,
  EMarketType.corner_ht_ft,
  EMarketType.corner_draw,
  EMarketType.corner_both_to_score_yes_no,
  EMarketType.corner_exact_number,
  EMarketType.corner_exact_number_team,
  EMarketType.corner_exact_number_yes_no,
  EMarketType.corner_exact_number_yes_no_team,
  EMarketType.corner_team_to_score_yes_no_team,
  EMarketType.corner_both_to_score_and_o_yes_no,
  EMarketType.corner_both_to_score_and_u_yes_no,
  EMarketType.corner_team_to_score_in_both_halves_yes_no_team,
  EMarketType.corner_team_to_win_both_halves_yes_no_team,
  EMarketType.corner_team_to_win_either_half_yes_no_team,
  EMarketType.corner_team_to_win_by_exact_number_yes_no_team,
  EMarketType.corner_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.corner_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.corner_to_score_first,
  EMarketType.corner_to_score_x_in_range,
  EMarketType.corner_to_score_last,
  EMarketType.corner_to_score_in_range,
  EMarketType.corner_to_score_in_range_team,
  EMarketType.corner_interval_1x2,
  EMarketType.corner_interval_ah,
  EMarketType.corner_interval_ou,
  EMarketType.corner_interval_ou_team,
  EMarketType.corner_interval_dc,
  EMarketType.corner_to_score_x,
  EMarketType.corner_both_to_score_and_win_team_yes_no,
  EMarketType.yellow_card_1x2,
  EMarketType.red_card_1x2,
  EMarketType.yellow_card_dc,
  EMarketType.red_card_dc,
  EMarketType.yellow_card_ah,
  EMarketType.red_card_ah,
  EMarketType.yellow_card_ou,
  EMarketType.red_card_ou,
  EMarketType.yellow_card_ou_team,
  EMarketType.red_card_ou_team,
  EMarketType.yellow_card_cs,
  EMarketType.red_card_cs,
  EMarketType.yellow_card_odd_even,
  EMarketType.red_card_odd_even,
  EMarketType.yellow_card_odd_even_team,
  EMarketType.red_card_odd_even_team,
  EMarketType.yellow_card_u_win_team,
  EMarketType.red_card_u_win_team,
  EMarketType.yellow_card_o_win_team,
  EMarketType.red_card_o_win_team,
  EMarketType.yellow_card_o_win_draw_team,
  EMarketType.red_card_o_win_draw_team,
  EMarketType.yellow_card_u_win_draw_team,
  EMarketType.red_card_u_win_draw_team,
  EMarketType.yellow_card_u_draw,
  EMarketType.red_card_u_draw,
  EMarketType.yellow_card_o_draw,
  EMarketType.red_card_o_draw,
  EMarketType.yellow_card_win_to_nil_team,
  EMarketType.red_card_win_to_nil_team,
  EMarketType.yellow_card_range_number,
  EMarketType.red_card_range_number,
  EMarketType.yellow_card_range_number_team,
  EMarketType.red_card_range_number_team,
  EMarketType.yellow_card_range_number_yes_no,
  EMarketType.red_card_range_number_yes_no,
  EMarketType.yellow_card_range_number_yes_no_team,
  EMarketType.red_card_range_number_yes_no_team,
  EMarketType.yellow_card_ht_ft,
  EMarketType.red_card_ht_ft,
  EMarketType.yellow_card_draw,
  EMarketType.red_card_draw,
  EMarketType.yellow_card_both_to_score_yes_no,
  EMarketType.red_card_both_to_score_yes_no,
  EMarketType.yellow_card_exact_number,
  EMarketType.red_card_exact_number,
  EMarketType.yellow_card_exact_number_team,
  EMarketType.red_card_exact_number_team,
  EMarketType.yellow_card_exact_number_yes_no,
  EMarketType.red_card_exact_number_yes_no,
  EMarketType.yellow_card_exact_number_yes_no_team,
  EMarketType.red_card_exact_number_yes_no_team,
  EMarketType.yellow_card_team_to_score_yes_no_team,
  EMarketType.red_card_team_to_score_yes_no_team,
  EMarketType.yellow_card_both_to_score_and_o_yes_no,
  EMarketType.red_card_both_to_score_and_o_yes_no,
  EMarketType.yellow_card_both_to_score_and_u_yes_no,
  EMarketType.red_card_both_to_score_and_u_yes_no,
  EMarketType.yellow_card_team_to_score_in_both_halves_yes_no_team,
  EMarketType.red_card_team_to_score_in_both_halves_yes_no_team,
  EMarketType.yellow_card_team_to_win_both_halves_yes_no_team,
  EMarketType.red_card_team_to_win_both_halves_yes_no_team,
  EMarketType.yellow_card_team_to_win_either_half_yes_no_team,
  EMarketType.red_card_team_to_win_either_half_yes_no_team,
  EMarketType.yellow_card_team_to_win_by_exact_number_yes_no_team,
  EMarketType.red_card_team_to_win_by_exact_number_yes_no_team,
  EMarketType.yellow_card_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.red_card_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.yellow_card_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.red_card_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.yellow_card_to_score_first,
  EMarketType.red_card_to_score_first,
  EMarketType.yellow_card_to_score_x_in_range,
  EMarketType.red_card_to_score_x_in_range,
  EMarketType.yellow_card_to_score_last,
  EMarketType.red_card_to_score_last,
  EMarketType.yellow_card_to_score_in_range,
  EMarketType.red_card_to_score_in_range,
  EMarketType.yellow_card_to_score_in_range_team,
  EMarketType.red_card_to_score_in_range_team,
  EMarketType.yellow_card_interval_1x2,
  EMarketType.red_card_interval_1x2,
  EMarketType.yellow_card_interval_ah,
  EMarketType.red_card_interval_ah,
  EMarketType.yellow_card_interval_ou,
  EMarketType.red_card_interval_ou,
  EMarketType.yellow_card_interval_ou_team,
  EMarketType.red_card_interval_ou_team,
  EMarketType.yellow_card_interval_dc,
  EMarketType.red_card_interval_dc,
  EMarketType.yellow_card_to_score_x,
  EMarketType.red_card_to_score_x,
  EMarketType.yellow_card_both_to_score_and_win_team_yes_no,
  EMarketType.red_card_both_to_score_and_win_team_yes_no,
  EMarketType.offside_1x2,
  EMarketType.offside_dc,
  EMarketType.offside_ah,
  EMarketType.offside_ou,
  EMarketType.offside_ou_team,
  EMarketType.offside_cs,
  EMarketType.offside_odd_even,
  EMarketType.offside_odd_even_team,
  EMarketType.offside_u_win_team,
  EMarketType.offside_o_win_team,
  EMarketType.offside_o_win_draw_team,
  EMarketType.offside_u_win_draw_team,
  EMarketType.offside_u_draw,
  EMarketType.offside_o_draw,
  EMarketType.offside_win_to_nil_team,
  EMarketType.offside_range_number,
  EMarketType.offside_range_number_team,
  EMarketType.offside_range_number_yes_no,
  EMarketType.offside_range_number_yes_no_team,
  EMarketType.offside_ht_ft,
  EMarketType.offside_draw,
  EMarketType.offside_both_to_score_yes_no,
  EMarketType.offside_exact_number,
  EMarketType.offside_exact_number_team,
  EMarketType.offside_exact_number_yes_no,
  EMarketType.offside_exact_number_yes_no_team,
  EMarketType.offside_team_to_score_yes_no_team,
  EMarketType.offside_both_to_score_and_o_yes_no,
  EMarketType.offside_both_to_score_and_u_yes_no,
  EMarketType.offside_team_to_score_in_both_halves_yes_no_team,
  EMarketType.offside_team_to_win_both_halves_yes_no_team,
  EMarketType.offside_team_to_win_either_half_yes_no_team,
  EMarketType.offside_team_to_win_by_exact_number_yes_no_team,
  EMarketType.offside_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.offside_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.offside_to_score_first,
  EMarketType.offside_to_score_x_in_range,
  EMarketType.offside_to_score_last,
  EMarketType.offside_to_score_in_range,
  EMarketType.offside_to_score_in_range_team,
  EMarketType.offside_interval_1x2,
  EMarketType.offside_interval_ah,
  EMarketType.offside_interval_ou,
  EMarketType.offside_interval_ou_team,
  EMarketType.offside_interval_dc,
  EMarketType.offside_to_score_x,
  EMarketType.offside_both_to_score_and_win_team_yes_no,
  EMarketType.score_odd_even,
  EMarketType.game_odd_even,
  EMarketType.point_odd_even,
  EMarketType.score_odd_even_team,
  EMarketType.game_odd_even_team,
  EMarketType.point_odd_even_team,
  EMarketType.foul_odd_even,
  EMarketType.foul_odd_even_team,
];

const priorityForPopular = [
  EMarketType.fact_custom,
  EMarketType.score_1x2,
  EMarketType.score_interval_1x2,
  EMarketType.score_dc,
  EMarketType.score_interval_dc,
  EMarketType.score_ou,
  EMarketType.score_interval_ou,
  EMarketType.game_ou,
  EMarketType.point_ou,
  EMarketType.score_both_to_score_yes_no,
  EMarketType.score_ah,
  EMarketType.score_interval_ah,
  EMarketType.game_ah,
  EMarketType.point_ah,
  EMarketType.score_ht_ft,
  EMarketType.score_both_to_score_and_win_team_yes_no,
  EMarketType.score_o_win_team,
  EMarketType.point_o_win_team,
  EMarketType.game_o_win_team,
  EMarketType.score_u_win_team,
  EMarketType.point_u_win_team,
  EMarketType.game_u_win_team,
  EMarketType.corner_ou,
];

const priorityForGoals = [
  EMarketType.score_to_score_first,
  EMarketType.score_to_score_x,
  EMarketType.score_to_score_last,
  EMarketType.score_ou,
  EMarketType.score_interval_ou,
  EMarketType.game_ou,
  EMarketType.point_ou,
  EMarketType.score_both_to_score_yes_no,
  EMarketType.score_ou_team,
  EMarketType.score_interval_ou_team,
  EMarketType.game_ou_team,
  EMarketType.point_ou_team,
  EMarketType.score_both_to_score_and_win_team_yes_no,
  EMarketType.score_o_win_team,
  EMarketType.point_o_win_team,
  EMarketType.game_o_win_team,
  EMarketType.score_u_win_team,
  EMarketType.point_u_win_team,
  EMarketType.game_u_win_team,
  EMarketType.score_o_win_draw_team,
  EMarketType.score_u_win_draw_team,
  EMarketType.score_team_to_score_yes_no_team,
  EMarketType.score_exact_number,
  EMarketType.score_exact_number_team,
  EMarketType.score_exact_number_yes_no,
  EMarketType.score_exact_number_yes_no_team,
  EMarketType.score_team_to_score_in_both_halves_yes_no_team,
  EMarketType.score_team_to_win_both_halves_yes_no_team,
];

const priorityForStatBets = [
  EMarketType.corner_1x2,
  EMarketType.corner_dc,
  EMarketType.corner_ah,
  EMarketType.corner_ou,
  EMarketType.corner_ou_team,
  EMarketType.corner_cs,
  EMarketType.corner_odd_even,
  EMarketType.corner_odd_even_team,
  EMarketType.corner_u_win_team,
  EMarketType.corner_o_win_team,
  EMarketType.corner_o_win_draw_team,
  EMarketType.corner_u_win_draw_team,
  EMarketType.corner_u_draw,
  EMarketType.corner_o_draw,
  EMarketType.corner_win_to_nil_team,
  EMarketType.corner_range_number,
  EMarketType.corner_range_number_team,
  EMarketType.corner_range_number_yes_no,
  EMarketType.corner_range_number_yes_no_team,
  EMarketType.corner_ht_ft,
  EMarketType.corner_draw,
  EMarketType.corner_both_to_score_yes_no,
  EMarketType.corner_exact_number,
  EMarketType.corner_exact_number_team,
  EMarketType.corner_exact_number_yes_no,
  EMarketType.corner_exact_number_yes_no_team,
  EMarketType.corner_team_to_score_yes_no_team,
  EMarketType.corner_both_to_score_and_o_yes_no,
  EMarketType.corner_both_to_score_and_u_yes_no,
  EMarketType.corner_team_to_score_in_both_halves_yes_no_team,
  EMarketType.corner_team_to_win_both_halves_yes_no_team,
  EMarketType.corner_team_to_win_either_half_yes_no_team,
  EMarketType.corner_team_to_win_by_exact_number_yes_no_team,
  EMarketType.corner_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.corner_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.corner_to_score_first,
  EMarketType.corner_to_score_x_in_range,
  EMarketType.corner_to_score_last,
  EMarketType.corner_to_score_in_range,
  EMarketType.corner_to_score_in_range_team,
  EMarketType.corner_interval_1x2,
  EMarketType.corner_interval_ah,
  EMarketType.corner_interval_ou,
  EMarketType.corner_interval_ou_team,
  EMarketType.corner_interval_dc,
  EMarketType.corner_to_score_x,
  EMarketType.corner_both_to_score_and_win_team_yes_no,
  EMarketType.yellow_card_1x2,
  EMarketType.red_card_1x2,
  EMarketType.yellow_card_dc,
  EMarketType.red_card_dc,
  EMarketType.yellow_card_ah,
  EMarketType.red_card_ah,
  EMarketType.yellow_card_ou,
  EMarketType.red_card_ou,
  EMarketType.yellow_card_ou_team,
  EMarketType.red_card_ou_team,
  EMarketType.yellow_card_cs,
  EMarketType.red_card_cs,
  EMarketType.yellow_card_odd_even,
  EMarketType.red_card_odd_even,
  EMarketType.yellow_card_odd_even_team,
  EMarketType.red_card_odd_even_team,
  EMarketType.yellow_card_u_win_team,
  EMarketType.red_card_u_win_team,
  EMarketType.yellow_card_o_win_team,
  EMarketType.red_card_o_win_team,
  EMarketType.yellow_card_o_win_draw_team,
  EMarketType.red_card_o_win_draw_team,
  EMarketType.yellow_card_u_win_draw_team,
  EMarketType.red_card_u_win_draw_team,
  EMarketType.yellow_card_u_draw,
  EMarketType.red_card_u_draw,
  EMarketType.yellow_card_o_draw,
  EMarketType.red_card_o_draw,
  EMarketType.yellow_card_win_to_nil_team,
  EMarketType.red_card_win_to_nil_team,
  EMarketType.yellow_card_range_number,
  EMarketType.red_card_range_number,
  EMarketType.yellow_card_range_number_team,
  EMarketType.red_card_range_number_team,
  EMarketType.yellow_card_range_number_yes_no,
  EMarketType.red_card_range_number_yes_no,
  EMarketType.yellow_card_range_number_yes_no_team,
  EMarketType.red_card_range_number_yes_no_team,
  EMarketType.yellow_card_ht_ft,
  EMarketType.red_card_ht_ft,
  EMarketType.yellow_card_draw,
  EMarketType.red_card_draw,
  EMarketType.yellow_card_both_to_score_yes_no,
  EMarketType.red_card_both_to_score_yes_no,
  EMarketType.yellow_card_exact_number,
  EMarketType.red_card_exact_number,
  EMarketType.yellow_card_exact_number_team,
  EMarketType.red_card_exact_number_team,
  EMarketType.yellow_card_exact_number_yes_no,
  EMarketType.red_card_exact_number_yes_no,
  EMarketType.yellow_card_exact_number_yes_no_team,
  EMarketType.red_card_exact_number_yes_no_team,
  EMarketType.yellow_card_team_to_score_yes_no_team,
  EMarketType.red_card_team_to_score_yes_no_team,
  EMarketType.yellow_card_both_to_score_and_o_yes_no,
  EMarketType.red_card_both_to_score_and_o_yes_no,
  EMarketType.yellow_card_both_to_score_and_u_yes_no,
  EMarketType.red_card_both_to_score_and_u_yes_no,
  EMarketType.yellow_card_team_to_score_in_both_halves_yes_no_team,
  EMarketType.red_card_team_to_score_in_both_halves_yes_no_team,
  EMarketType.yellow_card_team_to_win_both_halves_yes_no_team,
  EMarketType.red_card_team_to_win_both_halves_yes_no_team,
  EMarketType.yellow_card_team_to_win_either_half_yes_no_team,
  EMarketType.red_card_team_to_win_either_half_yes_no_team,
  EMarketType.yellow_card_team_to_win_by_exact_number_yes_no_team,
  EMarketType.red_card_team_to_win_by_exact_number_yes_no_team,
  EMarketType.yellow_card_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.red_card_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.yellow_card_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.red_card_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.yellow_card_to_score_first,
  EMarketType.red_card_to_score_first,
  EMarketType.yellow_card_to_score_x_in_range,
  EMarketType.red_card_to_score_x_in_range,
  EMarketType.yellow_card_to_score_last,
  EMarketType.red_card_to_score_last,
  EMarketType.yellow_card_to_score_in_range,
  EMarketType.red_card_to_score_in_range,
  EMarketType.yellow_card_to_score_in_range_team,
  EMarketType.red_card_to_score_in_range_team,
  EMarketType.yellow_card_interval_1x2,
  EMarketType.red_card_interval_1x2,
  EMarketType.yellow_card_interval_ah,
  EMarketType.red_card_interval_ah,
  EMarketType.yellow_card_interval_ou,
  EMarketType.red_card_interval_ou,
  EMarketType.yellow_card_interval_ou_team,
  EMarketType.red_card_interval_ou_team,
  EMarketType.yellow_card_interval_dc,
  EMarketType.red_card_interval_dc,
  EMarketType.yellow_card_to_score_x,
  EMarketType.red_card_to_score_x,
  EMarketType.yellow_card_both_to_score_and_win_team_yes_no,
  EMarketType.red_card_both_to_score_and_win_team_yes_no,
  EMarketType.offside_1x2,
  EMarketType.offside_dc,
  EMarketType.offside_ah,
  EMarketType.offside_ou,
  EMarketType.offside_ou_team,
  EMarketType.offside_cs,
  EMarketType.offside_odd_even,
  EMarketType.offside_odd_even_team,
  EMarketType.offside_u_win_team,
  EMarketType.offside_o_win_team,
  EMarketType.offside_o_win_draw_team,
  EMarketType.offside_u_win_draw_team,
  EMarketType.offside_u_draw,
  EMarketType.offside_o_draw,
  EMarketType.offside_win_to_nil_team,
  EMarketType.offside_range_number,
  EMarketType.offside_range_number_team,
  EMarketType.offside_range_number_yes_no,
  EMarketType.offside_range_number_yes_no_team,
  EMarketType.offside_ht_ft,
  EMarketType.offside_draw,
  EMarketType.offside_both_to_score_yes_no,
  EMarketType.offside_exact_number,
  EMarketType.offside_exact_number_team,
  EMarketType.offside_exact_number_yes_no,
  EMarketType.offside_exact_number_yes_no_team,
  EMarketType.offside_team_to_score_yes_no_team,
  EMarketType.offside_both_to_score_and_o_yes_no,
  EMarketType.offside_both_to_score_and_u_yes_no,
  EMarketType.offside_team_to_score_in_both_halves_yes_no_team,
  EMarketType.offside_team_to_win_both_halves_yes_no_team,
  EMarketType.offside_team_to_win_either_half_yes_no_team,
  EMarketType.offside_team_to_win_by_exact_number_yes_no_team,
  EMarketType.offside_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.offside_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.offside_to_score_first,
  EMarketType.offside_to_score_x_in_range,
  EMarketType.offside_to_score_last,
  EMarketType.offside_to_score_in_range,
  EMarketType.offside_to_score_in_range_team,
  EMarketType.offside_interval_1x2,
  EMarketType.offside_interval_ah,
  EMarketType.offside_interval_ou,
  EMarketType.offside_interval_ou_team,
  EMarketType.offside_interval_dc,
  EMarketType.offside_to_score_x,
  EMarketType.offside_both_to_score_and_win_team_yes_no,
  EMarketType.shot_on_goal_1x2,
  EMarketType.shot_on_goal_dc,
  EMarketType.shot_on_goal_ou,
  EMarketType.shot_on_goal_ah,
  EMarketType.shot_on_goal_cs,
  EMarketType.shot_on_goal_odd_even,
  EMarketType.shot_on_goal_odd_even_team,
  EMarketType.shot_on_goal_u_win_team,
  EMarketType.shot_on_goal_o_win_team,
  EMarketType.shot_on_goal_o_win_draw_team,
  EMarketType.shot_on_goal_u_win_draw_team,
  EMarketType.shot_on_goal_u_draw,
  EMarketType.shot_on_goal_o_draw,
  EMarketType.shot_on_goal_win_to_nil_team,
  EMarketType.shot_on_goal_range_number,
  EMarketType.shot_on_goal_range_number_team,
  EMarketType.shot_on_goal_range_number_yes_no,
  EMarketType.shot_on_goal_range_number_yes_no_team,
  EMarketType.shot_on_goal_ht_ft,
  EMarketType.shot_on_goal_draw,
  EMarketType.shot_on_goal_both_to_score_yes_no,
  EMarketType.shot_on_goal_exact_number,
  EMarketType.shot_on_goal_exact_number_team,
  EMarketType.shot_on_goal_exact_number_yes_no,
  EMarketType.shot_on_goal_exact_number_yes_no_team,
  EMarketType.shot_on_goal_team_to_score_yes_no_team,
  EMarketType.shot_on_goal_both_to_score_and_o_yes_no,
  EMarketType.shot_on_goal_both_to_score_and_u_yes_no,
  EMarketType.shot_on_goal_team_to_score_in_both_halves_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_both_halves_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_either_half_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_by_exact_number_yes_no_team,
  EMarketType.shot_on_goal_team_to_win_by_exact_number_or_draw_yes_no_team,
  EMarketType.shot_on_goal_team_win_first_half_and_not_to_lose_yes_no_team,
  EMarketType.shot_on_goal_to_score_first,
  EMarketType.shot_on_goal_to_score_x_in_range,
  EMarketType.shot_on_goal_to_score_last,
  EMarketType.shot_on_goal_to_score_in_range,
  EMarketType.shot_on_goal_to_score_in_range_team,
  EMarketType.shot_on_goal_interval_1x2,
  EMarketType.shot_on_goal_interval_ah,
  EMarketType.shot_on_goal_interval_ou,
  EMarketType.shot_on_goal_interval_ou_team,
  EMarketType.shot_on_goal_interval_dc,
  EMarketType.shot_on_goal_to_score_x,
  EMarketType.shot_on_goal_both_to_score_and_win_team_yes_no,
];

interface IMarketTab {
  id: keyof typeof marketTabEnum;
  name: TCommonTKeys;
  filter: (...args: TExplicitAny[]) => boolean;
  priority: EMarketType[];
}

const marketTabMap: Record<keyof typeof marketTabEnum, IMarketTab> = {
  [marketTabEnum.all]: {
    id: marketTabEnum.all,
    name: sportsbookui_additionalMarket_tab_all,
    filter: () => true,
    priority: priorityForAll,
  },
  [marketTabEnum.popular]: {
    id: marketTabEnum.popular,
    name: sportsbookui_additionalMarket_tab_popular,
    filter: (market, scope) => mainScopes.includes(scope.type) && priorityForPopular.includes(market.type),
    priority: priorityForPopular,
  },
  [marketTabEnum.goals]: {
    id: marketTabEnum.goals,
    name: sportsbookui_additionalMarket_tab_goals,
    filter: (market) => priorityForGoals.includes(market.type),
    priority: priorityForGoals,
  },
  [marketTabEnum.teams]: {
    id: marketTabEnum.teams,
    name: sportsbookui_additionalMarket_tab_teams,
    filter: (market) => marketTeamTypes.includes(market.type),
    priority: marketTeamTypes,
  },
  [marketTabEnum.halves]: {
    id: marketTabEnum.halves,
    name: sportsbookui_additionalMarket_tab_halves,
    filter: (_, scope) => scope?.type === EScopeType.half,
    priority: priorityForAll,
  },
  [marketTabEnum.handicaps]: {
    id: marketTabEnum.handicaps,
    name: sportsbookui_additionalMarket_tab_handicaps,
    filter: (market) => marketTypesWithHandicap.includes(market.type),
    priority: priorityForAll,
  },
  [marketTabEnum.minutes]: {
    id: marketTabEnum.minutes,
    name: sportsbookui_additionalMarket_tab_minutes,
    filter: (market) => marketIntervalTypes.includes(market.type),
    priority: marketIntervalTypes,
  },
  [marketTabEnum.statBets]: {
    id: marketTabEnum.statBets,
    name: sportsbookui_additionalMarket_tab_statBets,
    filter: (market) => priorityForStatBets.includes(market.type),
    priority: priorityForStatBets,
  },
  [marketTabEnum.match]: {
    id: marketTabEnum.match,
    name: sportsbookui_additionalMarket_tab_match,
    filter: (_, scope) => isMainScope(scope?.type),
    priority: priorityForAll,
  },
  [marketTabEnum.totals]: {
    id: marketTabEnum.totals,
    name: sportsbookui_additionalMarket_tab_totals,
    filter: (market) => marketTypesWithTotal.includes(market.type),
    priority: priorityForAll,
  },
  [marketTabEnum.teamTotals]: {
    id: marketTabEnum.teamTotals,
    name: sportsbookui_additionalMarket_tab_teamTotals,
    filter: (market) => marketTypesWithTeamTotal.includes(market.type),
    priority: priorityForAll,
  },
  [marketTabEnum.quarters]: {
    id: marketTabEnum.quarters,
    name: sportsbookui_additionalMarket_tab_quarters,
    filter: (_, scope) => scope?.type === EScopeType.quarter,
    priority: priorityForAll,
  },
  [marketTabEnum.set]: {
    id: marketTabEnum.set,
    name: sportsbookui_additionalMarket_tab_set,
    filter: (_, scope) => scope?.type === EScopeType.set,
    priority: priorityForAll,
  },
  [marketTabEnum.main]: {
    id: marketTabEnum.main,
    name: sportsbookui_additionalMarket_tab_main,
    filter: (_, scope) => isMainScope(scope?.type),
    priority: priorityForAll,
  },
  [marketTabEnum.periods]: {
    id: marketTabEnum.periods,
    name: sportsbookui_additionalMarket_tab_periods,
    filter: (_, scope) => scope?.type === EScopeType.period,
    priority: priorityForAll,
  },
};

const marketTabsBySport = {
  [sportCodeToIdMap[ESportCode.soccer]]: [
    marketTabMap.all,
    marketTabMap.popular,
    marketTabMap.goals,
    marketTabMap.teams,
    marketTabMap.halves,
    marketTabMap.handicaps,
    marketTabMap.minutes,
    marketTabMap.statBets,
  ],
  [sportCodeToIdMap[ESportCode.basketball]]: [
    marketTabMap.all,
    marketTabMap.match,
    marketTabMap.quarters,
    marketTabMap.halves,
  ],
  [sportCodeToIdMap[ESportCode.tennis]]: [
    marketTabMap.all,
    marketTabMap.main,
    marketTabMap.set,
  ],
  [sportCodeToIdMap[ESportCode.ice_hockey]]: [
    marketTabMap.all,
    marketTabMap.match,
    marketTabMap.periods,
  ],
  [sportCodeToIdMap[ESportCode.volleyball]]: [
    marketTabMap.all,
    marketTabMap.match,
    marketTabMap.set,
  ],
  [sportCodeToIdMap[ESportCode.handball]]: [marketTabMap.all, marketTabMap.match],
  [sportCodeToIdMap[ESportCode.table_tennis]]: [
    marketTabMap.all,
    marketTabMap.match,
    marketTabMap.set,
  ],
};

export { marketTabEnum, marketTabMap, marketTabsBySport };
