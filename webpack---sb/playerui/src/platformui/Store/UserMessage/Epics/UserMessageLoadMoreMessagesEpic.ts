import { defer, from, merge, of, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { deferWithAbort, extractNodesFromEdges, isCreator, isDev } from "@sb/utils";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { platformUserMessagesQueryOptionalFields, query_Platform_UserMessages } from "@sb/graphql-client/PlayerUI";
import { Logger } from "../../../../common/Utils/Logger";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { userMessageLoadMoreMessagesAction, userMessageMoreMessagesReceivedAction } from "../UserMessageActions";
import { userMessagePropertySelectors } from "../UserMessageSelectors";
import { USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL } from "../UserMessageVariables";

const userMessageLoadMoreMessagesEpic: TPlatformEpic = (action$, state$, deps) =>
  action$
    .pipe(
      isCreator(userMessageLoadMoreMessagesAction),
      switchMap(() => {
        const pageInfo = userMessagePropertySelectors.pageInfo(state$.value);

        return deferWithAbort(
          (signal) =>
            merge(
              of(callManagerStartAction(USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL)),
              defer(
                () => from(
                  query_Platform_UserMessages(
                    deps.graphQLClient,
                    {
                      optionalFields: platformUserMessagesQueryOptionalFields,
                      variables: {
                        cursor: {
                          first: 20,
                          after: pageInfo?.endCursor ?? undefined,
                        },
                      },
                      signal,
                    },
                  ),
                ),
              ).pipe(
                switchMap((response) => {
                  if (isDev) {
                    Logger.info.epic("More user messages loaded", response);
                  }

                  const { platform: { UserMessages } } = response;

                  const messages = extractNodesFromEdges(UserMessages);
                  const { pageInfo } = UserMessages;

                  return merge(
                    of(userMessageMoreMessagesReceivedAction(messages, pageInfo)),
                    of(callManagerSucceededAction(USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL)),
                  );
                }),
                catchError((error: unknown) => {
                  Logger.warn.epic("More user messages loading failed", error);

                  return of(callManagerFailedAction(USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL, error));
                }),
              ),
            ),
        );
      }),
    );

export { userMessageLoadMoreMessagesEpic };
