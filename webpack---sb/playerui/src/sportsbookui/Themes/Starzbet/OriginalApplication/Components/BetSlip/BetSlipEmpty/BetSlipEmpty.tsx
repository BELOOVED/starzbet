import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betConstructor_emptySubText,
  sportsbookui_starzbet_betConstructor_emptyTitle,
  sportsbookui_starzbet_betConstructor_joinNow,
  sportsbookui_starzbet_myBets_title_anyOfYourBetsWillAppearHere,
  sportsbookui_starzbet_myBets_title_thereAreNoBets,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BetSlipEmpty.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useRegistration } from "../../../../../../../common/Hooks/UseAuth";
import { NotLogged } from "../../../../../../Components/Logged/Logged";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { LogoIcon } from "../../Icons/LogoIcon/LogoIcon";

const BetConstructorNoPicks = memo(() => {
  const [t] = useTranslation();

  const gotoRegistration = useRegistration();

  return (
    <div className={clsx(classes.empty, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
      <LogoIcon size={"l"} />

      <div className={classes.textBlock}>
        <div className={classes.title}>{t(sportsbookui_starzbet_betConstructor_emptyTitle)}</div>

        <div
          className={classes.subtitle}
        >
          {t(sportsbookui_starzbet_betConstructor_emptySubText)}
        </div>
      </div>

      <NotLogged>
        <Button
          className={classes.button}
          colorScheme={"orange-gradient"}
          wide={true}
          onClick={gotoRegistration}
        >
          <Ellipsis>
            {t(sportsbookui_starzbet_betConstructor_joinNow)}
          </Ellipsis>
        </Button>
      </NotLogged>
    </div>
  );
});
BetConstructorNoPicks.displayName = "BetConstructorNoPicks";

const MyBetsNoBets = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.empty, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
      <LogoIcon size={"l"} />

      <div className={classes.textBlock}>
        <div className={classes.title}>{t(sportsbookui_starzbet_myBets_title_thereAreNoBets)}</div>

        <div className={classes.subtitle}>{t(sportsbookui_starzbet_myBets_title_anyOfYourBetsWillAppearHere)}</div>
      </div>
    </div>
  );
});
MyBetsNoBets.displayName = "MyBetsNoBets";
export { BetConstructorNoPicks, MyBetsNoBets };
