/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_VipClubTournamentWinners_QueryOptionalFields } from "../../Platform/Types/TPlatform_VipClubTournamentWinners_QueryOptionalFields";
import { Platform_VipClubTournamentWinner_Fragment } from "../../Platform/Documents/Platform_VipClubTournamentWinner_Fragment";

export const Platform_VipClubTournamentWinners_Query: TDocument<TPlatform_VipClubTournamentWinners_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_VipClubTournamentWinners_QueryOptionalFields>("query Platform_VipClubTournamentWinners($tournamentId: Uuid!, $limit: Int!, $offset: Int!) { platform @normalize { VipClubTournamentWinners( tournamentId: $tournamentId limit: $limit offset: $offset ) { ...Platform_VipClubTournamentWinner } } }", {
    Platform_VipClubTournamentWinner_Fragment,
  });