// @ts-nocheck
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAction } from "@sb/utils";
import { requestMyBetsAction, resetMyBetsAction } from "../MyBetsActions";
import { addingEditableBetSelector } from "../Selectors/MyBetsSelectors";

const useMyBets = (typeFilters, countPerPage, timeRange = null) => {
  const request = useAction(requestMyBetsAction);
  const reset = useAction(resetMyBetsAction);
  const adding = useSelector(addingEditableBetSelector);

  useEffect(
    () => {
      if (!adding) {
        request(typeFilters, countPerPage, timeRange);
      }

      return reset;
    },
    [],
  );
};

export { useMyBets };
