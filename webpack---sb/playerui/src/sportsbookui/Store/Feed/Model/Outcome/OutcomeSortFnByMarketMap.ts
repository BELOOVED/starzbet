// @ts-nocheck
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { EOutcomePredicate } from "@sb/betting-core/EOutcomePredicate";
import { sortBy } from "../../../../Utils/SortBy";
import { outcomeViewEnum, toViewEnum } from "./OutcomeViewEnum";

const outcomes1X2 = [outcomeViewEnum.team1, EOutcomeEnumValue.draw, outcomeViewEnum.team2];

const outcomes12 = [outcomeViewEnum.team1, outcomeViewEnum.team2];

const outcomes1X2X12 = [
  outcomeViewEnum.team1Draw,
  outcomeViewEnum.team2Draw,
  outcomeViewEnum.team1Team2,
];

const outcomesOverUnder = [EOutcomeEnumValue.over, EOutcomeEnumValue.under];

const outcomesHighLow = [EOutcomeEnumValue.high, EOutcomeEnumValue.low];

const outcomesOddEven = [EOutcomeEnumValue.odd, EOutcomeEnumValue.even];

const outcomesYesNo = [EOutcomeEnumValue.yes, EOutcomeEnumValue.no];

const outcomes1no2 = [outcomeViewEnum.team1, EOutcomeEnumValue.no, outcomeViewEnum.team2];

const outcomesOddEvenHighLow = [
  EOutcomeEnumValue.odd_high,
  EOutcomeEnumValue.odd_low,
  EOutcomeEnumValue.even_high,
  EOutcomeEnumValue.even_low,
];

const outcomesEqualOver = [
  outcomeViewEnum.team1Equal,
  outcomeViewEnum.team1Over,
  outcomeViewEnum.team2Equal,
  outcomeViewEnum.team2Over,
];

const plainOutcomesByMarketMap = {
  [EMarketGroup._1x2]: outcomes1X2,
  [EMarketGroup._1x2_early_payout]: outcomes1X2,
  [EMarketGroup._12]: outcomes12,
  [EMarketGroup._1x2_teams_to_score]: [
    outcomeViewEnum.p1Both,
    outcomeViewEnum.p1p1,
    outcomeViewEnum.drawBoth,
    outcomeViewEnum.drawNone,
    outcomeViewEnum.p2Both,
    outcomeViewEnum.p2p2,
  ],
  [EMarketGroup.dc]: outcomes1X2X12,
  [EMarketGroup.ah]: outcomes12,
  [EMarketGroup.ou]: outcomesOverUnder,
  [EMarketGroup.odd_even]: outcomesOddEven,
  [EMarketGroup.odd_even_team]: outcomesOddEven,
  [EMarketGroup.ou_team]: outcomesOverUnder,
  [EMarketGroup.u_win_team]: outcomesYesNo,
  [EMarketGroup.u_win_draw_team]: outcomesYesNo,
  [EMarketGroup.o_win_team]: outcomesYesNo,
  [EMarketGroup.o_win_draw_team]: outcomesYesNo,
  [EMarketGroup.o_draw]: outcomesYesNo,
  [EMarketGroup.u_draw]: outcomesYesNo,
  [EMarketGroup.win_to_nil_team]: outcomesYesNo,
  [EMarketGroup.range_number_yes_no]: outcomesYesNo,
  [EMarketGroup.range_number_yes_no_team]: outcomesYesNo,
  [EMarketGroup.exact_number_yes_no]: outcomesYesNo,
  [EMarketGroup.exact_number_yes_no_team]: outcomesYesNo,
  [EMarketGroup.ht_ft]: [
    outcomeViewEnum.team1Team1,
    outcomeViewEnum.team1Draw,
    outcomeViewEnum.team1Team2,
    outcomeViewEnum.drawTeam1,
    outcomeViewEnum.drawDraw,
    outcomeViewEnum.drawTeam2,
    outcomeViewEnum.team2Team1,
    outcomeViewEnum.team2Draw,
    outcomeViewEnum.team2Team2,
  ],
  [EMarketGroup.both_to_score_yes_no]: outcomesYesNo,
  [EMarketGroup.team_to_score_in_both_halves_yes_no_team]: outcomesYesNo,
  [EMarketGroup.team_to_win_both_halves_yes_no_team]: outcomesYesNo,
  [EMarketGroup.team_to_win_either_half_yes_no_team]: outcomesYesNo,
  [EMarketGroup.team_to_win_by_exact_number_yes_no_team]: outcomesYesNo,
  [EMarketGroup.team_to_win_by_exact_number_or_draw_yes_no_team]: outcomesYesNo,
  [EMarketGroup.team_to_score_yes_no_team]: outcomesYesNo,
  [EMarketGroup.draw]: outcomesYesNo,
  [EMarketGroup.both_to_score_and_o_yes_no]: outcomesYesNo,
  [EMarketGroup.both_to_score_and_u_yes_no]: outcomesYesNo,
  [EMarketGroup.extra_inning_yes_no]: outcomesYesNo,
  [EMarketGroup.to_score_first]: outcomes1no2,
  [EMarketGroup.team_win_first_half_and_not_to_lose_yes_no_team]: outcomesYesNo,
  [EMarketGroup.interval_1x2]: outcomes1X2,
  [EMarketGroup.interval_dc]: outcomes1X2X12,
  [EMarketGroup.interval_ah]: outcomes12,
  [EMarketGroup.interval_ou]: outcomesOverUnder,
  [EMarketGroup.interval_ou_team]: outcomesOverUnder,
  [EMarketGroup.to_score_x]: outcomes1no2,
  [EMarketGroup.to_score_last]: outcomes1no2,
  [EMarketGroup.both_to_score_and_win_team_yes_no]: outcomesYesNo,
  [EMarketGroup.to_score_in_range]: outcomesYesNo,
  [EMarketGroup.to_score_in_range_team]: outcomesYesNo,
  [EMarketGroup.some_lose_first_set_and_win_match_yes_no]: outcomesYesNo,
  [EMarketGroup.some_set_clean_win_in_match_yes_no]: outcomesYesNo,
  [EMarketGroup.overtime_yes_no]: outcomesYesNo,
  [EMarketGroup.team_win_first_half_and_match_yes_no_team]: outcomesYesNo,
  [EMarketGroup.team_win_first_quarter_and_match_yes_no_team]: outcomesYesNo,
  [EMarketGroup.to_win_all_scopes_team_yes_no]: outcomesYesNo,
  [EMarketGroup.race_high_low]: outcomesHighLow,
  [EMarketGroup.race_odd_even]: outcomesOddEven,
  [EMarketGroup.race_odd_even_high_low]: outcomesOddEvenHighLow,
  [EMarketGroup.odd_even_high_low]: outcomesOddEvenHighLow,
  [EMarketGroup._1x2_ou]: [
    outcomeViewEnum.team1Over,
    outcomeViewEnum.drawOver,
    outcomeViewEnum.team2Over,
    outcomeViewEnum.team1Under,
    outcomeViewEnum.drawUnder,
    outcomeViewEnum.team2Under,
  ],
  [EMarketGroup._12_score]: outcomesEqualOver,
  [EMarketGroup.win_most_periods]: outcomes1X2,
};

const createSortFnByParticipants = (types) => (outcomes, outcomeIdList, participants) => sortBy(
  (outcomeId) => types.indexOf(toViewEnum(participants, outcomes[outcomeId].parameters)),
  outcomeIdList,
);

const sortByExactNumber = (outcomes, outcomeIdList) => (
  sortBy((outcomeId) => outcomes[outcomeId].parameters.outcome, outcomeIdList)
);

const sortByMultiValue = (outcomes, outcomeIdList) => (
  sortBy((outcomeId) => outcomes[outcomeId].parameters.value1, outcomeIdList)
);

const sortByOutcome = (outcomes, outcomeIdList) => (
  sortBy((outcomeId) => Number(outcomes[outcomeId].parameters.outcome), outcomeIdList)
);

const sortByRangeNumber = (outcomes, outcomeIdList) => sortBy(
  (outcomeId) => {
    const { parameters } = outcomes[outcomeId];

    if (parameters.outcome) {
      return Infinity;
    }

    return Number(parameters.from);
  },
  outcomeIdList,
);

const sortByParticipantsOrder = (outcomes, outcomeIdList) => (
  sortBy((outcomeId) => Number.parseInt(outcomes[outcomeId].parameters.outcome.slice(1)), outcomeIdList)
);

const sortWithPredicateOutcome = (outcomes, outcomeIdList) => (
  sortBy(
    (outcomeId) => {
      if (outcomes[outcomeId].parameters.predicate === EOutcomePredicate.gt) {
        return Infinity;
      }

      return Number(outcomes[outcomeId].parameters.outcome);
    },
    outcomeIdList,
  )
);

const sortByPeriods = (outcomes, outcomeIdList) => (
  sortBy(
    (outcomeId) => {
      const period1 = outcomes[outcomeId].parameters.period1;
      if (period1 === EOutcomeEnumValue.draw) {
        return Infinity;
      }

      return Number.parseInt(outcomes[outcomeId].parameters.period1.slice(1));
    },
    outcomeIdList,
  )
);

const remapSortFnByParticipants = (acc, marketGroup) => ({
  ...acc,
  [marketGroup]: createSortFnByParticipants(plainOutcomesByMarketMap[marketGroup]),
});

const withoutSort = (_, v) => v;

const outcomeSortFnByMarketMap = Object.keys(plainOutcomesByMarketMap).reduce(
  remapSortFnByParticipants,
  {
    [EMarketGroup.range_number]: sortByRangeNumber,
    [EMarketGroup.range_number_team]: sortByRangeNumber,
    [EMarketGroup.to_score_x_in_range]: sortByRangeNumber,
    [EMarketGroup.exact_number]: sortByExactNumber,
    [EMarketGroup.exact_number_team]: sortByExactNumber,
    [EMarketGroup.highest_scopes_score]: sortByMultiValue,
    [EMarketGroup.highest_scope_score]: sortByOutcome,
    [EMarketGroup.race_winner]: sortByParticipantsOrder,
    [EMarketGroup.race_place]: sortByParticipantsOrder,
    [EMarketGroup.longest_consecutive]: sortByOutcome,
    [EMarketGroup.to_score_race]: sortByParticipantsOrder,
    [EMarketGroup.triple_result]: sortByPeriods,
    [EMarketGroup.winning_margin]: sortWithPredicateOutcome,
    [EMarketGroup.custom]: withoutSort,
  },
);

export { outcomeSortFnByMarketMap };
