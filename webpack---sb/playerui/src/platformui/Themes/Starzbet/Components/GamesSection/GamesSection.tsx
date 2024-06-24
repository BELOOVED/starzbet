import clsx from "clsx";
import { memo, type NamedExoticComponent, type ReactNode } from "react";
import { type ReactConveyerResult } from "@egjs/react-conveyer";
import { isNotEmpty, type TVoidFn, withProps } from "@sb/utils";
import classes from "./GamesSection.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../common/Components/When";
import { NativeHorizontalScroll } from "../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { LandingSectionButton, SectionControls, SectionPrevButton } from "../SectionControls/SectionControls";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { SectionGame } from "../SectionGame/SectionGame";

interface ILandingSectionProps extends IWithClassName {
  sectionTitle: ReactNode;
  markerColor: string;
  visibleItemsCount?: number;
  gameIds: string[];
  imgSize: number;
  fallBackContent?: ReactNode;
  onReachEnd?: TVoidFn;
  loading?: boolean;
}

const GamesSection = memo<ILandingSectionProps>(({
  sectionTitle,
  markerColor,
  className,
  gameIds,
  imgSize = 160,
  fallBackContent,
  onReachEnd,
  loading = false,
}) => {
  const nextArrow =withProps(
    LandingSectionButton,
  )(
    { isNext: true, loading },
  ) as NamedExoticComponent<ReactConveyerResult>;

  return (
    <div className={clsx(classes.gamesSection, className)}>
      <div className={classes.sectionWrapper}>
        <div className={classes.sectionHeader}>
          {
            <SectionTitle markerColor={markerColor}>
              {sectionTitle}
            </SectionTitle>
          }

          <When condition={!IS_MOBILE_CLIENT_SIDE}>
            <SectionControls />
          </When>
        </div>

        <NativeHorizontalScroll
          className={classes.sectionScroll}
          trackClassName={classes.sectionTrack}
          prevArrow={SectionPrevButton}
          nextArrow={nextArrow}
          updDeps={gameIds}
          onScrollEnded={onReachEnd}
        >
          {
            isNotEmpty(gameIds)
              ? gameIds.map((id) => (
                <SectionGame
                  key={id}
                  gameId={id}
                  imgSize={imgSize}
                />
              ))
              : fallBackContent
          }
        </NativeHorizontalScroll>
      </div>
    </div>
  );
});
GamesSection.displayName = "GamesSection";

export { GamesSection };
