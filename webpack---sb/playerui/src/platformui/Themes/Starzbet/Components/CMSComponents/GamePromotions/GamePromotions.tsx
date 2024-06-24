import clsx from "clsx";
import { memo } from "react";
import { type ReactConveyerResult } from "@egjs/react-conveyer";
import { useParamSelector, withCondition } from "@sb/utils";
import classes from "./GamePromotions.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { ArrowLeftIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowLeftIcon";
import { NativeHorizontalScroll } from "../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { useModalOpenAction } from "../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { CMSIsShowBonusSelector, isCMSPromoPagePromosSelector } from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { getBonusId } from "../../../../../Store/CMS/Utils/Helpers";
import { type IBonus } from "../../../Store/CMS/Types";
import { CMSBonusesWrapper } from "../BonusesWrapper/CMSBonusesWrapper";
import { CMSPromoImage, CMSPromoMobileImage } from "../CMSPromoImage/CMSPromoImage";

interface IArrow {
  scrolledSize: number;
  className?: string;
}

const SLIDE_STEP = 540;

const Arrow = memo<IArrow & ReactConveyerResult>(({ scrolledSize, className, scrollBy }) => {
  const onClick = () => scrollBy(scrolledSize);

  return (
    <button className={className} onClick={onClick}>
      <ArrowLeftIcon size={"s"} color={"text"} />
    </button>
  );
});
Arrow.displayName = "Arrow";

const PrevArrow = memo<ReactConveyerResult>((props) => !IS_MOBILE_CLIENT_SIDE
  ? <Arrow {...props} className={clsx(classes.prevArrow, props.isReachStart && classes.disable)} scrolledSize={-SLIDE_STEP} />
  : null);
PrevArrow.displayName = "PrevArrow";

const NextArrow = memo<ReactConveyerResult>((props) => !IS_MOBILE_CLIENT_SIDE
  ? <Arrow {...props} className={clsx(classes.nextArrow, props.isReachEnd && classes.disable)} scrolledSize={SLIDE_STEP} />
  : null);
NextArrow.displayName = "NextArrow";

const CMSBonus = memo<IBonus>(({ bonus, index }) => {
  const {
    chooseTags,
  } = bonus;

  const bonusId = getBonusId(bonus);

  const conditionsForNonRenderBonus = useParamSelector(CMSIsShowBonusSelector, [chooseTags, bonusId]);
  const openModal = useModalOpenAction(EModal.cmsPromo, index);

  if (conditionsForNonRenderBonus) {
    return null;
  }

  return (
    <div className={classes.bonusContent} onClick={openModal}>
      {
        IS_MOBILE_CLIENT_SIDE
          ? <CMSPromoMobileImage image={bonus?.image} className={classes.casinoClasses} margins={20} />
          :  <CMSPromoImage image={bonus?.image} height={260} className={classes.casinoClasses} />
      }
    </div>
  );
});
CMSBonus.displayName = "CMSBonus";

const GamePromotions = withCondition(
  isCMSPromoPagePromosSelector,
  memo(() => IS_MOBILE_CLIENT_SIDE
    ? (
      <CMSBonusesWrapper
        BonusWrapper={CMSBonus}
        withWrapperDiv={false}
        withSlider={true}
      />
    )
    : (
      <div className={classes.gamePromotions}>
        <NativeHorizontalScroll
          className={clsx(classes.scroll)}
          trackClassName={classes.trackClassName}
          scrollInnerClassName={classes.scrollInnerClassName}
          prevArrow={PrevArrow}
          nextArrow={NextArrow}
        >
          <CMSBonusesWrapper
            bonusWrapperClasses={classes.bonusesWrapper}
            BonusWrapper={CMSBonus}
            withWrapperDiv={false}
          />
        </NativeHorizontalScroll>
      </div>
    )),
);
GamePromotions.displayName = "GamePromotions";

export { GamePromotions };
