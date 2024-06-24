import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import type { TCms_PromoPageContentPromoListContentThemeTwo_Type_Fragment } from "@sb/graphql-client/CmsUI";
import classes from "./CMSPromotion.module.css";
import { Text } from "../../../../../../common/Themes/Starzbet/Components/Text/Text";
import { cmsPromoPagePromosSelector } from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { isThemeTwoPromosUnion } from "../../../../../Store/CMS/Utils/TypeGuards";
import { MultiLangText } from "../../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { type TArrayNullable } from "../../../Model/FooterInterfaceAndTypes";

interface IPromo {
  promotion: TCms_PromoPageContentPromoListContentThemeTwo_Type_Fragment;
  className: string;
  promoHandleClick: (tagsList: TArrayNullable<string>, promoIndex: number) => void;
  promoIndex: number;
}

const CMSPromotion = memo<IPromo>(({
  promotion,
  className,
  promoHandleClick,
  promoIndex,
}) => {
  const {
    title,
    chooseTags,
  } = promotion;

  const handleClick = useCallback(() => promoHandleClick(chooseTags, promoIndex), []);

  const promos = useSelector(cmsPromoPagePromosSelector);

  const allBonusesTags = isThemeTwoPromosUnion(promos) ? promos.map(({ chooseTags }) => chooseTags).flat() : [];

  const countBonusesInPromoByTag = allBonusesTags.filter((element) => chooseTags?.includes(element)).length;

  const countBonusesInPromo = chooseTags?.length === 0 ? allBonusesTags.length : countBonusesInPromoByTag;

  return (
    <div className={className} onClick={handleClick}>
      <Text
        colorScheme={"inherit"}
        textSize={"14"}
        textGap={"24"}
        textWeight={"500"}
        className={classes.promo}
        wide
      >
        <MultiLangText className={classes.promoTitle} arr={title} />

        <div className={classes.countBonusesInPromo}>{countBonusesInPromo}</div>
      </Text>
    </div>
  );
});
CMSPromotion.displayName = "CMSPromotion";

export { CMSPromotion };
