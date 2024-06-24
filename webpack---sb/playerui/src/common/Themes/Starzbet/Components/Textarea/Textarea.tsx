import clsx from "clsx";
import { memo, type TextareaHTMLAttributes } from "react";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./Textarea.module.css";
import { type ITextareaBaseProps } from "../../../../Components/Field/TextareaFieldCreator";

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, IWithQaAttribute {
  correct: boolean;
  incorrect: boolean;
}

const Textarea = memo<ITextareaProps>(({
  qaAttribute,
  className,
  correct,
  incorrect,
  ...rest
}) => {
  const textareaClass = clsx(
    className,
    classes.textarea,
    correct && classes.correct,
    incorrect && classes.incorrect,
  );

  return (
    <textarea
      className={textareaClass}
      {...rest}
      {...qaAttr(qaAttribute)}
    />
  );
});
Textarea.displayName = "Textarea";

const FormNewTextareaWrapper = memo<ITextareaBaseProps>(({ status, ...props }) => {
  const correct = status === "default";
  const incorrect = status === "error";

  return <Textarea correct={correct} incorrect={incorrect} {...props} />;
});
FormNewTextareaWrapper.displayName = "FormNewTextareaWrapper";

export { FormNewTextareaWrapper };
