import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDateByTimeZone } from "../../../common/Utils/GetDateByTimeZone";
import { profileSelectors } from "../../../common/Store/Player/Selectors/ProfileSelectors";
import { TIME_LIMITATION_CHECK_INTERVAL } from "../../../platformui/Store/Bonuses/Model/ClaimRulesTimeLimitations";

const getDate = (timeZone: string): [hours: number, minutes: number] => {
  const now = getDateByTimeZone(timeZone);

  return [now.getHours(), now.getMinutes()];
};

const useDateForBonusClaimTimeLimitation = (): [hours: number, minutes: number] => {
  const timeZone = useSelector(profileSelectors.timeZone);

  const initial = getDate(timeZone);
  const [date, setDate] = useState(initial);

  useEffect(
    () => {
      const id = setInterval(
        () => {
          const current = getDate(timeZone);

          setDate(current);
        },
        TIME_LIMITATION_CHECK_INTERVAL,
      );

      return () => clearInterval(id);
    },
    [timeZone],
  );

  return date;
};

export { useDateForBonusClaimTimeLimitation };
