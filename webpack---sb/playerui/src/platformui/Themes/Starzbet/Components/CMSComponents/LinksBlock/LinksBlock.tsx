import clsx from "clsx";
import { memo, useReducer } from "react";
import { useSelector } from "react-redux";
import { deprecatedGetNotNil, isNil, isNotNil, not, useParamSelector, withCondition } from "@sb/utils";
import type { TCms_LinksBlockListWithTitleContent_Type_Fragment } from "@sb/graphql-client/CmsUI";
import { useRouteMatch } from "@sb/react-router-compat";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import classes from "./LinksBlock.module.css";
import { Text } from "../../../../../../common/Themes/Starzbet/Components/Text/Text";
import { CollapseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import { NavLinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { smoothScrollToTop } from "../../../../../Utils/ScrollToTop";
import { isMediaLink } from "../../../../../Store/CMS/Utils/isTypeOf";
import {
  CMSCorrectUrlSelector,
  CMSMatchRouteByPageIdListSelector,
  CMSPageUrlPageIdSelector,
  isCMSSimplePageSelector,
} from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { MultiLangText } from "../../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { getPageIdList } from "../../../../../Store/CMS/Utils/Helpers";
import { isEternalMediaLink, isExternalMediaLink } from "../../../../../Store/CMS/Utils/TypeGuards";
import { getCorrectLinkByUrl } from "../../../../../Store/CMS/Utils/GetCorrectLinkByUrl";
import { CMSFooterLinkListSelector } from "../../../Store/CMS/Selectors/CMSFooterSelectors";
import { type ILinksBlockWithTitle, type IMediaLinkGeneral } from "../../../Model/FooterInterfaceAndTypes";

interface ILinkBlock {
  element: TCms_LinksBlockListWithTitleContent_Type_Fragment;
}

const LinksBlock = memo<ILinkBlock>(({ element }) => {
  const flag = useParamSelector(CMSMatchRouteByPageIdListSelector, [getPageIdList(element)]);

  const [dropdown, setDropdown] = useReducer(not<boolean>, flag);

  const linksCount = element.linkList?.content?.length;

  return (
    <div>
      <div onClick={setDropdown} className={classes.linkTitleContent}>
        <Text
          colorScheme={"text"}
          textSize={"16"}
          textGap={"24"}
          textWeight={"500"}
          className={classes.linkTitle}
          capitalize
        >
          <MultiLangText wide arr={element.richText?.description} isTextArea={false} />

          {
            linksCount
              ? (
                <span className={classes.linkCount}>{linksCount}</span>
              )
              : null
          }
        </Text>

        <CollapseIcon expanded={dropdown} />
      </div>

      {
        dropdown
          ? (
            <div className={classes.linksWrapper}>
              {
                element.linkList?.content?.map((it, index) => isNotNil(it) && isNotNil(it.mediaLink)
                  ? (
                    <MediaLink
                      withDot
                      activeClassName={classes.activeLink}
                      mediaLinkClassName={classes.link}
                      key={index}
                      link={it.mediaLink}
                    />
                  )
                  : null)
              }
            </div>
          )
          : null
      }
    </div>
  );
});
LinksBlock.displayName = "LinksBlock";

const LinksBlockWithTitle = withCondition(
  isCMSSimplePageSelector,
  memo(() => {
    const linkList = useSelector(CMSFooterLinkListSelector);

    return (
      <div className={classes.linksBlockWithTitle}>
        {
          linkList?.map((it, index) => isNotNil(it)
            ? <LinksBlock key={index} element={it} />
            : null)
        }
      </div>
    );
  }),
);
LinksBlockWithTitle.displayName = "LinksBlockWithTitle";

const PageTitleMediaLink = memo<ILinksBlockWithTitle>(({ list, index }) => {
  const { linkList, richText } = deprecatedGetNotNil(list);

  const currentLink = linkList?.content?.[index];
  const currentOrFirstNonNullableLink = currentLink || linkList?.content?.find((it) => isNotNil(it?.mediaLink));
  if (isNotNil(currentOrFirstNonNullableLink)) {
    const link = {
      ...currentOrFirstNonNullableLink.mediaLink,
      anchor: richText?.description,
    };

    if (isMediaLink(link)) {
      return <MediaLink link={link} />;
    }

    return null;
  }

  return <MultiLangText arr={richText?.description} isTextArea={false} />;
});
PageTitleMediaLink.displayName = "PageTitleMediaLink";

const MediaLink = memo<IMediaLinkGeneral>(({
  link,
  mediaLinkClassName,
  activeClassName,
  withDot,
}) => {
  const { anchor: text } = link;

  const pageId = isEternalMediaLink(link) ? link.pageId : null;

  const pageUrl = useParamSelector(CMSPageUrlPageIdSelector, [pageId ?? ""]);

  const isPathPath = useRouteMatch({ path: `/cms${pageUrl}`, exact: true });

  const correctUrl = useParamSelector(CMSCorrectUrlSelector, [link]);

  const internalLink = getCorrectLinkByUrl(routeMap.cms, correctUrl);

  const className = clsx(mediaLinkClassName);
  if (isNil(text)) {
    return null;
  }

  const Dot = memo(() => withDot ? <div className={clsx(classes.dot, isPathPath && classes.dotActive)} /> : null);
  Dot.displayName = "Dot";

  return isExternalMediaLink(link)
    ? (
      <div className={className}>
        <Dot />

        <Ellipsis>
          <a href={correctUrl}>
            <MultiLangText arr={text} />
          </a>
        </Ellipsis>
      </div>
    )
    : (
      <NavLinkLocalized
        className={className}
        activeClassName={activeClassName}
        exact={true}
        {...internalLink}
        onClick={smoothScrollToTop}
        qaAttribute={PlayerUIQaAttributes.Cms.EternalPageLink}
      >
        <Dot />

        <MultiLangText arr={text} />
      </NavLinkLocalized>
    );
});
MediaLink.displayName = "MediaLink";

export { PageTitleMediaLink, LinksBlockWithTitle };
