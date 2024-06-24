import clsx from "clsx";
import { memo } from "react";
import { isHTML, isVoid } from "@sb/utils";
import type { TCms_MultiLang_Type_Fragment } from "@sb/graphql-client/CmsUI";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import classes from "./MultiLangText.module.css";
import { useCorrectTextByLocale } from "../../../../Hooks/UseCorrectTextByLocale";
import { type TArrayNullable } from "../../../../Store/CMS/Model/CmsModel";
import { isMultiLangArray } from "../../../../Store/CMS/Utils/isTypeOf";
import { Ellipsis } from "../../../Ellipsis/Ellipsis";
import { TextEditor } from "../TextEditor/TextEditor";

interface IMultiLangInput<T> {
  arr: T;
  inline?: boolean;
  wide?: boolean;
  isTextArea?: boolean;
  className?: string;
  isEllipsis?: boolean;
  classNameEllipsis?: string;
}

const MultiLangText = memo<IMultiLangInput<TArrayNullable<TCms_MultiLang_Type_Fragment | TTranslateRecord_Fragment>>>(({
  arr,
  ...props
}) => {
  if (!isMultiLangArray(arr)) {
    return null;
  }

  return <Content arr={arr} {...props} />;
});
MultiLangText.displayName = "MultiLangText";

const InlineMultiLangText = memo<IMultiLangInput<TArrayNullable<TCms_MultiLang_Type_Fragment | TTranslateRecord_Fragment>>>(({
  className,
  ...props
}) => <MultiLangText inline {...props} className={clsx(classes.inline, className)} />);
InlineMultiLangText.displayName = "InlineMultiLangText";

const Content = memo<IMultiLangInput<TCms_MultiLang_Type_Fragment[]>>(({
  arr,
  className,
  inline,
  wide = false,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  isTextArea = true,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  isEllipsis = true,
  classNameEllipsis = "",
}) => {
  const text = useCorrectTextByLocale(arr);

  if (isVoid(text)) {
    return null;
  }

  return isTextArea || isHTML(text)
    ? <TextEditor inline={inline} textEditor={arr} className={className} />
    : (
      <div className={clsx(className, wide && classes.wide)}>
        {isEllipsis ? <Ellipsis>{text}</Ellipsis> : <div className={classNameEllipsis}>{text}</div>}
      </div>
    );
});
Content.displayName = "Content";

export { MultiLangText, InlineMultiLangText };
