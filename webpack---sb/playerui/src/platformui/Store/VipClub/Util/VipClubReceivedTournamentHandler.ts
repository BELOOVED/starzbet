import type { TPlatform_VipClubTournament_Fragment } from "@sb/graphql-client/PlayerUI";
import { EPlatform_VipClubTournamentState } from "@sb/graphql-client";
import { Logger } from "../../../../common/Utils/Logger";
import type { IVipClubTournaments } from "../VipClubInitialState";
import { vipClubAddNotDistributedPlacesToTournamentDistribution } from "./VipClubAddNotDistributedPlacesToTournamentDistribution";

const vipClubReceivedTournamentHandler = (tournament: TPlatform_VipClubTournament_Fragment[]) => tournament.reduce<IVipClubTournaments>(
  (acc, tournament) => {
    switch (tournament.state) {
      case EPlatform_VipClubTournamentState.active:
        acc.active.push(vipClubAddNotDistributedPlacesToTournamentDistribution(tournament));
        break;
      case EPlatform_VipClubTournamentState.finished:
        acc.finished.push(vipClubAddNotDistributedPlacesToTournamentDistribution(tournament));
        break;
      case EPlatform_VipClubTournamentState.upcoming:
        acc.upcoming.push(vipClubAddNotDistributedPlacesToTournamentDistribution(tournament));
        break;
      default:
        Logger.error(`Tournament with id: ${tournament.id} has unknown state: ${tournament.state}`);
    }

    return acc;
  },
  { active: [], finished: [], upcoming: [] },
);

export { vipClubReceivedTournamentHandler };
