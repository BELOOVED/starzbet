import clsx from "clsx";
import { memo } from "react";
import classes from "./ThemedTranslateRecordHTML.module.css";
import { type ITranslateRecordHTMLProps, TranslateRecordHTML } from "../../../../Components/TranslateRecord/TranslateRecord";

const ThemedTranslateRecordHTML = memo<ITranslateRecordHTMLProps>(({ className, ...props }) => (
  <TranslateRecordHTML className={clsx(classes.themedTranslateRecordHtml, className)} {...props} />
));
ThemedTranslateRecordHTML.displayName = "ThemedTranslateRecordHTML";

export { ThemedTranslateRecordHTML };
