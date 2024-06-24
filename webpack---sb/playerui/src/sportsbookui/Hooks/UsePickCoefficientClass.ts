// @ts-nocheck
import clsx from "clsx";
import { useParamSelector } from "@sb/utils";
import {
  placedPickCoefficientByIdSelector,
} from "../Store/BetSlip/Selectors/PlacedPickCoefficientByIdSelector";
import { usePrevious } from "./UsePrevious";

const usePickCoefficientClass = (classes, currentCoefficient, id) => {
  const placedPickCoefficient = useParamSelector(placedPickCoefficientByIdSelector, [id]);

  const prevCoefficient = usePrevious(placedPickCoefficient);

  return clsx(
    currentCoefficient > prevCoefficient && classes.up,
    prevCoefficient > currentCoefficient && classes.down,
  );
};

export { usePickCoefficientClass };
