import { useEffect, useLayoutEffect } from "react";
import { useAction, useParamSelector } from "@sb/utils";
import { fileServiceRemoveFilesAction, fileServiceStartDownloadAction } from "./FileServiceAction";
import { EFileStateType, type EFileType, type TFileInfo, type TUseFileOptions } from "./Model";
import { fileServiceFileInfoSelector, fileToDownloadSelector, type TPermanentSelector } from "./Selectors";

const isDataUrl = (url: string) => url.startsWith("data:");

const useFile = <Type extends EFileType>(
  type: Type,
  id: string,
  selector: Type extends EFileType.permanent ? TPermanentSelector : null | TPermanentSelector,
  options?: TUseFileOptions,
): TFileInfo => {
  const { loadOnError, isBase64 }:Required<TUseFileOptions> = {
    loadOnError: options?.loadOnError ?? false,
    isBase64: options?.isBase64 ?? false,
  };

  const startLoad = useAction(fileServiceStartDownloadAction);
  const removeFile = useAction(fileServiceRemoveFilesAction);

  const dtoToLoad = useParamSelector(
    fileToDownloadSelector,
    [type, id, selector, loadOnError, isBase64],
  );

  const info = useParamSelector(
    fileServiceFileInfoSelector,
    [type, id, selector, isBase64],
  );

  useEffect(
    () => {
      if (dtoToLoad) {
        startLoad(dtoToLoad);
      }
    },
    [dtoToLoad],
  );

  useLayoutEffect(
    () => () => {
      if (info.status === "pending") {
        removeFile(EFileStateType.privatePermanent, [id]);
      }
    },
    [],
  );

  useEffect(
    () => () => {
      if (info.status === "ready" && isDataUrl(info.file.src)) {
        URL.revokeObjectURL(info.file.src);
      }
    },
    [info.status],
  );

  return info;
};

export { useFile };
