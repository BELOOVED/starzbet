import { type TExtractRouteParams, type TMatch } from "@sb/react-router-compat";
import {
  sportsbookui_starzbet_eventFilter_allTime,
  sportsbookui_starzbet_startTime_filter_button_nextCountHour,
  sportsbookui_starzbet_startTime_filter_button_nextCountHours,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { type TLocalizedPushParams } from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { ESportPeriod } from "../../../../../../Store/SportMenu/Model/SportPeriod";
import { routeMap } from "../../../../../../RouteMap/RouteMap";

type TPeriodPath = typeof routeMap.preLive.period | typeof routeMap.esport.preLive.period;
type TSportPath = typeof routeMap.preLive.sport | typeof routeMap.esport.preLive.sport;

type TPeriodParams = Omit<TExtractRouteParams<TPeriodPath>, "locale">;

type TSportParams = Omit<TExtractRouteParams<TSportPath>, "locale">;

type TPeriodOrSportParams = TPeriodParams | TSportParams;
const defaultPeriod = ESportPeriod.FORTY_EIGHT_HOURS;

interface IPeriod {
  period: string;
  name: [string, { count: number; }?];
}

const periods: IPeriod[] = [
  {
    period: ESportPeriod.ONE_HOUR,
    name: [sportsbookui_starzbet_startTime_filter_button_nextCountHour, { count: 1 }],
  },
  {
    period: ESportPeriod.THREE_HOURS,
    name: [sportsbookui_starzbet_startTime_filter_button_nextCountHours, { count: 3 }],
  },
  {
    period: ESportPeriod.EIGHT_HOURS,
    name: [sportsbookui_starzbet_startTime_filter_button_nextCountHours, { count: 8 }],
  },
  {
    period: ESportPeriod.TWELVE_HOURS,
    name: [sportsbookui_starzbet_startTime_filter_button_nextCountHours, { count: 12 }],
  },
  {
    period: ESportPeriod.DAY,
    name: [sportsbookui_starzbet_startTime_filter_button_nextCountHours, { count: 24 }],
  },
  {
    period: ESportPeriod.FORTY_EIGHT_HOURS,
    name: [sportsbookui_starzbet_startTime_filter_button_nextCountHours, { count: 48 }],
  },
  {
    period: ESportPeriod.THREE_DAYS,
    name: [sportsbookui_starzbet_startTime_filter_button_nextCountHours, { count: 72 }],
  },
  {
    period: ESportPeriod.ALL,
    name: [sportsbookui_starzbet_eventFilter_allTime],
  },
];

const getPeriodByParams = (params: TPeriodOrSportParams = {} as TPeriodOrSportParams) => {
  if (!params || !params.period) {
    return defaultPeriod;
  }

  return params.period;
};

const isSportParams = (params: TPeriodOrSportParams): params is TSportParams => params.hasOwnProperty("sportSlug");

const getSportSlugByParams = (params: TPeriodOrSportParams = {} as TPeriodOrSportParams) => (
  isSportParams(params) ? params.sportSlug : undefined
);

const getPreLiveSportPath = (params: TPeriodOrSportParams = {} as TPeriodOrSportParams): TLocalizedPushParams => ([
  isSportParams(params) ? routeMap.preLive.sport : routeMap.preLive.period,
  {
    period: getPeriodByParams(params),
    sportSlug: getSportSlugByParams(params),
  },
]);
const getPreLiveEsportPath = (params: TPeriodOrSportParams = {} as TPeriodOrSportParams): TLocalizedPushParams => ([
  isSportParams(params) ? routeMap.esport.preLive.sport : routeMap.esport.preLive.period,
  {
    period: getPeriodByParams(params),
    sportSlug: getSportSlugByParams(params),
  },
]);

const getParams = <Params extends { [K in keyof Params]?: string } = object>(m: TMatch<Params> | null) => m ? m.params : {} as Params;
const getSportSlug = (m: TMatch<{ sportSlug: string; }> | null) => getParams(m).sportSlug;
const getPeriod = (m: TMatch<{ period: string; }>) => getParams(m).period;

export type {
  TPeriodParams,
};

export {
  defaultPeriod,
  periods,
  type IPeriod,
  getPeriodByParams,
  getPreLiveSportPath,
  getPreLiveEsportPath,
  getSportSlug,
  getPeriod,
  getSportSlugByParams,
};
