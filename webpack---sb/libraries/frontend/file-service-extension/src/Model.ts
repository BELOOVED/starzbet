import { type IWithFormsState } from "@sb/form-new";
import { type EFileType, type TWithFileServiceState } from "@sb/file-service";
import { type TNullable } from "@sb/utils";

const FILE_EXTENSION_KEY = "@files";

type TPermanentFileInForm = {
  type: EFileType.permanent;
  id: string;
}

type TFileInForm = {
  type: EFileType;
  id: string;
}

type TFileFieldValue = {
  files: TFileInForm[];
}

interface IFormFileField {
  remove: (id: string) => void;
  onChange: (files: TNullable<FileList>) => void;
  disabled: boolean;
  value: TNullable<TFileFieldValue>;
}

type TFileToUpload = {
  file: File;
  id: string;
}

interface IWithFiles {
  withFiles: boolean;
}

type TFileServiceExtensionState = IWithFormsState & TWithFileServiceState;

export {
  FILE_EXTENSION_KEY,
};

export type {
  TFileFieldValue,
  TFileToUpload,
  IWithFiles,
  TFileInForm,
  TPermanentFileInForm,
  TFileServiceExtensionState,
  IFormFileField,
};
