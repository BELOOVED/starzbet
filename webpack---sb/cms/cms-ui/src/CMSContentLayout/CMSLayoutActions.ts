import { type TFieldPath } from "@sb/form-new";
import { type EBlockTypeMap } from "@sb/cms-core";
import { type ECms_BlockWhereFieldPaths } from "@sb/graphql-client";
import { cmsActionType } from "../CMS/Model/CMSActionType";

const validationBlockAction = (formName: string, fieldPath: TFieldPath) => ({
  type: cmsActionType("VALIDATION_BLOCK"),
  payload: { fieldPath },
  metadata: { formName },
});

const validationPageAndMetaContentsAction = (formName: string, fieldPath: TFieldPath) => ({
  type: cmsActionType("VALIDATION_PAGE_AND_META_CONTENT_ACTION"),
  payload: { fieldPath },
  metadata: { formName },
});

const pushBlockAction = (formName: string, fieldPath: TFieldPath, activeTab: EBlockTypeMap) => ({
  type: cmsActionType("PUSH_BLOCK"),
  payload: { fieldPath, activeTab },
  metadata: { formName },
});

const pushImportedBlockAction = (
  formName: string,
  fieldPath: TFieldPath,
  activeTab: EBlockTypeMap,
  content: string,
) => ({
  type: cmsActionType("PUSH_IMPORTED_BLOCK"),
  payload: {
    fieldPath,
    activeTab,
    content,
  },
  metadata: { formName },
});

const pushMetaContentAction = (fieldPath: TFieldPath, formName: string) => ({
  type: cmsActionType("PUSH_META_CONTENT"),
  payload: { fieldPath },
  metadata: { formName },
});

const resetSubFormAction = (formName: string, fieldPath: TFieldPath) => ({
  type: cmsActionType("RESET_SUB_FORM"),
  payload: { fieldPath },
  metadata: { formName },
});

type TExportBlockFieldPath = ECms_BlockWhereFieldPaths.blockPageId | ECms_BlockWhereFieldPaths.blockType;

const exportBlockContentAction = (
  value: string,
  pageName: string,
  fieldPath: TExportBlockFieldPath,
) => ({
  type: cmsActionType("EXPORT_BLOCK_CONTENT"),
  payload: {
    value,
    pageName,
    fieldPath,
  },
});

export {
  type TExportBlockFieldPath,
  validationBlockAction,
  validationPageAndMetaContentsAction,
  resetSubFormAction,
  pushMetaContentAction,
  pushBlockAction,
  exportBlockContentAction,
  pushImportedBlockAction,
};
