import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getNotNil, isEmpty, useActionWithBind, useParamSelector, withCondition } from "@sb/utils";
import classes from "./LandingSection.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import {
  cmsGamesLayoutSelector,
  cmsGamesLoadingSelector,
  cmsGamesMapItemSelector,
  cmsLandingBlockAllGamesLoaded,
} from "../../../../Store/CMS/Selectors/LandingSelectors/CMSLandingSelectors";
import { cmsLoadMoreGames } from "../../../../Store/CMS/CMSAction";
import { MultiLangText } from "../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { useCountShowGames, useGetImageSize } from "../../Utils/LandingPageUtils";
import { GamesSection } from "../GamesSection/GamesSection";
import { LandingTopEventsSection } from "../LandingTopEventsSection/LandingTopEventsSection";

interface IGamesColumn {
  indexList: number[];
}

const GamesColumn = memo<IGamesColumn>(({ indexList }) => (
  <div className={clsx(classes.gamesColumn, IS_MOBILE_CLIENT_SIDE && classes.gamesColumnMobile)}>
    {indexList.map((i) => <GamesRow index={i} key={i} />)}
  </div>
));
GamesColumn.displayName = "GamesColumn";

interface IGamesRow {
  index: number;
}

const GamesRow = memo<IGamesRow>(({ index }) => {
  const games = useParamSelector(cmsGamesMapItemSelector, [index]);

  const countShowGames = useCountShowGames(games.count);

  const imageSize = useGetImageSize(games.count);

  const next = useActionWithBind(cmsLoadMoreGames, index);

  const loading = useParamSelector(cmsGamesLoadingSelector, [String(index)]);

  if (games.loaded.gameIds.length === 0) {
    return null;
  }

  const className = clsx(
    !IS_MOBILE_CLIENT_SIDE && countShowGames === 3
      ? clsx(classes.landingSmallSection, classes.landingGameSection)
      : classes.landingGameSection,
    classes.gameSection,
  );

  return (
    <GamesSection
      markerColor={"255 158 0"}
      sectionTitle={<MultiLangText arr={games.title} />}
      className={className}
      gameIds={games.loaded.gameIds}
      imgSize={imageSize}
      onReachEnd={next}
      loading={loading}
    />
  );
});
GamesRow.displayName = "GamesRow";

const LandingGamesSection = withCondition(
  cmsLandingBlockAllGamesLoaded,
  memo(
    () => {
      const layout = useSelector(cmsGamesLayoutSelector);

      // Top events should be located after first label (client requirement)
      if (isEmpty(layout)) {
        return <LandingTopEventsSection />;
      }

      return (
        <div>
          <GamesColumn
            indexList={getNotNil(layout[0], ["indexList"], "layout[0]")}
            key={"first label"}
          />

          <LandingTopEventsSection />

          {
            layout.slice(1)
              .map(
                (indexList, index) => <GamesColumn indexList={indexList} key={index} />,
              )
          }
        </div>
      );
    },
  ),
);
LandingGamesSection.displayName = "LandingGamesSection";

export {
  LandingGamesSection,
};
