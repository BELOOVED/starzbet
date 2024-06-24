import { getNotNil } from "@sb/utils";
import { mobileGridType } from "./Model/MobileGamesOption";
import { fallbackDesktopGridType, mediaQueryLists, mediaQueryWithGridTypeList } from "./Model/DesktopGamesOption";

const getInitialGridType = (isMobile: boolean) => {
  if (isMobile) {
    return mobileGridType;
  }

  const index = mediaQueryLists.findIndex((mql) => mql.matches);

  return index === -1
    ? fallbackDesktopGridType
    : getNotNil(
      mediaQueryWithGridTypeList.map(([_, gridType]) => gridType)[index],
      ["getInitialGridType"],
      "grid type",
    );
};

export { getInitialGridType };
