import {
  type TPlatform_VipClubTournament_Fragment,
  type TPlatform_VipClubTournamentDistributionFixedPlace_Fragment,
  type TPlatform_VipClubTournamentDistributionPercentPlace_Fragment,
} from "@sb/graphql-client/PlayerUI";
import {
  vipClubGetNotDistributedFixedPrize,
  vipClubGetNotDistributedPercentPrize,
  vipClubIsTournamentFixedDistribution,
} from "@sb/vip-club";
import { type IMoney } from "@sb/utils";
import { EPlatform_Typename, ETypename, type TMoney_Fragment } from "@sb/graphql-client";

const createFixedPlace =
  (place: number, placePrize: { system: IMoney; additional: TMoney_Fragment[]; }):
    TPlatform_VipClubTournamentDistributionFixedPlace_Fragment => ({
    __typename: EPlatform_Typename.platformVipClubTournamentDistributionFixedPlace,
    place,
    prize: {
      ...placePrize,
      __typename: ETypename.moneyBag,
      system: {
        ...placePrize.system,
        __typename: ETypename.money,
      },
    },
  });

const createPercentPlace =
  (place: number, percent: number): TPlatform_VipClubTournamentDistributionPercentPlace_Fragment => ({
    __typename: EPlatform_Typename.platformVipClubTournamentDistributionPercentPlace,
    place,
    percent,
  });

const vipClubAddNotDistributedPlacesToTournamentDistribution =
  (tournament: TPlatform_VipClubTournament_Fragment): TPlatform_VipClubTournament_Fragment => {
    const { distribution, prize, places } = tournament.templateSnapshot;

    if (distribution.places.length === places) {
      return tournament;
    }

    if (vipClubIsTournamentFixedDistribution(distribution)) {
      const fullDistributionPlaces = [...distribution.places];
      const placePrize = vipClubGetNotDistributedFixedPrize(distribution, prize, places);

      for (let place = distribution.places.length + 1; place <= places; place++) {
        fullDistributionPlaces.push(createFixedPlace(place, placePrize));
      }

      return {
        ...tournament,
        templateSnapshot: {
          ...tournament.templateSnapshot,
          distribution: {
            ...distribution,
            places: fullDistributionPlaces,
          },
        },
      };
    }

    const fullDistributionPlaces = [...distribution.places];

    const placePercent = vipClubGetNotDistributedPercentPrize(distribution, places);

    for (let place = distribution.places.length + 1; place <= places; place++) {
      fullDistributionPlaces.push(createPercentPlace(place, placePercent));
    }

    return {
      ...tournament,
      templateSnapshot: {
        ...tournament.templateSnapshot,
        distribution: {
          ...distribution,
          places: fullDistributionPlaces,
        },
      },
    };
  };

export { vipClubAddNotDistributedPlacesToTournamentDistribution };
