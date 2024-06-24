import { type IAuthToken, isImpersonatedToken } from "@sb/auth";
import { type IMetadata } from "@sb/network-bus/Model";
import { isNil } from "@sb/utils";
import { createHeadersWithMetadata } from "@sb/network-bus/Utils";

const metadataFactory = (token: IAuthToken | undefined, secret: string): IMetadata => {
  if (isNil(token)) {
    return {
      secret,
    };
  }

  const impersonated = isImpersonatedToken(token);

  const key = impersonated
    ? "operatorImpersonatePlayerAccessToken"
    : "platformPlayerAccessToken";

  return {
    [key]: token.accessToken,
    secret,
  };
};

const getHeadersWithAccessToken =
  ((token: IAuthToken | undefined, secret: string) => createHeadersWithMetadata(metadataFactory(token, secret)));

export { metadataFactory, getHeadersWithAccessToken };
