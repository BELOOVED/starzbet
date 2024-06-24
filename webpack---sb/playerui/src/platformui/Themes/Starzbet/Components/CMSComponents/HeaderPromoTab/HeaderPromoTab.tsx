import { memo } from "react";
import { isNil, type TVoidFn, useParamSelector, voidFn, withCondition, withParams } from "@sb/utils";
import { callManagerWasSucceededSelector } from "@sb/call-manager";
import { EPageType } from "@sb/cms-core";
import { type IWithQaAttribute } from "@sb/qa-attributes";
import { NavLinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { CMS_PAGE_CONTENT_SYMBOL } from "../../../../../Store/CMS/Model/CmsSymbols";
import {
  CMSMetaOrPageTitleByPageTypeSelector,
  CMSUrlByPageTypeSelector,
} from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { InlineMultiLangText } from "../../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { getCorrectLinkByUrl } from "../../../../../Store/CMS/Utils/GetCorrectLinkByUrl";
import { PROMO_PAGE_CONTENT_CALL_MANAGER_ID } from "../../../../../Store/CMS/Model/CmsConstants";
import { Gift2Icon } from "../../Icons/Gift2Icon/GiftIcon";

interface IPromotionTabProps extends IWithClassName, IWithQaAttribute {
  wrapperClassName?: string;
  activeClassName?: string;
  onClick?: TVoidFn;
  hideIcon?: boolean;
}

const PromotionTab = memo<IPromotionTabProps>(({
  wrapperClassName,
  className,
  activeClassName,
  hideIcon = false,
  onClick = voidFn,
  qaAttribute,
}) => {
  const pageTitle = useParamSelector(CMSMetaOrPageTitleByPageTypeSelector, [EPageType.promoPage]);

  const promoUrl = useParamSelector(CMSUrlByPageTypeSelector, [EPageType.promoPage]);

  const link = getCorrectLinkByUrl(routeMap.cms, promoUrl);

  if (isNil(pageTitle)) {
    return null;
  }

  return (
    <div
      className={wrapperClassName}
    >
      <NavLinkLocalized
        {...link}
        className={className}
        activeClassName={activeClassName}
        onClick={onClick}
        qaAttribute={qaAttribute}
      >
        {!hideIcon ? <Gift2Icon /> : null}

        <InlineMultiLangText arr={pageTitle} />
      </NavLinkLocalized>
    </div>
  );
});
PromotionTab.displayName = "PromotionTab";

const PromotionTabWrapper = withCondition(
  withParams(callManagerWasSucceededSelector, CMS_PAGE_CONTENT_SYMBOL, PROMO_PAGE_CONTENT_CALL_MANAGER_ID),
  PromotionTab,
);
export { PromotionTabWrapper };
