// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_virtualRoulette_chooseRow_2to1 } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./SpinAndWinTable.module.css";
import {
  ESpinAndWinEdgeKeyEnum,
  getSpinAndWinAllKeysInRow,
  getSpinAndWinOutcome,
  getSpinAndWinSiblingKeysByEdge,
  spinAndWinBlackKey,
  spinAndWinKeys,
  spinAndWinRedKey,
  spinAndWinRowPickerKeys,
} from "../../../../../../../../Store/Virtual/SpinAndWin/Model/SpinAndWin";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

const classListForZero = {
  [ESpinAndWinEdgeKeyEnum.rightThirdTop]: classes.rightThirdTop,
  [ESpinAndWinEdgeKeyEnum.rightMiddle]: classes.rightMiddle,
  [ESpinAndWinEdgeKeyEnum.rightThirdBottom]: classes.rightThirdBottom,
  [ESpinAndWinEdgeKeyEnum.rightBottom]: classes.rightBottom,
};

const classListForFirst = {
  [ESpinAndWinEdgeKeyEnum.leftBottom]: classes.leftBottom,
  [ESpinAndWinEdgeKeyEnum.topMiddle]: classes.topMiddle,
  [ESpinAndWinEdgeKeyEnum.rightTop]: classes.rightTop,
  [ESpinAndWinEdgeKeyEnum.rightMiddle]: classes.rightMiddle,
  [ESpinAndWinEdgeKeyEnum.rightBottom]: classes.rightBottom,
  [ESpinAndWinEdgeKeyEnum.bottomMiddle]: classes.bottomMiddle,
  [ESpinAndWinEdgeKeyEnum.leftMiddle]: classes.leftMiddle,
};

const classListFirstThree = {
  [ESpinAndWinEdgeKeyEnum.topMiddle]: classes.topMiddle,
  [ESpinAndWinEdgeKeyEnum.rightTop]: classes.rightTop,
  [ESpinAndWinEdgeKeyEnum.rightMiddle]: classes.rightMiddle,
  [ESpinAndWinEdgeKeyEnum.rightBottom]: classes.rightBottom,
  [ESpinAndWinEdgeKeyEnum.bottomMiddle]: classes.bottomMiddle,
  [ESpinAndWinEdgeKeyEnum.leftMiddle]: classes.leftMiddle,
};

const classListLastThree = {
  [ESpinAndWinEdgeKeyEnum.leftTop]: classes.leftTop,
  [ESpinAndWinEdgeKeyEnum.topMiddle]: classes.topMiddle,
  [ESpinAndWinEdgeKeyEnum.bottomMiddle]: classes.bottomMiddle,
  [ESpinAndWinEdgeKeyEnum.leftBottom]: classes.leftBottom,
  [ESpinAndWinEdgeKeyEnum.leftMiddle]: classes.leftMiddle,
};

const classListAllDot = {
  [ESpinAndWinEdgeKeyEnum.leftTop]: classes.leftTop,
  [ESpinAndWinEdgeKeyEnum.topMiddle]: classes.topMiddle,
  [ESpinAndWinEdgeKeyEnum.rightTop]: classes.rightTop,
  [ESpinAndWinEdgeKeyEnum.rightMiddle]: classes.rightMiddle,
  [ESpinAndWinEdgeKeyEnum.rightBottom]: classes.rightBottom,
  [ESpinAndWinEdgeKeyEnum.bottomMiddle]: classes.bottomMiddle,
  [ESpinAndWinEdgeKeyEnum.leftBottom]: classes.leftBottom,
  [ESpinAndWinEdgeKeyEnum.leftMiddle]: classes.leftMiddle,
};

const Dot = memo(({
  outcomeId,
  classList,
}) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classesList = clsx(
    classList,
    classes.dot,
    active && classes.dotSelected,
  );

  const clickDot = useCallback(
    (e: any) => {
      e.stopPropagation();
      createHandler();
    },
    [outcomeId, active],
  );

  return (
    <div
      className={classesList}
      onClick={clickDot}
    />
  );
});
Dot.displayName = "Dot";

const DotOutcomeContainer = memo(({
  id,
  marketId,
  edge,
  classList,
}) => {
  const entries = getSpinAndWinSiblingKeysByEdge(edge, id);
  const outcome = getSpinAndWinOutcome(entries);
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome });

  return (
    <Dot
      outcomeId={outcomeId}
      classList={classList}
    />
  );
});
DotOutcomeContainer.displayName = "DotOutcomeContainer";

const SampleDotMap = memo(({ id, marketId }) => {
  switch (id) {
    case 0:
      return (
        <>
          {
            Object.keys(classListForZero).map((key) => (
              <DotOutcomeContainer
                key={key}
                edge={key}
                marketId={marketId}
                id={id}
                classList={classListForZero[key]}
              />
            ))
          }
        </>
      );
    case 1:
      return (
        <>
          {
            Object.keys(classListForFirst).map((key) => (
              <DotOutcomeContainer
                key={key}
                edge={key}
                id={id}
                classList={classListForFirst[key]}
                marketId={marketId}
              />
            ))
          }
        </>
      );
    case 2:
    case 3:
      return (
        <>
          {
            Object.keys(classListFirstThree).map((key) => (
              <DotOutcomeContainer
                key={key}
                edge={key}
                id={id}
                classList={classListFirstThree[key]}
                marketId={marketId}
              />
            ))
          }
        </>
      );
    case 34:
    case 35:
    case 36:
      return (
        <>
          {
            Object.keys(classListLastThree).map((key) => (
              <DotOutcomeContainer
                key={key}
                edge={key}
                id={id}
                classList={classListLastThree[key]}
                marketId={marketId}
              />
            ))
          }
        </>
      );

    default:
      return (
        <>
          {
            Object.keys(classListAllDot).map((key) => (
              <DotOutcomeContainer
                key={key}
                edge={key}
                id={id}
                classList={classListAllDot[key]}
                marketId={marketId}
              />
            ))
          }
        </>
      );
  }
});
SampleDotMap.displayName = "SampleDotMap";

const Field = memo(({ id, outcomeId, marketId }) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classesList = clsx(
    classes.box,
    id === 0 && classes.zeroBox,
    spinAndWinRedKey.includes(id) && classes.redBox,
    spinAndWinBlackKey.includes(id) && classes.blackBox,
    active && classes.selected,
  );

  return (
    <div
      className={classesList}
      onClick={createHandler}
    >
      <span>{id}</span>

      <SampleDotMap marketId={marketId} id={id} />
    </div>
  );
});
Field.displayName = "Field";

const RowPicker = memo(({ outcomeId }) => {
  const [t] = useTranslation();
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classesList = clsx(
    classes.box,
    classes.linePick,
    active && classes.selected,
  );

  return (
    <div
      className={classesList}
      onClick={createHandler}
    >
      {t(sportsbookui_starzbet_virtualRoulette_chooseRow_2to1)}
    </div>
  );
});
RowPicker.displayName = "RowPicker";

const RowPickerContainer = memo(({ id, marketId }) => {
  const entries = getSpinAndWinAllKeysInRow(id);
  const outcome = getSpinAndWinOutcome(entries);
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome });

  return (
    <RowPicker
      outcomeId={outcomeId}
    />
  );
});
RowPickerContainer.displayName = "RowPickerContainer";

const FieldOutcomeContainer = memo(({ id, marketId }) => {
  const outcome = String(id);
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome });

  return (
    <Field
      id={id}
      outcomeId={outcomeId}
      marketId={marketId}
    />
  );
});
FieldOutcomeContainer.displayName = "FieldOutcomeContainer";

const SpinAndWinTable = memo(({ marketId }) => (
  <div className={classes.rouletteTable}>
    {
      spinAndWinKeys.map((key) => (
        <FieldOutcomeContainer
          id={key}
          marketId={marketId}
          key={key}
        />
      ))
    }

    {
      spinAndWinRowPickerKeys.map((row) => (
        <RowPickerContainer
          key={row}
          id={row}
          marketId={marketId}
        />
      ))
    }
  </div>
));
SpinAndWinTable.displayName = "SpinAndWinTable";

export { SpinAndWinTable };
