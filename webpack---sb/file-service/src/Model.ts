import { type Observable } from "rxjs";
import { type StateObservable } from "redux-observable";
import { type Action, type AnyAction } from "redux";
import { createCallManagerSymbol, type TWithCallManagerState } from "@sb/call-manager";
import { type TExplicitAny } from "@sb/utils";

//для сохранения файла в бд
type TFileDto = {
  id: string;
  hash: string;
  mimeType: string;
  originName: string;
  pathToFile: string;
  signature: string;
  size: number;
};

type TPrevFileInfo = {
  name: string;
  size: number;
  type: string;
}

type TFullFileInfo = {
  src: string;
} & TPrevFileInfo;

enum EFileStateType {
  privatePermanent = "privatePermanent",
  temporary = "temporary",
}

type TTemporaryFile = Record<string, TFileDto>;

type TFileServiceConfig = {
  uploadEndpoint: string;
  sharedUploadEndpoint: string;
  publicEndpoint: string;
  privateEndpoint: string;
  sharedPrivateEndpoint: string;
};

type TPrevFileInfoRecord = Record<string, TPrevFileInfo>;

interface IMetadata {
  [key: string]: string;
}

type TFileServiceState = {
  prevFileInfo: TPrevFileInfoRecord;
  [EFileStateType.temporary]: TTemporaryFile;
  [EFileStateType.privatePermanent]: Record<string, TFullFileInfo>;
  config: TFileServiceConfig;
  metadata: IMetadata | null;
};

type TWithFileServiceState = {
  fileService: TFileServiceState;
} & TWithCallManagerState;

type TFileServiceEpic<
  Input extends Action = AnyAction,
  Output extends Action = AnyAction,
  State extends TWithFileServiceState = TWithFileServiceState,
  Dependencies = TExplicitAny
> = (
  action$: Observable<Input>,
  state$: StateObservable<State>,
  dependencies: Dependencies,
) => Observable<Output>;

const FILE_SERVICE_DOWNLOAD_CALL_SYMBOL = createCallManagerSymbol("FILE_SERVICE_DOWNLOAD_CALL_SYMBOL");

const FILE_SERVICE_UPLOAD_CALL_SYMBOL = createCallManagerSymbol("FILE_SERVICE_UPLOAD_CALL_SYMBOL");

enum EFileStatus {
  ready = "ready",
  pending = "pending",
  error = "error",
}

enum EFileType {
  //permanent - public || private file
  permanent = "permanent", //files that are received from...
  temporary = "temporary", //files that we downloaded but didn't save to...
}

type TFileInfo = {
  status: EFileStatus.ready;
  file: TFullFileInfo;
} | {
  status: EFileStatus.pending;
  file: TPrevFileInfo;
} | {
  status: EFileStatus.error;
  file: TPrevFileInfo;
  error: TExplicitAny;
}

enum EMimeType {
  text_plain = "text/plain",
  application_msword = "application/msword",
  application_pdf = "application/pdf",
  image_jpeg = "image/jpeg",
  image_png = "image/png",
  image_gif = "image/gif",
  audio_mpeg = "audio/mpeg",
  video_mp4 = "video/mp4",
  application_vnd_openxmlformats_officedocument_spreadsheetml_sheet = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  application_vnd_openxmlformats_officedocument_presentationml_presentation = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  text_html = "text/html",
  text_css = "text/css",
  application_javascript = "application/javascript",
  application_zip = "application/zip",
  application_x_rar_compressed = "application/x-rar-compressed",
  application_vnd_android_package_archive = "application/vnd.android.package-archive",
}

type TUseFileOptions = {
  loadOnError?: boolean;
  isBase64?: boolean;
}

export {
  FILE_SERVICE_UPLOAD_CALL_SYMBOL,
  FILE_SERVICE_DOWNLOAD_CALL_SYMBOL,
  EFileType,
  EFileStateType,
  EFileStatus,
  EMimeType,
};

export type {
  TUseFileOptions,
  TFullFileInfo,
  TFileDto,
  TFileServiceEpic,
  TWithFileServiceState,
  TFileServiceConfig,
  TFileServiceState,
  TFileInfo,
  TPrevFileInfoRecord,
  TPrevFileInfo,
  IMetadata,
};
