// @ts-nocheck
import clsx from "clsx";
import { createElement, memo } from "react";
import { useParamSelector } from "@sb/utils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./VirtualTeamIcon.module.css";
import { sportIdByEventIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { useVirtualRacingSilksSelector } from "../../../../../../../Store/Statistics/Hooks/UseVirtualRacingStatisticsSelector";
import { getTeamNumber } from "../../../../../../../Store/Virtual/ScoreRacingSport/Model/GetTeamNumber";

const houndsMap = {
  p1: classes.hounds_p1,
  p2: classes.hounds_p2,
  p3: classes.hounds_p3,
  p4: classes.hounds_p4,
  p5: classes.hounds_p5,
  p6: classes.hounds_p6,
  p7: classes.hounds_p7,
  p8: classes.hounds_p8,
};

const motorbikeMap = {
  p1: classes.motorbike_p1,
  p2: classes.motorbike_p1,
  p3: classes.motorbike_p2,
  p4: classes.motorbike_p2,
  p5: classes.motorbike_p3,
  p6: classes.motorbike_p3,
  p7: classes.motorbike_p4,
  p8: classes.motorbike_p4,
  p9: classes.motorbike_p5,
  p10: classes.motorbike_p5,
  p11: classes.motorbike_p6,
  p12: classes.motorbike_p6,
  p13: classes.motorbike_p7,
  p14: classes.motorbike_p7,
};

const SilkIcon = memo<IVirtualTeamIconProps>(({ eventId, shortId }) => {
  const silkNumber = useVirtualRacingSilksSelector(eventId, shortId);

  const classList = clsx(
    classes.teamIcon,
    classes[`silk_${silkNumber}`],
  );

  return (
    <div className={classList}>
      <div className={classes.teamNumber}>
        {getTeamNumber(shortId)}
      </div>
    </div>
  );
});
SilkIcon.displayName = "SilkIcon";

const HoundsIcon = memo<IVirtualTeamIconProps>(({ shortId }) => {
  const classList = clsx(
    classes.teamIcon,
    houndsMap[shortId],
  );

  return (
    <div className={classList} />
  );
});
HoundsIcon.displayName = "HoundsIcon";

const MotorBikeIcon = memo<IVirtualTeamIconProps>(({ shortId }) => {
  const classList = clsx(
    classes.teamIcon,
    motorbikeMap[shortId],
  );

  return (
    <div className={classList}>
      <div className={classes.teamNumber}>
        {getTeamNumber(shortId)}
      </div>
    </div>
  );
});
MotorBikeIcon.displayName = "MotorBikeIcon";

interface IVirtualTeamIconProps {
  eventId: string;
  shortId: string;
}

const viewBySportId = {
  [sportCodeToIdMap[ESportCode.kiron_hounds_racing]]: HoundsIcon,
  [sportCodeToIdMap[ESportCode.kiron_motor_racing]]: MotorBikeIcon,

  horseRacing: SilkIcon,
};

const VirtualTeamIcon = memo<IVirtualTeamIconProps>(({ eventId, shortId }) => {
  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]) as string;

  const view = viewBySportId[sportId] ?? viewBySportId.horseRacing;

  return createElement(
    view,
    {
      eventId,
      shortId,
    },
  );
});
VirtualTeamIcon.displayName = "VirtualTeamIcon";

export { VirtualTeamIcon };
