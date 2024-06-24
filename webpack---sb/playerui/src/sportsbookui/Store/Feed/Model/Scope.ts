import { EScopeType } from "@sb/betting-core/EScopeType";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { type TNullable } from "@sb/utils";

const mainScopes = [EScopeType.full_event, EScopeType.normal_time];

const isMainScope = (type: EScopeType) => mainScopes.includes(type);

const scopeOrder = [
  EScopeType.full_event,
  EScopeType.normal_time,
  EScopeType.half,
  EScopeType.period,
  EScopeType.quarter,
  EScopeType.set,
  EScopeType.frame,
  EScopeType.inning,
  EScopeType.game,
];

const getOrderByScopeType = <S extends { type: EScopeType; }>(scope: TNullable<S>, sportId: string) => {
  if (scope) {
    if (process.env.THEME === "bahis" &&
      sportIdToCodeMap[sportId] === ESportCode.soccer &&
      scope.type === EScopeType.normal_time
    ) {
      return -1;
    }

    return scopeOrder.indexOf(scope.type);
  }

  return Infinity;
};

const getOrderByScopeNumber = <S extends { number: number; }>(scope: TNullable<S>) => (scope?.number ?? Infinity);

const statsWidgetScopePerSport: Partial<Record<ESportCode, EScopeType>> = {
  [ESportCode.soccer]: EScopeType.half,
  [ESportCode.tennis]: EScopeType.set,
  [ESportCode.basketball]: EScopeType.quarter,
  [ESportCode.ice_hockey]: EScopeType.period,
  [ESportCode.volleyball]: EScopeType.set,
  [ESportCode.handball]: EScopeType.half,
  [ESportCode.american_football]: EScopeType.quarter,
  [ESportCode.floorball]: EScopeType.period,
  [ESportCode.futsal]: EScopeType.half,
  [ESportCode.table_tennis]: EScopeType.set,
  [ESportCode.netball]: EScopeType.quarter,
  [ESportCode.rugby]: EScopeType.half,
  [ESportCode.snooker]: EScopeType.frame,
  [ESportCode.squash]: EScopeType.game,
  [ESportCode.water_polo]: EScopeType.quarter,
  [ESportCode.aussie_rules]: EScopeType.quarter,
  [ESportCode.badminton]: EScopeType.game,
  [ESportCode.bandy]: EScopeType.half,
  [ESportCode.baseball]: EScopeType.inning,
  [ESportCode.beach_soccer]: EScopeType.period,
  [ESportCode.beach_volleyball]: EScopeType.set,
  [ESportCode.field_hockey]: EScopeType.quarter,
  [ESportCode.gaelic_football]: EScopeType.half,
  [ESportCode.wrestling]: EScopeType.period,
  [ESportCode.cricket]: EScopeType.inning,
  [ESportCode.e_soccer]: EScopeType.half,
  [ESportCode.e_basketball]: EScopeType.quarter,
  [ESportCode.e_ice_hockey]: EScopeType.period,
  [ESportCode.e_volleyball]: EScopeType.set,
  [ESportCode.e_tennis]: EScopeType.set,
};

export {
  mainScopes,
  isMainScope,
  getOrderByScopeType,
  getOrderByScopeNumber,
  statsWidgetScopePerSport,
};
