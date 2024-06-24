import { memo } from "react";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type TNullable } from "@sb/utils";
import classes from "./BonusDescriptionTitle.module.css";
import { TranslateRecord } from "../../../../../../../Components/TranslateRecord/TranslateRecord";

interface IBonusDescriptionTitleProps {
    descriptionTitle: TNullable<TTranslateRecord_Fragment[]>;
}

const BonusDescriptionTitle = memo<IBonusDescriptionTitleProps>(({ descriptionTitle }) => {
  if (!descriptionTitle) {
    return null;
  }

  return (
    <div className={classes.descriptionTitle}>
      <TranslateRecord record={descriptionTitle} />
    </div>
  );
});
BonusDescriptionTitle.displayName = "BonusDescriptionTitle";

export { BonusDescriptionTitle };
