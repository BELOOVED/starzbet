// @ts-nocheck
import { type FC, type PropsWithChildren } from "react";
import { useParamSelector } from "@sb/utils";
import { type IWithEventId } from "../../../common/IWith";
import { videoUrlByEventIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";

const WhenLiveVideo: FC<IWithEventId & PropsWithChildren> = ({ eventId, children }) => {
  const condition = useParamSelector(videoUrlByEventIdSelector, [eventId]);

  if (!condition) {
    return null;
  }

  return (
    children
  );
};
WhenLiveVideo.displayName = "WhenLiveVideo";

export { WhenLiveVideo };
