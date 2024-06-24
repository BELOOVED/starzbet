import { memo } from "react";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_gameLabel_liveSpins } from "@sb/translates/platformui/CommonTKeys";
import classes from "./LandingLiveSpins.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { type IWithStreams } from "../../../../../common/IWith";
import { NativeHorizontalScroll } from "../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { When } from "../../../../../common/Components/When";
import { Space } from "../../../../../common/Components/Space/Space";
import { LiveSpinRoom, LiveSpinsBase } from "../../../../Components/LiveSpins/LiveSpins";
import { LiveSpinsIcon } from "../../../../Components/LiveSpins/LiveSpinsIcon";
import { twoRowsList } from "../../../../Utils/TwoRowsList";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { SectionControls, SectionNextButton, SectionPrevButton } from "../SectionControls/SectionControls";

const ROOM_STYLE = { maxWidth: "calc(100vw - 86px)" };

const LandingLiveSpinsView = memo<IWithStreams>(({ streams }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.landingLiveSpins}>
      <div className={classes.wrapper}>
        <div className={classes.sectionHeader}>
          <SectionTitle markerColor={"72 145 255"} icon={withProps(LiveSpinsIcon)({ color: "brand", size: "m" })}>
            {t(platformui_gameLabel_liveSpins)}
          </SectionTitle>

          <When condition={!IS_MOBILE_CLIENT_SIDE}>
            <SectionControls />
          </When>
        </div>

        <NativeHorizontalScroll
          prevArrow={SectionPrevButton}
          nextArrow={SectionNextButton}
          trackClassName={classes.track}
        >
          <StreamsView streams={streams} />
        </NativeHorizontalScroll>
      </div>
    </div>
  );
});
LandingLiveSpinsView.displayName = "LandingLiveSpinsView";

const StreamsView = memo<IWithStreams>(({ streams }) => {
  if (IS_MOBILE_CLIENT_SIDE) {
    const streamsTwoRows = twoRowsList(streams);

    return (
      <Space value={16} vertical>
        <Space value={16}>
          {streamsTwoRows.row1.map((stream, index) => <LiveSpinRoom stream={stream} key={index} rewriteStyle={ROOM_STYLE} />)}
        </Space>

        <Space value={16}>
          {streamsTwoRows.row2.map((stream, index) => <LiveSpinRoom stream={stream} key={index} rewriteStyle={ROOM_STYLE} />)}
        </Space>
      </Space>
    );
  }

  return (
    <>
      {streams.map((stream, index) => (<LiveSpinRoom stream={stream} key={index} rewriteStyle={ROOM_STYLE} />))}
    </>
  );
});
StreamsView.displayName = "StreamsView";

const LandingLiveSpins = withProps(LiveSpinsBase)({ componentType: LandingLiveSpinsView });

export { LandingLiveSpins };
