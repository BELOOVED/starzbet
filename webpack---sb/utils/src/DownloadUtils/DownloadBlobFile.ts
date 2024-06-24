import { downloadFile } from "./DownloadFile";

const downloadBlobFile = (file: Blob): void => {
  const url = window.URL.createObjectURL(file);

  downloadFile(url, "backupCodes.txt");

  window.URL.revokeObjectURL(url);
}

export { downloadBlobFile };
