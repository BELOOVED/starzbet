import {
  type TPlatform_VipClubTournamentDistribution_Fragment,
  type TPlatform_VipClubTournamentDistributionFixed_Fragment,
} from "@sb/graphql-client/AdminUI";
import { EVipClubPoolDistributionKind } from "./EVipClubPoolDistributionKind";

const vipClubIsTournamentFixedDistribution = (distribution: TPlatform_VipClubTournamentDistribution_Fragment):
  distribution is TPlatform_VipClubTournamentDistributionFixed_Fragment => distribution.kind === EVipClubPoolDistributionKind.fixed;

export { vipClubIsTournamentFixedDistribution };
