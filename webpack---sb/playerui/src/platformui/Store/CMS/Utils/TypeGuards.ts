import type {
  TCms_BlockContent_Fragment,
  TCms_ContactUsProfileBlockCallUsContent_Type_Fragment,
  TCms_ContactUsProfileBlockContent_Union_Fragment,
  TCms_ContactUsProfileBlockEmailsContent_Type_Fragment,
  TCms_GameIdsContent_Type_Fragment,
  TCms_GameIdsWithImageContent_Type_Fragment,
  TCms_ImageWithTheme_Type_Fragment,
  TCms_LabelsListContent_Type_Fragment,
  TCms_LabelsListWithImageContent_Type_Fragment,
  TCms_MediaLink_Union_Fragment,
  TCms_MediaLinkEternalLink_Type_Fragment,
  TCms_MediaLinkExternalLink_Type_Fragment,
  TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment,
  TCms_PromoPageContentPromoWithBonusThemeTwo_Type_Fragment,
  TCms_PromoPageContentPromoWithoutBonusThemeTwo_Type_Fragment,
  TCms_PromoPageContentThemeFour_Type_Fragment,
  TCms_PromoPageContentThemeTwo_Type_Fragment,
  TCms_ThemeFive_TermsConditions_PageContent_BlockContent_Fragment,
  TCms_ThemeFour_Promotions_PageContent_BlockContent_Fragment,
  TCms_ThemeFour_TermsConditions_PageContent_BlockContent_Fragment,
  TCms_ThemeOne_Promotions_PageContent_BlockContent_Fragment,
  TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Fragment,
  TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Block_SimplePromoWithBonus_Fragment,
  TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Block_SimplePromoWithoutBonus_Fragment,
  TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Union_Fragment,
  TCms_ThemeOne_TermsConditions_pageContent_blockContent_Fragment,
  TCms_ThemeSix_TermsConditions_PageContent_BlockContent_Fragment,
  TCms_ThemeTwo_Promotions_PageContent_BlockContent_Fragment,
  TCms_ThemeTwo_TermsConditions_pageContent_blockContent_Fragment,
} from "@sb/graphql-client/CmsUI";
import { isAnyObject, isArray, isNotNil, isNotVoid, isString, type TExplicitAny, type TNullable } from "@sb/utils";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { EPageType } from "@sb/cms-core";
import { type TImage } from "../Model/CmsModel";

const isSimplePageBlockContent = (content: TNullable<TCms_BlockContent_Fragment>):
  content is TCms_ThemeOne_TermsConditions_pageContent_blockContent_Fragment
    | TCms_ThemeTwo_TermsConditions_pageContent_blockContent_Fragment =>
  isNotVoid(content) && (content.__typename.endsWith("_Info_Page_PageContent_BlockContent") ||
    content.__typename.endsWith("_TermsConditions_PageContent_BlockContent") ||
    content.__typename.endsWith("_PrivacyPolicy_PageContent_BlockContent"));

const isThemeOneSimplePageBlockContent = (content: TCms_BlockContent_Fragment | null):
  content is TCms_ThemeOne_TermsConditions_pageContent_blockContent_Fragment => isNotVoid(content) &&
  content.__typename.startsWith("ThemeOne") &&
  (content.__typename.endsWith("_Info_Page_PageContent_BlockContent") ||
    content.__typename.endsWith("_TermsConditions_PageContent_BlockContent") ||
    content.__typename.endsWith("_PrivacyPolicy_PageContent_BlockContent")
  );
// TODO Fix typeGuards, that check with __typename
const isThemeFourSimplePageBlockContent = (content: TCms_BlockContent_Fragment | null):
  content is TCms_ThemeFour_TermsConditions_PageContent_BlockContent_Fragment => isNotVoid(content) &&
  content.__typename.startsWith("ThemeFour") &&
  (content.__typename.endsWith("_Info_Page_PageContent_BlockContent") ||
    content.__typename.endsWith("_TermsConditions_PageContent_BlockContent") ||
    content.__typename.endsWith("_PrivacyPolicy_PageContent_BlockContent")
  );

const isThemeFiveSimplePageBlockContent = (content: TCms_BlockContent_Fragment | null):
  content is TCms_ThemeFive_TermsConditions_PageContent_BlockContent_Fragment => isNotVoid(content) &&
  content.__typename.startsWith("ThemeOne") &&
  (content.__typename.endsWith("_Info_Page_PageContent_BlockContent") ||
    content.__typename.endsWith("_TermsConditions_PageContent_BlockContent") ||
    content.__typename.endsWith("_PrivacyPolicy_PageContent_BlockContent")
  );

const isThemeSixSimplePageBlockContent = (content: TCms_BlockContent_Fragment | null):
  content is TCms_ThemeSix_TermsConditions_PageContent_BlockContent_Fragment => isNotVoid(content) &&
  content.__typename.startsWith("ThemeSix") &&
  (content.__typename.endsWith("_Info_Page_PageContent_BlockContent") ||
    content.__typename.endsWith("_TermsConditions_PageContent_BlockContent") ||
    content.__typename.endsWith("_PrivacyPolicy_PageContent_BlockContent")
  );

type TPromos = TCms_ThemeOne_Promotions_PageContent_BlockContent_Fragment
  | TCms_ThemeTwo_Promotions_PageContent_BlockContent_Fragment
  | TCms_ThemeFour_Promotions_PageContent_BlockContent_Fragment

const isThemeTwoPromotionPageContentContent =
  (content: unknown):
    content is TCms_PromoPageContentThemeTwo_Type_Fragment =>
    isAnyObject(content) && content.__typename === "PromoPageContentThemeTwo_Type";

const isThemeFourPromotionPageContentContent =
  (content: unknown):
    content is TCms_PromoPageContentThemeFour_Type_Fragment =>
    isAnyObject(content) && content.__typename === "PromoPageContentThemeFour_Type";

const isThemeOnePromotionPageContentContent =
  (content: unknown):
    content is TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Fragment =>
    isAnyObject(content) && content.__typename === "ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent";

const isPromotionPageBlockContent = (content: TNullable<TCms_BlockContent_Fragment>):
  content is TPromos =>
  isNotVoid(content) && content.__typename.endsWith("Promotions_PageContent_BlockContent");

const isPromotionPageBlockContentThemeFour = (content: unknown):
  content is TCms_PromoPageContentThemeFour_Type_Fragment =>
  isAnyObject(content) && content.__typename === "PromoPageContentThemeFour_Type";

const isContactUsCallsList = (content: TCms_ContactUsProfileBlockContent_Union_Fragment)
  : content is TCms_ContactUsProfileBlockCallUsContent_Type_Fragment =>
  isNotNil(content) && content._HIDDEN_FIELD_ === "callUsContent";

const isContactUsEmailsList = (content: TCms_ContactUsProfileBlockContent_Union_Fragment)
  : content is TCms_ContactUsProfileBlockEmailsContent_Type_Fragment =>
  isNotNil(content) && content._HIDDEN_FIELD_ === "emailsContent";

const isThemeTwoSimplePromoWithBonus =
  (bonus: unknown): bonus is
    TCms_PromoPageContentPromoWithBonusThemeTwo_Type_Fragment =>
    isAnyObject(bonus) &&
    bonus._HIDDEN_FIELD_ ===
    "Block_simplePromoWithBonusThemeTwo";

const isThemeTwoSimplePromoWithoutBonus =
  (bonus: unknown): bonus is
    TCms_PromoPageContentPromoWithoutBonusThemeTwo_Type_Fragment =>
    isAnyObject(bonus) &&
    bonus._HIDDEN_FIELD_ ===
    "Block_simplePromoWithoutBonusThemeTwo";

const isObjectWithTypename = (candidate: unknown): candidate is {
  __typename: string;
} => isAnyObject(candidate) && "__typename" in candidate;

const isThemeOnePromosUnion =
  (promos: unknown): promos is TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Union_Fragment[] =>
    isNotVoid(promos) && isArray(promos) && promos.every(
      (promo) =>
        isObjectWithTypename(promo) && promo.__typename.startsWith("ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos"),
    );

const isThemeTwoPromosUnion =
  (promos: unknown): promos is TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment[] =>
    isNotVoid(promos) && isArray(promos) && promos.map((it) => it) && promos.every(
      (promo) => isObjectWithTypename(promo) && promo.__typename.startsWith("PromoPageContentPromo"),
    );
const isBetOrSpinSimplePromoWithBonus =
  (bonus: TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Union_Fragment)
    : bonus is TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Block_SimplePromoWithBonus_Fragment =>
    bonus._HIDDEN_FIELD_ === "Block_simplePromoWithBonus";

const isBetOrSpinSimplePromoWithoutBonus =
  (type: TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Union_Fragment)
    : type is
    TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Block_SimplePromoWithoutBonus_Fragment =>
    type._HIDDEN_FIELD_ === "Block_simplePromoWithoutBonus";

const isTTranslateRecordFragment = (content: TExplicitAny): content is TTranslateRecord_Fragment[] =>
  isArray(content) && content.every((it) => isAnyObject(it) && "locale" in it && "translate" in it && isString(it.locale) && isString(it.translate));

const isFooterPageType = (type: string): type is EPageType.childInfoPage | EPageType.termsPage | EPageType.privacyPage =>
  type === EPageType.childInfoPage || type === EPageType.termsPage || type === EPageType.privacyPage;

const isThemeImage = (candidate: TNullable<TImage>): candidate is TCms_ImageWithTheme_Type_Fragment =>
  isAnyObject(candidate) && ("dark" in candidate || "light" in candidate);

const isCmsGamesMap = (candidate: unknown): candidate is TCms_GameIdsContent_Type_Fragment =>
  isAnyObject(candidate) && candidate.__typename === "GameIdsContent_Type";

const isCmsGamesWithImageMap = (candidate: unknown): candidate is TCms_GameIdsWithImageContent_Type_Fragment =>
  isAnyObject(candidate) && candidate.__typename === "GameIdsWithImageContent_Type";

const isCmsLabelMap = (candidate: unknown): candidate is TCms_LabelsListContent_Type_Fragment =>
  isAnyObject(candidate) && candidate.__typename === "LabelsListContent_Type";

const isCmsLabelWithImageMap = (candidate: unknown): candidate is TCms_LabelsListWithImageContent_Type_Fragment =>
  isAnyObject(candidate) && candidate.__typename === "LabelsListWithImageContent_Type";

const isEternalMediaLink = (candidate: TNullable<TCms_MediaLink_Union_Fragment>): candidate is TCms_MediaLinkEternalLink_Type_Fragment =>
  candidate?.__typename === "MediaLinkEternalLink_Type";

const isExternalMediaLink = (candidate: TNullable<TCms_MediaLink_Union_Fragment>): candidate is TCms_MediaLinkExternalLink_Type_Fragment =>
  candidate?.__typename === "MediaLinkExternalLink_Type";

export {
  isExternalMediaLink,
  isEternalMediaLink,
  isThemeSixSimplePageBlockContent,
  isCmsGamesMap,
  isCmsGamesWithImageMap,
  isCmsLabelMap,
  isCmsLabelWithImageMap,
  isThemeImage,
  isThemeFiveSimplePageBlockContent,
  isThemeFourPromotionPageContentContent,
  isPromotionPageBlockContentThemeFour,
  isThemeFourSimplePageBlockContent,
  isThemeOnePromosUnion,
  isThemeTwoPromosUnion,
  isPromotionPageBlockContent,
  isFooterPageType,
  isTTranslateRecordFragment,
  isThemeTwoSimplePromoWithBonus,
  isThemeTwoSimplePromoWithoutBonus,
  isThemeOnePromotionPageContentContent,
  isThemeOneSimplePageBlockContent,
  isBetOrSpinSimplePromoWithoutBonus,
  isBetOrSpinSimplePromoWithBonus,
  isContactUsCallsList,
  isContactUsEmailsList,
  isSimplePageBlockContent,
  isThemeTwoPromotionPageContentContent,
};
