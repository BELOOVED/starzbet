import { HttpRpcClient } from "@sb/network-bus/RpcClient";
import { cmsControlFactory, type IControlFactoryOptions } from "@sb/cms-on-site-editor";
import { type Client } from "@sb/graphql-client";
import { createGraphQLClient } from "../../platformui/Api/GraphQLClient";
import { fileServiceInitialState } from "../../platformui/Store/PlatformInitialState";
import { sharedProxyUrl } from "../Urls";

const createCMSControlFactory = (
  context: IControlFactoryOptions["context"],
  translatorControl: IControlFactoryOptions["translatorControl"],
) => (graphQLClient: Client) => cmsControlFactory({
  context,
  translatorControl,
  graphQLClient,
  commitClient: new HttpRpcClient(sharedProxyUrl),
  fileConfig: fileServiceInitialState.fileService.config,
  theme: process.env.THEME,
  env: process.env.SERVER_ENVIRONMENT_CODE,
  createGQL: createGraphQLClient,
});

export {
  createCMSControlFactory,
};
