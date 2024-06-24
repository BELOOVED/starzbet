import { memo, type NamedExoticComponent } from "react";
import { type RouteComponentProps } from "react-router";
import { getNotNil, isNil, type TExplicitAny, useParamSelector, withParams, withProps } from "@sb/utils";
import { EPageType } from "@sb/cms-core";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { CMSPageByPathSelector, CMSPageContentSucceededSelector } from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { WithConditionLoader } from "../../../Components/WithConditionLoader/WithConditionLoader";
import { CMSPromotionPage } from "./PromoPage/CMSPromotionPage";
import { CMSSimplePage } from "./SimplePage/CMSSimplePage";

const CMSPagesMap: Record<string, NamedExoticComponent<TExplicitAny>> = {
  [EPageType.promoPage]: CMSPromotionPage,
  [EPageType.termsPage]: CMSSimplePage,
  [EPageType.privacyPage]: CMSSimplePage,
  [EPageType.childInfoPage]: CMSSimplePage,
  [EPageType.infoPage]: CMSSimplePage,
};

const CMSPageWrapper = memo<RouteComponentProps>(({ location: { pathname } }) => {
  const page = useParamSelector(CMSPageByPathSelector, [pathname]);
  if (isNil(page)) {
    return <Loader />;
  }
  const Component = getNotNil(CMSPagesMap[page.pageType], ["CMSPageWrapper"], "CMSPagesMap");

  return (
    <WithConditionLoader
      selector={withParams(CMSPageContentSucceededSelector, page.id)}
      component={withProps(Component)({ page })}
    />
  );
});
CMSPageWrapper.displayName = "CMSPageWrapper";

export { CMSPageWrapper };
