import { EMoneyFormat, type IMoney, Money, numberToComma } from "@sb/utils";
import { type TPlatformAppState } from "../Store/PlatformInitialState";
import { vipClubSelectedActiveTournamentPrizeByPlaceSelector } from "../Store/VipClub/Selectors/VipClubTournamentsSelectors";

const vipClubFormatPoints = (points: string) => numberToComma(Number(points), 2);

const vipClubFormatMoneyToString = (money: IMoney) => Money.toFormat(money, EMoneyFormat.symbolRight);

const vipClubActiveTournamentFormattedPrizeByPlaceSelector = (state: TPlatformAppState, place: number) => {
  const prizeMoney = vipClubSelectedActiveTournamentPrizeByPlaceSelector(state, place);

  return prizeMoney ? vipClubFormatMoneyToString(prizeMoney) : null;
};

export {
  vipClubActiveTournamentFormattedPrizeByPlaceSelector,
  vipClubFormatMoneyToString,
  vipClubFormatPoints,
};
