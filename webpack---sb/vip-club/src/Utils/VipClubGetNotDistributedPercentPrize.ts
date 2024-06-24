import { type TPlatform_VipClubTournamentDistributionPercent_Fragment } from "@sb/graphql-client/AdminUI";

const vipClubGetNotDistributedPercentPrize = (
  distribution: TPlatform_VipClubTournamentDistributionPercent_Fragment,
  winnerPlaces: number,
) => {
  const distributed = distribution.places;
  const distributedPoolSize = distributed.reduce((acc, { percent }) => acc + percent, 0);

  const restPoolSize = 100 - distributedPoolSize;
  const numberOfRestWinners = winnerPlaces - distributed.length;

  return +(restPoolSize / numberOfRestWinners).toFixed(2);
};

export { vipClubGetNotDistributedPercentPrize };
