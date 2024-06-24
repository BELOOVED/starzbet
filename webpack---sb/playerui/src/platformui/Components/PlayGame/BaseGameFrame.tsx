import clsx from "clsx";
import { forwardRef, type IframeHTMLAttributes, memo } from "react";
import { useSelector } from "react-redux";
import classes from "./PlayGame.module.css";
import { playGameLinkSelector, playGameTypeSelector } from "../../Store/PlayGame/PlayGameSelectors";

interface IBaseGameFrameProps extends Omit<IframeHTMLAttributes<HTMLIFrameElement>, "src" | "srcDoc" | "title" | "allow" | "width" | "height"> {
  width: number;
  height: number;
}

const BaseGameFrame = memo(forwardRef<HTMLIFrameElement, IBaseGameFrameProps>(({ className, ...rest }, ref) => {
  const type = useSelector(playGameTypeSelector);
  const link = useSelector(playGameLinkSelector);

  return (
    <iframe
      ref={ref}
      className={clsx(classes.iframe, className)}
      src={type === "URL" ? link : undefined}
      srcDoc={type === "HTML" ? link : undefined}
      title={"game frame"}
      allow={"autoplay; encrypted-media; fullscreen;"}
      {...rest}
    />
  );
}));
BaseGameFrame.displayName = "BaseGameFrame";

export { BaseGameFrame, type IBaseGameFrameProps };
