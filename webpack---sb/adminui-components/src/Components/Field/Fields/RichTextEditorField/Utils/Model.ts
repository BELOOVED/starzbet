import { type EFileType, type TFileDto } from "@sb/file-service";
import { type TExplicitAny, type TSelector } from "@sb/utils";

type TFileId = {
  type: EFileType.temporary | EFileType.permanent;
  id: string;
};

const separator = "@@@";

type TFileSelector = TSelector<TExplicitAny, TFileDto, [string]>

export type { TFileId, TFileSelector };
export { separator };
