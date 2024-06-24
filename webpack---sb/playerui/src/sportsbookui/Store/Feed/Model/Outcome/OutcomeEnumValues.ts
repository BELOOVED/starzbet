// @ts-nocheck
import { sportsbookui_outcome_noGoals } from "@sb/translates/sportsbookui/CommonTKeys";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";

const outcomeEnumValues = Object.values(EOutcomeEnumValue);

const outcomeTKeysByMarketGroup = {
  [EMarketGroup.to_score_first]: {
    [EOutcomeEnumValue.no]: sportsbookui_outcome_noGoals,
  },
  [EMarketGroup.to_score_x]: {
    [EOutcomeEnumValue.no]: sportsbookui_outcome_noGoals,
  },
  [EMarketGroup.to_score_last]: {
    [EOutcomeEnumValue.no]: sportsbookui_outcome_noGoals,
  },
  [EMarketGroup.to_score_x_in_range]: {
    [EOutcomeEnumValue.no]: sportsbookui_outcome_noGoals,
  },
};

export { outcomeEnumValues, outcomeTKeysByMarketGroup };
