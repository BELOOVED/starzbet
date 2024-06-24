// @ts-nocheck
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { localeChangeAction } from "../../../../common/Actions";

const useChangeLocaleAction = () => {
  const dispatch = useDispatch();

  return useCallback(
    (locale: any) => dispatch(localeChangeAction(locale)),
    [],
  );
};

export { useChangeLocaleAction };
