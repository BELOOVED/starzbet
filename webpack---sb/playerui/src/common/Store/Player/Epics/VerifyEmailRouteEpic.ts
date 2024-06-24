import { concat, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { routerEpic } from "@sb/router";
import { verifyPlayerMatchOptions } from "../../../../platformui/Store/PlatformMatchOptions";
import { getMatch } from "../../../Utils/RouterUtils/GetMatch";
import { callWithAbort } from "../../../Utils/EpicUtils/CallWithAbort";
import { playerConfirmVerifyAction, playerRejectVerifyAction, playerStartVerifyAction } from "../PlayerActions";

const verifyEmailRouteEpic = routerEpic({
  name: "verifyEmail",
  match: getMatch<{ token: string; }>(verifyPlayerMatchOptions),
  onStart: ({ params: { token } }) => (action$, state$, deps) => {
    const httpApi = deps.platformHttpApi;

    return concat(
      of(playerStartVerifyAction()),
      callWithAbort(httpApi.callVerifyEmail, { token }).pipe(
        map(() => playerConfirmVerifyAction()),
        catchError(() => of(playerRejectVerifyAction("Email verification was declined"))),
      ),
    );
  },
});
export { verifyEmailRouteEpic };
