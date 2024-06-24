import clsx from "clsx";
import { createElement, type FC, type PropsWithChildren, useEffect, useRef } from "react";
import { type ReactConveyerResult, useConveyer } from "@egjs/react-conveyer";
import { useSelector } from "react-redux";
import { type TExplicitAny, type TVoidFn, voidFn } from "@sb/utils";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./NativeHorizontalScroll.module.css";
import { isMobileSelector } from "../../Store/DeviceInfo/DeviceInfoSelectors";

interface IScrollProps extends IWithQaAttribute {
  updDeps?: TExplicitAny;
  prevArrow?: FC<ReactConveyerResult>;
  nextArrow?: FC<ReactConveyerResult>;
  className?: string;
  scrollId?: string;
  trackClassName?: string;
  arrowsContainerClassName?: string;
  scrollInnerClassName?: string;
  onScrollEnded?: TVoidFn;
}

interface IMobileScrollProps {
  scrollId?: string;
  scrollInnerClassName?: string;
  onScrollEnded?: TVoidFn;
}

const DesktopScrollInner: FC<PropsWithChildren<IScrollProps>> = ({
  children,
  prevArrow,
  nextArrow,
  scrollId,
  arrowsContainerClassName,
  scrollInnerClassName,
  updDeps = null,
  onScrollEnded = voidFn,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const result = useConveyer(
    ref,
    {
      horizontal: true,
      preventClickOnDrag: true,
    },
  );

  result.onReachEnd(onScrollEnded, [onScrollEnded]);

  useEffect(
    () => {
      if (contentRef.current) {
        result.updateContainer();
      }
    },
    [updDeps],
  );

  const id = scrollId ? { id: scrollId } : {};

  return (
    <>
      {
        arrowsContainerClassName
          ? (
            <div className={arrowsContainerClassName}>
              {prevArrow && createElement(prevArrow, result)}

              {nextArrow && createElement(nextArrow, result)}
            </div>
          )
          : (
            <>
              {prevArrow && createElement(prevArrow, result)}

              {nextArrow && createElement(nextArrow, result)}
            </>
          )
      }

      <div
        className={clsx(classes.scrollInner, scrollInnerClassName)}
        ref={ref}
        {...id}
      >
        <div ref={contentRef} className={classes.trackWrapper}>
          {children}
        </div>
      </div>
    </>
  );
};
DesktopScrollInner.displayName = "DesktopScrollInner";

const MobileScrollInner: FC<PropsWithChildren<IMobileScrollProps>> = ({
  children,
  scrollId,
  scrollInnerClassName,
  onScrollEnded,
}) => {
  const id = scrollId ? { id: scrollId } : {};
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 250) {
        onScrollEnded && onScrollEnded();
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      className={clsx(classes.scrollInner, scrollInnerClassName)}
      onScroll={handleScroll}
      {...id}
    >
      {children}
    </div>
  );
};
MobileScrollInner.displayName = "MobileScrollInner";

const ScrollInner: FC<PropsWithChildren<IScrollProps>> = ({
  children,
  prevArrow,
  nextArrow,
  scrollId,
  arrowsContainerClassName,
  scrollInnerClassName,
  updDeps,
  onScrollEnded,
}) => {
  const isMobile = useSelector(isMobileSelector);

  return (
    isMobile
      ? (
        <MobileScrollInner
          scrollInnerClassName={scrollInnerClassName}
          scrollId={scrollId}
          onScrollEnded={onScrollEnded}
        >
          {children}
        </MobileScrollInner>
      )
      : (
        <DesktopScrollInner
          onScrollEnded={onScrollEnded}
          prevArrow={prevArrow}
          nextArrow={nextArrow}
          scrollId={scrollId}
          arrowsContainerClassName={arrowsContainerClassName}
          scrollInnerClassName={scrollInnerClassName}
          updDeps={updDeps}
        >
          {children}
        </DesktopScrollInner>
      )
  );
};
ScrollInner.displayName = "ScrollInner";

const NativeHorizontalScroll: FC<PropsWithChildren<IScrollProps>> = ({
  children,
  prevArrow,
  nextArrow,
  className,
  scrollId,
  trackClassName,
  arrowsContainerClassName,
  scrollInnerClassName,
  updDeps,
  onScrollEnded,
  qaAttribute,
}) => (
  <div className={clsx(classes.scroll, className)} {...qaAttr(qaAttribute)}>
    <ScrollInner
      prevArrow={prevArrow}
      nextArrow={nextArrow}
      scrollId={scrollId}
      arrowsContainerClassName={arrowsContainerClassName}
      scrollInnerClassName={scrollInnerClassName}
      updDeps={updDeps}
      onScrollEnded={onScrollEnded}
    >
      <div className={clsx(classes.track, trackClassName)}>
        {children}
      </div>
    </ScrollInner>
  </div>
);
NativeHorizontalScroll.displayName = "NativeHorizontalScroll";

export { NativeHorizontalScroll };
