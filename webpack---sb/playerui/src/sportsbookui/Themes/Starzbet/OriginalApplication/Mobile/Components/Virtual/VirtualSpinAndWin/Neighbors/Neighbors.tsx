import clsx from "clsx";
import { createElement, memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_neighbors } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./Neighbors.module.css";
import { NativeHorizontalScroll } from "../../../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import {
  spinAndWinBlackKey,
  spinAndWinOrderedKeys,
  spinAndWinRedKey,
} from "../../../../../../../../Store/Virtual/SpinAndWin/Model/SpinAndWin";
import {
  getNeighborsKeys,
  useNeighborsCreateBatchHandler,
  useNeighborsHandler,
} from "../../../../../../../../Store/Virtual/SpinAndWin/Hooks/UseNeighborsHandler";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

interface INumberSliderProps extends INeighborsProps {
  numbers: number[];
}

const NumberSlider = memo<INumberSliderProps>(({ numbers, marketId }) => {
  const [, , isIncluded] = useNeighborsHandler();

  return (
    <div className={classes.neighbors}>
      <NativeHorizontalScroll>
        {
          numbers.map((id) => createElement(
            FieldOutcomeContainer,
            {
              key: id,
              id,
              // @ts-ignore
              hovered: isIncluded(id),
              marketId,
            },
          ))
        }
      </NativeHorizontalScroll>
    </div>
  );
});
NumberSlider.displayName = "NumberSlider";

interface IFieldProps extends Omit<IFieldOutcomeContainerProps, "marketId"> {
  outcomeId: string;
}

const Field = memo<IFieldProps>(({
  id,
  outcomeId,
}) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useNeighborsCreateBatchHandler([outcomeId], !!active);

  const classesList = clsx(
    classes.field,
    id === 0 && classes.zeroBox,
    spinAndWinRedKey.includes(id) && classes.redBox,
    spinAndWinBlackKey.includes(id) && classes.blackBox,
    active && classes.active,
  );

  return (
    <div
      className={classesList}
      onClick={createHandler}
    >
      {id}
    </div>
  );
});
Field.displayName = "Field";

interface IFieldOutcomeContainerProps {
  id: number;
  hovered: boolean;
  marketId: string;
}

const FieldOutcomeContainer = memo<IFieldOutcomeContainerProps>(({ id, marketId, ...rest }) => {
  const entries = getNeighborsKeys(id);
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome: entries.join(",") });

  if (!outcomeId) {
    return null;
  }

  return (
    <Field
      id={id}
      outcomeId={outcomeId}
      {...rest}
    />
  );
});
FieldOutcomeContainer.displayName = "FieldOutcomeContainer";

interface INeighborsProps {
  marketId: string;
}

const Neighbors = memo<INeighborsProps>(({ marketId }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {t(sportsbookui_starzbet_title_neighbors)}
      </div>

      <NumberSlider numbers={spinAndWinOrderedKeys} marketId={marketId} />
    </div>
  );
});
Neighbors.displayName = "Neighbors";

export { Neighbors };
