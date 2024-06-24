import { type TGQLClient } from "@sb/graphql-client";
import { FRAMEWORK_GRAPHQL_SERVICE_ID, type TWithContainer } from "@sb/adminui-framework";

type TGraphqlClientGetter = (deps: TWithContainer) => TGQLClient;

const getGraphqlClient: TGraphqlClientGetter = (deps) => deps.container.get(FRAMEWORK_GRAPHQL_SERVICE_ID);

export {
  getGraphqlClient,
  type TGraphqlClientGetter,
};
