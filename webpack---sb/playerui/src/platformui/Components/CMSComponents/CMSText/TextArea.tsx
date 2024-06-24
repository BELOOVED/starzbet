import clsx from "clsx";
import { memo } from "react";
import classes from "./TextArea.module.css";
import { extractTextFromSpans } from "./Helpers";

interface ITextArea {
  content: string;
  inline?: boolean;
  className?: string;
}

const TextArea = memo<ITextArea>(({ content, className, inline }) => {
  if (inline) {
    const text = extractTextFromSpans(content);

    return (
      <div className={clsx(classes.richText, className)}>{text}</div>
    );
  }
  const node = { __html: content };

  return (
    <div dangerouslySetInnerHTML={node} className={clsx(classes.richText, className)} />
  );
});
TextArea.displayName = "TextArea";

export { TextArea };
