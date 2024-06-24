import { memo, type NamedExoticComponent } from "react";
import { type ReactConveyerResult } from "@egjs/react-conveyer";
import { type TVoidFn, withProps } from "@sb/utils";
import classes from "./SectionControls.module.css";
import { ClassicArrowIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ClassicArrowIcon";
import { LoaderCircle } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";

const SCROLL_COUNT = 400;
const SCROLL_DURATION = 800;

type TLandingSectionControlsProps = {
  onNextButtonClick?: TVoidFn;
  onPrevButtonClick?: TVoidFn;
  isNextButtonDisabled?: boolean;
  isPrevButtonDisabled?: boolean;
}

interface ILandingSectionButtonProps {
  isNext?: boolean;
  loading?: boolean;
}

const LandingSectionButton = memo<ILandingSectionButtonProps & ReactConveyerResult>(
  ({
    scrollBy,
    isReachStart,
    isNext,
    isReachEnd,
    loading = false,
  }) => {
    const onClick = () => {
      scrollBy(isNext ? SCROLL_COUNT : -SCROLL_COUNT, SCROLL_DURATION);
    };

    const disabled = isNext
      ? (isReachEnd || loading)
      : isReachStart;

    return (
      !(isReachEnd && isReachStart)
        ? (
          <button
            className={isNext ? classes.nextButton : classes.prevButton}
            onClick={onClick}
            disabled={disabled}
          >
            {loading ? <LoaderCircle size={"12px"} /> : <ClassicArrowIcon width={12} height={10} />}
          </button>
        )
        : null
    );
  },
);
LandingSectionButton.displayName = "LandingSectionButton";

const SectionPrevButton =
  withProps(LandingSectionButton)({ isNext: false }) as NamedExoticComponent<ReactConveyerResult>;

const SectionNextButton =
  withProps(LandingSectionButton)({ isNext: true }) as NamedExoticComponent<ReactConveyerResult>;

const SectionControls = memo<TLandingSectionControlsProps>(
  () => (
    <div className={classes.sectionControls} />
  ),
);
SectionControls.displayName = "SectionControls";

export {
  SectionControls,
  SectionPrevButton,
  SectionNextButton,
  LandingSectionButton,
};
