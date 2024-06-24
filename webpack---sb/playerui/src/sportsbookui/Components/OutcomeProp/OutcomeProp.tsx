import { createElement, memo } from "react";
import { useTranslation } from "@sb/translator";
import { type TComponent } from "@sb/utils";
import { sportsbookui_outcome_noGoals } from "@sb/translates/sportsbookui/CommonTKeys";
import { EOutcomePredicate } from "@sb/betting-core/EOutcomePredicate";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { shared_outcomeOtherValue_and_more } from "@sb/translates/shared/SharedTKeys";
import { outcomeEnumValueTKeys } from "@sb/betting-core/SharedTKeys/OutcomeEnumValueTKeys";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type TParticipants } from "@sb/betting-core/Feed/Types";
import { handicapNormalizer } from "@sb/betting-core/HandicapNormalizer";
import { type TMarketParameters } from "@sb/betting-core/TMarketParameters";
import { getOutcomeViewEnumText, toViewEnum } from "../../Store/Feed/Model/Outcome/OutcomeViewEnum";
import { kindDelimiter } from "../../Store/Feed/Model/Outcome/KindDelimiter";
import { type TMarketType } from "../../Store/MyBets/Model/TBet";
import { PredicateNormalizer } from "../OutcomeName/PredicateNormalizer";
import { HtftNormalizer } from "../OutcomeName/HtftNormalizer";
import { PredicateWithScopeNormalizer } from "../OutcomeName/PredicateWithScopeNormalizer";
import { RangeNormalizer } from "./RangeNormalizer";
import { ScoreNormalizer } from "./ScoreNormalizer";
import { MultiValueNormalizer } from "./MultiValueNormalizer";

interface ICommonNormalizerProps {
  marketParameters: TMarketParameters;
  outcomeParameters: Record<string, string> & {
    outcome?: EOutcomeEnumValue;
  };
  participants?: TParticipants;
}

const HandicapNormalizer = memo<ICommonNormalizerProps>(({
  outcomeParameters,
  marketParameters,
}) => handicapNormalizer(marketParameters, outcomeParameters));
HandicapNormalizer.displayName = "HandicapNormalizer";

const TotalNormalizer = memo<ICommonNormalizerProps>(({ marketParameters }) => marketParameters.total);
TotalNormalizer.displayName = "TotalNormalizer";

const ExactPredicateNormalizer = memo<Pick<ICommonNormalizerProps, "marketParameters">>(({ marketParameters }) => {
  const [t] = useTranslation();

  if (marketParameters.predicate === EOutcomePredicate.eq) {
    return marketParameters.score;
  }

  return (
    <>
      {`${marketParameters.score} `}

      {t(shared_outcomeOtherValue_and_more)}
    </>
  );
});
ExactPredicateNormalizer.displayName = "ExactPredicateNormalizer";

const YesNoExactNumberNormalizer = memo<ICommonNormalizerProps>(({ marketParameters, outcomeParameters }) => {
  const [t] = useTranslation();

  return (
    <>
      <ExactPredicateNormalizer marketParameters={marketParameters} />

      {" - "}

      {outcomeParameters.outcome ? t(outcomeEnumValueTKeys[outcomeParameters.outcome]) : null}
    </>
  );
});
YesNoExactNumberNormalizer.displayName = "YesNoExactNumberNormalizer";

const RangePredicateNormalizer = memo<ICommonNormalizerProps>(({ marketParameters, outcomeParameters }) => {
  const [t] = useTranslation();

  return (
    <>
      <RangeNormalizer
        outcomeParameters={marketParameters}
      />

      {" - "}

      {outcomeParameters.outcome ? t(outcomeEnumValueTKeys[outcomeParameters.outcome]) : null}
    </>
  );
});
RangePredicateNormalizer.displayName = "RangePredicateNormalizer";

const RangeWithOutcomeNormalizer = memo<ICommonNormalizerProps>(({ outcomeParameters }) => {
  const [t] = useTranslation();

  if (outcomeParameters.outcome === EOutcomeEnumValue.no) {
    return t(sportsbookui_outcome_noGoals);
  }

  return (
    <RangeNormalizer outcomeParameters={outcomeParameters} />
  );
});
RangeWithOutcomeNormalizer.displayName = "RangeWithOutcomeNormalizer";

const ScorePointNormalizer = memo<ICommonNormalizerProps>(({ outcomeParameters, marketParameters: { score } }) => {
  const [t] = useTranslation();
  const outcomeValue = outcomeParameters.outcome?.split(kindDelimiter).at(-1);

  return (
    <>
      {score}

      {outcomeValue === EOutcomeEnumValue.over && t(shared_outcomeOtherValue_and_more)}
    </>
  );
});
ScorePointNormalizer.displayName = "ScorePointNormalizer";

const NumberPointNormalizer = memo<ICommonNormalizerProps>(({ marketParameters }) => marketParameters.number?.replace(/[,]/g, " / "));
NumberPointNormalizer.displayName = "NumberPointNormalizer";

const outcomePropNormalizerMap: Partial<Record<EMarketGroup, TComponent<ICommonNormalizerProps>>> = {
  [EMarketGroup.ah]: HandicapNormalizer,
  [EMarketGroup.interval_ah]: HandicapNormalizer,

  [EMarketGroup._1x2_ou]: TotalNormalizer,
  [EMarketGroup.ou]: TotalNormalizer,
  [EMarketGroup.ou_team]: TotalNormalizer,
  [EMarketGroup.o_win_team]: TotalNormalizer,
  [EMarketGroup.o_win_draw_team]: TotalNormalizer,
  [EMarketGroup.u_win_team]: TotalNormalizer,
  [EMarketGroup.u_win_draw_team]: TotalNormalizer,
  [EMarketGroup.o_draw]: TotalNormalizer,
  [EMarketGroup.u_draw]: TotalNormalizer,
  [EMarketGroup.both_to_score_and_o_yes_no]: TotalNormalizer,
  [EMarketGroup.both_to_score_and_u_yes_no]: TotalNormalizer,
  [EMarketGroup.interval_ou]: TotalNormalizer,
  [EMarketGroup.interval_ou_team]: TotalNormalizer,

  [EMarketGroup.exact_number]: PredicateNormalizer,
  [EMarketGroup.exact_number_team]: PredicateNormalizer,

  [EMarketGroup.cs]: ScoreNormalizer,

  [EMarketGroup.ht_ft]: HtftNormalizer,

  [EMarketGroup.range_number]: RangeNormalizer,
  [EMarketGroup.range_number_team]: RangeNormalizer,

  [EMarketGroup.to_score_x_in_range]: RangeWithOutcomeNormalizer,

  [EMarketGroup.exact_number_yes_no]: YesNoExactNumberNormalizer,
  [EMarketGroup.exact_number_yes_no_team]: YesNoExactNumberNormalizer,

  [EMarketGroup.range_number_yes_no]: RangePredicateNormalizer,
  [EMarketGroup.range_number_yes_no_team]: RangePredicateNormalizer,

  [EMarketGroup.highest_scopes_score]: MultiValueNormalizer,

  [EMarketGroup.highest_scope_score]: PredicateWithScopeNormalizer,

  [EMarketGroup._12_score]: ScorePointNormalizer,
  [EMarketGroup.to_score_race]: NumberPointNormalizer,
};

interface IOutcomePropProps {
  marketType: EMarketType | TMarketType;
  marketParameters: TMarketParameters;
  outcomeParameters: Record<string, string>;
  participants: TParticipants;
  excludeShort?: boolean;
  forceShort?: boolean;
}

const OutcomeProp = memo<IOutcomePropProps>(({
  marketType,
  outcomeParameters,
  marketParameters,
  participants,
  excludeShort = false,
  forceShort = false,
}) => {
  const [t] = useTranslation();

  if (!forceShort) {
    const normalizer = outcomePropNormalizerMap[marketTypeToMarketGroupMap[marketType as EMarketType]];

    if (normalizer) {
      return createElement(normalizer, { outcomeParameters, marketParameters, participants });
    }

    if (excludeShort) {
      return null;
    }
  }

  const it = toViewEnum(participants, outcomeParameters);

  if (!it) {
    return null;
  }

  const text = getOutcomeViewEnumText(marketType, it);

  return text || t(outcomeEnumValueTKeys[it]);
});
OutcomeProp.displayName = "OutcomeProp";

export { OutcomeProp };
