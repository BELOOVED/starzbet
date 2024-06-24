import { Money } from "@sb/utils";
import { ETypename, type TMoneyBag_Fragment } from "@sb/graphql-client";
import { type TPlatform_VipClubTournamentDistributionFixed_Fragment } from "@sb/graphql-client/AdminUI";
import { vipClubGetDistributionFixedByWinnerPlaces } from "./VipClubGetDistributionFixedByWinnerPlaces";

const vipClubGetNotDistributedFixedPrize = (
  distribution: TPlatform_VipClubTournamentDistributionFixed_Fragment,
  poolSize: TMoneyBag_Fragment,
  winnerPlaces: number,
): TMoneyBag_Fragment => {
  const distributed = distribution.places;

  const distributedPoolSize = distributed.reduce((acc, { prize }) => acc + Money.toNumber(prize.system), 0);
  const restPoolSize = Money.toNumber(poolSize.system) - distributedPoolSize;

  const numberOfRestWinners = winnerPlaces - distributed.length;

  const prizeMoney = Money.parseAny(
    vipClubGetDistributionFixedByWinnerPlaces(numberOfRestWinners, restPoolSize),
    poolSize.system.currency,
  );

  return {
    __typename: ETypename.moneyBag,
    system: {
      __typename: ETypename.money,
      ...prizeMoney,
    },
    additional: poolSize.additional.map((it) => ({ ...it, amount: prizeMoney.amount })),
  };
};

export { vipClubGetNotDistributedFixedPrize };
