import clsx from "clsx";
import Slider, { type Settings } from "react-slick";
import { memo, type NamedExoticComponent } from "react";
import { useSelector } from "react-redux";
import { isNil, isNotNil } from "@sb/utils";
import { type EGamePage } from "@sb/betting-core/EGamePage";
import type { TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment } from "@sb/graphql-client/CmsUI";
import { platformui_starzbet_promos_noPromos } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./CMSBonusesWrapper.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Empty } from "../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { isAllElementInArrayNotNil } from "../../../../../Store/CMS/Utils/Helpers";
import { cmsPromoPagePromosSelector, cmsPromoPageTagsSelector } from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { isThemeTwoPromosUnion } from "../../../../../Store/CMS/Utils/TypeGuards";
import { type IBonus } from "../../../Store/CMS/Types";

interface IBonusWrapper {
  BonusWrapper: NamedExoticComponent<IBonus>;
  withSlider?: boolean;
  isCenteringBonuses?: boolean;
  withWrapperDiv?: boolean;
  bonusWrapperClasses?: string;
  pageTag?: EGamePage;
}

const settings: Settings = {
  autoplay: true,
  infinite: true,
  arrows: false,
  swipeToSlide: true,
  autoplaySpeed: 3000,
  speed: 1500,
  slidesToScroll: 1,
};

const CMSBonusesWrapper = memo<IBonusWrapper>(({
  BonusWrapper,
  bonusWrapperClasses,
  isCenteringBonuses,
  pageTag,
  withSlider,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  withWrapperDiv = true,
}) => {
  const promos = useSelector(cmsPromoPagePromosSelector);

  const tags = useSelector(cmsPromoPageTagsSelector);

  if (!isThemeTwoPromosUnion(promos) || isNil(tags)) {
    return <Empty messageTKey={platformui_starzbet_promos_noPromos} />;
  }

  // this function filter bonuses by tag with pageType: Casino or Live_Casino
  const filterFn = ({ promo }: { promo: TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment; index: number; }) => {
    const { chooseTags } = promo;

    return isAllElementInArrayNotNil(chooseTags) && chooseTags.find((tagElement) => {
      if (isNil(pageTag)) {
        return false;
      }

      const tagIndex = Number(tagElement.slice(tagElement.lastIndexOf(".") + 1));

      const tagName = tags[tagIndex]?.tag;

      return tagName?.toLowerCase() === pageTag.toString().toLowerCase();
    });
  };

  const promosWithIndex = promos.map((promo, index) => ({ promo, index }));

  const bonuses = isNotNil(pageTag)
    ? promosWithIndex.filter(filterFn).map(({ promo, index }, key) => <BonusWrapper bonus={promo} index={index} key={key} />)
    : promosWithIndex.map(({ promo, index }, key) => <BonusWrapper index={index} bonus={promo} key={key} />);

  const bonusesClasses = clsx(
    isNotNil(bonusWrapperClasses)
      ? bonusWrapperClasses
      : classes.bonusesWrapper,
    isCenteringBonuses && classes.centeringBonuses,
    IS_MOBILE_CLIENT_SIDE && classes.bonusesWrapperMobile,
  );

  if (withSlider) {
    return (
      <div className={clsx(IS_MOBILE_CLIENT_SIDE && classes.sliderContainer)}>
        <Slider {...settings}>
          {bonuses}
        </Slider>
      </div>
    );
  }

  return withWrapperDiv
    ? (
      <div className={bonusesClasses}>
        {bonuses}
      </div>
    )
    : <>{bonuses}</>;
});
CMSBonusesWrapper.displayName = "CMSBonusesWrapper";

export { CMSBonusesWrapper };
