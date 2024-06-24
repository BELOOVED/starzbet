import { type TFieldPath } from "@sb/form-new";
import { type ELocale } from "@sb/utils";
import { type EPageType } from "@sb/cms-core";
import { cmsActionType } from "../CMS/Model/CMSActionType";

const addPageAction = (
  formName: string,
  fieldPath: TFieldPath,
  nameChildPage: string,
  systemLocale: ELocale,
  pageId: string,
  typeOfPage?: EPageType,
) => ({
  type: cmsActionType("ADD_PAGE"),
  payload: {
    fieldPath,
    nameChildPage,
    pageId,
    systemLocale,
    typeOfPage,
  },
  metadata: { formName },
});

const changePageNameAction = (formName: string, fieldPath: TFieldPath, newPageName: string, systemLocale: ELocale) => ({
  type: cmsActionType("CHANGE_PAGE_NAME"),
  payload: {
    fieldPath,
    newPageName,
    systemLocale,
  },
  metadata: { formName },
});

const deletePageAction = (formName: string, id?: string) => ({
  type: cmsActionType("DELETE_PAGE"),
  payload: {
    id,
  },
  metadata: { formName },
});

const changePagePriorityAction = (targetPageId: string, lowerPageId?: string, upperPageId?: string, parentPageId?: string | null) => ({
  type: cmsActionType("CHANGE_PAGE_PRIORITY"),
  payload: {
    lowerPageId,
    targetPageId,
    upperPageId,
    parentPageId,
  },
});

export {
  changePagePriorityAction,
  deletePageAction,
  changePageNameAction,
  addPageAction,
};
