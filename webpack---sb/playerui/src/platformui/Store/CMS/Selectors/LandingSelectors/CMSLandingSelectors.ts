import { createOptionalPropertySelector, createPropertySelector, createSimpleSelector, entries, getNotNil, isNil } from "@sb/utils";
import { BLOCK_CONTENT, EPlatformBlockMap } from "@sb/cms-core";
import type { TCms_LabelOrGameIds_Union_Fragment, TCms_LabelOrGameWithImageIds_Union_Fragment } from "@sb/graphql-client/CmsUI";
import { callManagerStartedSelector } from "@sb/call-manager";
import { type TMixAppState } from "../../../../../sportsbookui/Store/CreateMixInitialState";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { landingLabelIdsSelector } from "../../../Landing/LandingSelectors";
import type { TWithLandingState } from "../../../Landing/LandingInitialState";
import { isCmsGamesMap, isCmsGamesWithImageMap } from "../../Utils/TypeGuards";
import { isAllElementInArrayNotNil } from "../../Utils/Helpers";
import { CMS_GAMES_LOADING_SYMBOL } from "../../Model/CmsSymbols";
import { type ICmsWrapperState, type TContent } from "../../Model/CmsModel";
import { cmsBlockSucceededSelector } from "../CMSSelectors";

const cmsLandingThemesWithLabelOrGamesContent = ["ThemeSix", "ThemeTwo", "ThemeFive", "ThemeOne"] as const;

type TCmsLandingLabelOrGamesThemes = typeof cmsLandingThemesWithLabelOrGamesContent[number];

const cmsLandingBlockContentSelector =
  (state: ICmsWrapperState<TContent>): Extract<TContent, { theme: TCmsLandingLabelOrGamesThemes; }> | null => {
    const content = state.CMS.content;
    for (const theme of cmsLandingThemesWithLabelOrGamesContent) {
      if (content.theme === theme) {
        return content;
      }
    }

    return null;
  };

const notNilCmsLandingBlockContentSelector = createSimpleSelector(
  [cmsLandingBlockContentSelector],
  (content) =>
    getNotNil((content), ["notNilCmsLandingBlockContentSelector"], "content"),
);

const notNilCmsGamesSelector = createSimpleSelector(
  [notNilCmsLandingBlockContentSelector],
  (content) =>
    getNotNil((content.cmsGames), ["notNilCmsGamesSelector"], "content.cmsGames"),
);

const cmsLandingBlockLabelsOrGamesSelector = createOptionalPropertySelector(
  cmsLandingBlockContentSelector,
  [BLOCK_CONTENT, EPlatformBlockMap.LANDING, "listWithLabelsOrGames"],
);

const cmsLandingBlockGameIdsSelector =
  (state: TWithLandingState, fragment: TCms_LabelOrGameIds_Union_Fragment | TCms_LabelOrGameWithImageIds_Union_Fragment): string[] => {
    if (isCmsGamesMap(fragment) || isCmsGamesWithImageMap(fragment)) {
      const ids = fragment.gameIds;

      return isAllElementInArrayNotNil(ids) ? ids : [];
    }

    const labelId = fragment.labelId;

    if (isNil(labelId)) {
      return [];
    }

    const labelIds = landingLabelIdsSelector(state);

    return labelIds?.[labelId] || [];
  };

const cmsLandingBlockAllGamesLoaded = (state: TMixAppState) => cmsBlockSucceededSelector(state, EPlatformBlockMap.LANDING);

//not be use in component
const cmsGamesEntriesSelector = createSimpleSelector(
  [notNilCmsGamesSelector],
  (cmsGames) => entries(cmsGames.gamesMap),
);

const cmsGamesMapItemSelector = (state: TPlatformAppState, index: number, context?: string) => {
  const cmsGames = notNilCmsGamesSelector(state);

  return getNotNil(
    cmsGames.gamesMap[index],
    ["cmsGamesPageInfoSelector", "state.CMS.content", context || ""],
    "cmsGames[index]",
  );
};

const cmsGamesLoadingSelector = callManagerStartedSelector.with.symbol(CMS_GAMES_LOADING_SYMBOL);

const cmsGamesLayoutSelector = createPropertySelector(notNilCmsGamesSelector, ["layout"]);

export {
  cmsGamesLoadingSelector,
  cmsGamesEntriesSelector,
  cmsLandingBlockLabelsOrGamesSelector,
  cmsLandingBlockGameIdsSelector,
  cmsLandingBlockAllGamesLoaded,
  cmsGamesMapItemSelector,
  cmsGamesLayoutSelector,
  notNilCmsLandingBlockContentSelector,
  notNilCmsGamesSelector,
};
