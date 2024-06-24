import { useEffect } from "react";
import { useAction } from "@sb/utils";
import { closedDgaGameAction, openedDgaGameAction } from "../PragmaticDgaActions";

const useDgaGameMount = () => {
  const openedDgaGame = useAction(openedDgaGameAction);
  const closedDgaGame = useAction(closedDgaGameAction);

  useEffect(
    () => {
      openedDgaGame();

      return () => closedDgaGame();
    },
    [],
  );
};

export { useDgaGameMount };
