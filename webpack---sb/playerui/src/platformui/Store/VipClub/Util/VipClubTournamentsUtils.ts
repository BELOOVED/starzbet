import { type ECurrencyCode, Money } from "@sb/utils";
import { vipClubIsTournamentFixedDistribution } from "@sb/vip-club";
import type { TPlatform_VipClubTournamentTemplateSnapshot_Fragment } from "@sb/graphql-client/PlayerUI";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";

const vipClubTournamentsCalculatePrizeForPlace =
  (tournamentTemplateSnapshot: TPlatform_VipClubTournamentTemplateSnapshot_Fragment, currency: ECurrencyCode, place: number) => {
    const distribution = tournamentTemplateSnapshot.distribution;

    if (vipClubIsTournamentFixedDistribution(distribution)) {
      const myPlace = distribution.places.find((it) => it.place === place);

      return myPlace ? findPlayerMoneyInBag(myPlace.prize, currency) : null;
    }

    const myPlace = distribution.places.find((it) => it.place === place);
    if (!myPlace) {
      return null;
    }

    const totalPrizeMoney = findPlayerMoneyInBag(tournamentTemplateSnapshot.prize, currency);

    return Money.divide(Money.multiply(totalPrizeMoney, myPlace.percent), 100);
  };

export { vipClubTournamentsCalculatePrizeForPlace };
