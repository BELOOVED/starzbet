import clsx from "clsx";
import { memo } from "react";
import type { TSportsbook_OutrightPick_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TExplicitAny } from "@sb/utils";
import classes from "./BasePick.module.css";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { BetOutrightName } from "../../../../../../../Components/OutrightName/OutrightName";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { TimeIcon } from "../../../Icons/TimeIcon/TimeIcon";
import { BankerLabel } from "../../BankerLabel/BankerLabel";
import { useOutrightPickRegistry } from "../PickRegistry";
import { MyBetsPickCoefficient } from "../PickCoefficient/PickCoefficient";

const BaseOutrightPick = memo<TSportsbook_OutrightPick_Fragment | TExplicitAny>(({
  outcome,
  coefficient,
  result,
  banker,
  outright,
  changed,
  isDropDown,
}) => {
  const { OutrightOutcomeName } = useOutrightPickRegistry();

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={clsx(classes.pick, classes[result], banker && classes.banker, changed && classes.changed)}>
      <div className={classes.pickInfo}>
        <Ellipsis className={classes.name}>
          <OutrightOutcomeName outcome={outcome} />
        </Ellipsis>

        <MyBetsPickCoefficient coefficient={coefficient} isDropDown={isDropDown} />
      </div>

      <div className={classes.eventInfo}>
        <Ellipsis className={classes.marketName}>
          <BetOutrightName {...outright} />
        </Ellipsis>

        <div className={classes.timeBankerWrapper}>
          <div className={classes.timeWrapper}>
            <TimeIcon className={classes.timeIcon} />

            <Ellipsis className={classes.time}>
              <DateFormat date={outright.startTime} format={"HH:mm • E, do MMMM"} />
            </Ellipsis>
          </div>

          <BankerLabel banker={banker} />
        </div>
      </div>
    </div>
  );
});
BaseOutrightPick.displayName = "BaseOutrightPick";

export { BaseOutrightPick };
