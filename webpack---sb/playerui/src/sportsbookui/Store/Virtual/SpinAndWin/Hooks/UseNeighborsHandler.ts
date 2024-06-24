import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { betSlipCreateBatchPickAction, betSlipRemovePickAction } from "../../../BetSlip/BetSlipActions";
import { pickKind } from "../../../BetSlip/Model/BetPick";
import { spinAndWinOrderedKeys } from "../Model/SpinAndWin";

const getNeighborsKeys = (id: number): number[] => {
  let result = [];
  const index = spinAndWinOrderedKeys.indexOf(id);

  if (index === 0) {
    result = [...spinAndWinOrderedKeys.slice(-2), ...spinAndWinOrderedKeys.slice(0, 3)];
  } else if (index === 1) {
    result = [...spinAndWinOrderedKeys.slice(-1), ...spinAndWinOrderedKeys.slice(0, 4)];
  } else if (index === spinAndWinOrderedKeys.length - 1) {
    result = [...spinAndWinOrderedKeys.slice(-3), ...spinAndWinOrderedKeys.slice(0, 2)];
  } else if (index === spinAndWinOrderedKeys.length - 2) {
    result = [...spinAndWinOrderedKeys.slice(-4, -1), ...spinAndWinOrderedKeys.slice(-1), spinAndWinOrderedKeys[0]];
  } else {
    result = [...spinAndWinOrderedKeys.slice(index - 2, index + 3)];
  }

  return result;
};

const useNeighborsHandler = () => {
  const [neighbors, setNeighbors] = useState<number[]>([]);

  const onHover = useCallback(
    (id: number) => {
      setNeighbors(getNeighborsKeys(id));
    },
    [],
  );

  const onMouseLeave = useCallback(
    () => {
      setNeighbors([]);
    },
    [],
  );

  const isIncluded: (id: number) => boolean = useCallback((id) => neighbors.includes(id), [neighbors]);

  return [onHover, onMouseLeave, isIncluded];
};

const useNeighborsCreateBatchHandler = (outcomeIds, active = false) => {
  const dispatch = useDispatch();

  const createHandler = useCallback(
    () => {
      dispatch(betSlipCreateBatchPickAction(pickKind.virtualGame, outcomeIds));
    },
    [outcomeIds],
  );

  const removeHandler = useCallback(
    () => {
      dispatch(betSlipRemovePickAction(outcomeIds[0]));
    },
    [outcomeIds],
  );

  return active ? removeHandler : createHandler;
};

export { useNeighborsHandler, getNeighborsKeys, useNeighborsCreateBatchHandler };
