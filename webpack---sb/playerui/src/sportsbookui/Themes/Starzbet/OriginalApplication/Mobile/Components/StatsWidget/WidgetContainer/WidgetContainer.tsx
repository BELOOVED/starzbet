// @ts-nocheck
import classes from "./WidgetContainer.module.css";

const WidgetContainer = ({ children }) => (
  <div className={classes.statsWidget}>
    {children}
  </div>
);
WidgetContainer.displayName = "WidgetContainer";

export { WidgetContainer };
