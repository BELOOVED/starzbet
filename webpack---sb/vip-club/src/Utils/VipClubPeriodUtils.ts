import {
  type TPlatform_VipClubTournamentPeriod_Fragment,
  type TPlatform_VipClubTournamentPeriodDailyAllTime_Fragment,
  type TPlatform_VipClubTournamentPeriodDailyRange_Fragment,
  type TPlatform_VipClubTournamentPeriodDailyRepeatable_Fragment,
  type TPlatform_VipClubTournamentPeriodMonthlyAllTime_Fragment,
  type TPlatform_VipClubTournamentPeriodMonthlyRange_Fragment,
  type TPlatform_VipClubTournamentPeriodWeeklyAllTime_Fragment,
  type TPlatform_VipClubTournamentPeriodWeeklyRange_Fragment,
} from "@sb/graphql-client/AdminUI";
import { EVipClubPeriodType } from "../Model/EVipClubPeriodType";
import { EVipClubActivityDateType } from "../Model/EVipClubActivityDateType";

const separator = ":";

const vipClubJoinPeriodKind = (periodType: EVipClubPeriodType, activityDate: EVipClubActivityDateType) =>
  `${periodType}${separator}${activityDate}`;

const vipClubParsePeriodKind = (periodKind: string) => {
  const [period, activityDate] = periodKind.split(separator) as [EVipClubPeriodType, EVipClubActivityDateType];

  return { period, activityDate };
};

const VIP_CLUB_PERIOD_KIND_DAILY_RANGE = vipClubJoinPeriodKind(EVipClubPeriodType.daily, EVipClubActivityDateType.range);
const VIP_CLUB_PERIOD_KIND_DAILY_REPEATABLE = vipClubJoinPeriodKind(EVipClubPeriodType.daily, EVipClubActivityDateType.repeatable);
const VIP_CLUB_PERIOD_KIND_DAILY_ALL_TIME = vipClubJoinPeriodKind(EVipClubPeriodType.daily, EVipClubActivityDateType.allTime);
const VIP_CLUB_PERIOD_KIND_WEEKLY_RANGE = vipClubJoinPeriodKind(EVipClubPeriodType.weekly, EVipClubActivityDateType.range);
const VIP_CLUB_PERIOD_KIND_WEEKLY_ALL_TIME = vipClubJoinPeriodKind(EVipClubPeriodType.weekly, EVipClubActivityDateType.allTime);
const VIP_CLUB_PERIOD_KIND_MONTHLY_RANGE = vipClubJoinPeriodKind(EVipClubPeriodType.monthly, EVipClubActivityDateType.range);
const VIP_CLUB_PERIOD_KIND_MONTHLY_ALL_TIME = vipClubJoinPeriodKind(EVipClubPeriodType.monthly, EVipClubActivityDateType.allTime);

const vipClubIsPeriodDailyRange = (period: TPlatform_VipClubTournamentPeriod_Fragment):
    period is TPlatform_VipClubTournamentPeriodDailyRange_Fragment => period.kind === VIP_CLUB_PERIOD_KIND_DAILY_RANGE;
const vipClubIsPeriodDailyRepeatable = (period: TPlatform_VipClubTournamentPeriod_Fragment):
    period is TPlatform_VipClubTournamentPeriodDailyRepeatable_Fragment => period.kind === VIP_CLUB_PERIOD_KIND_DAILY_REPEATABLE;

const vipClubIsPeriodDailyAllTime = (period: TPlatform_VipClubTournamentPeriod_Fragment):
    period is TPlatform_VipClubTournamentPeriodDailyAllTime_Fragment => period.kind === VIP_CLUB_PERIOD_KIND_DAILY_ALL_TIME;

const vipClubIsPeriodWeeklyRange = (period: TPlatform_VipClubTournamentPeriod_Fragment):
    period is TPlatform_VipClubTournamentPeriodWeeklyRange_Fragment => period.kind === VIP_CLUB_PERIOD_KIND_WEEKLY_RANGE;

const vipClubIsPeriodWeeklyAllTime = (period: TPlatform_VipClubTournamentPeriod_Fragment):
    period is TPlatform_VipClubTournamentPeriodWeeklyAllTime_Fragment => period.kind === VIP_CLUB_PERIOD_KIND_WEEKLY_ALL_TIME;

const vipClubIsPeriodMonthlyRange = (period: TPlatform_VipClubTournamentPeriod_Fragment):
    period is TPlatform_VipClubTournamentPeriodMonthlyRange_Fragment => period.kind === VIP_CLUB_PERIOD_KIND_MONTHLY_RANGE;

const vipClubIsPeriodMonthlyAllTime = (period: TPlatform_VipClubTournamentPeriod_Fragment):
    period is TPlatform_VipClubTournamentPeriodMonthlyAllTime_Fragment => period.kind === VIP_CLUB_PERIOD_KIND_MONTHLY_ALL_TIME;

export {
  vipClubJoinPeriodKind,
  vipClubParsePeriodKind,
  VIP_CLUB_PERIOD_KIND_DAILY_RANGE,
  VIP_CLUB_PERIOD_KIND_DAILY_REPEATABLE,
  VIP_CLUB_PERIOD_KIND_DAILY_ALL_TIME,
  VIP_CLUB_PERIOD_KIND_WEEKLY_RANGE,
  VIP_CLUB_PERIOD_KIND_WEEKLY_ALL_TIME,
  VIP_CLUB_PERIOD_KIND_MONTHLY_RANGE,
  VIP_CLUB_PERIOD_KIND_MONTHLY_ALL_TIME,
  vipClubIsPeriodDailyRange,
  vipClubIsPeriodDailyRepeatable,
  vipClubIsPeriodDailyAllTime,
  vipClubIsPeriodWeeklyRange,
  vipClubIsPeriodWeeklyAllTime,
  vipClubIsPeriodMonthlyRange,
  vipClubIsPeriodMonthlyAllTime,
};

