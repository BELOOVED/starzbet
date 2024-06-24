import { from, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { platformConfigQueryOptionalFields, query_Platform_Config } from "@sb/graphql-client/PlayerUI";
import { deferWithAbort } from "@sb/utils";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { retryWithLog } from "../../../../common/Utils/EpicUtils/RetryWithLog";
import { configReceivedAction } from "../../../../common/Store/Config/ConfigAction";
import { graphQlDataSelector } from "../../Root/Selectors/GraphQlSelectors";

const configRootEpic: TAppEpic = (action$, state$, dependencies) => {
  const graphQLClient = dependencies.graphQLClient;

  return deferWithAbort((signal) => from(query_Platform_Config(
    graphQLClient,
    {
      optionalFields: platformConfigQueryOptionalFields,
      variables: {},
      signal,
    },
  ))).pipe(
    switchMap((response) => of(configReceivedAction(graphQlDataSelector(response).Config))),
    retryWithLog(),
  );
};

export { configRootEpic };
