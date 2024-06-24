import clsx from "clsx";
import { memo } from "react";
import classes from "./QuestionIcon.module.css";
import { type IQuestionIcon } from "../../../../Store/CMS/Model/CmsModel";
import { ExpandedIcon } from "./ExpandedIcon";

const QuestionIcon = memo<IQuestionIcon>(
  ({ expanded }) =>
    <ExpandedIcon size={"xs"} className={clsx(expanded && classes.arrowUpQuestion)} />,
);
QuestionIcon.displayName = "QuestionIcon";

export { QuestionIcon };
