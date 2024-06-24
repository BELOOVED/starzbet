import { createOptionalPropertySelector, isNotNil } from "@sb/utils";
import { cmsPromoModalSelector } from "../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { type ICmsState, type ICmsWrapperState, type TContent } from "../../../../../Store/CMS/Model/CmsModel";
import { CMSPromoPageContentSelector } from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { type TPlatformAppState } from "../../../../../Store/PlatformInitialState";

const CMSStarzBetSelector = (state: ICmsWrapperState<TContent>): ICmsState<TContent> | null => {
  const content = state.CMS;

  return content.content.theme === "ThemeTwo" ? content : null;
};

const CMSActivePromoSelector = createOptionalPropertySelector(
  CMSStarzBetSelector,
  ["promotionPage", "activePromo"],
);

const CMSCorrectActivePromoSelector = (state: TPlatformAppState): number => {
  const activePromo = CMSActivePromoSelector(state);

  const index = cmsPromoModalSelector(state);

  return activePromo ?? index;
};

const CMSPromoByIndexSelector = (state: TPlatformAppState) => {
  const index = CMSCorrectActivePromoSelector(state);

  const promoContent = CMSPromoPageContentSelector(state);

  return isNotNil(index) ? promoContent?.promos?.content?.[index] : null;
};

const isLastPromoSelector = (state: TPlatformAppState) => {
  const index = CMSCorrectActivePromoSelector(state);

  const promoContent = CMSPromoPageContentSelector(state);

  return promoContent?.promos?.content?.length === index + 1;
};

const isFirstPromoSelector = (state: TPlatformAppState) => {
  const index = CMSCorrectActivePromoSelector(state);

  return 0 === index;
};

export {
  CMSCorrectActivePromoSelector,
  CMSPromoByIndexSelector,
  isLastPromoSelector,
  isFirstPromoSelector,
};
