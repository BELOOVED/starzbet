import { memo } from "react";
import { useTranslation } from "@sb/translator";
import classes from "./WidgetHeader.module.css";
import { type EStatisticsWidget, statisticsWidgetTKeys } from "../../../../../../../Store/Statistics/Model/Statistics";

interface IWidgetHeaderProps {
  type: EStatisticsWidget;
}

const WidgetHeader = memo<IWidgetHeaderProps>(({ type }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.header}>
      {t(statisticsWidgetTKeys[type])}
    </div>
  );
});
WidgetHeader.displayName = "WidgetHeader";

export { WidgetHeader };
