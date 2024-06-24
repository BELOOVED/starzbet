import { createGQLClient } from "@sb/graphql-client";
import { Definition, Parameter, Reference, type TId } from "@sb/di";
import { FRAMEWORK_AGGREGATE_METADATA_FACTORY_SERVICE_ID, type IMetadataFactory } from "../MetadataFactory/MetadataFactory";

const FRAMEWORK_GRAPHQL_SERVICE_ID = "framework.graphql";

const createGraphQlService = (
  gqlEndpoint: string,
  metadataFactory: IMetadataFactory,
) => {
  const client = createGQLClient(
    gqlEndpoint,
    () => ({}),
    () => metadataFactory.createMetadata(),
  );

  // always bypassCache for admin
  client.bypassCache = true;

  return client;
};

const getGraphQlServiceDefinition = (
  graphQlEndpointParameterId: TId,
  metadataFactoryId: TId = FRAMEWORK_AGGREGATE_METADATA_FACTORY_SERVICE_ID,
  serviceId: TId = FRAMEWORK_GRAPHQL_SERVICE_ID,
) =>
  new Definition()
    .setId(serviceId)
    .setFunction(createGraphQlService)
    .addArguments(
      new Parameter(graphQlEndpointParameterId),
      new Reference(metadataFactoryId),
    );

export { getGraphQlServiceDefinition, FRAMEWORK_GRAPHQL_SERVICE_ID, createGraphQlService };
