// @ts-nocheck
import { type FC, type PropsWithChildren, type ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { type TVoidFn, useParamSelector } from "@sb/utils";
import { usePrevious } from "../../Hooks/UsePrevious";
import { lockedOutcomeSelector } from "../../Store/Feed/Selectors/LockedOutcomeSelector";
import { activeOutcomeByIdSelector } from "../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";
import { usePickHandler } from "../../Store/BetSlip/Hooks/UsePickHandler";
import { pickKind } from "../../Store/BetSlip/Model/BetPick";
import { measure } from "../../LogMeasure";
import { coefficientByIdSelector, outcomeParametersByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { eventStatusByOutcomeIdSelector } from "../../Store/Feed/Selectors/EventStatusByOutcomeIdSelector";
import { outcomeResultByIdSelector } from "../../Store/Feed/Selectors/OutcomeByIdSelector";

const highLightTimeout = 2000;

const useCoefficientHighlight = (coefficient, locked): [boolean, boolean] => {
  const [up, setUp] = useState(false);

  const [down, setDown] = useState(false);

  const prevCoefficient = usePrevious(coefficient);

  const timeout = useRef(null);

  const reset = useCallback(
    () => {
      clearTimeout(timeout.current);
      setUp(false);
      setDown(false);
    },
    [timeout],
  );

  useEffect(
    () => {
      if (!document.hidden) {
        const up = coefficient > prevCoefficient;

        const down = prevCoefficient > coefficient;

        const changed = up || down;

        if (changed && !locked) {
          reset();

          if (up) {
            setUp(true);
          } else if (down) {
            setDown(true);
          }

          timeout.current = setTimeout(reset, highLightTimeout);
        }
      } else {
        reset();
      }

      return () => timeout && clearTimeout(timeout.current);
    },
    [coefficient, locked],
  );

  return [up, down];
};

const CoefficientContainer: FC<PropsWithChildren<IWithId>> = ({
  id,
  children,
  isMobile,
  eventId,
}) => {
  const locked = useParamSelector(lockedOutcomeSelector, [id]);
  const eventStatus = useParamSelector(eventStatusByOutcomeIdSelector, [id]);
  const coefficient = useParamSelector(coefficientByIdSelector, [id]);
  const active = useParamSelector(activeOutcomeByIdSelector, [id]);
  const result = useParamSelector(outcomeResultByIdSelector, [id]);

  const clickHandle = usePickHandler(id, active, pickKind.base, locked);

  const [up, down] = useCoefficientHighlight(coefficient, locked);

  const outcomeParameters = useParamSelector(outcomeParametersByIdSelector, [id, undefined, "CoefficientContainer"]);

  useEffect(
    () => {
      measure("first mount outcome");
    },
    [],
  );

  return (
    children({
      coefficient,
      locked,
      clickHandle,
      active,
      up,
      down,
      eventStatus,
      outcomeParameters,
      result,
      isMobile,
      eventId,
    })
  );
};
CoefficientContainer.displayName = "CoefficientContainer";

interface IOutrightCoefficientProps {
  id: string;
  coefficient: number;
  active: boolean;
  locked: boolean;
  up: boolean;
  down: boolean;
  clickHandle: TVoidFn | undefined;
}

interface IOutrightCoefficientContainerProps {
  id: string;
  children: (outrightProps: IOutrightCoefficientProps) => ReactElement;
}

const OutrightCoefficientContainer: FC<IOutrightCoefficientContainerProps> = ({ id, children }) => {
  const locked = useParamSelector(lockedOutcomeSelector, [id]);
  const coefficient = useParamSelector(coefficientByIdSelector, [id]);
  const active = useParamSelector(activeOutcomeByIdSelector, [id]);

  const clickHandle = usePickHandler(id, active, pickKind.base, locked);

  const [up, down] = useCoefficientHighlight(coefficient, locked);

  return (
    children({
      id,
      coefficient,
      locked,
      clickHandle,
      active,
      up,
      down,
    })
  );
};
OutrightCoefficientContainer.displayName = "OutrightCoefficientContainer";

export { CoefficientContainer, OutrightCoefficientContainer };
export type { IOutrightCoefficientProps };
