import { createOptionalPropertySelector } from "@sb/utils";
import { BLOCK_CONTENT, EPlatformBlockMap } from "@sb/cms-core";
import { type ICmsThemeTwoContentState, type ICmsWrapperState, type TContent } from "../../../../../Store/CMS/Model/CmsModel";

const CMSStarzBetContentSelector = (state: ICmsWrapperState<TContent>): ICmsThemeTwoContentState | null => {
  const content = state.CMS.content;

  return content.theme === "ThemeTwo" ? content : null;
};

const CMSBlocksSelector = createOptionalPropertySelector(
  CMSStarzBetContentSelector,
  [BLOCK_CONTENT],
);

const CMSTVChannelSelector = createOptionalPropertySelector(
  CMSBlocksSelector,
  [EPlatformBlockMap.TV_CHANNEL, "link"],
);

export { CMSBlocksSelector, CMSTVChannelSelector };
