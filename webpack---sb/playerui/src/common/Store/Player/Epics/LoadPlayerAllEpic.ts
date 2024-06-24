import { from, switchMap } from "rxjs";
import { map } from "rxjs/operators";
import { type IWithAuthState } from "@sb/auth";
import { platformPlayerAllQueryOptionalFields, query_Platform_Player } from "@sb/graphql-client/PlayerUI";
import { deferWithAbort } from "@sb/utils";
import { type TEpicWithGraphQLClient } from "../../../../platformui/Store/Root/Epic/TEpicWithGraphQLClient";
import { graphQlDataSelector } from "../../../../platformui/Store/Root/Selectors/GraphQlSelectors";
import { retryWhenLogged } from "../../../Utils/EpicUtils/RetryWhenLogged";
import { anySignal } from "../../../Utils/AnySignal";
import { authTokenService } from "../../Auth/AuthTokenService";
import { playerDetailsReceivedAction } from "../PlayerActions";

const loadPlayerAllEpic: TEpicWithGraphQLClient<IWithAuthState> = (action$, state$, dependencies) => (
  deferWithAbort((signal) => from(authTokenService.getTokenOrError()).pipe(
    switchMap((token) => from(query_Platform_Player(
      dependencies.graphQLClient,
      {
        optionalFields: platformPlayerAllQueryOptionalFields,
        variables: { accessToken: token.accessToken },
        signal: anySignal(signal, authTokenService.createSignal()),
      },
    ))),
  ))
).pipe(
  map((response) => {
    const player = graphQlDataSelector(response).Player;

    return playerDetailsReceivedAction(player);
  }),
  retryWhenLogged(state$),
);

export { loadPlayerAllEpic };

