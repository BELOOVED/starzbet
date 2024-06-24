import { useParamSelector } from "@sb/utils";
import { routeMap } from "../RouteMap/RouteMap";
import { type EPagesDefaultThemeOne } from "../Store/CMS/Model/CmsEnums";
import { CMSUrlByTitleSelector } from "../Store/CMS/Selectors/CMSPageContentSelectors";
import { getCorrectLinkByUrl } from "../Store/CMS/Utils/GetCorrectLinkByUrl";

// this hook works if you have only one pageType, that you use in this hook
const useCMSPageLinkByPageType = (pageType: EPagesDefaultThemeOne) => {
  const url = useParamSelector(CMSUrlByTitleSelector, [pageType]);

  return getCorrectLinkByUrl(routeMap.cms, url);
};

export { useCMSPageLinkByPageType };
