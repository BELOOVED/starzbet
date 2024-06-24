import { memo } from "react";
import classes from "./ReplayLink.module.css";
import { type IWithReplayLink } from "../../../../../common/IWith";
import { ReplayLink as ReplayLinkBase } from "../../../../Components/ReplayLink/ReplayLink";
import { PlayIcon } from "../Icons/PlayIcon/PlayIcon";

const ReplayLink = memo<IWithReplayLink>(({ replayLink }) => (
  <ReplayLinkBase replayLink={replayLink} className={classes.replayLink} icon={PlayIcon} />
));
ReplayLink.displayName = "ReplayLink";

export { ReplayLink };
