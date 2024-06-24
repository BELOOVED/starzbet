import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { getNotNil, isNotNil, useClickOutside, useParamSelector, withCondition, not } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import type { TCms_LinksBlockListContent_Type_Fragment } from "@sb/graphql-client/CmsUI";
import classes from "./CMSNavBar.module.css";
import { Text } from "../../../../../../../common/Themes/Starzbet/Components/Text/Text";
import { CollapseIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import {
  CMSPageByPathSelector,
  CMSSimplePageAnchorSelector,
  isCMSSimplePageSelector,
} from "../../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { MediaLink } from "../../../../../../Components/CMSComponents/CMSLinksBlock/LinksBlock";
import { useCorrectTextByLocale } from "../../../../../../Hooks/UseCorrectTextByLocale";
import { CMSSimplePageLinksSelector } from "../../../../Store/CMS/Selectors/CMSFooterSelectors";
import { FooterSelectIcon } from "../../../../Components/Icons/FooterSelectIcon/FooterSelectIcon";

interface IWrapper {
  linkList: (TCms_LinksBlockListContent_Type_Fragment | null)[];
}

const Wrapper = memo<IWrapper>(({ linkList }) => {
  const [dropdown, setDropdown] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => setDropdown(false));

  const openDropdown = () => setDropdown(not);

  const anchor = useSelector(CMSSimplePageAnchorSelector);

  const text = useCorrectTextByLocale(anchor);

  return (
    <div className={classes.wrapper} ref={ref} onClick={openDropdown}>
      <div className={classes.title}>
        <div className={classes.current}>
          <FooterSelectIcon size={"s"} color={"darkText"} />

          <Text
            colorScheme={"light-700"}
            textSize={"14"}
            capitalize
            textGap={"24"}
            className={classes.maxWidth}
            textWeight={"500"}
          >
            <Ellipsis>
              {text}
            </Ellipsis>
          </Text>
        </div>

        <CollapseIcon expanded={dropdown} />
      </div>

      {
        dropdown
          ? (
            <div className={classes.linksWrapper}>
              {
                linkList.map((el, index) => (
                  isNotNil(el) && isNotNil(el.mediaLink)
                    ? (
                      <MediaLink
                        mediaLinkClassName={classes.mediaLink}
                        activeClassName={classes.active}
                        link={el.mediaLink}
                        key={index}
                      />
                    )
                    : null
                ))
              }
            </div>

          )
          : null
      }
    </div>
  );
});
Wrapper.displayName = "Wrapper";

const CMSNavBar = withCondition(
  isCMSSimplePageSelector,
  memo(() => {
    const pathname = useSelector(routerLocationPathnameSelector);

    const { id } =
      getNotNil(useParamSelector(CMSPageByPathSelector, [pathname]), ["CMSNavBar", "CMSPageByPathSelector"], "page");

    const linkList = useParamSelector(CMSSimplePageLinksSelector, [id]);

    return (
      <Wrapper linkList={linkList} />
    );
  }),
);
CMSNavBar.displayName = "CMSNavBar";

export { CMSNavBar };
