import { type FC, memo, type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { clsx } from "clsx";
import { getNotNil, isNil, type TVoidFn, useActionWithBind, useParamSelector, usePersistCallback } from "@sb/utils";
import { loggedSelector } from "@sb/auth";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_ourPromotions,
  platformui_starzbet_promotions_goToBonuses,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import type {
  TCms_ImageWithTheme_Type_Fragment,
  TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment,
  TCms_PromoPageContentPromoWithBonusThemeTwo_Type_Fragment,
  TCms_PromoPageContentPromoWithoutBonusThemeTwo_Type_Fragment,
} from "@sb/graphql-client/CmsUI";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./CMSBonusModalInfo.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Ellipsis } from "../../../../../../sportsbookui/Components/Ellipsis/Ellipsis";
import { Text } from "../../../../../../common/Themes/Starzbet/Components/Text/Text";
import { Space } from "../../../../../../common/Components/Space/Space";
import { Link } from "../../../../../../common/Themes/Starzbet/Components/Link/Link";
import { CloseDefaultIcon, CloseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { ArrowLeftIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowLeftIcon";
import { useModalCloseAction } from "../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { Scrollbar } from "../../../../../../common/Components/Scrollbar/Scrollbar";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { bonusForCMSByIdSelector } from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import {
  isThemeTwoSimplePromoWithBonus,
  isThemeTwoSimplePromoWithoutBonus,
  isTTranslateRecordFragment,
} from "../../../../../Store/CMS/Utils/TypeGuards";
import { BonusTemplateCMS } from "../../../../../Components/BonusTemplate/BonusTemplate";
import { InlineMultiLangText } from "../../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { TextEditor } from "../../../../../Components/CMSComponents/CMSText/TextEditor/TextEditor";
import { useGetBonusInfo } from "../../../../../Hooks/UseCorrectTextByLocale";
import { cmsPromotionPageActivePromoAction } from "../../../../../Store/CMS/CMSAction";
import {
  CMSCorrectActivePromoSelector,
  CMSPromoByIndexSelector,
  isFirstPromoSelector,
  isLastPromoSelector,
} from "../../../Store/CMS/Selectors/CMSPromoSelectors";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalBody } from "../../ThemedModal/ThemedModalBody/ThemedModalBody";
import { ArrowDownIcon } from "../../Icons/ArrowIcon/ArrowDownIcon";
import { CMSPromoImage, CMSPromoMobileImage } from "../CMSPromoImage/CMSPromoImage";
import { BonusesButton } from "../BonusesButton/BonusesButton";

interface IBonus<Bonus extends TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment
  = TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment> {
  hideModal?: TVoidFn;
  bonus: Bonus;
}

const CMSPromoContent: FC<PropsWithChildren> = ({ children }) => IS_MOBILE_CLIENT_SIDE
  ? <div className={classes.promoContent}>{children}</div>
  : (
    <Scrollbar
      width={4}
      {...qaAttr(PlayerUIQaAttributes.PromoPage.PromoTextContent)}
      background={"color-4"}
    >
      <div className={classes.promoContent}>{children}</div>
    </Scrollbar>
  );
CMSPromoContent.displayName = "CMSPromoContent";

interface IImage {
  image: TCms_ImageWithTheme_Type_Fragment | null;
}

const Image = memo<IImage>(({ image }) => (
  <div className={classes.imgWrapper}>
    {
      IS_MOBILE_CLIENT_SIDE
        ? <CMSPromoMobileImage image={image} margins={42} className={classes.bonusModalImage} />
        : <CMSPromoImage className={classes.bonusModalImage} image={image} height={229} />
    }
  </div>
));
Image.displayName = "Image";

const CMSSimplePromoWithBonusContent =
  memo<
    IBonus<
      TCms_PromoPageContentPromoWithBonusThemeTwo_Type_Fragment
    >
  >(
    ({ bonus }) => {
      const {
        bonusId,
        image,
      } = bonus;

      const closeModal = useModalCloseAction(EModal.cmsPromo);

      const id = getNotNil(bonusId, ["CMSSimplePromoWithBonus"], "bonusId");

      const playerLogged = useSelector(loggedSelector);

      const routeToBonus = IS_MOBILE_CLIENT_SIDE
        ? { to: routeMap.availableBonusesRoute }
        : { to: routeMap.availableBonusRoute, params: { id } };

      const path = playerLogged ? routeToBonus : { to: routeMap.loginRoute };

      const [t] = useTranslation();

      const bonusInfo = useParamSelector(bonusForCMSByIdSelector, [id]);

      const { correctName } = getNotNil(useGetBonusInfo(bonusInfo), ["CMSSimplePromoWithBonusContent"], "bonusContent");

      const rules = getNotNil(bonusInfo, ["CMSSimplePromoWithBonus"], "descriptionBonusRules").descriptionBonusRules;

      return (
        <Space
          value={24}
          vertical
          className={classes.bonusModalWrapper}
          {...qaAttr(PlayerUIQaAttributes.PromoPage.PromoModalContent)}
        >
          <Image image={image} />

          <Text
            colorScheme={"text"}
            textSize={"24"}
            textGap={"32"}
            textWeight={"500"}
            textAlign={"center"}
            wide
            noWrap
          >
            <Ellipsis>{correctName}</Ellipsis>
          </Text>

          <CMSPromoContent>
            <Text
              colorScheme={"text"}
              textSize={"16"}
              textGap={"24"}
              textWeight={"400"}
            >
              <BonusTemplateCMS bonusId={id} note={isTTranslateRecordFragment(rules) ? rules : null} />
            </Text>
          </CMSPromoContent>

          <Link
            wide
            colorScheme={"grey"}
            onClick={closeModal}
            {...path}
            className={classes.button}
          >
            <Text
              noWrap
              colorScheme={"grey-text"}
              textSize={"14"}
              textGap={"24"}
              textWeight={"500"}
              capitalize
            >
              <Ellipsis>{t(platformui_starzbet_promotions_goToBonuses)}</Ellipsis>
            </Text>
          </Link>
        </Space>
      );
    },
  );
CMSSimplePromoWithBonusContent.displayName = "CMSSimplePromoWithBonusContent";

const CMSSimplePromoWithBonus =
  memo<
    IBonus<
      TCms_PromoPageContentPromoWithBonusThemeTwo_Type_Fragment
    >
  >(
    ({ bonus }) => {
      const {
        bonusId,
      } = bonus;

      const id = getNotNil(bonusId, ["CMSSimplePromoWithBonus"], "bonusId");

      const bonusInfo = useParamSelector(bonusForCMSByIdSelector, [id]);

      const bonusContent = useGetBonusInfo(bonusInfo);

      if (isNil(bonusContent)) {
        return null;
      }

      return <CMSSimplePromoWithBonusContent bonus={bonus} />;
    },
  );
CMSSimplePromoWithBonus.displayName = "CMSSimplePromoWithBonus";

const CMSSimplePromoWithoutBonus =
  memo<
    IBonus<
      TCms_PromoPageContentPromoWithoutBonusThemeTwo_Type_Fragment
    >
  >(
    ({ bonus }) => {
      const {
        bonusContent,
        goToLink,
        goToButtonText,
        image,
      } = bonus;

      const closeModal = useModalCloseAction(EModal.cmsPromo);

      return (
        <Space
          value={24}
          vertical
          className={classes.bonusModalWrapper}
          {...qaAttr(PlayerUIQaAttributes.PromoPage.PromoModalContent)}
        >
          <div className={classes.imgWrapper}>
            {
              IS_MOBILE_CLIENT_SIDE
                ? <CMSPromoMobileImage image={image} margins={42} className={classes.bonusModalImage} />
                : <CMSPromoImage className={classes.bonusModalImage} image={image} height={IS_MOBILE_CLIENT_SIDE ? 171 : 229} />
            }
          </div>

          <CMSPromoContent>
            <Text
              colorScheme={"text"}
              textSize={"16"}
              textGap={"24"}
              textWeight={"400"}
            >
              <TextEditor textEditor={bonusContent} />
            </Text>
          </CMSPromoContent>

          <BonusesButton className={classes.link} onClick={closeModal} to={goToLink}>
            <Text
              noWrap
              colorScheme={"grey-text"}
              textSize={"14"}
              textGap={"24"}
              textWeight={"500"}
              capitalize
            >
              <InlineMultiLangText arr={goToButtonText} />
            </Text>
          </BonusesButton>
        </Space>
      );
    },
  );
CMSSimplePromoWithoutBonus.displayName = "CMSSimplePromoWithoutBonus";

const ModalWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [t] = useTranslation();

  const hide = useModalCloseAction(EModal.cmsPromo);

  const index = getNotNil(useSelector(CMSCorrectActivePromoSelector), ["CMSModalWrapper"], "index");

  const removeActivePromo = useActionWithBind(cmsPromotionPageActivePromoAction, null);

  const hideModal = usePersistCallback(() => {
    hide && hide();
    removeActivePromo();
  });

  const isLastPromo = useSelector(isLastPromoSelector);

  const isFirstPromo = useSelector(isFirstPromoSelector);

  const nextPromo = useActionWithBind(cmsPromotionPageActivePromoAction, index + 1);

  const prevPromo = useActionWithBind(cmsPromotionPageActivePromoAction, index - 1);

  const Content = memo(() => (
    <>
      {
        IS_MOBILE_CLIENT_SIDE
          ? (
            <div className={classes.header}>
              <ArrowDownIcon onClick={hideModal} size={"m"} className={classes.arrowIcon} />

              <Text
                colorScheme={"text"}
                textSize={"16"}
                textGap={"16"}
                textWeight={"500"}
                className={classes.headerText}
                capitalize
              >
                {t(platformui_starzbet_ourPromotions)}
              </Text>

              <CloseIcon
                width={12}
                height={12}
                onClick={hideModal}
              />
            </div>
          )
          : (
            <CloseDefaultIcon
              onClick={hideModal}
              color={"text"}
              className={classes.closeIcon}
              size={"xs"}
              {...qaAttr(PlayerUIQaAttributes.Modal.CloseButton)}
            />
          )

      }

      <ThemedModalBody className={classes.body}>
        {children}
      </ThemedModalBody>
    </>
  ));
  Content.displayName = "Content";

  return (
    <ThemedModal className={classes.modalWrapper} onCancel={hideModal}>
      {
        isFirstPromo
          ? null
          : (
            <ArrowLeftIcon
              color={"white"}
              size={"m"}
              onClick={prevPromo}
              className={clsx(classes.arrow, classes.arrowLeft)}
            />
          )
      }

      <Content />

      {
        isLastPromo
          ? null
          : (
            <ArrowLeftIcon
              color={"white"}
              size={"m"}
              onClick={nextPromo}
              className={clsx(classes.arrow, classes.arrowRight)}
            />
          )
      }
    </ThemedModal>
  );
};
ModalWrapper.displayName = "ModalWrapper";

const CMSBonusModalInfo = memo(() => {
  const bonus = useSelector(CMSPromoByIndexSelector);
  if (isThemeTwoSimplePromoWithBonus(bonus)) {
    return (
      <ModalWrapper>
        <CMSSimplePromoWithBonus bonus={bonus} />
      </ModalWrapper>
    );
  }

  if (isThemeTwoSimplePromoWithoutBonus(bonus)) {
    return (
      <ModalWrapper>
        <CMSSimplePromoWithoutBonus bonus={bonus} />
      </ModalWrapper>
    );
  }

  return null;
});
CMSBonusModalInfo.displayName = "CMSBonusModalInfo";

export { CMSBonusModalInfo };
