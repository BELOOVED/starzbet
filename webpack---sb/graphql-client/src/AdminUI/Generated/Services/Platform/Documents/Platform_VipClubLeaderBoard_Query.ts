/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_VipClubLeaderBoard_QueryOptionalFields } from "../../Platform/Types/TPlatform_VipClubLeaderBoard_QueryOptionalFields";
import { Platform_VipClubLeaderBoardResponse_Fragment } from "../../Platform/Documents/Platform_VipClubLeaderBoardResponse_Fragment";

export const Platform_VipClubLeaderBoard_Query: TDocument<TPlatform_VipClubLeaderBoard_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_VipClubLeaderBoard_QueryOptionalFields>("query Platform_VipClubLeaderBoard($request: Platform_VipClubLeaderBoardsRequest!) { platform @normalize { VipClubLeaderBoard(request: $request) { ...Platform_VipClubLeaderBoardResponse } } }", {
    Platform_VipClubLeaderBoardResponse_Fragment,
  });