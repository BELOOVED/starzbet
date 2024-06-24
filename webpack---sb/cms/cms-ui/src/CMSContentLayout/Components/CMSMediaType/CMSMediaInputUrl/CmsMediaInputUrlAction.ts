import { type TFieldPath } from "@sb/form-new";
import { type ELocale } from "@sb/utils";
import { cmsActionType } from "../../../../CMS/Model/CMSActionType";

const addMediaInputValueAction = (formName: string, fieldPath: TFieldPath, systemLocale: ELocale, value: string, pageId: string) => ({
  type: cmsActionType("ADD_MEDIA_INPUT_VALUE"),
  payload: {
    fieldPath,
    systemLocale,
    value,
    pageId,
  },
  metadata: { formName },
});
export { addMediaInputValueAction };
