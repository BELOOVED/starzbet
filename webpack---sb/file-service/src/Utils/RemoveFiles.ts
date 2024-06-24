import { callManagerRemoveSymbols } from "@sb/call-manager";
import { EFileStateType, FILE_SERVICE_DOWNLOAD_CALL_SYMBOL, FILE_SERVICE_UPLOAD_CALL_SYMBOL, type TWithFileServiceState } from "../Model";

const removeFiles = <State extends TWithFileServiceState>(
  state: State,
  type: EFileStateType,
  ids: string[],
): State => {
  const files = { ...state.fileService[type] };

  ids.forEach((id) => {
    delete files[id];
  });

  return callManagerRemoveSymbols(
    {
      ...state,
      fileService: {
        ...state.fileService,
        [type]: files,
      },
    },
    type === EFileStateType.temporary ? FILE_SERVICE_UPLOAD_CALL_SYMBOL : FILE_SERVICE_DOWNLOAD_CALL_SYMBOL,
    ids,
  );
};

export { removeFiles };
