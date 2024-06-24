import { from, switchMap } from "rxjs";
import { platformPlayerSelfProtectionQueryOptionalFields, query_Platform_Player } from "@sb/graphql-client/PlayerUI";
import { authTokenService } from "../../../../common/Store/Auth/AuthTokenService";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlDataSelector } from "../../Root/Selectors/GraphQlSelectors";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { selfProtectionReceivedAction } from "../SelfProtectionActions";
import { REQUEST_SELF_PROTECTION_BAGS_LOADING_SYMBOL } from "../Model/SelfProtectionVariables";

const requestSelfProtectionBagsEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => from(authTokenService.getTokenOrError()).pipe(
  switchMap((token) => gqlLoadingFactory(
    REQUEST_SELF_PROTECTION_BAGS_LOADING_SYMBOL,
    query_Platform_Player,
    {
      optionalFields: platformPlayerSelfProtectionQueryOptionalFields,
      variables: { accessToken: token.accessToken },
    },
    selfProtectionReceivedAction,
    (response) => [graphQlDataSelector(response).Player.selfProtection?.bags ?? []],
    undefined,
    undefined,
    true,
    authTokenService.createSignal(),
  )(action$, state$, deps)),
);

export { requestSelfProtectionBagsEpic };
