// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { noop } from "../../../Utils/Noop";
import { betSlipCreatePickAction, betSlipRemovePickAction } from "../BetSlipActions";
import { picksAreExceededSelector } from "../Selectors/BetSlipSelectors";
import { type TPickKind } from "../Model/BetPick";

const usePickHandler = (id: string, active, pickKind: TPickKind, locked) => {
  const dispatch = useDispatch();

  const picksAreExceeded = useSelector(picksAreExceededSelector);

  const createHandle = useCallback(
    () => {
      if (picksAreExceeded) {
        return;
      }

      dispatch(betSlipCreatePickAction(pickKind, id));
    },
    [id, picksAreExceeded],
  );

  const removeHandle = useCallback(
    () => dispatch(betSlipRemovePickAction(id)),
    [id],
  );

  if (locked) {
    return noop;
  }

  return active
    ? removeHandle
    : createHandle;
};

export { usePickHandler };
