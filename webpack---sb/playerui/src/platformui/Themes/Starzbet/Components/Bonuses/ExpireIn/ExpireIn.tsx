import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_status_expiresIn } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNil, type TNullable } from "@sb/utils";
import classes from "./ExpireIn.module.css";
import { EExpireAtType } from "../../../../../Store/Bonuses/Model/Enums/EExpireAtType";
import { shortReadableExpireIn } from "../../../../../Store/Bonuses/Utils/ExpireInUtils";
import { EXPIRE_AT_TYPE_TO_TRANSLATE_MAP } from "../../../Model/Bonus/BonusMaps";

interface IExpireInProps {
  expiredAt: TNullable<string | number>;
  wrapperClassName?: string;
}

const ExpireIn = memo<IExpireInProps>(({
  expiredAt,
  wrapperClassName,
}) => {
  const [t] = useTranslation();

  if (isNil(expiredAt) || Number(expiredAt) - Date.now() <= 0) {
    return null;
  }

  const { type, value } = shortReadableExpireIn(Number(expiredAt) - Date.now());

  const expireClassName = clsx(
    classes.value,
    type === EExpireAtType.days && classes.text,
    (type === EExpireAtType.day || (type === EExpireAtType.hours && value === 24)) && classes.yellow,
    (type === EExpireAtType.minutes || (type === EExpireAtType.hours && value < 24)) && classes.red,
  );

  return (
    <div className={clsx(classes.wrapper, wrapperClassName)}>
      <span>
        {t(platformui_starzbet_bonus_status_expiresIn)}

        {":"}
      </span>

      {
        type === EExpireAtType.indefinite
          ? null
          : (
            <span className={expireClassName}>
              {t(EXPIRE_AT_TYPE_TO_TRANSLATE_MAP[type], { count: value })}
            </span>
          )
      }
    </div>
  );
});
ExpireIn.displayName = "ExpireIn";

export { ExpireIn };
