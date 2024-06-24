// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_button_clear } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./VirtualGameClearBottom.module.css";
import { betSlipRemoveAllVirtualGamePickAction } from "../../../../../../../Store/BetSlip/BetSlipActions";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { virtualGameBySportSelector } from "../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";

const VirtualGameClearBottom = memo(({ sportId, className }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const pick = useSelector(virtualGameBySportSelector(sportId));

  const handleCLear = useCallback(
    () => {
      dispatch(betSlipRemoveAllVirtualGamePickAction(sportId));
    },
    [sportId],
  );

  const classesList = clsx(classes.clearAll, !pick && classes.disable, className);

  return (
    <div onClick={handleCLear} className={classesList}>
      <Ellipsis>
        {t(sportsbookui_starzbet_betSlip_button_clear)}
      </Ellipsis>
    </div>
  );
});
VirtualGameClearBottom.displayName = "VirtualGameClearBottom";

export { VirtualGameClearBottom };
