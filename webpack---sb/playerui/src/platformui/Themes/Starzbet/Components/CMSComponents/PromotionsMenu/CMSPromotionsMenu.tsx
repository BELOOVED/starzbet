import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotNil, isNil } from "@sb/utils";
import classes from "./CMSPromotionsMenu.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { NativeHorizontalScroll } from "../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { cmsPromotionPageActiveTagsAction } from "../../../../../Store/CMS/CMSAction";
import { CMSPromoPageContentSelector } from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { isThemeTwoPromotionPageContentContent } from "../../../../../Store/CMS/Utils/TypeGuards";
import { type TArrayNullable } from "../../../Model/FooterInterfaceAndTypes";
import { CMSPromotion } from "../Promotions/CMSPromotion";

const CMSPromotionsMenu = memo(() => {
  const [activePromo, setActivePromo] = useState(0);

  const pageContent = getNotNil(useSelector(CMSPromoPageContentSelector), ["CMSPromotionsMenu"], "promo pageContent");

  const dispatch = useDispatch();

  const promoHandleClick = useCallback(
    (tagList: TArrayNullable<string>, promoIndex: number) => {
      dispatch(cmsPromotionPageActiveTagsAction(tagList));
      setActivePromo(promoIndex);
    },
    [],
  );

  useEffect(
    () => () => {
      dispatch(cmsPromotionPageActiveTagsAction([]));
    },
    [],
  );

  if (!isThemeTwoPromotionPageContentContent(pageContent)) {
    return null;
  }

  const {
    promoList,
  } = pageContent;

  return IS_MOBILE_CLIENT_SIDE
    ? (
      <div className={classes.navbar}>
        <div className={classes.promotionPageWrapper}>
          <div className={classes.innerWrapperClass}>
            <NativeHorizontalScroll trackClassName={classes.promoTrack}>
              {
                promoList?.content?.map((promotion, index) => isNil(promotion)
                  ? null
                  : (
                    <CMSPromotion
                      className={clsx(classes.item, activePromo === index && classes.activeItem)}
                      promoHandleClick={promoHandleClick}
                      promoIndex={index}
                      key={index}
                      promotion={promotion}
                    />
                  ))
              }
            </NativeHorizontalScroll>
          </div>
        </div>
      </div>
    )
    : (

      <div className={classes.content}>
        <div className={classes.promotionPageWrapper}>
          <div className={classes.innerWrapperClass}>
            <NativeHorizontalScroll className={classes.scroll} trackClassName={classes.promoTrack}>
              {
                promoList?.content?.map((promotion, index) => isNil(promotion)
                  ? null
                  : (
                    <CMSPromotion
                      className={clsx(classes.item, activePromo === index && classes.activeItem)}
                      promoHandleClick={promoHandleClick}
                      promoIndex={index}
                      key={index}
                      promotion={promotion}
                    />
                  ))
              }
            </NativeHorizontalScroll>
          </div>
        </div>
      </div>
    );
});
CMSPromotionsMenu.displayName = "CMSPromotionsMenu";

export { CMSPromotionsMenu };
