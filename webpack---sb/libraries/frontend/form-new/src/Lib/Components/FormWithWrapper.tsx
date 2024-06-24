import { type ComponentType, createElement, memo } from "react";
import { type TAnyObject } from "@sb/utils";
import { type TFormHandlerPredicate, useFormName, useResetHandler, useSubmitHandler } from "../Hooks";
import { type TWithFormName } from "../Types";
import { Form, type TFormProps } from "./Form";

const withFormWrapper = (content: ComponentType<TAnyObject>, predicate?: TFormHandlerPredicate) => memo(() => {
  const formName = useFormName();
  const handleSubmit = useSubmitHandler(predicate);
  const handleReset = useResetHandler(predicate);

  return (
    <form
      id={formName}
      onSubmit={handleSubmit}
      onReset={handleReset}
      noValidate
    >
      {createElement(content)}
    </form>
  );
});

type TFormWithWrapperProps = TWithFormName<Pick<TFormProps, "content" | "fallbackContent"> & {
  predicate?: TFormHandlerPredicate;
}>

/** TODO^HY merge with {@link Form} */
const FormWithWrapper = memo<TFormWithWrapperProps>(({
  formName,
  content,
  fallbackContent,
  predicate,
}) => (
  <Form
    formName={formName}
    content={withFormWrapper(content, predicate)}
    fallbackContent={fallbackContent}
  />
));
FormWithWrapper.displayName = "FormWithWrapper";

export { FormWithWrapper };
