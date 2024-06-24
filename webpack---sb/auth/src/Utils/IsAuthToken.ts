import { isObject } from "@sb/utils";
import { type IAuthToken } from "../Types/AuthTypes";

const authTokenKeys: readonly (keyof IAuthToken)[] = [
  "accessToken",
  "accessTokenExpiresIn",
  "accessTokenInMs",
  "refreshToken",
  "refreshTokenInMs",
  "refreshTokenExpiresIn",
  "sessionId",
] as const;

const isAuthToken = (candidate: unknown): candidate is IAuthToken => {
  if (!isObject(candidate)) {
    return false;
  }

  return authTokenKeys.every((key) => Object.hasOwn(candidate, key));
};

function assertIsAuthToken(candidate: unknown): asserts candidate is IAuthToken {
  if (!isAuthToken(candidate)) {
    throw new Error("Not a IAuthToken");
  }
}

export { isAuthToken, assertIsAuthToken };
