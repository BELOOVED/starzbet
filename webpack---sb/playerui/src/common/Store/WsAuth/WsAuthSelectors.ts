import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { type IWithWsAuthState } from "./WsAuthState";

const wsAuthSelector = (s: IWithWsAuthState) => s.wsAuth;

const authenticatedWsSelector = (s: IWithWsAuthState) => wsAuthSelector(s).authenticated;

const loggedAndAuthenticatedWsSelector = (s: IWithWsAuthState & IWithAuthState) => loggedSelector(s) && authenticatedWsSelector(s);

export { authenticatedWsSelector, loggedAndAuthenticatedWsSelector };
