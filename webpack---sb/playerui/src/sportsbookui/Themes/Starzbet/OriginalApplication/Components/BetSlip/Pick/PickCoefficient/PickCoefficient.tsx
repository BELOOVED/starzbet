import clsx from "clsx";
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import classes from "./PickCoefficient.module.css";
import { coefficientByOutcomeIdSelector } from "../../../../../../../Store/Feed/Selectors/OutcomeByIdSelector";
import { usePickCoefficientClass } from "../../../../../../../Hooks/UsePickCoefficientClass";
import { coefficientFormat } from "../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { type TWithOutcomeId } from "../../BetConstructor/BetConstructorContent/TBetConstructorContent";

const BetConstructorPickCoefficient = memo<TWithOutcomeId>(
  ({ outcomeId }) => {
    const coefficient = useParamSelector(coefficientByOutcomeIdSelector, [outcomeId]);
    const oddsClass = usePickCoefficientClass(classes, coefficient, outcomeId);

    return (
      <Ellipsis className={clsx(classes.coefficient, oddsClass)}>
        {coefficientFormat(coefficient)}
      </Ellipsis>
    );
  },
);
BetConstructorPickCoefficient.displayName = "BetConstructorPickCoefficient";

type TWithCoefficient = {
  coefficient: number;
  isDropDown?: boolean;
}

const MyBetsPickCoefficient = memo<TWithCoefficient>(({ coefficient, isDropDown = false }) => (
  <Ellipsis className={clsx(classes.coefficient, !isDropDown && classes.modal)}>
    {coefficientFormat(coefficient)}
  </Ellipsis>
));
MyBetsPickCoefficient.displayName = "MyBetsPickCoefficient";

export { BetConstructorPickCoefficient, MyBetsPickCoefficient };
