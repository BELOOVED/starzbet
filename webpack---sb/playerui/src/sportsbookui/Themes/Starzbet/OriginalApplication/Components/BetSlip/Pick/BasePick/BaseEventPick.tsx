import clsx from "clsx";
import { memo } from "react";
import type { TSportsbook_EventPick_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TExplicitAny } from "@sb/utils";
import classes from "./BasePick.module.css";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { SportIcon } from "../../../SportIcon/SportIcon";
import { BankerLabel } from "../../BankerLabel/BankerLabel";
import { useEventPickRegistry } from "../PickRegistry";
import { MyBetsPickCoefficient } from "../PickCoefficient/PickCoefficient";
import { PickStatus } from "./PickStatus/PickStatus";

type TBaseEventPickProps = TSportsbook_EventPick_Fragment | TExplicitAny & { isDropDown: boolean; };

const BaseEventPick = memo<TBaseEventPickProps>(
  ({
    event,
    market,
    outcome,
    coefficient,
    result,
    banker,
    eventInfo,
    changed,
    isDropDown,
  }) => {
    const {
      PickName,
      MarketName,
      ShortScopeName,
      Teams,
      EventStatus,
    } = useEventPickRegistry();

    const pickClassName = clsx(
      classes.pick,
      banker && classes.banker,
      changed && classes.changed,
      !isDropDown && classes.modal,
    );

    return (
      <div className={pickClassName}>
        <div className={classes.pickInfo}>
          <PickStatus result={result} />

          <Ellipsis className={classes.name}>
            <PickName event={event} outcome={outcome} market={market} />
          </Ellipsis>

          <MyBetsPickCoefficient coefficient={coefficient} isDropDown={isDropDown} />
        </div>

        <Ellipsis className={classes.marketName}>
          <MarketName market={market} event={event} outcome={outcome} />

          <ShortScopeName market={market} event={event} />
        </Ellipsis>

        <div className={classes.teams}>
          <SportIcon id={event.sport.id} color={"darkText"} className={classes.sportIcon} />

          <div className={classes.teamNames}>
            <Teams event={event} className={!isDropDown ? classes.teamNamesModal : undefined} />
          </div>
        </div>

        <div className={classes.timeAndStatusContainer}>
          <EventStatus event={event} eventInfo={eventInfo} />

          <BankerLabel banker={banker} />
        </div>
      </div>
    );
  },
);
BaseEventPick.displayName = "BaseEventPick";

export { BaseEventPick };
