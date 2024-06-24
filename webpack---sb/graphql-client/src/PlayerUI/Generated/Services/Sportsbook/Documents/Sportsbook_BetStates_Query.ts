/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TSportsbook_BetStates_QueryOptionalFields } from "../../Sportsbook/Types/TSportsbook_BetStates_QueryOptionalFields";
import { Sportsbook_BetStatesResult_Fragment } from "../../Sportsbook/Documents/Sportsbook_BetStatesResult_Fragment";

export const Sportsbook_BetStates_Query: TDocument<TSportsbook_BetStates_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TSportsbook_BetStates_QueryOptionalFields>("query Sportsbook_BetStates($id: Uuid!) { sportsbook { BetStates(id: $id) { ...Sportsbook_BetStatesResult } } }", {
    Sportsbook_BetStatesResult_Fragment,
  });