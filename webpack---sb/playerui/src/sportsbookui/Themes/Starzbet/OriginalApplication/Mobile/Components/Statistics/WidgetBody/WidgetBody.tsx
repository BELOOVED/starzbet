import { type FC, type PropsWithChildren } from "react";
import classes from "./WidgetBody.module.css";

const WidgetBody: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.widgetBody}>
    {children}
  </div>
);
WidgetBody.displayName = "WidgetBody";

export { WidgetBody };
