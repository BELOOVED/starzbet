import {
  callManagerErrorSelector,
  callManagerStartedSelector,
  callManagerSucceededSelector,
  callManagerWasSucceededSelector,
} from "@sb/call-manager";
import {
  createMemoSelector,
  createPropertySelectors,
  getNotNil,
  isEmpty,
  type TArrayNotEmpty,
  type TExplicitAny,
  toLowerCase,
  type TSelector,
} from "@sb/utils";
import {
  EFileStateType,
  EFileStatus,
  EFileType,
  FILE_SERVICE_DOWNLOAD_CALL_SYMBOL,
  FILE_SERVICE_UPLOAD_CALL_SYMBOL,
  type IMetadata,
  type TFileDto,
  type TFileInfo,
  type TPrevFileInfo,
  type TWithFileServiceState,
} from "./Model";
import { isPrivateFile, isPublicFile, isTempFile } from "./Utils/IsPrivateFile";

type TPermanentSelector = TSelector<TExplicitAny, TFileDto, [id: string]>;

type TFileInfoSelector = TSelector<
  TWithFileServiceState, TFileInfo, [id: string, permanentFileSelector: null | TPermanentSelector, secure: boolean]
>
//upload
const fileServiceSucceededUploadSelector = callManagerSucceededSelector.with.symbol(FILE_SERVICE_UPLOAD_CALL_SYMBOL);
const fileServiceStartedUploadSelector = callManagerStartedSelector.with.symbol(FILE_SERVICE_UPLOAD_CALL_SYMBOL);
const fileServiceErrorUploadSelector = callManagerErrorSelector.with.symbol(FILE_SERVICE_UPLOAD_CALL_SYMBOL);

//download
const fileServiceErrorDownloadSelector = callManagerErrorSelector.with.symbol(FILE_SERVICE_DOWNLOAD_CALL_SYMBOL);
const fileServiceWasSucceededDownloadSelector = callManagerWasSucceededSelector.with.symbol(FILE_SERVICE_DOWNLOAD_CALL_SYMBOL);
const fileServiceSucceededDownloadSelector = callManagerSucceededSelector.with.symbol(FILE_SERVICE_DOWNLOAD_CALL_SYMBOL);
const fileServiceStartedDownloadSelector = callManagerStartedSelector.with.symbol(FILE_SERVICE_DOWNLOAD_CALL_SYMBOL);

const fileServiceSelectors = createPropertySelectors((state: TWithFileServiceState) => state.fileService);

const temporaryFileSelector = (state: TWithFileServiceState, id: string, context: TArrayNotEmpty<string>) => getNotNil(
  fileServiceSelectors[EFileStateType.temporary](state)[id],
  [...context, `File by type ${EFileStateType.temporary} with id "${id}" not found`],
  "file",
);

const fileToDownloadSelector = <Type extends EFileType>(
  state: TWithFileServiceState,
  type: Type,
  id: string,
  permanentSelector: Type extends EFileType.permanent ? TPermanentSelector : null | TPermanentSelector,
  loadOnError = false,
  isBase64 = false,
): TFileDto | null => {
  if (type !== EFileType.permanent) {
    return null;
  }
  const fileDto = getNotNil(permanentSelector, ["fileToLoadSelector"], "permanentSelector")(state, id);

  if (!isPrivateFile(fileDto.pathToFile)) {
    return null;
  }
  //base64 === true for loading on device
  if (!isBase64){
    return null;
  }

  const wasLoaded = fileServiceWasSucceededDownloadSelector(state, id);

  if (wasLoaded) {
    return null;
  }

  const loading = fileServiceStartedDownloadSelector(state, id);

  if (loading) {
    return null;
  }

  const error = fileServiceErrorDownloadSelector(state, id);

  if (!error || loadOnError) {
    return fileDto;
  }

  return null;
};

const metadataToQueryString = (metadata:IMetadata) => Object.entries(metadata)
  .map(([key, value]) => `${toLowerCase(key)}=${String(value)}`)
  .join("&");

const permanentFileInfoSelector = createMemoSelector(
  (
    state: TWithFileServiceState,
    id: string,
    permanentSelector: null | TPermanentSelector,
    isBase64 = false,
  ): TFileInfo => {
    const fileDto = getNotNil(permanentSelector, ["permanentFileInfoSelector"], "permanentSelector")(state, id);
    const prevFileInfo: TPrevFileInfo = {
      type: fileDto.mimeType,
      size: fileDto.size,
      name: fileDto.originName,
    };

    if (isPublicFile(fileDto.pathToFile)) {
      const endpoint = configSelectors.publicEndpoint(state);

      return {
        status: EFileStatus.ready,
        file: {
          type: fileDto.mimeType,
          size: fileDto.size,
          src: `${endpoint}/${fileDto.pathToFile}`,
          name: fileDto.originName,
        },
      };
    }

    if (!isBase64){
      const endpoint = configSelectors.privateEndpoint(state);
      const metadata = fileServiceSelectors.metadata(state);

      if (metadata === null || isEmpty(metadata)){
        return {
          status: EFileStatus.error,
          error: "missing metadata",
          file: prevFileInfo,
        };
      }

      return {
        status: EFileStatus.ready,
        file: {
          type: fileDto.mimeType,
          size: fileDto.size,
          src: `${endpoint}/${fileDto.pathToFile}?${metadataToQueryString(metadata)}&disposition=inline`,
          name: fileDto.originName,
        },
      };
    }

    const isPending = fileServiceStartedDownloadSelector(state, id);

    if (isPending) {
      return {
        status: EFileStatus.pending,
        file: prevFileInfo,
      };
    }

    const isLoaded = fileServiceSucceededDownloadSelector(state, id);

    if (isLoaded) {
      const file = getNotNil(
        fileServiceSelectors[EFileStateType.privatePermanent](state)[id],
        ["fileSourceSelectorFactory", "permanent", "isLoaded", id],
        "privatePermanent",
      );

      return {
        status: EFileStatus.ready,
        file,
      };
    }

    const errorOnLoad = fileServiceErrorDownloadSelector(state, id);

    if (errorOnLoad) {
      return {
        status: EFileStatus.error,
        file: prevFileInfo,
        error: errorOnLoad,
      };
    }

    //этот статус может вернуться если файл не начал свою загрузку
    //сюда попадает только на время пока экшен на загрузку не будет задиспатчен (микросекунды)
    return {
      status: EFileStatus.pending,
      file: prevFileInfo,
    };
  },
  { resultEqual: "deepEqual" },
);

const temporaryFileInfoSelector = createMemoSelector(
  (state: TWithFileServiceState, id: string, _: null | TPermanentSelector, __: boolean): TFileInfo => {
    const isPending = fileServiceStartedUploadSelector(state, id);

    if (isPending) {
      const prevFileInfo = getNotNil(
        fileServiceSelectors.prevFileInfo(state)[id],
        ["temporaryFileInfoSelector", "isPending", `prevFileInfo with id "${id}" not found`],
        "prevFileInfo",
      );

      return {
        status: EFileStatus.pending,
        file: prevFileInfo,
      };
    }

    const errorOnLoad = fileServiceErrorUploadSelector(state, id);

    if (errorOnLoad) {
      const prevFileInfo = getNotNil(
        fileServiceSelectors.prevFileInfo(state)[id],
        ["temporaryFileInfoSelector", "errorOnLoad", `prevFileInfo with id "${id}" not found`],
        "prevFileInfo",
      );

      return {
        status: EFileStatus.error,
        file: prevFileInfo,
        error: errorOnLoad,
      };
    }

    const endpoint = configSelectors.publicEndpoint(state);

    const fileDto = temporaryFileSelector(state, id, ["temporaryFileInfoSelector"]);

    if (!isTempFile(fileDto.pathToFile)) {
      throw Error("the temp file should get here");
    }

    return {
      status: EFileStatus.ready,
      file: {
        type: fileDto.mimeType,
        size: fileDto.size,
        src: `${endpoint}/${fileDto.pathToFile}`,
        name: fileDto.originName,
      },
    };
  },
  { resultEqual: "deepEqual" },
);

const FILE_TYPE_TO_INFO_SELECTOR: Record<EFileType, TFileInfoSelector> = {
  [EFileType.permanent]: permanentFileInfoSelector,
  [EFileType.temporary]: temporaryFileInfoSelector,
};

const fileServiceFileInfoSelector = <S extends TWithFileServiceState, Type extends EFileType>(
  state: S,
  type: Type,
  id: string,
  selector: Type extends EFileType.permanent ? TPermanentSelector : null | TPermanentSelector,
  secure: boolean,
): TFileInfo => FILE_TYPE_TO_INFO_SELECTOR[type](state, id, selector, secure);

const configSelectors = createPropertySelectors((state: TWithFileServiceState) =>
  getNotNil(
    fileServiceSelectors.config(state),
    ["configSelectors", "the service config is not set"],
    "config",
  ));

export {
  fileToDownloadSelector,
  fileServiceFileInfoSelector,
  fileServiceSelectors,
  configSelectors,
  type TPermanentSelector,
  fileServiceSucceededUploadSelector,
  fileServiceStartedUploadSelector,
  temporaryFileSelector,
};
