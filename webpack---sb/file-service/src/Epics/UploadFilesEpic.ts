import { catchError, filter, map, mergeMap, pairwise, takeUntil } from "rxjs/operators";
import { EMPTY, merge, of } from "rxjs";
import { ajax, type AjaxConfig } from "rxjs/ajax";
import { getNotNil, isCreator, isEmpty } from "@sb/utils";
import { callManagerExistsSelector, callManagerStartAction } from "@sb/call-manager";
import { fileServiceFailedAction, fileServiceSucceededUploadAction, filesServiceStartUploadAction } from "../FileServiceAction";
import { FILE_SERVICE_UPLOAD_CALL_SYMBOL, type TFileDto, type TFileServiceEpic } from "../Model";
import { configSelectors, fileServiceStartedUploadSelector, fileServiceSucceededUploadSelector } from "../Selectors";
import { Logger } from "../Utils/Logger";

const uploadEpic = ({ file, id }: { file: File; id: string; }, toShared = false): TFileServiceEpic => (_, state$) => {
  const data = new FormData();

  data.append("file", file);

  const endpoint = toShared
    ? configSelectors.sharedUploadEndpoint(state$.value)
    : configSelectors.uploadEndpoint(state$.value);

  const ajaxRequest: AjaxConfig = {
    url: endpoint,
    method: "POST",
    body: data,
    crossDomain: true,
  };

  return ajax<TFileDto[]>(ajaxRequest)
    .pipe(
      map(({ response }) => {
        const [fileDto] = response;

        return fileServiceSucceededUploadAction(
          id,
          getNotNil(fileDto, ["file-service", "uploadEpic", "response"], "fileDto"),
        );
      }),
      catchError(
        (error) => {
          Logger.warn.epic("[uploadFileEpic] Error occurred when request upload`.", error);

          return of(fileServiceFailedAction(id, true, error.response));
        },
      ),
      takeUntil(state$.pipe(
        map(() => callManagerExistsSelector(state$.value, FILE_SERVICE_UPLOAD_CALL_SYMBOL, id)),
        pairwise(),
        filter(([prev, curr]) => prev && !curr),
      )),
    );
};

const uploadFilesEpic: TFileServiceEpic = (
  action$,
  state$,
  dependencies,
) => action$.pipe(
  isCreator(filesServiceStartUploadAction),
  mergeMap((action) => {
    const { files } = action.payload;
    const toUpload = files
      .filter(
        ({ id }) => !(
          fileServiceSucceededUploadSelector(state$.value, [id]) ||
          fileServiceStartedUploadSelector(state$.value, [id])),
      );

    if (isEmpty(toUpload)) {
      return EMPTY;
    }

    const uploadObservables = toUpload
      .map(
        (file) =>
          uploadEpic(file, false)(action$, state$, dependencies),
      );

    return merge(
      of(callManagerStartAction(FILE_SERVICE_UPLOAD_CALL_SYMBOL, toUpload.map(({ id }) => id))),
      ...uploadObservables,
    );
  }),
);

export { uploadFilesEpic };
