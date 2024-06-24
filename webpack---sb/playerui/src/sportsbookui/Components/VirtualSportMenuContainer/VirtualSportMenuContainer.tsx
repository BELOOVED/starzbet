import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./VirtualSportMenuContainer.module.css";
import { type IWithSportId } from "../../../common/IWith";

const backgroundImageBySportId = {
  [sportCodeToIdMap[ESportCode.kiron_horse_racing]]: classes.kiron_horse_racing,
  [sportCodeToIdMap[ESportCode.kiron_hounds_racing]]: classes.kiron_hounds_racing,
  [sportCodeToIdMap[ESportCode.kiron_motor_racing]]: classes.kiron_motor_racing,
  [sportCodeToIdMap[ESportCode.kiron_table_tennis]]: classes.kiron_table_tennis,
  [sportCodeToIdMap[ESportCode.kiron_harness_racing]]: classes.kiron_harness_racing,
  [sportCodeToIdMap[ESportCode.kiron_ice_hockey]]: classes.kiron_ice_hockey,
  [sportCodeToIdMap[ESportCode.kiron_lucky_loot]]: classes.kiron_lucky_loot,
  [sportCodeToIdMap[ESportCode.kiron_soccer]]: classes.kiron_soccer,
  [sportCodeToIdMap[ESportCode.kiron_badminton]]: classes.kiron_badminton,
  [sportCodeToIdMap[ESportCode.kiron_archery]]: classes.kiron_archery,
  [sportCodeToIdMap[ESportCode.kiron_roulette]]: classes.kiron_roulette,
  [sportCodeToIdMap[ESportCode.kiron_steeple_chase]]: classes.kiron_horse_racing,
  [sportCodeToIdMap[ESportCode.kiron_cricket]]: classes.kiron_cricket,
};

const VirtualSportMenuContainer: FC<PropsWithChildren<IWithClassName & IWithSportId>> = ({ sportId, children, className = "" }) => {
  const classList = clsx(
    className,
    backgroundImageBySportId[sportId],
  );

  return (
    <div className={classList}>
      {children}
    </div>
  );
};
VirtualSportMenuContainer.displayName = "VirtualSportMenuContainer";

export { VirtualSportMenuContainer };
