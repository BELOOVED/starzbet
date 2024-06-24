import { useEffect, useState } from "react";
import { subscribeVisibleCaptchaSolve } from "./CloudflareToken";
import { CAPTCHA_ENABLED } from "./Constants";

const useIsTurnstileSolved = (isVisible: boolean) => {
  const [isSolved, setIsSolved] = useState(false);

  useEffect(
    () => subscribeVisibleCaptchaSolve(setIsSolved),
    [],
  );

  if (!CAPTCHA_ENABLED) {
    return true;
  }

  if (!isVisible) {
    return true;
  }

  return isSolved;
};

export { useIsTurnstileSolved };
