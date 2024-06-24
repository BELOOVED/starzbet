import clsx from "clsx";
import { memo } from "react";
import { type TSelector, useParamSelector, withProps } from "@sb/utils";
import { type IWithQaAttribute } from "@sb/qa-attributes";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import classes from "./UserMessageHTML.module.css";
import { type IWithUserMessageState } from "../../../../../Store/UserMessage/UserMessageInitialState";
import { userMessageMessagePropertySelectors } from "../../../../../Store/UserMessage/UserMessageSelectors";
import { ThemedTranslateRecordHTML } from "../../ThemedTranslateRecordHTML/ThemedTranslateRecordHTML";

interface IUserMessageHTMLProps extends IWithId, IWithClassName, IWithQaAttribute {
  selector: TSelector<IWithUserMessageState, TTranslateRecord_Fragment[], [id: string]>;
  textContent?: boolean;
}

const Content = memo<IUserMessageHTMLProps>(({
  selector,
  id,
  className,
  textContent,
  qaAttribute,
}) => {
  const messagesRecord = useParamSelector(selector, [id]);

  return (
    <ThemedTranslateRecordHTML
      record={messagesRecord}
      className={clsx(classes.userMessageHtml, className)}
      textContent={textContent}
      qaAttribute={qaAttribute}
    />
  );
});
Content.displayName = "Content";

const UserMessageSubjectHTML = withProps(Content)({ selector: userMessageMessagePropertySelectors.subject, textContent: false });

const UserMessageSubjectText = withProps(Content)({ selector: userMessageMessagePropertySelectors.subject, textContent: true });

const UserMessageMessageHTML = withProps(Content)({ selector: userMessageMessagePropertySelectors.message, textContent: false });

export { UserMessageSubjectHTML, UserMessageMessageHTML, UserMessageSubjectText };
