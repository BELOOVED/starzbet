import { memo } from "react";
import { isNil, isNotNil, useParamSelector } from "@sb/utils";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { NavLinkLocalized } from "../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { getLocalizedPathPatternByRoute } from "../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedPathPatternByRoute";
import { routeMap } from "../../../RouteMap/RouteMap";
import { scrollToTop } from "../../../Utils/ScrollToTop";
import { useCorrectTextByLocale } from "../../../Hooks/UseCorrectTextByLocale";
import { type ILinksBlock, type IMediaLinkClassNames, type IMediaLinkGeneral } from "../../../Store/CMS/Model/CmsModel";
import { CMSCorrectUrlSelector } from "../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { isExternalMediaLink } from "../../../Store/CMS/Utils/TypeGuards";
import { getCorrectLinkByUrl } from "../../../Store/CMS/Utils/GetCorrectLinkByUrl";
import { Ellipsis } from "../../Ellipsis/Ellipsis";

const LinksBlock = memo<ILinksBlock>(({ linksMap, mediaLinkClassName, activeClassName }) => (
  <>
    {
      isNotNil(linksMap)
        ? linksMap.map((el, index) => (
          isNotNil(el) && isNotNil(el.mediaLink)
            ? (
              <MediaLink
                mediaLinkClassName={mediaLinkClassName}
                activeClassName={activeClassName}
                link={el.mediaLink}
                key={index}
              />
            )
            : null
        ))
        : null
    }
  </>
));
LinksBlock.displayName = "LinksBlock";

interface IExternalMediaLink extends IMediaLinkClassNames {
  anchor: string;
  correctUrl: string;
  url: string;
}

const ExternalMediaLink = memo<IExternalMediaLink>(({
  anchor,
  correctUrl,
  mediaLinkClassName,
  activeClassName,
  url,
}) => {
  if (isNil(anchor) || isNil(url)) {
    return null;
  }
  // str startWith only one "/"
  if (/^\/.*/.exec(url)) {
    return (
      <NavLinkLocalized
        className={mediaLinkClassName}
        activeClassName={activeClassName}
        to={getLocalizedPathPatternByRoute(url)}
      >
        <Ellipsis>{anchor}</Ellipsis>
      </NavLinkLocalized>
    );
  }

  return (
    <a
      href={correctUrl}
      className={mediaLinkClassName}
      target={"_blank"}
      rel={"noreferrer"}
    >
      <Ellipsis>{anchor}</Ellipsis>
    </a>
  );
});
ExternalMediaLink.displayName = "ExternalMediaLink";

const MediaLink = memo<IMediaLinkGeneral>(({ link, mediaLinkClassName, activeClassName }) => {
  const { anchor: text } = link;
  const anchor = useCorrectTextByLocale(text);

  const correctUrl = useParamSelector(CMSCorrectUrlSelector, [link]);

  const internalLink = getCorrectLinkByUrl(routeMap.cms, correctUrl);

  if (isNil(anchor)) {
    return null;
  }

  return isExternalMediaLink(link) && link.url
    ? (
      <ExternalMediaLink
        url={link.url}
        anchor={anchor}
        correctUrl={correctUrl}
        activeClassName={activeClassName}
        mediaLinkClassName={mediaLinkClassName}
      />
    )
    : (
      <NavLinkLocalized
        className={mediaLinkClassName}
        activeClassName={activeClassName}
        exact={true}
        {...internalLink}
        onClick={scrollToTop}
        qaAttribute={PlayerUIQaAttributes.Cms.EternalPageLink}
      >
        <Ellipsis>{anchor}</Ellipsis>
      </NavLinkLocalized>
    );
});
MediaLink.displayName = "MediaLink";

export { LinksBlock, MediaLink };
