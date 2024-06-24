// @ts-nocheck
import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import {
  virtualVideoUrlByParamsSelector,
  virtualXVisionUrlByParamsSelector,
} from "../../Store/Virtual/Common/Selectors/VirtualVideoUrlByParamsSelector";
import { routeMap } from "../../RouteMap/RouteMap";
import { BaseVideoPlayer } from "../VideoPlayer/VideoPlayer";

interface IVirtualVideoWidgetProps {
  height: string;
  className?: string;
}

const VirtualVideoWidget = memo<IVirtualVideoWidgetProps>(({ height, className }) => {
  const match = useRouteMatch([routeMap.virtual.category, routeMap.virtual.roulette]);

  const videoUrl = useSelector(virtualVideoUrlByParamsSelector(match?.params));

  if (!videoUrl) {
    return null;
  }

  return (
    <div className={className}>
      <BaseVideoPlayer
        videoUrl={videoUrl}
        height={height}
      />
    </div>
  );
});
VirtualVideoWidget.displayName = "VirtualVideoWidget";

const visionXUrl = "https://visionx.proattorney.cn";
const userName = "pinoroza_user";
const password = "C0A9D94A-D554-4F2F-B0B9-511E0F2BE1AB";

const VirtualXVisionWidget = memo<IVirtualVideoWidgetProps>(({ height, className }) => {
  const match = useRouteMatch([routeMap.virtual.category, routeMap.virtual.roulette]);
  const ref = useRef(null);

  const visionXIdentifier = useSelector(virtualXVisionUrlByParamsSelector(match?.params));

  useEffect(
    () => {
      const processMessage = (obj) => {
        if (obj.data.height) {
          ref.current.style.height = height;
        }
      };

      window.addEventListener("message", processMessage, false);

      return () => window.removeEventListener("message", processMessage);
    },
    [],
  );

  if (!visionXIdentifier) {
    return (
      <VirtualVideoWidget
        height={height}
        className={className}
      />
    );
  }

  const loadIframe = () => {
    if (!ref.current) {
      return;
    }

    ref.current.contentWindow.postMessage({ userName, password }, visionXUrl);
  };

  return (
    <iframe
      src={`${visionXUrl}/?i=${visionXIdentifier}&l=en`}
      frameBorder={"0"}
      title={"video"}
      width={"100%"}
      height={height}
      allowFullScreen
      scrolling={"no"}
      onLoad={loadIframe}
      referrerPolicy={"no-referrer"}
      ref={ref}
    />
  );
});
VirtualXVisionWidget.displayName = "VirtualXVisionWidget";

export { VirtualVideoWidget, VirtualXVisionWidget };
