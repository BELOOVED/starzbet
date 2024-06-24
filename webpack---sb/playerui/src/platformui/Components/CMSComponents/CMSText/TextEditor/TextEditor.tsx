import { memo } from "react";
import { isNil, useParamSelector } from "@sb/utils";
import type { TCms_MultiLang_Type_Fragment } from "@sb/graphql-client/CmsUI";
import { getPayloadWithCorrectValueFromDataAttrSelector } from "../../../../Store/CMS/Selectors/CMSSelectors";
import { type TArrayNullable } from "../../../../Store/CMS/Model/CmsModel";
import { useCorrectTextByLocale } from "../../../../Hooks/UseCorrectTextByLocale";
import { TextArea } from "../TextArea";

interface ITextEditor {
  textEditor: TArrayNullable<TCms_MultiLang_Type_Fragment>;
  inline?: boolean;
  className?: string;
}

const TextEditor = memo<ITextEditor>(({
  textEditor,
  className,
  inline,
}) => {
  const contentWithCorrectValue = useParamSelector(getPayloadWithCorrectValueFromDataAttrSelector, [textEditor]);

  const translate = useCorrectTextByLocale(contentWithCorrectValue);

  if (isNil(translate)) {
    return null;
  }

  return <TextArea inline={inline} content={translate} className={className} />;
});
TextEditor.displayName = "TextEditor";

export { TextEditor };
