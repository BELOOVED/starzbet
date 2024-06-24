import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useStopAutoplay } from "../../Hooks/UseStopAutoPlay";
import { isBonusHeaderVisibleSelector, isRealMoneyHeaderVisibleSelector } from "../../Store/PlayGame/BonusMatchedWithGameSelectors";
import { playGameStateSelectors } from "../../Store/PlayGame/PlayGameSelectors";
import { BaseGameFrame, type IBaseGameFrameProps } from "./BaseGameFrame";

interface IPlayGameFrameFactoryProps extends IBaseGameFrameProps, IWithClassName {
  bonusHeader: ComponentType<{ fullScreen?: boolean; }>;
  realMoneyHeader: ComponentType;
  bonusModals: ComponentType;
  headerHeight: number;
  fullScreen?: boolean;
}

const PlayGameFrameFactory = memo<IPlayGameFrameFactoryProps>(({
  bonusHeader,
  realMoneyHeader,
  bonusModals,
  headerHeight,
  height,
  width,
  ...rest
}) => {
  const isBonusHeaderVisible = useSelector(isBonusHeaderVisibleSelector);
  const isRealMoneyHeaderVisible = useSelector(isRealMoneyHeaderVisibleSelector);
  const isDemo = useSelector(playGameStateSelectors.isDemo);

  const ref = useStopAutoplay();

  const enhancedHeight = isBonusHeaderVisible || isRealMoneyHeaderVisible
    ? height - headerHeight
    : height;

  return (
    <>
      {isBonusHeaderVisible && !isDemo ? createElement(bonusHeader) : null}

      {isRealMoneyHeaderVisible && !isDemo ? createElement(realMoneyHeader) : null}

      {createElement(bonusModals)}

      <BaseGameFrame
        height={enhancedHeight}
        width={width}
        ref={ref}
        {...rest}
      />
    </>
  );
});
PlayGameFrameFactory.displayName = "PlayGameFrameFactory";

export { PlayGameFrameFactory };
