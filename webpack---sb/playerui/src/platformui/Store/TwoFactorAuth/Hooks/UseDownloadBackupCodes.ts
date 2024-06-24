import { useSelector } from "react-redux";
import { useCallback } from "react";
import { downloadBlobFile } from "@sb/utils";
import { notNilBackupCodesSelector } from "../TwoFactorAuthSelectors";

const useDownloadBackupCodes = () => {
  const secretKeys = useSelector(notNilBackupCodesSelector);

  const file = new Blob([secretKeys.join("\n")], { type: "text/plain" });

  return useCallback(() => downloadBlobFile(file), [file]);
};

export { useDownloadBackupCodes };
