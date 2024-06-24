import clsx from "clsx";
import { memo } from "react";
import classes from "./BetConstructor.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { BetSlipContent } from "../../../../../../Components/BetSlipContent/BetSlipContent";
import { BetSlipPlacing } from "../../../../../../Components/BetSlipPlacing/BetSlipPlacing";
import { Locked } from "../../../../../../Components/Locked/Locked";
import { BetGroupTabs } from "../BetSlipTabs/BetSlipSecondLineTabs/BetGroupTabs";
import { BetConstructorNoPicks } from "../BetSlipEmpty/BetSlipEmpty";
import { BetConstructorToolbar } from "./BetConstructorToolbar/BetConstructorToolbar";
import { BetConstructorBottom } from "./BetConstructorBottom/BetConstructorBottom";
import { BetConstructorContent } from "./BetConstructorContent/BetConstructorContent";
import { BetConstructorComplete } from "./BetConstructorComplete/BetConstructorComplete";

const Content = memo(() => (
  <BetSlipPlacing>
    {
      (placing: boolean) => (
        <>
          <Locked condition={placing} className={classes.betConstructorLocked} />

          <BetGroupTabs />

          <BetConstructorToolbar />

          <div className={clsx(classes.content, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
            <BetConstructorContent />
          </div>

          <BetConstructorBottom />
        </>
      )
    }
  </BetSlipPlacing>
));
Content.displayName = "Content";

const BetConstructor = memo(() => (
  <BetSlipContent empty={BetConstructorNoPicks} completed={BetConstructorComplete}>
    <Content />
  </BetSlipContent>
));
BetConstructor.displayName = "BetConstructor";

export { BetConstructor };
