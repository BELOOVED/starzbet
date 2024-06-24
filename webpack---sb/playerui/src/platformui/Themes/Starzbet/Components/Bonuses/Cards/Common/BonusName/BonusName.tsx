import { memo } from "react";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import classes from "./BonusName.module.css";
import { TranslateRecord } from "../../../../../../../Components/TranslateRecord/TranslateRecord";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";

interface IBonusNameProps {
  name: TTranslateRecord_Fragment[];
}

const BonusName = memo<IBonusNameProps>(({ name }) => (
  <div className={classes.bonusName}>
    <Ellipsis>
      <TranslateRecord record={name} />
    </Ellipsis>
  </div>
));
BonusName.displayName = "BonusName";

export { BonusName };
