import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { filter, from } from "rxjs";
import { fileServiceEpicFactory } from "@sb/file-service";
import { loggedSelector } from "@sb/auth";
import { authTokenService } from "../../common/Store/Auth/AuthTokenService";
import { getHeadersWithAccessToken } from "../../common/Utils/MetadataFactory";
import { getProtectionToken } from "../../common/Protection";
import { Logger } from "../../common/Utils/Logger";
import { type TPlatformEpic } from "../Store/Root/Epic/TPlatformEpic";

const fileServiceEpic:TPlatformEpic = (
  action$,
  state$,
  deps,
) => fileServiceEpicFactory(
  state$.pipe(
    map(loggedSelector),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap(
      () => from(
        Promise.all(
          [
            authTokenService.getTokenOrError(),
            getProtectionToken(),
          ],
        ).then(([token, secret]) => getHeadersWithAccessToken(token, secret))
          .catch((e) => {
            Logger.error("file service header$", e);

            return {};
          }),
      ),
    ),
  ),
)(action$, state$, deps);

export { fileServiceEpic };
