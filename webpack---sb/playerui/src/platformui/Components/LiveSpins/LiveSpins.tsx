import { type ComponentType, createElement, type CSSProperties, type FC, memo, type ReactNode, useCallback } from "react";
import { useSelector } from "react-redux";
import { getNotNil, isNotNil, sort, voidFn, withCondition, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_gameLabel_liveSpins } from "@sb/translates/platformui/CommonTKeys";
import { loggedSelector } from "@sb/auth";
import classes from "./LiveSpins.module.css";
import { NativeHorizontalScroll } from "../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { useModalOpenAction } from "../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../common/Store/Modal/Model/EModal";
import { type IWithStreams } from "../../../common/IWith";
import { Space } from "../../../common/Components/Space/Space";
import { useLocalizedPushPath } from "../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { withHydration } from "../../../common/Client/Core/Components/WhenHydrationFinished/WithHydration";
import { isMobileSelector } from "../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import {
  isRenderLiveSpinsSelector,
  liveSpinsAuthTokenSelector,
  liveSpinsStreamsSelector,
} from "../../Store/LiveSpins/Selectors/LiveSpinsSelectors";
import { LiveSpinsApi } from "../../Api/LiveSpinsApi";
import { type TStream } from "../../Store/LiveSpins/Model/Types";
import { routeMap } from "../../RouteMap/RouteMap";
import { withScrollToTop } from "../../Utils/ScrollToTop";
import { useLiveSpins } from "../../Store/LiveSpins/UseLiveSpins";
import { isStream } from "../../Store/LiveSpins/TypeGuards";
import { twoRowsList } from "../../Utils/TwoRowsList";
import { Ellipsis } from "../Ellipsis/Ellipsis";
import { LiveSpinsIcon } from "./LiveSpinsIcon";

const SCRIPT_SRC = "https://assets.livespins.com/sdk/js/livespins.js";
const DEFAULT_ROOM_STYLE = {
  cursor: "pointer",
  display: "flex",
  width: "fit-content",
  maxWidth: "calc(100vw - 46px)",
};

const DEFAULT_SCHEDULED_ROOM_STYLE = {
  cursor: "not-allowed",
  display: "flex",
  width: "fit-content",
  maxWidth: "calc(100vw - 46px)",
};

interface ILiveSpinRoomProps {
  stream: TStream;
  rewriteStyle?: CSSProperties;
}

const LiveSpinRoom = memo<ILiveSpinRoomProps>(({ rewriteStyle, stream }) => {
  const isLiveStream = isStream(stream);
  const Room = isLiveStream ? "livespins-room" : "livespins-schedule-room";
  const isMobile = useSelector(isMobileSelector);

  const authToken = useSelector(liveSpinsAuthTokenSelector);
  const liveSpinsSDK = LiveSpinsApi.liveSpinsSDK;
  const handleClick = useCallback(
    () => {
      if (isNotNil(liveSpinsSDK) && isLiveStream) {
        window.location.href = liveSpinsSDK.convert.toPlayURL({
          authToken: getNotNil(authToken, ["LiveSpins"], "authToken"),
          backURL: window.location.href,
          shareURL: `${window.location.href}/livespins/:sessionId/play`,
          sessionId: stream.sessionId,
        });
      }
    },
    [liveSpinsSDK, authToken],
  );

  const defaultStyle = isLiveStream ? DEFAULT_ROOM_STYLE : DEFAULT_SCHEDULED_ROOM_STYLE;

  const finalStyle = rewriteStyle ? { ...defaultStyle, ...rewriteStyle } : defaultStyle;

  const openModal = useModalOpenAction(EModal.auth);
  const goToLogin = useLocalizedPushPath(routeMap.loginRoute);
  const loginAction = isMobile ? withScrollToTop(goToLogin) : openModal;

  const isLogged = useSelector(loggedSelector);
  const onClick = isLogged ? handleClick : loginAction;

  return (
    <Room
      {...stream}
      cta
      onClick={isLiveStream ? onClick : voidFn}
      style={finalStyle}
    />
  );
});
LiveSpinRoom.displayName = "LiveSpinRoom";

const DefaultLiveSpinsView = memo<IWithStreams>(({ streams }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.wrapper}>
      <div className={classes.top}>
        <div className={classes.iconContainer}>
          <LiveSpinsIcon size={"m"} color={"brand"} />
        </div>

        <Ellipsis className={classes.title}>{t(platformui_gameLabel_liveSpins)}</Ellipsis>
      </div>

      <NativeHorizontalScroll className={classes.container} trackClassName={classes.track}>
        <StreamsView streams={streams} />
      </NativeHorizontalScroll>
    </div>
  );
});
DefaultLiveSpinsView.displayName = "DefaultLiveSpinsView";

const StreamsView = memo<IWithStreams>(({ streams }) => {
  const isMobile = useSelector(isMobileSelector);

  if (isMobile) {
    const streamsTwoRows = twoRowsList(streams);

    return (
      <Space value={16} vertical>
        <Space value={8}>
          {streamsTwoRows.row1.map((stream, index) => <LiveSpinRoom stream={stream} key={index} />)}
        </Space>

        <Space value={8}>
          {streamsTwoRows.row2.map((stream, index) => <LiveSpinRoom stream={stream} key={index} />)}
        </Space>
      </Space>
    );
  }

  return (
    <>
      {streams.map((stream, index) => <LiveSpinRoom stream={stream} key={index} />)}
    </>
  );
});
StreamsView.displayName = "StreamsView";

interface IWhenLiveSpinsReadyProps {
  children: (streams: TStream[]) => ReactNode;
}

const sortedStreams = (a: TStream, b: TStream) => {
  if (isStream(a) && isStream(b)) {
    return b.startTimestamp - a.startTimestamp;
  } else if (isStream(a)) {
    return -1;
  } else if (isStream(b)) {
    return 1;
  } else {
    return a.scheduledStartTime - b.scheduledStartTime;
  }
};

const WhenLiveSpinsReady: FC<IWhenLiveSpinsReadyProps> = withCondition(
  isRenderLiveSpinsSelector,
  ({ children }) => {
    const streams = getNotNil(useSelector(liveSpinsStreamsSelector), ["LiveSpins", "Content"], "streams");

    return <>{children(sort(sortedStreams, streams))}</>;
  },
);
WhenLiveSpinsReady.displayName = "WhenLiveSpinsReady";

interface ILiveSpinsBaseProps {
  componentType: ComponentType<IWithStreams>;
}

const LiveSpinsBase = withHydration(
  memo<ILiveSpinsBaseProps>(({ componentType }) => {
    useLiveSpins(SCRIPT_SRC);

    return (
      <WhenLiveSpinsReady>
        {(streams) => createElement(componentType, { streams })}
      </WhenLiveSpinsReady>
    );
  }),
);
LiveSpinsBase.displayName = "LiveSpinsBase";

const LiveSpins = withProps(LiveSpinsBase)({ componentType: DefaultLiveSpinsView });

export { LiveSpins, LiveSpinsBase, LiveSpinRoom };
