import clsx from "clsx";
import { memo, type NamedExoticComponent, useReducer } from "react";
import type { TCms_SimplePageContentListContent_Type_Fragment } from "@sb/graphql-client/CmsUI";
import { not } from "@sb/utils";
import { type IQuestionIcon } from "../../../Store/CMS/Model/CmsModel";
import { MultiLangText } from "../CMSText/MultiLangText/MultiLangText";
import { TextEditor } from "../CMSText/TextEditor/TextEditor";
import { QuestionIcon } from "./QuestionIcon/QuestionIcon";

interface IQuestionBlock {
  question: TCms_SimplePageContentListContent_Type_Fragment | null;
  Icon?: NamedExoticComponent<IQuestionIcon>;
  classNameWrapper?: string;
  classNameAnswerToQuestion?: string;
  classNameQuestion?: string;
  classNameActive?: string;
}

const QuestionBlock = memo<IQuestionBlock>(({
  question,
  classNameWrapper,
  classNameAnswerToQuestion,
  classNameQuestion,
  classNameActive,
  Icon,
}) => {
  const [showText, setShowText] = useReducer(not<boolean>, true);

  return (
    <div className={classNameWrapper}>
      <div className={clsx(classNameQuestion, showText && classNameActive)} onClick={setShowText}>
        <MultiLangText arr={question?.question} />

        {Icon ? <Icon expanded={showText} /> : <QuestionIcon expanded={showText} />}
      </div>

      {showText ? <TextEditor className={classNameAnswerToQuestion} textEditor={question?.textEditor} /> : null}
    </div>
  );
});
QuestionBlock.displayName = "QuestionBlock";

export { QuestionBlock };
