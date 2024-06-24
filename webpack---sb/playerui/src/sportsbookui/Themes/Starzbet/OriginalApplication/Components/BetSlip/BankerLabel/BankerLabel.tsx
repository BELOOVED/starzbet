import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_title_banker } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BankerLabel.module.css";

interface IBankerLabelProps {
  banker: boolean;
}

const BankerLabel = memo<IBankerLabelProps>(({ banker }) => {
  const [t] = useTranslation();
  if (!banker) {
    return null;
  }

  return (
    <div className={clsx(classes.banker, classes.active)}>
      {t(sportsbookui_starzbet_betSlip_title_banker)}
    </div>
  );
});
BankerLabel.displayName = "BankerLabel";

export {
  BankerLabel,
};
