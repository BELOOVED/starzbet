import { useEffect, useState } from "react";

const useCountdown = (time: number, reducer = 1) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(
    () => {
      const interval = setInterval(
        () => setTimeLeft((timeLeft) => timeLeft - reducer),
        1000,
      );
      timeLeft === 0 && clearInterval(interval);

      return () => clearInterval(interval);
    },
    [timeLeft, reducer],
  );

  return [timeLeft] as const;
};

export { useCountdown };
