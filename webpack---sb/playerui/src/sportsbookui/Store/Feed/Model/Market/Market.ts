// @ts-nocheck
import { mainLineSchema } from "@sb/betting-core/MainLineSchema";
import { EMarketType } from "@sb/betting-core/MarketType";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { intervalMarketGroupList, marketTypeToMarketGroupMap, teamMarketGroupList, toMarketTypes } from "@sb/betting-core/MarketGroup";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { type TVoidFn } from "@sb/utils";

interface IOutcomeProps {
  coefficient: string | number;
  locked: boolean;
  clickHandle: TVoidFn;
  active: boolean;
  up: boolean;
  down: boolean;
  prop: string;
  fit?: boolean;
  qaAttribute?: string;
}

interface IOutcomeEntriesProps extends IMarketProps {
  entries: string[];
}

interface IOutcomeContentProps extends IOutcomeEntriesProps {
  marketParameters: Record<string, string>;
  fit: boolean;
}

interface IMarketProps {
  marketId: string;
  marketType: EMarketType;
  fit?: boolean;
}

const marketTeamTypes = toMarketTypes(teamMarketGroupList);

const marketIntervalTypes = toMarketTypes(intervalMarketGroupList);

const marketTypesWithTeamTotal = toMarketTypes([
  EMarketGroup.ou_team,
  EMarketGroup.interval_ou_team,
  EMarketGroup.o_win_team,
  EMarketGroup.o_win_draw_team,
  EMarketGroup.u_win_team,
  EMarketGroup.u_win_draw_team,
  EMarketGroup.u_draw,
  EMarketGroup.o_draw,
]);

const marketTypesWithTotal = toMarketTypes([
  EMarketGroup.ou,
  EMarketGroup.interval_ou,
  EMarketGroup.u_draw,
  EMarketGroup.o_draw,
]).concat(marketTypesWithTeamTotal);

const marketTypesWithHandicap = toMarketTypes([
  EMarketGroup.ah,
  EMarketGroup.interval_ah,
]);

const groupMarketFn = (market, scope) => {
  const marketGroup = marketTypeToMarketGroupMap[market.type];

  const typeMaybeTeam = () => market.parameters?.team
    ? market.type + market.parameters.team
    : market.type;

  const addScope = () => scope?.type + scope?.number;

  if (intervalMarketGroupList.includes(marketGroup)) {
    return typeMaybeTeam() + market.parameters.interval_from + market.parameters.interval_to;
  }

  if (market.parameters.number) {
    return typeMaybeTeam() + market.parameters.number + addScope();
  }

  if ([EMarketGroup.to_score_in_range, EMarketGroup.to_score_in_range_team].includes(marketGroup)) {
    return typeMaybeTeam() + market.parameters.from + market.parameters.to + addScope();
  }

  if (market.parameters.interval) {
    return typeMaybeTeam() + market.parameters.interval + addScope();
  }

  if (EMarketGroup.highest_scope_score === marketGroup) {
    return market.parameters[EMarketParameter.scopeType] + addScope();
  }

  if (EMarketGroup.custom === marketGroup) {
    return market.id + addScope();
  }

  return (
    typeMaybeTeam() + addScope()
  );
};

const convertHandicapParam = (value) => {
  if (!value) {
    return "";
  }

  const number = +value;

  return number >= 0
    ? value
    : -(100 + number);
};

const sortMarketFn = (market, scope) => {
  const param = market.parameters.total || convertHandicapParam(market.parameters.handicap);

  return scope?.type + scope?.number + param;
};

const getOrderByMarketParameterNumber = (market) => (
  market.parameters?.number || 0
);

const hasTotalOrHandicap = (marketParameters) => [marketParameters.total, marketParameters.handicap].some(Boolean);

const getMarketTypeListBySportId = (sportId): EMarketType[] => {
  const list = Object.values(mainLineSchema[sportId]).flat();

  return list.length === 0
    ? [EMarketType.score_1x2]
    : list;
};

const inMainLine = (sportId, scopeType) => mainLineSchema[sportId][scopeType];

export {
  marketTypesWithTeamTotal,
  marketTypesWithTotal,
  marketTypesWithHandicap,
  marketTeamTypes,
  marketIntervalTypes,
  groupMarketFn,
  sortMarketFn,
  getOrderByMarketParameterNumber,
  hasTotalOrHandicap,
  getMarketTypeListBySportId,
  inMainLine,
};

export type {
  IOutcomeProps,
  IOutcomeContentProps,
  IOutcomeEntriesProps,
  IMarketProps,
};

