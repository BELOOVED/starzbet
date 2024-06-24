import { FILES_FIELD, type TFieldPath } from "@sb/form-new";
import { BLOCK_CONTENT, EBlockTypeMap, PAGE_CONTENT } from "@sb/cms-core";

const getFileIdsPath = (contextPath: TFieldPath, activeTab: EBlockTypeMap) => activeTab === EBlockTypeMap.PAGES
  ? contextPath.concat(PAGE_CONTENT, BLOCK_CONTENT, FILES_FIELD)
  : contextPath.concat(BLOCK_CONTENT, FILES_FIELD);

export { getFileIdsPath };
