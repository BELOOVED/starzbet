import { memo } from "react";
import { useSelector } from "react-redux";
import { isNil, isNotVoid, type TExplicitAny, useParamSelector } from "@sb/utils";
import { platformui_starzbet_promos_noPromos } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EBanner_Device } from "@sb/graphql-client";
import classes from "./CMSPromotionPage.module.css";
import { Empty } from "../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { useModalOpenAction } from "../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { BannerSlot } from "../../../../../../Components/BannerSlot/BannerSlot";
import { CMSIsShowBonusSelector, CMSPromoPageContentSelector } from "../../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { getBonusId } from "../../../../../../Store/CMS/Utils/Helpers";
import { Banner } from "../../../../Components/Banner/Banner";
import { CMSPromotionsMenu } from "../../../../Components/CMSComponents/PromotionsMenu/CMSPromotionsMenu";
import { CMSBonusesWrapper } from "../../../../Components/CMSComponents/BonusesWrapper/CMSBonusesWrapper";
import { type IBonus } from "../../../../Store/CMS/Types";
import { CMSPromoMobileImage } from "../../../../Components/CMSComponents/CMSPromoImage/CMSPromoImage";

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
    <div onClick={openModal}>
      <CMSPromoMobileImage className={classes.bonusImage} image={bonus.image} margins={40} />
    </div>
  );
});
CMSBonus.displayName = "CMSBonus";

const CMSPromotionPage = memo(() => {
  const pageContent = useSelector(CMSPromoPageContentSelector);

  return isNil(pageContent)
    ? <Empty messageTKey={platformui_starzbet_promos_noPromos} />
    : (
      <>
        <BannerSlot
          device={EBanner_Device.mobile}
          page={"promotions"}
          slot={"top"}
        >
          {(banners: TExplicitAny) => <Banner banners={banners} />}
        </BannerSlot>

        {isNotVoid(pageContent.promoList?.content) ? <CMSPromotionsMenu /> : null}

        <CMSBonusesWrapper BonusWrapper={CMSBonus} />
      </>
    );
});
CMSPromotionPage.displayName = "CMSPromotionPage";

export { CMSPromotionPage };
