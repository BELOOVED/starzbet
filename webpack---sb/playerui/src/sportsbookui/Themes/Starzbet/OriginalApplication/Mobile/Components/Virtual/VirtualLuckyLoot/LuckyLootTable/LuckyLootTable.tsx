// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_quickPick } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./LuckyLootTable.module.css";
import { luckyLootColorKeys, luckyLootKeys } from "../../../../../../../../Store/Virtual/LuckyLoot/Model/LuckyLoot";
import { virtualGameActiveField } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import {
  useLuckyLootHandler,
  useLuckyLootRandomPickHandler,
} from "../../../../../../../../Store/Virtual/LuckyLoot/Hooks/UseLuckyLootHandler";
import { range } from "../../../../../../../../Utils/Range";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { VirtualGameClearBottom } from "../../VirtualGameClearBottom/VirtualGameClearBottom";

const Field = memo(({ id }) => {
  const activeField = useSelector(virtualGameActiveField(sportCodeToIdMap[ESportCode.kiron_lucky_loot], id));
  const onChange = useLuckyLootHandler(id);

  const classList = clsx(
    classes.field,
    activeField && classes.active,
    classes[luckyLootColorKeys.find((it) => it.keys.includes(id)).color],
  );

  return (
    <div className={classList} onClick={onChange}>
      {id}
    </div>
  );
});
Field.displayName = "Field";

const Retry = memo(({ count }) => {
  const clickHandler = useLuckyLootRandomPickHandler(count);

  return (
    <div className={classes.retryBtn} onClick={clickHandler}>
      <div className={classes.retryCount}>
        {count}
      </div>
    </div>
  );
});
Retry.displayName = "Retry";

const ButtonsControl = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.buttons}>
      <div className={classes.buttonsLeftSide}>
        <div className={classes.quickTitle}>
          <Ellipsis>
            {t(sportsbookui_starzbet_title_quickPick)}
          </Ellipsis>
        </div>

        {
          range(4, 6).reverse().map((count) => (
            <Retry count={count} key={count} />
          ))
        }
      </div>

      <VirtualGameClearBottom
        sportId={sportCodeToIdMap[ESportCode.kiron_lucky_loot]}
        className={classes.clearButton}
      />
    </div>
  );
});
ButtonsControl.displayName = "ButtonsControl";

const LuckyLootTable = memo(() => (
  <div className={classes.container}>
    <div className={classes.tableContainer}>
      {
        luckyLootKeys.map((it) => (
          <Field id={it} key={it} />
        ))
      }
    </div>

    <ButtonsControl />
  </div>
));
LuckyLootTable.displayName = "LuckyLootTable";

export { LuckyLootTable };
