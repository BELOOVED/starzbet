import { type IAuthToken } from "../Types/AuthTypes";

const isImpersonatedToken = (token: IAuthToken) => (
  token.refreshToken === "impersonate" &&
  token.sessionId === "impersonate" &&
  token.accessTokenExpiresIn === 0 &&
  token.accessTokenInMs === 0 &&
  token.refreshTokenExpiresIn === 0 &&
  token.refreshTokenInMs === 0 &&
  token.keepAliveInMs === null &&
  token.keepAliveUntil === null
);

export { isImpersonatedToken };
