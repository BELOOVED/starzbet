// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_quickPick } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useClickOutside, not } from "@sb/utils";
import classes from "./KenoTable.module.css";
import { When } from "../../../../../../../../../common/Components/When";
import { kenoKeys, kenoQuickPickKeys } from "../../../../../../../../Store/Virtual/Keno/Model/Keno";
import { virtualGameActiveField } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { useKenoHandler, useLuckyLootRandomPickHandler } from "../../../../../../../../Store/Virtual/Keno/Hooks/UseKenoHandler";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { Arrow } from "../../../../../Components/Arrow/Arrow";
import { VirtualGameClearBottom } from "../../VirtualGameClearBottom/VirtualGameClearBottom";

const KenoField = memo(({ id }) => {
  const onChange = useKenoHandler(id);
  const activeField = useSelector(virtualGameActiveField(sportCodeToIdMap[ESportCode.kiron_keno], id));

  const classList = clsx(
    classes.field,
    activeField && classes.active,
    id <= 40 && classes.yellow,
    id > 40 && classes.orange,
  );

  return (
    <span
      className={classList}
      onClick={onChange}
    >
      {id}
    </span>
  );
});
KenoField.displayName = "KenoField";

const CountPick = memo(({ count, active, onChange }) => {
  const clickHandler = () => onChange(count);

  return (
    <div
      className={clsx(classes.counter, active && classes.active)}
      onClick={clickHandler}
    >
      {count}
    </div>
  );
});
CountPick.displayName = "CountPick";

const Select = memo(({ countPick, changeCount }) => {
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));

  const toggleVisible = useCallback(() => setVisible(not), []);

  return (
    <div
      className={classes.select}
      onClick={toggleVisible}
      ref={ref}
    >
      <div className={classes.selectCurrent}>
        {countPick}

        <Arrow styleKey={"1"} invert={visible} />
      </div>

      <When condition={visible}>
        <div className={classes.dropDown}>
          {
            kenoQuickPickKeys.map((count) => (
              <CountPick
                active={count === countPick}
                count={count}
                onChange={changeCount}
                key={count}
              />
            ))
          }
        </div>
      </When>
    </div>
  );
});
Select.displayName = "Select";

const QuickPick = memo(() => {
  const [countPick, changeCount, onShuffle] = useLuckyLootRandomPickHandler();
  const [t] = useTranslation();

  return (
    <div className={classes.quickPick}>
      <div className={classes.quickTitle}>
        <Ellipsis>
          {t(sportsbookui_starzbet_title_quickPick)}
        </Ellipsis>
      </div>

      <Select countPick={countPick} changeCount={changeCount} />

      <div className={classes.shuffleBtn} onClick={onShuffle}>
        <div className={classes.shuffleIcon} />
      </div>
    </div>
  );
});
QuickPick.displayName = "QuickPick";

const ButtonsControl = memo(() => (
  <div className={classes.buttons}>
    <QuickPick />

    <VirtualGameClearBottom
      sportId={sportCodeToIdMap[ESportCode.kiron_keno]}
      className={classes.clearButton}
    />
  </div>
));
ButtonsControl.displayName = "ButtonsControl";

const KenoTable = memo(() => (
  <div className={classes.container}>
    <div className={classes.tableContainer}>
      {
        kenoKeys.map((it) => (
          <KenoField id={it} key={it} />
        ))
      }
    </div>

    <ButtonsControl />
  </div>
));
KenoTable.displayName = "KenoTable";

export { KenoTable };
