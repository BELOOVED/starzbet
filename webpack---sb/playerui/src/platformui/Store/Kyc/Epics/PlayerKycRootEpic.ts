import { concat, defer, EMPTY, from, merge, mergeMap, of, switchMap, zip } from "rxjs";
import { catchError, distinctUntilChanged, first, map } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { isCreator } from "@sb/utils";
import { platformPlayerKycQueryOptionalFields, query_Platform_Player } from "@sb/graphql-client/PlayerUI";
import { callManagerSucceededSelector, createCallManagerSymbol } from "@sb/call-manager";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { playerMinimalReceivedAction } from "../../../../common/Store/Player/PlayerActions";
import { authTokenService } from "../../../../common/Store/Auth/AuthTokenService";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { accountVerificationMatchOptions } from "../../PlatformMatchOptions";
import { graphQlDataSelector } from "../../Root/Selectors/GraphQlSelectors";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  playerKycDocumentsReceivedAction,
  playerKycReceivedAction,
  playerKycUpdateUploadingStatusActionFailed,
  playerKycUpdateUploadingStatusActionPending,
  playerKycUpdateUploadingStatusActionSuccessful,
  playerKycUploadFilesAction,
} from "../KycActions";
import { isKycNotNilSelector, kycDocumentsSelector } from "../Selectors/PlayerKycSelectors";

const requestKycByActionEpic: TPlatformEpic = (
  action$,
  state$,
  dependencies,
) => action$.pipe(
  isCreator(playerMinimalReceivedAction),
  switchMap(() => requestKycEpic(action$, state$, dependencies)),
);

const updateDocumentImagesByActionEpic: TPlatformEpic = (action$, state$, deps) => action$.pipe(
  isCreator(playerKycUploadFilesAction),
  switchMap(() => updateDocumentImagesEpic(action$, state$, deps)),
);

const updateDocumentImagesEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => {
  if (!isKycNotNilSelector(state$.value)) {
    return EMPTY;
  }

  const kycDocuments = kycDocumentsSelector(state$.value, "updateDocumentImagesEpic");

  const fileServerApi = deps.fileServerApi;

  const loadDocuments = kycDocuments
    .map(({ file }) => defer(() => from(
      fileServerApi
        .load(file.pathToFile),
    )));

  return concat(
    of(playerKycUpdateUploadingStatusActionPending(true)),
    zip(loadDocuments).pipe(
      mergeMap((files) => {
        const data = {};

        kycDocuments.forEach(
          ({ file }, index) => {
            data[file.hash] = files[index];
          },
        );

        return concat(
          of(playerKycDocumentsReceivedAction(data)),
          of(playerKycUpdateUploadingStatusActionPending(false)),
        );
      }),
    ),
  );
};

const watchAccountVerificationRouteEpic = routerEpic({
  name: "watchAccountVerification",
  match: getMatch(accountVerificationMatchOptions),
  onStart: () => updateDocumentImagesEpic,
});

const REQUEST_KYS_LOADING_SYMBOL = createCallManagerSymbol("REQUEST_KYS_LOADING_SYMBOL");

const requestKycEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => from(authTokenService.getTokenOrError()).pipe(
  switchMap((token) => gqlLoadingFactory(
    REQUEST_KYS_LOADING_SYMBOL,
    query_Platform_Player,
    {
      optionalFields: platformPlayerKycQueryOptionalFields,
      variables: { accessToken: token.accessToken },
    },
    playerKycReceivedAction,
    (response) => [graphQlDataSelector(response).Player.kyc],
    undefined,
    undefined,
    true,
    authTokenService.createSignal(),
  )(action$, state$, deps)),
);

const kycFileUploadEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(playerKycUploadFilesAction),
  switchMap(({ payload: { files } }) => {
    const httpApi = deps.platformHttpApi;
    const fileServerApi = deps.fileServerApi;

    return concat(
      of(playerKycUpdateUploadingStatusActionPending(true)),
      from(
        fileServerApi.upload(files.map(({ rawFile }) => rawFile)),
      )
        .pipe(
          mergeMap((loadedFiles) => {
            const documentInfos = files.map(({ type }, i) => ({ type, file: loadedFiles[i] }));

            return callWithAbort(httpApi.callUploadKycDocument, { documentInfos }).pipe(
              switchMap(
                () => merge(
                  requestKycEpic(action$, state$, deps),
                  state$.pipe(
                    map((state) => callManagerSucceededSelector(state, REQUEST_KYS_LOADING_SYMBOL)),
                    distinctUntilChanged(),
                    first(Boolean),
                    map(() => playerKycUpdateUploadingStatusActionSuccessful(true)),
                  ),
                ),
              ),
            );
          }),
          catchError(
            () => of(playerKycUpdateUploadingStatusActionFailed(true)),
          ),
        ),
      of(playerKycUpdateUploadingStatusActionPending(false)),
    );
  }),
);

const playerKycRootEpic = combineEpics(
  kycFileUploadEpic,
  updateDocumentImagesByActionEpic,
  requestKycByActionEpic,
);

export { playerKycRootEpic, watchAccountVerificationRouteEpic };
