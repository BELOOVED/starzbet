import { BLOCK_CONTENT, EPlatformBlockMap, VARIABLES } from "@sb/cms-core";
import { ECmsPuiThemes, findCmsPuiThemeBySbTheme } from "@sb/cms-config";
import { isNotNil, type TExplicitAny, type TNullable } from "@sb/utils";
import { type TCms_Variable_Fragment } from "@sb/graphql-client/CmsUI";
import { type TFile_Fragment } from "@sb/graphql-client";
import {
  type ICmsPreloadedState,
  type ICmsThemeFiveContentState,
  type ICmsThemeFourContentState,
  type ICmsThemeOneContentState,
  type ICmsThemeSixContentState,
  type ICmsThemeThreeContentState,
  type ICmsThemeTwoContentState,
  type ICmsWrapperState,
  type TContent,
  type TWithServerLoaded,
} from "./Model/CmsModel";
import { META_CONTENT } from "./Model/CmsConstants";
import { EPagesDefaultThemeOne, EPagesDefaultThemeTwo } from "./Model/CmsEnums";

const getCmsThemeTwoInitialState = (preloadedState?: ICmsPreloadedState<ICmsThemeTwoContentState>["CMS"]): ICmsWrapperState<ICmsThemeTwoContentState> => ({
  CMS: {
    promotionPage: {
      searchValue: "",
      activeTags: [],
      activePromo: null,
    },
    content: {
      theme: "ThemeTwo",
      pagesContent: null,
      predefinedPages: {
        [EPagesDefaultThemeTwo.privacy]: "",
        [EPagesDefaultThemeTwo.terms]: "",
      },
      [BLOCK_CONTENT]: {
        [EPlatformBlockMap.FOOTER]: null,
        [EPlatformBlockMap.CONTACT_US]: null,
        [EPlatformBlockMap.LANDING]: null,
        [EPlatformBlockMap.TV_CHANNEL]: null,
      },
      files: {},
      [VARIABLES]: {
        // todo add correct type CmsPreloadedState
        nodes: (preloadedState?.content?.[VARIABLES]?.nodes as (TCms_Variable_Fragment[] | undefined)) ?? [],
        isServerLoaded: isNotNil(preloadedState?.content?.[VARIABLES]),
      },
      pages: [],
      [META_CONTENT]: [],
      cmsGames: undefined,
    },
  },
});

const CMS_THEME_FOUR_INITIAL_STATE: ICmsWrapperState<ICmsThemeFourContentState> = {
  CMS: {
    promotionPage: {
      searchValue: "",
      activeTags: [],
    },
    content: {
      theme: "ThemeFour",
      pagesContent: null,
      predefinedPages: {
        [EPagesDefaultThemeTwo.privacy]: "",
        [EPagesDefaultThemeTwo.terms]: "",
      },
      [BLOCK_CONTENT]: {
        [EPlatformBlockMap.FOOTER]: null,
        [EPlatformBlockMap.CONTACT_US]: null,
        [EPlatformBlockMap.TV_CHANNEL]: null,
      },
      files: {},
      [VARIABLES]: { nodes: [], isServerLoaded: false },
      pages: [],
      [META_CONTENT]: [],
    },
  },
};

const CMS_THEME_FIVE_INITIAL_STATE: ICmsWrapperState<ICmsThemeFiveContentState> = {
  CMS: {
    promotionPage: {
      searchValue: "",
      activeTags: [],
    },
    content: {
      theme: "ThemeFive",
      pagesContent: null,
      predefinedPages: {
        [EPagesDefaultThemeTwo.privacy]: "",
        [EPagesDefaultThemeTwo.terms]: "",
      },
      [BLOCK_CONTENT]: {
        [EPlatformBlockMap.FOOTER]: null,
        [EPlatformBlockMap.CONTACT_US]: null,
        [EPlatformBlockMap.TV_CHANNEL]: null,
        [EPlatformBlockMap.LANDING]: null,
      },
      files: {},
      [VARIABLES]: { nodes: [], isServerLoaded: false },
      pages: [],
      [META_CONTENT]: [],
      cmsGames: undefined,
    },
  },
};

const CMS_THEME_SIX_INITIAL_STATE: ICmsWrapperState<ICmsThemeSixContentState> = {
  CMS: {
    promotionPage: {
      searchValue: "",
      activeTags: [],
    },
    content: {
      theme: "ThemeSix",
      pagesContent: null,
      predefinedPages: {
        [EPagesDefaultThemeTwo.privacy]: "",
        [EPagesDefaultThemeTwo.terms]: "",
      },
      [BLOCK_CONTENT]: {
        [EPlatformBlockMap.FOOTER]: null,
        [EPlatformBlockMap.CONTACT_US]: null,
        [EPlatformBlockMap.LANDING]: null,
        [EPlatformBlockMap.TV_CHANNEL]: null,
        [EPlatformBlockMap.BANNERS]: null,
        [EPlatformBlockMap.HIGHLIGHTS]: null,
      },
      files: {},
      [VARIABLES]: { nodes: [], isServerLoaded: false },
      pages: [],
      [META_CONTENT]: [],
      cmsGames: undefined,
      vipTablesLabel: undefined,
    },
  },
};

const getBlockThemeOneByType = (
  preloadedState: ICmsPreloadedState<ICmsThemeOneContentState>["CMS"] | undefined,
  blockType: Exclude<
    EPlatformBlockMap,
    EPlatformBlockMap.E2ETest | EPlatformBlockMap.BANNERS | EPlatformBlockMap.HIGHLIGHTS
  >,
) => {
  // todo TypeGuard
  const content = preloadedState?.content?.[BLOCK_CONTENT]?.[blockType] as TNullable<TExplicitAny & TWithServerLoaded>;

  return content ? { ...content, isServerLoaded: true } : null;
};

const getBlockThemeThreeByType = (
  preloadedState: ICmsPreloadedState<ICmsThemeThreeContentState>["CMS"] | undefined,
  blockType: Exclude<
    EPlatformBlockMap,
    EPlatformBlockMap.E2ETest | EPlatformBlockMap.LANDING | EPlatformBlockMap.BANNERS | EPlatformBlockMap.HIGHLIGHTS
  >,
) => {
  // todo TypeGuard
  const content = preloadedState?.content?.[BLOCK_CONTENT]?.[blockType] as TNullable<TExplicitAny & TWithServerLoaded>;

  return content ? { ...content, isServerLoaded: true } : null;
};

const getCmsThemeOneInitialState = (
  preloadedState?: ICmsPreloadedState<ICmsThemeOneContentState>["CMS"],
): ICmsWrapperState<ICmsThemeOneContentState> => ({
  CMS: {
    promotionPage: {
      searchValue: "",
      activeTags: [],
    },
    content: {
      theme: "ThemeOne",
      pagesContent: null,
      predefinedPages: {
        [EPagesDefaultThemeOne.landing]: "",
        [EPagesDefaultThemeOne.privacy]: "",
        [EPagesDefaultThemeOne.terms]: "",
      },
      [BLOCK_CONTENT]: {
        [EPlatformBlockMap.FOOTER]: getBlockThemeOneByType(preloadedState, EPlatformBlockMap.FOOTER),
        [EPlatformBlockMap.LANDING]: getBlockThemeOneByType(preloadedState, EPlatformBlockMap.LANDING),
        [EPlatformBlockMap.CONTACT_US]: null,
        [EPlatformBlockMap.TV_CHANNEL]: getBlockThemeOneByType(preloadedState, EPlatformBlockMap.TV_CHANNEL),
      },
      files: (preloadedState?.content?.files as Record<string, TFile_Fragment> | undefined) ?? {},
      [VARIABLES]: {
        // todo add correct type CmsPreloadedState
        nodes: (preloadedState?.content?.[VARIABLES]?.nodes as (TCms_Variable_Fragment[] | undefined)) ?? [],
        isServerLoaded: isNotNil(preloadedState?.content?.[VARIABLES]),
      },
      pages: [],
      [META_CONTENT]: [],
      cmsGames: undefined,
    },
  },
});

const getCmsThemeThreeInitialState = (preloadedState?: ICmsPreloadedState<ICmsThemeThreeContentState>["CMS"]): ICmsWrapperState<ICmsThemeThreeContentState> => ({
  CMS: {
    promotionPage: {
      searchValue: "",
      activeTags: [],
    },
    content: {
      theme: "ThemeThree",
      pagesContent: null,
      predefinedPages: {
        [EPagesDefaultThemeOne.landing]: "",
        [EPagesDefaultThemeOne.privacy]: "",
        [EPagesDefaultThemeOne.terms]: "",
      },
      [BLOCK_CONTENT]: {
        [EPlatformBlockMap.FOOTER]: getBlockThemeThreeByType(preloadedState, EPlatformBlockMap.FOOTER),
        [EPlatformBlockMap.CONTACT_US]: null,
        [EPlatformBlockMap.TV_CHANNEL]: getBlockThemeThreeByType(preloadedState, EPlatformBlockMap.TV_CHANNEL),
      },
      files: (preloadedState?.content?.files as Record<string, TFile_Fragment> | undefined) ?? {},
      [VARIABLES]: {
        // todo add correct type CmsPreloadedState
        nodes: (preloadedState?.content?.[VARIABLES]?.nodes as (TCms_Variable_Fragment[] | undefined)) ?? [],
        isServerLoaded: isNotNil(preloadedState?.content?.[VARIABLES]),
      },
      pages: [],
      [META_CONTENT]: [],
      cmsGames: undefined,
    },
  },
});

const getCmsInitialState = <T extends TContent>(preloadedState?: ICmsPreloadedState<T>["CMS"]) => {
  const cmsTheme = findCmsPuiThemeBySbTheme(process.env.THEME);

  switch (cmsTheme) {
    case ECmsPuiThemes.themeOne: {
      // todo TypeGuard
      return getCmsThemeOneInitialState(preloadedState as (ICmsPreloadedState<ICmsThemeOneContentState>["CMS"] | undefined));
    }

    case ECmsPuiThemes.themeTwo: {
      // todo TypeGuard
      return getCmsThemeTwoInitialState(preloadedState as (ICmsPreloadedState<ICmsThemeTwoContentState>["CMS"] | undefined));
    }

    case ECmsPuiThemes.themeThree: {
      return getCmsThemeThreeInitialState(preloadedState as (ICmsPreloadedState<ICmsThemeThreeContentState>["CMS"] | undefined));
    }

    case ECmsPuiThemes.themeFour: {
      return CMS_THEME_FOUR_INITIAL_STATE;
    }

    case ECmsPuiThemes.themeFive: {
      return CMS_THEME_FIVE_INITIAL_STATE;
    }

    case ECmsPuiThemes.themeSix: {
      return CMS_THEME_SIX_INITIAL_STATE;
    }

    default: {
      throw new Error("This theme don't supported in CMS");
    }
  }
};

export { getCmsInitialState };
