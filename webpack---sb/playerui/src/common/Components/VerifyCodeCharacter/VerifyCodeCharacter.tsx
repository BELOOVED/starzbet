import clsx from "clsx";
import { memo } from "react";
import classes from "./VerifyCodeCharacter.module.css";

interface IVerifyCodeCharacter {
  value: string | undefined;
  SIZE_CODE: number;
  index: number;
  className?: string;
  isFocused: boolean;

}

const VerifyCodeCharacter = memo<IVerifyCodeCharacter>(({
  index,
  value,
  SIZE_CODE,
  className,
  isFocused,
}) => {
  const length = value?.length;
  const isCompleted = length && (length > index);
  const isCurrentDigit = length === index;
  const isLastDigit = SIZE_CODE - 1 === index;

  const itemClass = clsx(
    isFocused && (isCurrentDigit || (isCompleted && isLastDigit)) && classes.active,
    isFocused && isCompleted && classes.completed,
    className,
    classes.characterDefault,
  );

  return (
    <div className={itemClass}>
      {value?.[index]}
    </div>
  );
});
VerifyCodeCharacter.displayName = "VerifyCodeCharacter";

export { VerifyCodeCharacter };

