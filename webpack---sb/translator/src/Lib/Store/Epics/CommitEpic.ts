import { EMPTY, from, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { type ELocale, entries, isCreator, isNotNil, isNumber } from "@sb/utils";
import { type IAddTranslatesCommand } from "@sb/sdk/shared/translator/api/command/AddTranslatesCommand";
import { call_AddTranslatesCommand } from "@sb/sdk/SDKClient/translator";
import { keys } from "@sb/utils/Keys";
import { type ITranslateResource, type TLocaleResource } from "../../../@types/TLocaleResource";
import { nameSpaceDelimiter } from "../../Model/Namespace";
import { Logger } from "../../Utils/Logger";
import { batchCommitAction, commitByLocaleAction, commitByLocaleSuccessfulAction, commitSuccessfulAction } from "../Actions";
import { selectUncommitted, selectUncommittedByKey } from "../Selectors";
import { type TTranslateEpic } from "./TTranslateEpic";

interface IAddTranslateRequests {
  [clientNs: string]: {
    clientNs: string;
    translates: TLocaleResource;
  };
}

const getOrPut = <O>(
  object: O,
  property: keyof O,
  factory: () => NonNullable<O[keyof O]>,
): NonNullable<O[keyof O]> => {
  if (isNotNil(object[property])) {
    return object[property] as NonNullable<O[keyof O]>;
  }

  return object[property] = factory();
};

const createRequests = (translates: TLocaleResource) => {
  const requests: IAddTranslateRequests = {};

  (Object.entries(translates) as [ELocale, ITranslateResource][]).forEach(([locale, resource]) => {
    Object.entries(resource).forEach(([key, translate]) => {
      const [client, theme] = key.split(nameSpaceDelimiter);

      const clientNs = [client, theme].join(nameSpaceDelimiter);

      const clientRequest = getOrPut(
        requests,
        clientNs,
        () => ({
          clientNs,
          translates: {},
        }),
      );

      getOrPut(clientRequest.translates, locale, () => ({}))[key] = translate;
    });
  });

  return requests as { [clientNs: string]: IAddTranslatesCommand; };
};

const alertCommitError = (...args: unknown[]) => {
  Logger.warn.epic("Translator commit error", ...args);

  window.alert("Translator commit error");
};

const singleCommitTranslateEpic: TTranslateEpic = (
  action$,
  state$,
  dependencies,
) => action$.pipe(
  isCreator(commitByLocaleAction),
  switchMap(({ translateKey, locale }) => {
    const translates = selectUncommittedByKey(translateKey)(state$.value);

    const { commitClient, metadata } = dependencies;

    const requests = createRequests({ [locale]: translates[locale] });

    return from(
      Promise.all(
        Object.values(requests)
          .map((payload) => call_AddTranslatesCommand(commitClient, payload, metadata)),
      ),
    ).pipe(
      map(
        () => commitByLocaleSuccessfulAction([translateKey], locale),
      ),
      catchError((err) => {
        alertCommitError(err.message, [translateKey]);

        return EMPTY;
      }),
    );
  }),
  catchError((err) => {
    alertCommitError(err);

    return EMPTY;
  }),
);

const batchCommitTranslatesEpic: TTranslateEpic = (
  action$,
  state$,
  dependencies,
) => action$.pipe(
  isCreator(batchCommitAction),
  switchMap(() => {
    const translates = selectUncommitted(state$.value);

    const translateKeys = Array.from(
      entries(translates).reduce<Set<string>>(
        (acc, entity) => {
          if (isNotNil(entity) && isNotNil(entity[1])) {
            keys(entity[1]).forEach(
              (tKey) => {
                if (!isNumber(tKey)) {
                  acc.add(tKey);
                }
              },
            );
          }

          return acc;
        },
        new Set(),
      ),
    );

    const { commitClient, metadata } = dependencies;

    const requests = createRequests(translates);

    return from(
      Promise.all(
        Object.values(requests)
          .map((payload) => call_AddTranslatesCommand(commitClient, payload, metadata)),
      ),
    ).pipe(
      map(() => commitSuccessfulAction(translateKeys)),
      catchError((err) => {
        alertCommitError(err.message, translateKeys);

        return EMPTY;
      }),
    );
  }),
  catchError((err) => {
    alertCommitError(err);

    return EMPTY;
  }),
);

const commitEpic = combineEpics(
  singleCommitTranslateEpic,
  batchCommitTranslatesEpic,
);

export { commitEpic };
