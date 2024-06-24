import { firstValueFrom, Observable, of } from "rxjs";
import { catchError, filter, map, mergeMap, takeUntil } from "rxjs/operators";
import { ajax, type AjaxConfig } from "rxjs/ajax";
import { isCreator, isString, not, type TExplicitAny } from "@sb/utils";
import { callManagerExistsSelector } from "@sb/call-manager";
import { fileServiceFailedAction, fileServiceStartDownloadAction, fileServiceSucceededDownloadAction } from "../FileServiceAction";
import { configSelectors } from "../Selectors";
import { Logger } from "../Utils/Logger";
import { FILE_SERVICE_DOWNLOAD_CALL_SYMBOL, type TFileServiceEpic } from "../Model";

const readFileAsync = (file: Blob | File): Observable<string> =>
  new Observable((subscriber) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (!isString(reader.result)) {
        throw Error("[File-service] [readFileAsync]" +
          "readAsDataURL() The result is a string with a data: URL (string) representing the file's data");
      }

      subscriber.next(reader.result);
    };

    reader.onerror = () => subscriber.error(reader.error);

    return () => reader.abort();
  });

const downloadFileEpic = (header$: Observable<Record<string, TExplicitAny>>): TFileServiceEpic =>
  (action$, state$) => action$
    .pipe(
      isCreator(fileServiceStartDownloadAction),
      mergeMap(async (action) => {
        const { payload: { file, fromShared } } = action;

        const endpoint = fromShared
          ? configSelectors.sharedPrivateEndpoint(state$.value)
          : configSelectors.privateEndpoint(state$.value);

        const pathToFile = `${endpoint}${file.pathToFile}`;

        const ajaxRequest: AjaxConfig = {
          url: pathToFile,
          method: "GET",
          responseType: "blob",
          async: true,
          crossDomain: true,
          headers: await firstValueFrom(header$),
        };

        return firstValueFrom(
          ajax<Blob>(ajaxRequest)
            .pipe(
              mergeMap(
                ({ response }) =>
                  readFileAsync(response)
                    .pipe(
                      map((val) => fileServiceSucceededDownloadAction(
                        file.id,
                        {
                          name: file.originName,
                          src: val,
                          type: response.type,
                          size: response.size,
                        },
                      )),
                    ),
              ),
              catchError((e) => {
                Logger.warn.epic("[downloadFileEpic] Error occurred when request download`.", e);

                return of(fileServiceFailedAction(file.id, false, e));
              }),
              takeUntil(state$.pipe(
                map(() => callManagerExistsSelector(state$.value, FILE_SERVICE_DOWNLOAD_CALL_SYMBOL, file.id)),
                filter(not<boolean>),
              )),
            ),
        );
      }),
    );

export { downloadFileEpic };
