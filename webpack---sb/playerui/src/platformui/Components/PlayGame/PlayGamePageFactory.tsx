import clsx from "clsx";
import { useSelector } from "react-redux";
import { type ComponentType, createElement, forwardRef, memo } from "react";
import classes from "./PlayGame.module.css";
import { When } from "../../../common/Components/When";
import { playGameDataLoadedSelector, playGameDataLoadFailedSelector } from "../../Store/PlayGame/PlayGameSelectors";
import { usePlayGamePageSize } from "../../Hooks/UsePlayGamePageSize";
import { BaseGameFrame, type IBaseGameFrameProps } from "./BaseGameFrame";

interface IPlayGamePageProps {
  isDemo?: boolean;
}

interface IPlayGamePageFactoryProps extends IPlayGamePageProps, IWithClassName {
  playGameFrame: ComponentType<IBaseGameFrameProps>;
  loader: ComponentType;
  loadFailed: ComponentType;
  withoutHidden?: boolean;
}

const PlayGamePageFactory = memo(forwardRef<HTMLDivElement | null, IPlayGamePageFactoryProps>((
  {
    isDemo,
    loader,
    playGameFrame,
    loadFailed,
    className,
    withoutHidden = false,
  },
  ref,
) => {
  const loaded = useSelector(playGameDataLoadedSelector);
  const failed = useSelector(playGameDataLoadFailedSelector);

  const size = usePlayGamePageSize(withoutHidden);

  return (
    <div className={clsx(classes.container, className)} ref={ref}>
      <When condition={!failed && !loaded}>
        <div className={classes.spinContainer}>
          {createElement(loader)}
        </div>
      </When>

      <When condition={loaded}>
        {createElement(isDemo ? BaseGameFrame : playGameFrame, size)}
      </When>

      {failed ? createElement(loadFailed) : null}
    </div>
  );
}));
PlayGamePageFactory.displayName = "PlayGamePageFactory";

export { PlayGamePageFactory, type IPlayGamePageProps };
