import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { historyPrevPageAction } from "../HistoryActions";

const useHistoryPrevPageAction = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(historyPrevPageAction()), []);
};

export { useHistoryPrevPageAction };
