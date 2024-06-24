import { CMS_EXTENSION_KEY, type IWithFormsState, selectFieldDefExtension, type TFieldPath } from "@sb/form-new";
import { type ICMSExtensions, RICH_TEXT_COMPONENTS } from "@sb/cms-core";
import { isNil } from "@sb/utils";

const isRichTextComponentSelector = (state: IWithFormsState, formName: string, path: TFieldPath) => {
  const cmsExtension = selectFieldDefExtension<ICMSExtensions>(state, formName, path, CMS_EXTENSION_KEY);

  if (isNil(cmsExtension?.componentType)) {
    return false;
  }

  return RICH_TEXT_COMPONENTS.includes(cmsExtension.componentType);
};

const isBlockContentSelector = (state: IWithFormsState, formName: string, path: TFieldPath) => {
  const cmsExtension = selectFieldDefExtension<ICMSExtensions>(state, formName, path, CMS_EXTENSION_KEY);

  return cmsExtension?.customExtensions.isBlockContent;
};
export { isBlockContentSelector, isRichTextComponentSelector };
