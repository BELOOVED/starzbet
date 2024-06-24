import ReactPlayer from "react-player/lazy";
import type { ReactPlayerProps } from "react-player";
import { type CSSProperties, type DetailedHTMLProps, type IframeHTMLAttributes, memo } from "react";
import { useSelector } from "react-redux";
import { sportsbookui_live_video_login, sportsbookui_live_video_placeholder } from "@sb/translates/sportsbookui/CommonTKeys";
import { loggedSelector } from "@sb/auth";
import { useTranslation } from "@sb/translator";
import { isNil, useParamSelector } from "@sb/utils";
import classes from "./VideoPlayer.module.css";
import { isMobileSelector } from "../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { sportIdByEventIdSelector, videoUrlByEventIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { isEsport } from "../../Store/Feed/Model/Sport";
import { NativeLink } from "../NativeLink/NativeLink";

type TIframeProps = DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;

type TPlayerProps = ReactPlayerProps & TIframeProps;

interface ICommonVideoPlayerProps extends TPlayerProps {
  height?: number | string;
  style?: CSSProperties;
}

interface IBaseVideoPlayerProps extends ICommonVideoPlayerProps {
  videoUrl?: string | null;
}

interface IVideoPlayerProps extends ICommonVideoPlayerProps {
  eventId: string;
}

const normalizeUrl = (videoUrl?: string | null) => {
  if (isNil(videoUrl)) {
    return undefined;
  }

  const url = videoUrl.replace(/\/$/, "");

  return window.location.protocol === "https:"
    ? url.replace(/^http:\/\//i, "https://")
    : url.replace(/^https:\/\//i, "http://");
};

const getConfig = (url: string) => {
  if (!url.includes("rvrsprxy.herokuapp.com")) { //hack
    return undefined;
  }

  return {
    file: {
      attributes: {
        crossOrigin: "anonymous",
      },
      hlsOptions: {
        xhrSetup: (xhr) => {
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
      },
    },
  };
};

const BaseVideoPlayer = memo<IBaseVideoPlayerProps>(({
  videoUrl,
  height,
  style,
  ...rest
}) => {
  const url = normalizeUrl(videoUrl);
  const isMobile = useSelector(isMobileSelector);

  if (ReactPlayer.canPlay(url)) {
    return (
      <ReactPlayer
        {...rest as ReactPlayerProps}
        url={url}
        playing={!isMobile}
        width={"100%"}
        style={style}
        muted={true}
        controls={true}
        playsinline={true}
        height={height}
        config={getConfig(url)}
      />
    );
  }

  const iframeStyle = { display: "block" };

  return (
    <iframe
      {...rest}
      src={url}
      frameBorder={"0"}
      title={"video"}
      width={"100%"}
      height={height}
      allowFullScreen={true}
      style={iframeStyle}
      referrerPolicy={"no-referrer"}
    />
  );
});
BaseVideoPlayer.displayName = "BaseVideoPlayer";

const AuthVideoPlayer = memo<IBaseVideoPlayerProps>((props) => {
  const [t] = useTranslation();

  const logged = useSelector(loggedSelector);

  if (!logged) {
    const style = { ...props.style, height: props.height };

    return (
      <div className={classes.placeholder} style={style}>
        <div>
          {t(sportsbookui_live_video_placeholder)}
        </div>

        <NativeLink className={classes.login} path={"/login"}>
          {t(sportsbookui_live_video_login)}
        </NativeLink>
      </div>
    );
  }

  return (
    <BaseVideoPlayer {...props} />
  );
});
AuthVideoPlayer.displayName = "AuthVideoPlayer";

const VideoPlayer = memo<IVideoPlayerProps>(({
  eventId,
  ...rest
}) => {
  const videoUrl = useParamSelector(videoUrlByEventIdSelector, [eventId]);
  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);

  return (
    isEsport(sportId)
      ? <BaseVideoPlayer {...rest} videoUrl={videoUrl} />
      : <AuthVideoPlayer {...rest} videoUrl={videoUrl} />
  );
});
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer, BaseVideoPlayer, AuthVideoPlayer };
