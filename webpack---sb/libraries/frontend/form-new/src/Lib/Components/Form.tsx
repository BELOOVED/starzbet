import { type ComponentType, createElement, memo } from "react";
import { type TAnyObject, useParamSelector } from "@sb/utils";
import { selectIsFormMounted } from "../Store/";
import { withFormName } from "../Utils";
import { type TWithFormName } from "../Types";
import { FormContext } from "./FormContext";

type TFormContentProps = TWithFormName<{
  content: ComponentType<TAnyObject>;
  fallbackContent?: ComponentType<TAnyObject>;
}>

const FormContent = memo<TFormContentProps>(({
  formName,
  content,
  fallbackContent,
}) => {
  const formIsMounted = useParamSelector(selectIsFormMounted, [formName]);

  if (formIsMounted) {
    return createElement(content);
  }

  if (fallbackContent !== undefined) {
    return createElement(fallbackContent);
  }

  return null;
});
FormContent.displayName = "FormContent";

type TFormProps = TWithFormName<Pick<TFormContentProps, "content" | "fallbackContent">>

/** TODO^HY merge with {@link FormWithWrapper} */
const Form = memo<TFormProps>(({
  formName,
  content,
  fallbackContent,
}) => (
  <FormContext.Provider value={withFormName(formName)}>
    <FormContent formName={formName} content={content} fallbackContent={fallbackContent} />
  </FormContext.Provider>
));
Form.displayName = "Form";

export {
  FormContent,
  Form,
};

export type {
  TFormContentProps,
  TFormProps,
};
