import {
  platformCallOptionsQueryOptionalFields,
  platformCallRequestsQueryOptionalFields,
  platformSlotsQueryOptionalFields,
  query_Platform_CallOptions,
  query_Platform_CallRequests,
  query_Platform_Slots,
} from "@sb/graphql-client/PlayerUI";
import {
  EPlatform_CallRequestWhereFieldPaths,
  EPlatform_SlotWhereFieldPaths,
  EWhere_Predicate,
} from "@sb/graphql-client";
import { extractNodesFromEdges } from "@sb/utils";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  callRequestsCallOptionsReceivedAction,
  callRequestsReceivedAction,
  callRequestsSlotsReceivedAction,
} from "../CallRequestsActions";
import {
  CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL,
  CALL_REQUESTS_LOADING_SYMBOL,
  CALL_REQUESTS_SLOTS_LOADING_SYMBOL,
} from "../CallRequestVariables";
import { callRequestsVariablesSelector } from "../Selectors/CallRequestsSelectors";

const SLOTS_LIMIT = 300;

const callRequestsLoadActiveActualSlotsEpic: TPlatformEpic = gqlLoadingFactory(
  CALL_REQUESTS_SLOTS_LOADING_SYMBOL,
  query_Platform_Slots,
  {
    optionalFields: platformSlotsQueryOptionalFields,
    variables: {
      cursor: {
        first: SLOTS_LIMIT,
      },
      where: {
        predicate: EWhere_Predicate.and,
        operands: [
          {
            predicate: EWhere_Predicate.gte,
            fieldPath: EPlatform_SlotWhereFieldPaths.slotStartTime,
            value: Date.now().toString(),
          },
          {
            predicate: EWhere_Predicate.isTrue,
            fieldPath: EPlatform_SlotWhereFieldPaths.slotActive,
          },
        ],

      },
    },
  },
  callRequestsSlotsReceivedAction,
  ({ platform: { Slots } }) => [extractNodesFromEdges(Slots)],
);

const callRequestsCallOptionsLoadEpic: TPlatformEpic = gqlLoadingFactory(
  CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL,
  query_Platform_CallOptions,
  {
    optionalFields: platformCallOptionsQueryOptionalFields,
    variables: {},
  },
  callRequestsCallOptionsReceivedAction,
  ({ platform: { CallOptions } }) => [CallOptions],
);
const callRequestsLoadEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => {
  const variables = callRequestsVariablesSelector(state$.value);
  const playerId = playerDetailsSelectors.id(state$.value);

  return gqlLoadingFactory(
    CALL_REQUESTS_LOADING_SYMBOL,
    query_Platform_CallRequests,
    {
      optionalFields: platformCallRequestsQueryOptionalFields,
      variables: {
        ...variables,
        where: {
          predicate: EWhere_Predicate.eq,
          fieldPath: EPlatform_CallRequestWhereFieldPaths.callRequestPlayerId,
          value: playerId,
        },
      },
    },
    callRequestsReceivedAction,
    ({ platform: { CallRequests: { edges, pageInfo } } }) => [extractNodesFromEdges({ edges }), pageInfo],
  )(action$, state$, deps);
};

export { callRequestsLoadActiveActualSlotsEpic, callRequestsCallOptionsLoadEpic, callRequestsLoadEpic };
