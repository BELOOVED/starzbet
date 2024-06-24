// @ts-nocheck
import {
  platformui_validateFile_error_fileSizeMustBeUnder10mb,
  platformui_validateFile_error_onlyJpgPngAllowed,
} from "@sb/translates/platformui/CommonTKeys";

const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg", "image/bmp", "image/x-ms-bmp"];
const allowedFileTypes = [...allowedImageTypes, "application/pdf"];

const validateFile = (file, allowedTypes) => {
  const validSize = file.size <= 10485760;

  if (!validSize) {
    throw new Error(platformui_validateFile_error_fileSizeMustBeUnder10mb);
  }

  const validType = allowedTypes.includes(file.type);

  if (!validType) {
    throw new Error(platformui_validateFile_error_onlyJpgPngAllowed);
  }
};

export { validateFile, allowedFileTypes };
