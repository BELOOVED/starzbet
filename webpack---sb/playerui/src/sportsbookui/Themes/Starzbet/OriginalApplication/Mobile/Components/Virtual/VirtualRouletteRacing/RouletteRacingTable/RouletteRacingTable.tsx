// @ts-nocheck
import clsx from "clsx";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import {
  shared_outcomeEnumValue_black,
  shared_outcomeEnumValue_even,
  shared_outcomeEnumValue_high,
  shared_outcomeEnumValue_low,
  shared_outcomeEnumValue_odd,
  shared_outcomeEnumValue_red,
} from "@sb/translates/shared/SharedTKeys";
import classes from "./RouletteRacingTable.module.css";
import {
  getRacingRouletteColumnKeys,
  getRacingRouletteRowKeys,
  racingRouletteBlackKey,
  racingRouletteColumnPickerKeys,
  racingRouletteKeys,
  racingRouletteRedKey,
  racingRouletteRowPickerKeys,
} from "../../../../../../../../Store/Virtual/RacingRoulette/Model/RacingRoulettte";
import { virtualGameCountKeySelector } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { useRacingRouletteHandler } from "../../../../../../../../Store/Virtual/RacingRoulette/Hooks/UseRacingRouletteHandler";
import { VirtualGameClearBottom } from "../../VirtualGameClearBottom/VirtualGameClearBottom";

const Field = memo(({ id }) => {
  const keyCount = useSelector(virtualGameCountKeySelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette], String(id)));

  const [onChange] = useRacingRouletteHandler(String(id));

  const classesList = clsx(
    classes.box,
    id === 0 && classes.zeroBox,
    racingRouletteRedKey.includes(id) && classes.redBox,
    racingRouletteBlackKey.includes(id) && classes.blackBox,
    keyCount && classes.selected,
  );

  return (
    <div
      className={classesList}
      onClick={onChange}
    >
      {id}
    </div>
  );
});
Field.displayName = "Field";

const ColumnPicker = memo(({ id }) => {
  const columnKey = useMemo(() => getRacingRouletteColumnKeys(id).join(","), [id]);
  const [onChange, onRemove] = useRacingRouletteHandler(columnKey);
  const keyCount = useSelector(virtualGameCountKeySelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette], columnKey));

  return (
    <div
      className={classes.box}
      onClick={onChange}
    >
      {"R"}

      {id}

      <div className={classes.selectedList}>
        {
          keyCount > 0 && [...Array(keyCount).keys()].map((_, idx) => (
            <div
              className={classes.selectedElement}
              onClick={onRemove}
              key={idx}
            />
          ))
        }
      </div>
    </div>
  );
});
ColumnPicker.displayName = "ColumnPicker";

const RowPicker = memo(({ id }) => {
  const rowKey = useMemo(() => getRacingRouletteRowKeys(id).join(","), [id]);
  const keyCount = useSelector(virtualGameCountKeySelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette], rowKey));
  const [onChange, onRemove] = useRacingRouletteHandler(rowKey);

  return (
    <div
      className={classes.box}
      onClick={onChange}
    >
      {"C"}

      {id}

      <div className={classes.selectedList}>
        {
          keyCount > 0 && [...new Array(keyCount).keys()].map((_, idx) => (
            <div
              className={classes.selectedElement}
              onClick={onRemove}
              key={idx}
            />
          ))
        }
      </div>
    </div>
  );
});
RowPicker.displayName = "RowPicker";

const sectorsMap = [
  {
    className: classes.low,
    title: shared_outcomeEnumValue_low,
    selectorKey: racingRouletteKeys.slice(1, 7).join(","),
  },
  {
    className: classes.high,
    title: shared_outcomeEnumValue_high,
    selectorKey: racingRouletteKeys.slice(-6).join(","),
  },
  {
    className: classes.even,
    title: shared_outcomeEnumValue_even,
    selectorKey: racingRouletteKeys.slice(1).filter((it) => !(it % 2)).join(","),
  },
  {
    className: classes.red,
    title: shared_outcomeEnumValue_red,
    selectorKey: racingRouletteRedKey.join(","),
  },
  {
    className: classes.black,
    title: shared_outcomeEnumValue_black,
    selectorKey: racingRouletteBlackKey.join(","),
  },
  {
    className: classes.odd,
    title: shared_outcomeEnumValue_odd,
    selectorKey: racingRouletteKeys.filter((it) => it % 2).join(","),
  },
];

const RacingSector = memo(({ title, className, selectorKey }) => {
  const keyCount = useSelector(virtualGameCountKeySelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette], selectorKey));
  const [onChange, onRemove] = useRacingRouletteHandler(selectorKey);

  return (
    <div
      className={`${classes.box} ${className}`}
      onClick={onChange}
    >
      {title}

      <div className={classes.selectedList}>
        {
          keyCount > 0 && [...new Array(keyCount).keys()].map((_, idx) => (
            <div
              className={classes.selectedElement}
              onClick={onRemove}
              key={idx}
            />
          ))
        }
      </div>
    </div>
  );
});
RacingSector.displayName = "RacingSector";

const RouletteRacingTable = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.rouletteRacingTable}>
        <div className={classes.columns}>
          {
            racingRouletteColumnPickerKeys.map((column) => (
              <ColumnPicker id={column} key={column} />
            ))
          }
        </div>

        <div className={classes.numbers}>
          {
            racingRouletteKeys.map((id) => (
              <Field id={id} key={id} />
            ))
          }
        </div>

        <div className={classes.rows}>
          {
            racingRouletteRowPickerKeys.map(({ id }) => (
              <RowPicker
                key={id}
                id={id}
              />
            ))
          }
        </div>

        <div className={classes.sectors}>
          {
            sectorsMap.map(({ title, ...rest }) => (
              <RacingSector title={t(title)} {...rest} key={title} />
            ))
          }
        </div>

        <div className={classes.buttons}>
          <VirtualGameClearBottom
            sportId={sportCodeToIdMap[ESportCode.kiron_racing_roulette]}
            className={classes.clearButton}
          />
        </div>
      </div>
    </div>
  );
});
RouletteRacingTable.displayName = "RouletteRacingTable";

export { RouletteRacingTable };
