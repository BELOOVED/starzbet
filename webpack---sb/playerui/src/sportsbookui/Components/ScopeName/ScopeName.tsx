import { memo, type ReactNode } from "react";
import { type ELocale, getNotNil, isNotNil, useParamSelector, withProps } from "@sb/utils";
import { type TTFuncParameters, useTranslation } from "@sb/translator";
import { ordinalFormat } from "@sb/betting-core/OrdinalFormat";
import { EScopeType } from "@sb/betting-core/EScopeType";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import {
  shared_scope_break,
  shared_scope_extra_inning,
  shared_scope_frame,
  shared_scope_full_event,
  shared_scope_game,
  shared_scope_half,
  shared_scope_half_time,
  shared_scope_inning,
  shared_scope_map,
  shared_scope_normal_time,
  shared_scope_over_time,
  shared_scope_over_times,
  shared_scope_penalties,
  shared_scope_period,
  shared_scope_quarter,
  shared_scope_round,
  shared_scope_set,
  shared_scope_time_out,
  shared_scopeShort_break,
  shared_scopeShort_extra_inning,
  shared_scopeShort_frame,
  shared_scopeShort_full_event,
  shared_scopeShort_game,
  shared_scopeShort_half,
  shared_scopeShort_half_time,
  shared_scopeShort_inning,
  shared_scopeShort_map,
  shared_scopeShort_normal_time,
  shared_scopeShort_over_time,
  shared_scopeShort_over_times,
  shared_scopeShort_penalties,
  shared_scopeShort_period,
  shared_scopeShort_quarter,
  shared_scopeShort_round,
  shared_scopeShort_set,
  shared_scopeShort_time_out,
  type TSharedKey,
} from "@sb/translates/shared/SharedTKeys";
import { Logger } from "../../../common/Utils/Logger";
import { eventByIdNotNilSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { type TScopeType } from "../../Store/MyBets/Model/TBet";

const patternSeparator = "@" as const;

type TPattern = `${string}${typeof patternSeparator}${string}`
type TTranslateType = "full" | "short"

type TTranslateValue = Record<TTranslateType, TTFuncParameters>

interface ITranslateParams {
  scope: {
    number: number;
    type: EScopeType | TScopeType;
  };
  sportId: string;
  locale: ELocale;
}

type TGetTranslateParams = (params: ITranslateParams) => TTranslateValue

const withSport = (fullKey: TSharedKey, shortKey: TSharedKey): TGetTranslateParams => ({ sportId }) => ({
  full: [fullKey, { context: { sport: getNotNil(sportIdToCodeMap[sportId], ["scopeTypeToGetTranslateMap", "withSport"], "sportCode") } }],
  short: [shortKey, { context: { sport: getNotNil(sportIdToCodeMap[sportId], ["scopeTypeToGetTranslateMap", "withSport"], "sportCode") } }],
});

const withOrdinary = (fullKey: TSharedKey, shortKey: TSharedKey): TGetTranslateParams => ({
  locale,
  scope: { number },
}) => ({
  full: [fullKey, { number: ordinalFormat(locale, number) }],
  short: [shortKey, { number }],
});

const applyPattern = (value: ReactNode, pattern?: TPattern) => {
  if (!pattern) {
    return value;
  }

  if (typeof value === "string") {
    return pattern.replace(patternSeparator, value);
  }

  // then react element
  const [prefix, postfix] = pattern.split(patternSeparator);

  return (
    <>
      {prefix}

      {value}

      {postfix}
    </>
  );
};

const scopeTypeToGetTranslateMap: Partial<Record<EScopeType, TGetTranslateParams>> = {
  [EScopeType.full_event]: withSport(shared_scope_full_event, shared_scopeShort_full_event),
  [EScopeType.normal_time]: () => ({ full: [shared_scope_normal_time], short: [shared_scopeShort_normal_time] }),
  [EScopeType.half_time]: () => ({ full: [shared_scope_half_time], short: [shared_scopeShort_half_time] }),
  [EScopeType.break]: () => ({ full: [shared_scope_break], short: [shared_scopeShort_break] }),
  [EScopeType.time_out]: () => ({ full: [shared_scope_time_out], short: [shared_scopeShort_time_out] }),
  [EScopeType.penalties]: () => ({ full: [shared_scope_penalties], short: [shared_scopeShort_penalties] }),
  [EScopeType.over_times]: () => ({ full: [shared_scope_over_times], short: [shared_scopeShort_over_times] }),
  [EScopeType.period]: withOrdinary(shared_scope_period, shared_scopeShort_period),
  [EScopeType.half]: withOrdinary(shared_scope_half, shared_scopeShort_half),
  [EScopeType.quarter]: withOrdinary(shared_scope_quarter, shared_scopeShort_quarter),
  [EScopeType.set]: withOrdinary(shared_scope_set, shared_scopeShort_set),
  [EScopeType.frame]: withOrdinary(shared_scope_frame, shared_scopeShort_frame),
  [EScopeType.map]: withOrdinary(shared_scope_map, shared_scopeShort_map),
  [EScopeType.round]: withOrdinary(shared_scope_round, shared_scopeShort_round),
  [EScopeType.inning]: withOrdinary(shared_scope_inning, shared_scopeShort_inning),
  [EScopeType.extra_inning]: withOrdinary(shared_scope_extra_inning, shared_scopeShort_extra_inning),
  [EScopeType.game]: withOrdinary(shared_scope_game, shared_scopeShort_game),
  [EScopeType.over_time]: withOrdinary(shared_scope_over_time, shared_scopeShort_over_time),
  // todo translate it??
  // [EScopeType.penalty]: () => ({ full: [""], short: [""] }),
  // [EScopeType.sudden_death]: () => ({ full: [""], short: [""] }),
  // [EScopeType.kicking_competition]: () => ({ full: [""], short: [""] }),
  // [EScopeType.half_time_overtime]: () => ({ full: [""], short: [""] }),
  // [EScopeType.end_break]: () => ({ full: [""], short: [""] }),
  // [EScopeType.set_break]: () => ({ full: [""], short: [""] }),
  // [EScopeType.technical_time_out]: () => ({ full: [""], short: [""] }),
  // [EScopeType.medical_time_out]: () => ({ full: [""], short: [""] }),
  // [EScopeType.quarter_break]: () => ({ full: [""], short: [""] }),
  // [EScopeType.overtime_break]: () => ({ full: [""], short: [""] }),
  // [EScopeType.intermission]: () => ({ full: [""], short: [""] }),
  // [EScopeType.pause]: () => ({ full: [""], short: [""] }),
  // [EScopeType.interval]: () => ({ full: [""], short: [""] }),
  // [EScopeType.lunch_break]: () => ({ full: [""], short: [""] }),
  // [EScopeType.tea_break]: () => ({ full: [""], short: [""] }),
  // [EScopeType.rest]: () => ({ full: [""], short: [""] }),
  // [EScopeType.change_ends]: () => ({ full: [""], short: [""] }),
};

const stubTranslate: TGetTranslateParams = ({ scope: { number, type } }) => ({
  full: [`${number} ${type}`],
  short: [`${number} ${type}`],
});

interface IScopeNameParams extends Pick<ITranslateParams, "scope" | "sportId"> {
  pattern?: TPattern;
  noop?: ReactNode;
  nameType: TTranslateType;
}

const ScopeName = memo<IScopeNameParams>(({
  pattern,
  noop,
  nameType,
  scope,
  sportId,
}) => {
  const [t, _, locale] = useTranslation();

  if (!scope || scope.type === EScopeType.unknown) {
    return isNotNil(noop) ? noop : "";
  }

  const getTranslateParams = scopeTypeToGetTranslateMap[scope.type as EScopeType];

  const translateParams = { scope, sportId, locale };

  if (!getTranslateParams) {
    Logger.warn.app("Unsupported scope type for translate:", scope.type);

    return isNotNil(noop) ? noop : applyPattern(t(...stubTranslate(translateParams)[nameType]), pattern);
  }

  return applyPattern(t(...getTranslateParams(translateParams)[nameType]), pattern);
});
ScopeName.displayName = "ScopeName";

const FullScopeName = withProps(ScopeName)({ nameType: "full" });
FullScopeName.displayName = "FullScopeName";

const ShortScopeName = withProps(ScopeName)({ nameType: "short" });
ShortScopeName.displayName = "ShortScopeName";

interface IFullScopeNameByEventProps {
  eventId: string;
  noop?: ReactNode;
}

const FullScopeNameByEvent = memo<IFullScopeNameByEventProps>(({ eventId, ...rest }) => {
  const { currentScope, sportId } = useParamSelector(eventByIdNotNilSelector, [eventId]);

  return (
    <FullScopeName
      scope={currentScope}
      sportId={sportId}
      {...rest}
    />
  );
});
FullScopeNameByEvent.displayName = "FullScopeNameByEvent";

export {
  FullScopeName,
  ShortScopeName,
  FullScopeNameByEvent,
};
