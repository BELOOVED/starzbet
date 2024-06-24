import { type ComponentType, memo, type ReactNode } from "react";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { useTranslation } from "@sb/translator";
import { useDateCountDown } from "../../../../common/Hooks/useDateCountDown";
import { type IWithTKey } from "../../../../common/IWith";

interface IVipClubTournamentTimeProps {
  num: number;
  text: ReactNode;
}

type TTime = ComponentType<IVipClubTournamentTimeProps>

interface ITimeWithTranslateBaseProps extends IWithTKey<string> {
  num: number;
  Time: TTime;
}

const TimeWithTranslate = memo<ITimeWithTranslateBaseProps>(({ Time, tKey, num }) => {
  const [t] = useTranslation();

  return <Time num={num} text={t(tKey)} />;
});
TimeWithTranslate.displayName = "TimeWithTranslate";

interface IVipClubTournamentTimerProps<T extends string> extends IWithClassName {
  Finished: ComponentType;
  Time: TTime;
  daysTKey: T;
  hoursTKey: T;
  minutesTKey: T;
  secondsTKey: T;
}

interface IWithEndTime {
  endTime: string;
}

const createVipClubTournamentTimer = (<T extends string, >({
  Finished,
  Time,
  className,
  minutesTKey,
  hoursTKey,
  secondsTKey,
  daysTKey,
}: IVipClubTournamentTimerProps<T>) => memo<IWithEndTime>(({ endTime }) => {
  const {
    days,
    hours,
    minutes,
    seconds,
    isTimeEnd,
  } = useDateCountDown(Number(endTime));

  if (isTimeEnd) {
    return <Finished />;
  }

  return (
    <div className={className} {...qaAttr(PlayerUIQaAttributes.VipClubPage.Tournament_Timer)}>
      {days ? <TimeWithTranslate Time={Time} num={days} tKey={daysTKey} /> : null}

      <TimeWithTranslate Time={Time} num={hours} tKey={hoursTKey} />

      <TimeWithTranslate Time={Time} num={minutes} tKey={minutesTKey} />

      {days ? null : <TimeWithTranslate Time={Time} num={seconds} tKey={secondsTKey} />}
    </div>
  );
}));

export { createVipClubTournamentTimer };
export type { IVipClubTournamentTimeProps };
