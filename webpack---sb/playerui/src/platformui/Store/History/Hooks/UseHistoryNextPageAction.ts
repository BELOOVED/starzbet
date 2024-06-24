import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { historyNextPageAction } from "../HistoryActions";

const useHistoryNextPageAction = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(historyNextPageAction()), []);
};

export { useHistoryNextPageAction };
