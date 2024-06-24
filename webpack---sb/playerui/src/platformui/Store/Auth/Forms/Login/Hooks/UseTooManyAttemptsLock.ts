import { useSelector } from "react-redux";
import { useCountdown } from "../../../../../../common/Hooks/UseCountDown";
import { loginLockTimeSelector } from "../../../AuthSelectors";

const useTooManyAttemptsLock = () => {
  const retryTime = useSelector(loginLockTimeSelector);

  const {
    days,
    hours,
    minutes,
    seconds,
    isOver,
  } = useCountdown(retryTime || 0);

  if (isOver) {
    return { disable: false };
  }

  const daysString = days != 0 ? `${days}:` : "";
  const hoursString = days != 0 || hours != 0 ? `${hours}:` : "";

  const timeString = `${daysString}${hoursString}${minutes}:${seconds}`;

  return { timeString, disable: true };
};

export { useTooManyAttemptsLock };
