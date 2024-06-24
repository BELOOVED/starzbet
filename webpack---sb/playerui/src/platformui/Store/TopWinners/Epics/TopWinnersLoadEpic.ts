import { EMPTY } from "rxjs";
import { platformTopWinnersQueryOptionalFields, query_Platform_TopWinners } from "@sb/graphql-client/PlayerUI";
import type { TGQLClient } from "@sb/graphql-client";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { TOP_WINNERS_LOADING_SYMBOL } from "../Variables";
import { platformTopWinnersReceiveAction } from "../Actions/TopWinnersActions";
import { isTopWinnersServerLoadedSelector } from "../Selectors/TopWinnersSelectors";

const gql_TopWinnersQuery = (graphQLClient: TGQLClient) =>
  query_Platform_TopWinners(
    graphQLClient,
    {
      optionalFields: platformTopWinnersQueryOptionalFields,
      variables: {},
    },
  ).then((response) => response.platform.TopWinners);

const topWinnersLoadEpic = (): TPlatformEpic => (action$, state$, deps) => {
  const isServerLoaded = isTopWinnersServerLoadedSelector(state$.value);

  if (isServerLoaded) {
    return EMPTY;
  }

  return gqlLoadingFactory(
    TOP_WINNERS_LOADING_SYMBOL,
    query_Platform_TopWinners,
    {
      optionalFields: platformTopWinnersQueryOptionalFields,
      variables: {},
    },
    platformTopWinnersReceiveAction,
    (response) => [response.platform.TopWinners],
  )(action$, state$, deps);
};

export { gql_TopWinnersQuery, topWinnersLoadEpic };
