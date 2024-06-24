import { combineEpics } from "redux-observable";
import { type Observable } from "rxjs";
import { map } from "rxjs/operators";
import { type TAnyObject } from "@sb/utils";
import { uploadFilesEpic } from "./Epics/UploadFilesEpic";
import { downloadFileEpic } from "./Epics/DownloadFileEpic";
import { fileServiceSetMetadataAction } from "./FileServiceAction";
import type { TFileServiceEpic } from "./Model";

const fileServiceEpicFactory = (header$: Observable<TAnyObject>):TFileServiceEpic => {
  const metadataAction$ = header$.pipe(
    map((value) => fileServiceSetMetadataAction(value)),
  );

  return combineEpics(
    () => metadataAction$,
    uploadFilesEpic,
    downloadFileEpic(header$),
  );
};

export { fileServiceEpicFactory };
