import { EFileStateType, type TFileServiceConfig, type TFileServiceState } from "./Model";

const getWithInitialFileServiceState = (config: TFileServiceConfig): { fileService: TFileServiceState; } => ({
  fileService: {
    prevFileInfo: {},
    [EFileStateType.temporary]: {},
    [EFileStateType.privatePermanent]: {},
    config,
    metadata: null,
  },
});

export { getWithInitialFileServiceState };
