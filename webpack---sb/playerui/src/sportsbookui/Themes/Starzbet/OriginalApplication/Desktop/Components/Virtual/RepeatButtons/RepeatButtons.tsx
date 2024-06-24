// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_repeat } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useClickOutside, not } from "@sb/utils";
import classes from "./RepeatButtons.module.css";
import { When } from "../../../../../../../../common/Components/When";
import { useChangeRepetitionHandler } from "../../../../../../../Store/Virtual/LuckyLoot/Hooks/UseChangeRepetitionHandler";
import { virtualRepeatPickSelector } from "../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { range } from "../../../../../../../Utils/Range";
import { DropdownIcon } from "../../../../Components/Icons/DropdownIcon/DropdownIcon";

const CountPick = memo(({ count, active }) => {
  const changeRepetition = useChangeRepetitionHandler(count);
  const handleClick = () => changeRepetition();

  return (
    <div
      className={clsx(classes.counter, active && classes.active)}
      onClick={handleClick}
    >
      {count}
    </div>
  );
});
CountPick.displayName = "CountPick";

const RepeatButtons = memo(() => {
  const [t] = useTranslation();
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));
  const repetition = useSelector(virtualRepeatPickSelector);

  const toggleVisible = useCallback(() => setVisible(not), []);

  return (
    <div
      className={classes.button}
      onClick={toggleVisible}
      ref={ref}
    >
      <div className={classes.select}>
        <div className={classes.selectText}>
          <Ellipsis>
            {t(sportsbookui_starzbet_title_repeat)}
          </Ellipsis>

          {" "}

          {repetition}
        </div>

        <DropdownIcon expanded={visible} />
      </div>

      <When condition={visible}>
        <div className={classes.dropDown}>
          {
            range(1, 9).map((count) => (
              <CountPick
                active={count === repetition}
                count={count}
                key={count}
              />
            ))
          }
        </div>
      </When>
    </div>
  );
});
RepeatButtons.displayName = "RepeatButtons";

export { RepeatButtons };
