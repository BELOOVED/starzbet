import { memo, type ReactNode, useEffect, useRef, useState } from "react";
import { usePrevious } from "../../sportsbookui/Hooks/UsePrevious";

const FRAMES_PER_SECOND = 16.67;

interface INumberRollingAfterUpdateProps {
  targetNumber: number;
  duration?: number;
  formatFunction?: (displayingNumber: number) => ReactNode;
}

const NumberRollingAfterUpdate = memo<INumberRollingAfterUpdateProps>(({ targetNumber, duration = 1, formatFunction }) => {
  const previousNumber = usePrevious(targetNumber) ?? 0;

  const animationFrameId = useRef<number | null>(null);
  const calculatingNumber = useRef(previousNumber);
  const [displayingNumber, setDisplayingNumber] = useState(previousNumber);

  const isPreviousNumberLessThenCurrent = previousNumber < targetNumber;

  const delta = (targetNumber - previousNumber) / (FRAMES_PER_SECOND * duration);

  const frameRequestCallback = () => {
    calculatingNumber.current += delta;

    setDisplayingNumber(
      isPreviousNumberLessThenCurrent
        ? Math.min(calculatingNumber.current, targetNumber)
        : Math.max(calculatingNumber.current, targetNumber),
    );

    if (isPreviousNumberLessThenCurrent ? (calculatingNumber.current < targetNumber) : (calculatingNumber.current >= targetNumber)) {
      animationFrameId.current = requestAnimationFrame(frameRequestCallback);
    }
  };

  useEffect(
    () => {
      animationFrameId.current = requestAnimationFrame(frameRequestCallback);

      return () => {
        animationFrameId.current && cancelAnimationFrame(animationFrameId.current);
      };
    },
    [targetNumber],
  );

  return formatFunction ? formatFunction(displayingNumber) : displayingNumber;
});
NumberRollingAfterUpdate.displayName = "NumberRollingAfterUpdate";

export { NumberRollingAfterUpdate };
