import {
  cmsui_block_constant_promo_promoList,
  cmsui_block_constant_promo_promos,
  cmsui_block_constant_promo_promotionPageContent,
  cmsui_block_title_banner,
  cmsui_general_action_link,
  cmsui_general_action_uploadImage,
  cmsui_general_apk,
  cmsui_general_application,
  cmsui_general_applications,
  cmsui_general_backgroundImage,
  cmsui_general_becomePartnerButton,
  cmsui_general_block,
  cmsui_general_blockWithLink,
  cmsui_general_buttonName,
  cmsui_general_callUs,
  cmsui_general_callUsContent,
  cmsui_general_callUsList,
  cmsui_general_cardList,
  cmsui_general_chooseColor,
  cmsui_general_commissionCardType,
  cmsui_general_contactInfo,
  cmsui_general_contactInfoGroup,
  cmsui_general_contactInfoList,
  cmsui_general_contactTitle,
  cmsui_general_contactUs,
  cmsui_general_contactUsContent,
  cmsui_general_crypto,
  cmsui_general_cryptoBlock,
  cmsui_general_cryptos,
  cmsui_general_ctaTitle,
  cmsui_general_description,
  cmsui_general_duration,
  cmsui_general_email,
  cmsui_general_emails,
  cmsui_general_emailsContent,
  cmsui_general_faq,
  cmsui_general_fifteenSec,
  cmsui_general_fiveSec,
  cmsui_general_gameImage,
  cmsui_general_gameProvidersList,
  cmsui_general_games,
  cmsui_general_header,
  cmsui_general_highlightColour,
  cmsui_general_highlights,
  cmsui_general_image,
  cmsui_general_imageInput,
  cmsui_general_label,
  cmsui_general_labelOrGames,
  cmsui_general_levelTitle,
  cmsui_general_licenceBlock,
  cmsui_general_linkList,
  cmsui_general_linkListMap,
  cmsui_general_linkName,
  cmsui_general_linksBlock,
  cmsui_general_listWithLabels,
  cmsui_general_listWithLabelsOrGames,
  cmsui_general_logoImage,
  cmsui_general_logoWithSocialLinks,
  cmsui_general_mainTitle,
  cmsui_general_mediaLinkWrapper,
  cmsui_general_metaTagContent,
  cmsui_general_metaTagContentList,
  cmsui_general_method,
  cmsui_general_methodWithLink,
  cmsui_general_methodWithLinkDescription,
  cmsui_general_methodWithoutLink,
  cmsui_general_methodWithoutLinkDescription,
  cmsui_general_networkIcon,
  cmsui_general_networkTitle,
  cmsui_general_pageTitle,
  cmsui_general_paymentMethod,
  cmsui_general_paymentMethodsList,
  cmsui_general_payments,
  cmsui_general_percentTitle,
  cmsui_general_phoneNumber,
  cmsui_general_placeholder_choosePeriod,
  cmsui_general_preview,
  cmsui_general_provider,
  cmsui_general_providers,
  cmsui_general_providerWithLink,
  cmsui_general_providerWithoutLink,
  cmsui_general_rangeTitle,
  cmsui_general_responsibleGambling,
  cmsui_general_responsibleGamblingList,
  cmsui_general_richText,
  cmsui_general_sectionWithLicense,
  cmsui_general_sectionWithLink,
  cmsui_general_sentenceOne,
  cmsui_general_sentenceTwo,
  cmsui_general_simplePageContent,
  cmsui_general_simplePageContentList,
  cmsui_general_socialLink,
  cmsui_general_socialLinksList,
  cmsui_general_stories,
  cmsui_general_tags,
  cmsui_general_tenSec,
  cmsui_general_testBlockOne,
  cmsui_general_testBlockTwo,
  cmsui_general_testListOne,
  cmsui_general_testListThree,
  cmsui_general_testListTwo,
  cmsui_general_textEditor,
  cmsui_general_title,
  cmsui_general_url,
  cmsui_general_vipTables,
  cmsui_puiPage_title_bingo,
  cmsui_puiPage_title_casino,
  cmsui_puiPage_title_eSportsLive,
  cmsui_puiPage_title_eSportsPrelive,
  cmsui_puiPage_title_games,
  cmsui_puiPage_title_home,
  cmsui_puiPage_title_liveCasino,
  cmsui_puiPage_title_promos,
  cmsui_puiPage_title_sportsLive,
  cmsui_puiPage_title_sportsPrelive,
  cmsui_puiPage_title_vipClub,
  type TKey,
} from "@sb/translates/cmsui/Keys";
import { BLOCK_TYPE, VARIABLES, VERSION } from "../../Constants";
import { EAffiliateBlockMap, EGqlIds, EPageType, EPlatformBlockMap, ERootPages } from "../../EnumTypes";
import { type TAffiliateTaxonomy, type TThemeSixTaxonomy, type TThemeTaxonomy, type TThemeWithoutLandingTaxonomy } from "../../Types";
import {
  apk,
  colorPicker,
  commissionCardType,
  faq,
  fileField,
  gameLabel,
  gameLabelWithImage,
  games,
  gamesWithImage,
  image,
  imageWithTheme,
  licence,
  linksBlock,
  phone,
  promo,
  promoWithoutImage,
  richText,
  select,
  simplePromoWithBonus,
  simplePromoWithBonusThemeTwo,
  simplePromoWithoutBonus,
  simplePromoWithoutBonusThemeTwo,
  simpleText,
  tag,
  textArea,
  textAreaWithVariables,
  textEditor,
  variablesTable,
} from "../../Components/SimpleComponent";
import {
  blockBuilder,
  childPageBuilder,
  groupBlock,
  listBlock,
  listPage,
  oneOfBlock,
  oneOfGroup,
  pageBuilder,
  simplePage,
  staticPage,
} from "./TaxonomyCreatorHelpers";

const META_CONTENT = [
  listBlock({
    title: cmsui_general_metaTagContentList,
    block: groupBlock(
      cmsui_general_metaTagContent,
      [
        simpleText({ required: true, withoutWrapper: false, listChild: true }),
        textAreaWithVariables( { blockTitle: cmsui_general_description, required: true }),
      ],
      {
        canDisabled: false,
        enumCode: EGqlIds.NOOP,
      },
    ),
    isHiddenTitle: false,
    maxCount: 500,
  }),
];

const SIMPLE_BLOCKS_MAP = [
  groupBlock(
    cmsui_general_simplePageContent,
    [
      textAreaWithVariables({ blockTitle: cmsui_general_pageTitle  }),
      textAreaWithVariables({ blockTitle: cmsui_general_title  }),
      imageWithTheme({ blockTitle: cmsui_general_backgroundImage  }),
      imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
      imageWithTheme({ blockTitle: cmsui_general_gameImage  }),
      textEditor({ blockTitle: cmsui_general_textEditor  }),
      listBlock(
        {
          title: cmsui_general_simplePageContentList,
          block: faq({ blockTitle: cmsui_general_faq  }),
          maxCount: 500,
        },
        {
          canDisabled: false,
          enumCode: EGqlIds.SIMPLE_PAGE_CONTENT_LIST,
        },
      ),
    ],
    { canDisabled: false, enumCode: EGqlIds.SIMPLE_PAGE_CONTENT_THEME_ONE },
  ),
];

const SIMPLE_BLOCKS_MAP_THEME_FOUR = [
  groupBlock(
    cmsui_general_simplePageContent,
    [
      textAreaWithVariables({ blockTitle: cmsui_general_pageTitle  }),
      textAreaWithVariables({ blockTitle: cmsui_general_title  }),
      imageWithTheme({ blockTitle: cmsui_general_backgroundImage  }),
      textEditor({ blockTitle: cmsui_general_textEditor  }),
      listBlock(
        {
          title: cmsui_general_simplePageContentList,
          block: faq({ blockTitle: cmsui_general_faq  }),
          maxCount: 500,
        },
        {
          canDisabled: false,
          enumCode: EGqlIds.SIMPLE_PAGE_CONTENT_LIST,
        },
      ),
    ],
    { canDisabled: false, enumCode: EGqlIds.SIMPLE_PAGE_CONTENT_THEME_FOUR },
  ),
];

const SIMPLE_BLOCKS_MAP_THEME_SIX = [
  groupBlock(
    cmsui_general_simplePageContent,
    [
      textAreaWithVariables({ blockTitle: cmsui_general_pageTitle  }),
      image({ blockTitle: cmsui_general_logoImage  }),
      image({ blockTitle: cmsui_general_logoImage  }),
      textEditor({ blockTitle: cmsui_general_textEditor  }),
      listBlock(
        {
          title: cmsui_general_simplePageContentList,
          block: faq({ blockTitle: cmsui_general_faq  }),
          maxCount: 500,
        },
        {
          canDisabled: false,
          enumCode: EGqlIds.SIMPLE_PAGE_CONTENT_LIST,
        },
      ),
    ],
    { canDisabled: false, enumCode: EGqlIds.NOOP },
  ),
];

const PROMOTION_BLOCK_MAP = [
  groupBlock(
    cmsui_block_constant_promo_promotionPageContent,
    [
      textAreaWithVariables({ blockTitle: cmsui_general_pageTitle  }),
      listBlock(
        {
          title: cmsui_general_tags,
          block: tag({ withoutWrapper: false, listChild: true }),
          maxCount: 100,
          isNotDraggableChild: true,
        },
        {
          canDisabled: false,
          enumCode: EGqlIds.PROMO_TAGS_LIST,
        },
      ),
      listBlock({
        title: cmsui_block_constant_promo_promoList,
        block: promo({ withoutWrapper: false, listChild: true }),
        maxCount: 100,
      }),
      listBlock({
        title: cmsui_block_constant_promo_promos,
        maxCount: 100,
        block: oneOfBlock(
          [
            simplePromoWithBonus({ withoutWrapper: false, listChild: true }),
            simplePromoWithoutBonus({ withoutWrapper: false, listChild: true }),
          ],
        ),
      }),
    ],
  ),
];

const PROMOTION_BLOCK_MAP_THEME_TWO = [
  groupBlock(
    cmsui_block_constant_promo_promotionPageContent,
    [
      textAreaWithVariables({ blockTitle: cmsui_general_pageTitle  }),
      listBlock(
        {
          title: cmsui_general_tags,
          block: tag({ withoutWrapper: false, listChild: true }),
          maxCount: 100,
          isNotDraggableChild: true,
        },
        {
          canDisabled: false,
          enumCode: EGqlIds.PROMO_TAGS_LIST,
        },
      ),
      listBlock({
        title: cmsui_block_constant_promo_promoList,
        block: promoWithoutImage({ withoutWrapper: false, listChild: true }),
        maxCount: 100,
      }),
      listBlock({
        title: cmsui_block_constant_promo_promos,
        maxCount: 100,
        block: oneOfBlock(
          [
            simplePromoWithBonusThemeTwo({ withoutWrapper: false, listChild: true }),
            simplePromoWithoutBonusThemeTwo({ withoutWrapper: false, listChild: true }),
          ],
        ),
      }),
    ],
    { canDisabled: false, enumCode: EGqlIds.PROMO_PAGE_CONTENT_THEME_TWO },
  ),
];

const PROMOTION_BLOCK_MAP_THEME_FOUR = [
  groupBlock(
    cmsui_block_constant_promo_promotionPageContent,
    [
      textAreaWithVariables({ blockTitle: cmsui_general_pageTitle  }),
      listBlock(
        {
          title: cmsui_general_tags,
          block: tag({ withoutWrapper: false, listChild: true }),
          maxCount: 100,
          isNotDraggableChild: true,
        },
        {
          canDisabled: false,
          enumCode: EGqlIds.PROMO_TAGS_LIST,
        },
      ),
      listBlock({
        title: cmsui_block_constant_promo_promoList,
        block: promo({ withoutWrapper: false, listChild: true }),
        maxCount: 100,
      }),
      listBlock({
        title: cmsui_block_constant_promo_promos,
        maxCount: 100,
        block: oneOfBlock(
          [
            simplePromoWithBonusThemeTwo({ withoutWrapper: false, listChild: true }),
            simplePromoWithoutBonusThemeTwo({ withoutWrapper: false, listChild: true }),
          ],
        ),
      }),
    ],
    { canDisabled: false, enumCode: EGqlIds.PROMO_PAGE_CONTENT_THEME_FOUR },
  ),
];

const affiliateTaxonomy = (): TAffiliateTaxonomy => ({
  [VARIABLES]: [
    variablesTable({ required: true, withoutWrapper: false, listChild: true }),
  ],
  [BLOCK_TYPE]: {
    [EAffiliateBlockMap.SLIDER]: blockBuilder(
      4,
      true,
      [
        listBlock({
          title: cmsui_general_cardList,
          maxCount: 100,
          block: groupBlock(
            cmsui_general_block,
            [
              textAreaWithVariables({ blockTitle: cmsui_general_header  }),
              textAreaWithVariables({ blockTitle: cmsui_general_title  }),
              textAreaWithVariables({ blockTitle: cmsui_general_ctaTitle  }),
              simpleText({ blockTitle: cmsui_general_action_link  }),
              image({ blockTitle: cmsui_general_backgroundImage  }),
            ],
          ),
        }),
      ],
    ),
    [EAffiliateBlockMap.CHOOSE]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_mainTitle  }),
        listBlock({
          title: cmsui_general_cardList,
          maxCount: 100,
          block: groupBlock(
            cmsui_general_block,
            [
              textAreaWithVariables({ blockTitle: cmsui_general_title  }),
              textAreaWithVariables({ blockTitle: cmsui_general_description  }),
              image({ blockTitle: cmsui_general_logoImage  }),
            ],
          ),
        }),
        textAreaWithVariables({ blockTitle: cmsui_general_becomePartnerButton  }),
      ],
    ),
    [EAffiliateBlockMap.COMMISSIONS]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_mainTitle  }),
        textAreaWithVariables({ blockTitle: cmsui_general_sentenceOne  }),
        textAreaWithVariables({ blockTitle: cmsui_general_sentenceTwo  }),
        listBlock({
          title: cmsui_general_cardList,
          maxCount: 100,
          block: groupBlock(
            cmsui_general_block,
            [
              textAreaWithVariables({ blockTitle: cmsui_general_levelTitle  }),
              simpleText({ blockTitle: cmsui_general_percentTitle  }),
              simpleText({ blockTitle: cmsui_general_rangeTitle  }),
              commissionCardType({ blockTitle: cmsui_general_commissionCardType  }),
            ],
          ),
        }),
        textAreaWithVariables({ blockTitle: cmsui_general_becomePartnerButton  }),
      ],
    ),
    [EAffiliateBlockMap.CONTACTS]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_mainTitle  }),
        textAreaWithVariables({ blockTitle: cmsui_general_sentenceOne  }),
        textAreaWithVariables({ blockTitle: cmsui_general_sentenceTwo  }),
        listBlock({
          title: cmsui_general_cardList,
          maxCount: 100,
          block: groupBlock(
            cmsui_general_block,
            [
              simpleText({ blockTitle: cmsui_general_networkTitle  }),
              simpleText({ blockTitle: cmsui_general_contactTitle  }),
              image({ blockTitle: cmsui_general_networkIcon  }),
              simpleText({ blockTitle: cmsui_general_linkName  }),
            ],
          ),
        }),
      ],
    ),
    [EAffiliateBlockMap.TERMS_CONDITIONS]: blockBuilder(
      6,
      true,
      [
        textEditor({ blockTitle: cmsui_general_textEditor  }),
      ],
    ),
  },
});

// It's DSL that description our cms structure
const betOrSpinPlatformTaxonomy = (): TThemeTaxonomy => ({

  pages: pageBuilder({
    static: {
      [ERootPages.infoPageName]: staticPage({
        [VERSION]: 13,
        title: "Info",
        pageType: EPageType.infoPage,
        childPage: childPageBuilder({
          dynamic: listPage({
            maxCount: 30,
            page: simplePage({
              [VERSION]: 13,
              blocksMap: SIMPLE_BLOCKS_MAP,
              pageType: EPageType.childInfoPage,
            }),
          }),
        }),
      }),
      [ERootPages.termsConditionsPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 13,
        title: "Terms Conditions",
        pageType: EPageType.termsPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.privacyPolicyPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 13,
        title: "Privacy Policy",
        pageType: EPageType.privacyPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.promotionsPageName]: staticPage({
        [VERSION]: 17,
        title: "Promotions",
        pageType: EPageType.promoPage,
        blocksMap: PROMOTION_BLOCK_MAP,
        metaContent: META_CONTENT,
      }),
    },
  }),
  [VARIABLES]: [
    variablesTable({ required: true, withoutWrapper: false, listChild: true }),
  ],
  [BLOCK_TYPE]: {
    [EPlatformBlockMap.LANDING]: blockBuilder(
      1,
      true,
      [
        listBlock(
          {
            title: cmsui_general_listWithLabelsOrGames,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_listWithLabels,
              [
                listBlock(
                  {
                    title: cmsui_general_labelOrGames,
                    maxCount: 1,
                    block: oneOfBlock([
                      gamesWithImage({
                        required: true,
                        blockTitle: cmsui_general_games,
                        listChild: true,
                      }),
                      gameLabelWithImage({
                        required: true,
                        blockTitle: cmsui_general_label,
                        listChild: true,
                      }),
                    ]),
                  },
                ),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LABELS_WITH_IMAGE_LIST_WRAPPER,
          },
        ),
      ],
    ),
    [EPlatformBlockMap.FOOTER]: blockBuilder(
      10,
      true,
      [
        groupBlock(
          cmsui_general_payments,
          [
            groupBlock(
              cmsui_general_cryptoBlock,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock(
                  {
                    title: cmsui_general_cryptos,
                    maxCount: 5,
                    block: groupBlock(
                      cmsui_general_crypto,
                      [
                        imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                        simpleText({ blockTitle: cmsui_general_action_link  }),
                      ],
                    ),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
                  },
                ),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,
              },
            ),
            listBlock(
              {
                title: cmsui_general_paymentMethodsList,
                maxCount: 100,
                block: oneOfGroup([
                  groupBlock(
                    cmsui_general_methodWithLink,
                    [
                      imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                      linksBlock({
                        blockTitle: cmsui_general_mediaLinkWrapper,
                        withoutWrapper: false,
                      }),
                    ],
                    {
                      canDisabled: false,
                      enumCode: EGqlIds.NOOP,
                      oneOfDescription: cmsui_general_methodWithLinkDescription,
                    },
                  ),
                  groupBlock(
                    cmsui_general_methodWithoutLink,
                    [
                      imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                    ],
                    {
                      canDisabled: false,
                      enumCode: EGqlIds.NOOP,
                      oneOfDescription: cmsui_general_methodWithoutLinkDescription,
                    },
                  ),
                ]),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.IMAGE_WITH_OR_WITHOUT_MEDIA_LINK,
              },
            ),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,
          },
        ),
        listBlock(
          {
            title: cmsui_general_gameProvidersList,
            maxCount: 100,
            block: oneOfGroup([
              groupBlock(
                cmsui_general_providerWithLink,
                [
                  imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                  linksBlock({
                    blockTitle: cmsui_general_mediaLinkWrapper,
                    withoutWrapper: false,
                  }),
                ],
                {
                  canDisabled: false,
                  enumCode: EGqlIds.NOOP,
                  oneOfDescription: cmsui_general_methodWithLinkDescription,
                },
              ),
              groupBlock(
                cmsui_general_providerWithoutLink,
                [
                  imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                ],
                {
                  canDisabled: false,
                  enumCode: EGqlIds.NOOP,
                  oneOfDescription: cmsui_general_methodWithLinkDescription,

                },
              ),
            ]),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.IMAGE_WITH_OR_WITHOUT_MEDIA_LINK,
          },
        ),
        groupBlock(
          cmsui_general_sectionWithLink,
          [
            groupBlock(
              cmsui_general_contactUs,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                textAreaWithVariables({ blockTitle: cmsui_general_description  }),
                listBlock(
                  {
                    title: cmsui_general_socialLinksList,
                    maxCount: 5,
                    block: groupBlock(
                      cmsui_general_socialLink,
                      [
                        imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                        simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
                      ],
                    ),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
                  },
                ),
              ],
            ),
            listBlock(
              {
                title: cmsui_general_linkListMap,
                maxCount: 30,
                block: groupBlock(
                  cmsui_general_blockWithLink,
                  [
                    textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
                    listBlock(
                      {
                        title: cmsui_general_linkList,
                        maxCount: 30,
                        block: linksBlock({ withoutWrapper: false, listChild: true }),
                      },
                      {
                        canDisabled: false,
                        enumCode: EGqlIds.LINKS_BLOCK_LIST,
                      },
                    ),
                  ],
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.NOOP,
                  },
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LINKS_BLOCK_LIST_WITH_TITLE,
              },
            ),
            groupBlock(
              cmsui_general_cryptoBlock,
              [
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_applications,
                  maxCount: 2,
                  block: groupBlock(
                    cmsui_general_application,
                    [
                      imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                      textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                      textAreaWithVariables({ blockTitle: cmsui_general_description  }),
                      simpleText({ blockTitle: cmsui_general_action_link  }),
                      apk({ blockTitle: cmsui_general_apk  }),
                    ],
                  ),
                }),
                textAreaWithVariables({ blockTitle: cmsui_general_description  }),
                listBlock(
                  {
                    title: cmsui_general_cryptos,
                    maxCount: 5,
                    block: groupBlock(
                      cmsui_general_crypto,
                      [
                        imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                        simpleText({ blockTitle: cmsui_general_action_link  }),
                      ],
                    ),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
                  },
                ),
              ],
            ),
          ],
        ),
        groupBlock(
          cmsui_general_sectionWithLicense,
          [
            licence({ blockTitle: cmsui_general_licenceBlock  }),
            image({ blockTitle: cmsui_general_logoImage  }),
            textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,

          },
        ),
      ],
    ),
    [EPlatformBlockMap.CONTACT_US]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_title  }),
        textAreaWithVariables({ blockTitle: cmsui_general_description  }),
        listBlock({
          title: cmsui_general_contactUsContent,
          maxCount: 2,
          block: oneOfGroup([
            groupBlock(
              cmsui_general_emailsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_emails,
                  maxCount: 10,
                  block: textAreaWithVariables({ required: true, blockTitle: cmsui_general_email  }),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,
              },
            ),
            groupBlock(
              cmsui_general_callUsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_callUsList,
                  maxCount: 10,
                  block: groupBlock(
                    cmsui_general_callUs,
                    [
                      imageWithTheme({ required: true, blockTitle: cmsui_general_logoImage  }),
                      textAreaWithVariables({ required: true, blockTitle: cmsui_general_title  }),
                      phone({ required: true, blockTitle: cmsui_general_phoneNumber  }),
                    ],
                  ),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
          ]),
        }),
      ],
      EGqlIds.CONTACT_US_PROFILE_BLOCK,
    ),
    [EPlatformBlockMap.TV_CHANNEL]: blockBuilder(
      2,
      true,
      [
        image({ required: true, blockTitle: cmsui_general_logoImage  }),
        textArea({ blockTitle: cmsui_general_title  }),
        simpleText({ blockTitle: cmsui_general_action_link  }),
      ],
    ),
  },
});

const starzBetPlatformTaxonomy = (): TThemeTaxonomy => ({

  pages: pageBuilder({
    static: {
      [ERootPages.infoPageName]: staticPage({
        [VERSION]: 5,
        title: "Info",
        pageType: EPageType.infoPage,
        childPage: childPageBuilder({
          dynamic: listPage({
            maxCount: 30,
            page: simplePage({
              [VERSION]: 5,
              blocksMap: SIMPLE_BLOCKS_MAP,
              pageType: EPageType.childInfoPage,
            }),
          }),
        }),
      }),
      [ERootPages.termsConditionsPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 5,
        title: "Terms Conditions",
        pageType: EPageType.termsPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.privacyPolicyPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 5,
        title: "Privacy Policy",
        pageType: EPageType.privacyPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.promotionsPageName]: staticPage({
        [VERSION]: 7,
        title: "Promotions",
        pageType: EPageType.promoPage,
        blocksMap: PROMOTION_BLOCK_MAP_THEME_TWO,
        metaContent: META_CONTENT,
      }),
    },
  }),
  [VARIABLES]: [
    variablesTable({ required: true, withoutWrapper: false, listChild: true }),
  ],
  [BLOCK_TYPE]: {
    [EPlatformBlockMap.TV_CHANNEL]: blockBuilder(
      1,
      true,
      [
        simpleText({ blockTitle: cmsui_general_action_link  }),
      ],
    ),
    [EPlatformBlockMap.LANDING]: blockBuilder(
      3,
      true,
      [
        listBlock(
          {
            title: cmsui_general_listWithLabelsOrGames,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_listWithLabels,
              [
                listBlock(
                  {
                    title: cmsui_general_labelOrGames,
                    maxCount: 2,
                    block: oneOfBlock([
                      games({
                        required: true,
                        blockTitle: cmsui_general_games,

                        listChild: true,
                      }),
                      gameLabel({
                        required: true,
                        blockTitle: cmsui_general_label,

                        listChild: true,
                      }),
                    ]),
                  },
                ),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LABELS_LIST_WRAPPER,
          },
        ),
      ],
    ),
    [EPlatformBlockMap.FOOTER]: blockBuilder(
      5,
      true,
      [
        listBlock(
          {
            title: cmsui_general_paymentMethodsList,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_paymentMethod,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LIST_WITH_IMAGE_AND_MULTILANG_INPUT,
          },
        ),
        listBlock(
          {
            title: cmsui_general_providers,
            maxCount: 20,
            block: imageWithTheme({ blockTitle: cmsui_general_provider  }),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LIST_WITH_IMAGE,
          },
        ),
        groupBlock(
          cmsui_general_logoWithSocialLinks,
          [
            imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
            listBlock(
              {
                title: cmsui_general_socialLinksList,
                maxCount: 5,
                block: groupBlock(
                  cmsui_general_socialLink,
                  [
                    imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                    simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
                  ],
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
              },
            ),
          ],
        ),
        groupBlock(
          cmsui_general_sectionWithLicense,
          [
            licence({ blockTitle: cmsui_general_licenceBlock  }),
            textAreaWithVariables({ blockTitle: cmsui_general_title  }),
            textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,
          },
        ),
        listBlock(
          {
            title: cmsui_general_responsibleGambling,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_method,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
          },
        ),
        listBlock(
          {
            title: cmsui_general_linkListMap,
            maxCount: 30,
            block: groupBlock(
              cmsui_general_blockWithLink,
              [
                textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
                listBlock(
                  {
                    title: cmsui_general_linkList,
                    maxCount: 30,
                    block: linksBlock({ withoutWrapper: false, listChild: true }),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LINKS_BLOCK_LIST,
                  },
                ),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LINKS_BLOCK_LIST_WITH_TITLE,
          },
        ),
      ],
    ),
    [EPlatformBlockMap.CONTACT_US]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_title  }),
        textAreaWithVariables({ blockTitle: cmsui_general_description  }),
        listBlock({
          title: cmsui_general_contactUsContent,
          maxCount: 2,
          block: oneOfGroup([
            groupBlock(
              cmsui_general_emailsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_emails,
                  maxCount: 10,
                  block: textAreaWithVariables({ required: true, blockTitle: cmsui_general_email  }),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
            groupBlock(
              cmsui_general_callUsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_callUsList,
                  maxCount: 10,
                  block: groupBlock(
                    cmsui_general_callUs,
                    [
                      imageWithTheme({ required: true, blockTitle: cmsui_general_logoImage  }),
                      textAreaWithVariables({ required: true, blockTitle: cmsui_general_title  }),
                      phone({ required: true, blockTitle: cmsui_general_phoneNumber  }),
                    ],
                  ),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
          ]),
        }),
      ],
      EGqlIds.CONTACT_US_PROFILE_BLOCK,
    ),
  },
});

const betPublicPlatformTaxonomy = (): TThemeWithoutLandingTaxonomy => ({

  pages: pageBuilder({
    static: {
      [ERootPages.infoPageName]: staticPage({
        [VERSION]: 4,
        title: "Info",
        pageType: EPageType.infoPage,
        childPage: childPageBuilder({
          dynamic: listPage({
            maxCount: 30,
            page: simplePage({
              [VERSION]: 4,
              blocksMap: SIMPLE_BLOCKS_MAP_THEME_FOUR,
              pageType: EPageType.childInfoPage,
            }),
          }),
        }),
      }),
      [ERootPages.termsConditionsPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 4,
        title: "Terms Conditions",
        pageType: EPageType.termsPage,
        blocksMap: SIMPLE_BLOCKS_MAP_THEME_FOUR,
      }),
      [ERootPages.privacyPolicyPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 4,
        title: "Privacy Policy",
        pageType: EPageType.privacyPage,
        blocksMap: SIMPLE_BLOCKS_MAP_THEME_FOUR,
      }),
      [ERootPages.promotionsPageName]: staticPage({
        [VERSION]: 5,
        title: "Promotions",
        pageType: EPageType.promoPage,
        blocksMap: PROMOTION_BLOCK_MAP_THEME_FOUR,
        metaContent: META_CONTENT,
      }),
    },
  }),
  [VARIABLES]: [
    variablesTable({ required: true, withoutWrapper: false, listChild: true }),
  ],
  [BLOCK_TYPE]: {
    [EPlatformBlockMap.FOOTER]: blockBuilder(
      5,
      true,
      [
        listBlock(
          {
            title: cmsui_general_paymentMethodsList,
            maxCount: 20,
            block: imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LIST_WITH_IMAGE,
          },
        ),
        groupBlock(
          cmsui_general_sectionWithLink,
          [
            groupBlock(
              cmsui_general_contactUs,
              [
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                textAreaWithVariables({ blockTitle: cmsui_general_description  }),
              ],
            ),
            listBlock(
              {
                title: cmsui_general_linkListMap,
                maxCount: 30,
                block: groupBlock(
                  cmsui_general_blockWithLink,
                  [
                    textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
                    listBlock(
                      {
                        title: cmsui_general_linkList,
                        maxCount: 30,
                        block: linksBlock({ withoutWrapper: false, listChild: true }),
                      },
                      {
                        canDisabled: false,
                        enumCode: EGqlIds.LINKS_BLOCK_LIST,
                      },
                    ),
                  ],
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.NOOP,
                  },
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LINKS_BLOCK_LIST_WITH_TITLE,
              },
            ),
          ],
        ),
        groupBlock(
          cmsui_general_sectionWithLicense,
          [
            textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
            licence({ blockTitle: cmsui_general_licenceBlock  }),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,
          },
        ),
        groupBlock(
          cmsui_general_logoWithSocialLinks,
          [
            imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
            listBlock(
              {
                title: cmsui_general_socialLinksList,
                maxCount: 5,
                block: groupBlock(
                  cmsui_general_socialLink,
                  [
                    imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                    simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
                  ],
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
              },
            ),
            listBlock(
              {
                title: cmsui_general_responsibleGamblingList,
                maxCount: 20,
                block: groupBlock(
                  cmsui_general_responsibleGambling,
                  [
                    imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                    textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                  ],
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LIST_WITH_IMAGE_AND_MULTILANG_INPUT,
              },
            ),
          ],
        ),
      ],
    ),
    [EPlatformBlockMap.CONTACT_US]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_title  }),
        textAreaWithVariables({ blockTitle: cmsui_general_description  }),
        listBlock({
          title: cmsui_general_contactUsContent,
          maxCount: 2,
          block: oneOfGroup([
            groupBlock(
              cmsui_general_emailsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_emails,
                  maxCount: 10,
                  block: textAreaWithVariables({ required: true, blockTitle: cmsui_general_email  }),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
            groupBlock(
              cmsui_general_callUsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_callUsList,
                  maxCount: 10,
                  block: groupBlock(
                    cmsui_general_callUs,
                    [
                      imageWithTheme({ required: true, blockTitle: cmsui_general_logoImage  }),
                      textAreaWithVariables({ required: true, blockTitle: cmsui_general_title  }),
                      phone({ required: true, blockTitle: cmsui_general_phoneNumber  }),
                    ],
                  ),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,
              },
            ),
          ]),
        }),
      ],
      EGqlIds.CONTACT_US_PROFILE_BLOCK,
    ),
    [EPlatformBlockMap.TV_CHANNEL]: blockBuilder(
      1,
      true,
      [
        image({ required: true, blockTitle: cmsui_general_logoImage  }),
        textArea({ blockTitle: cmsui_general_title  }),
        simpleText({ blockTitle: cmsui_general_action_link  }),
      ],
    ),
  },
});

const byCasinoPlatformTaxonomy = (): TThemeTaxonomy => ({

  pages: pageBuilder({
    static: {
      [ERootPages.infoPageName]: staticPage({
        [VERSION]: 4,
        title: "Info",
        pageType: EPageType.infoPage,
        childPage: childPageBuilder({
          dynamic: listPage({
            maxCount: 30,
            page: simplePage({
              [VERSION]: 4,
              blocksMap: SIMPLE_BLOCKS_MAP,
              pageType: EPageType.childInfoPage,
            }),
          }),
        }),
      }),
      [ERootPages.termsConditionsPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 4,
        title: "Terms Conditions",
        pageType: EPageType.termsPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.privacyPolicyPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 4,
        title: "Privacy Policy",
        pageType: EPageType.privacyPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.promotionsPageName]: staticPage({
        [VERSION]: 4,
        title: "Promotions",
        pageType: EPageType.promoPage,
        blocksMap: PROMOTION_BLOCK_MAP_THEME_TWO,
        metaContent: META_CONTENT,
      }),
    },
  }),
  [VARIABLES]: [
    variablesTable({ required: true, withoutWrapper: false, listChild: true }),
  ],
  [BLOCK_TYPE]: {
    [EPlatformBlockMap.FOOTER]: blockBuilder(
      5,
      true,
      [
        listBlock(
          {
            title: cmsui_general_providers,
            maxCount: 20,
            block: imageWithTheme({ blockTitle: cmsui_general_provider  }),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LIST_WITH_IMAGE,
          },
        ),
        groupBlock(
          cmsui_general_sectionWithLink,
          [
            listBlock(
              {
                title: cmsui_general_linkListMap,
                maxCount: 30,
                block: groupBlock(
                  cmsui_general_blockWithLink,
                  [
                    textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
                    listBlock(
                      {
                        title: cmsui_general_linkList,
                        maxCount: 30,
                        block: linksBlock({ withoutWrapper: false, listChild: true }),
                      },
                      {
                        canDisabled: false,
                        enumCode: EGqlIds.LINKS_BLOCK_LIST,
                      },
                    ),
                  ],
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.NOOP,
                  },
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LINKS_BLOCK_LIST_WITH_TITLE,
              },
            ),
            groupBlock(
              cmsui_general_contactUs,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                textAreaWithVariables({ blockTitle: cmsui_general_description  }),
                listBlock(
                  {
                    title: cmsui_general_socialLinksList,
                    maxCount: 5,
                    block: groupBlock(
                      cmsui_general_socialLink,
                      [
                        imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                        simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
                      ],
                    ),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
                  },
                ),
              ],
            ),
          ],
        ),
        listBlock(
          {
            title: cmsui_general_responsibleGamblingList,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_responsibleGambling,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LIST_WITH_IMAGE_AND_MULTILANG_INPUT,
          },
        ),
        groupBlock(
          cmsui_general_sectionWithLicense,
          [
            licence({ blockTitle: cmsui_general_licenceBlock  }),
            textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,

          },
        ),
      ],
    ),
    [EPlatformBlockMap.CONTACT_US]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_title  }),
        textAreaWithVariables({ blockTitle: cmsui_general_description  }),
        listBlock({
          title: cmsui_general_contactUsContent,
          maxCount: 2,
          block: oneOfGroup([
            groupBlock(
              cmsui_general_emailsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_emails,
                  maxCount: 10,
                  block: textAreaWithVariables({ required: true, blockTitle: cmsui_general_email  }),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
            groupBlock(
              cmsui_general_callUsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_callUsList,
                  maxCount: 10,
                  block: groupBlock(
                    cmsui_general_callUs,
                    [
                      imageWithTheme({ required: true, blockTitle: cmsui_general_logoImage  }),
                      textAreaWithVariables({ required: true, blockTitle: cmsui_general_title  }),
                      phone({ required: true, blockTitle: cmsui_general_phoneNumber  }),
                    ],
                  ),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
          ]),
        }),
      ],
      EGqlIds.CONTACT_US_PROFILE_BLOCK,
    ),
    [EPlatformBlockMap.TV_CHANNEL]: blockBuilder(
      1,
      true,
      [
        image({ required: true, blockTitle: cmsui_general_logoImage  }),
        textArea({ blockTitle: cmsui_general_title  }),
        simpleText({ blockTitle: cmsui_general_action_link  }),
      ],
    ),
    [EPlatformBlockMap.LANDING]: blockBuilder(
      2,
      true,
      [
        listBlock(
          {
            title: cmsui_general_listWithLabelsOrGames,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_listWithLabels,
              [
                listBlock(
                  {
                    title: cmsui_general_labelOrGames,
                    maxCount: 2,
                    block: oneOfBlock([
                      games({
                        required: true,
                        blockTitle: cmsui_general_games,

                        listChild: true,
                      }),
                      gameLabel({
                        required: true,
                        blockTitle: cmsui_general_label,

                        listChild: true,
                      }),
                    ]),
                  },
                ),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LABELS_LIST_WRAPPER,
          },
        ),
      ],
    ),
  },
});

const bayWinPlatformTaxonomy = (): TThemeWithoutLandingTaxonomy => ({

  pages: pageBuilder({
    static: {
      [ERootPages.infoPageName]: staticPage({
        [VERSION]: 4,
        title: "Info",
        pageType: EPageType.infoPage,
        childPage: childPageBuilder({
          dynamic: listPage({
            maxCount: 30,
            page: simplePage({
              [VERSION]: 4,
              blocksMap: SIMPLE_BLOCKS_MAP,
              pageType: EPageType.childInfoPage,
            }),
          }),
        }),
      }),
      [ERootPages.termsConditionsPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 4,
        title: "Terms Conditions",
        pageType: EPageType.termsPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.privacyPolicyPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 4,
        title: "Privacy Policy",
        pageType: EPageType.privacyPage,
        blocksMap: SIMPLE_BLOCKS_MAP,
      }),
      [ERootPages.promotionsPageName]: staticPage({
        [VERSION]: 4,
        title: "Promotions",
        pageType: EPageType.promoPage,
        blocksMap: PROMOTION_BLOCK_MAP,
        metaContent: META_CONTENT,
      }),
    },
  }),
  [VARIABLES]: [
    variablesTable({ required: true, withoutWrapper: false, listChild: true }),
  ],
  [BLOCK_TYPE]: {
    [EPlatformBlockMap.FOOTER]: blockBuilder(
      5,
      true,
      [
        groupBlock(
          cmsui_general_payments,
          [
            groupBlock(
              cmsui_general_cryptoBlock,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock(
                  {
                    title: cmsui_general_cryptos,
                    maxCount: 5,
                    block: groupBlock(
                      cmsui_general_crypto,
                      [
                        imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                        simpleText({ blockTitle: cmsui_general_action_link  }),
                      ],
                    ),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
                  },
                ),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,
              },
            ),
            listBlock(
              {
                title: cmsui_general_paymentMethodsList,
                maxCount: 20,
                block: oneOfGroup([
                  groupBlock(
                    cmsui_general_methodWithLink,
                    [
                      imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                      linksBlock({
                        blockTitle: cmsui_general_mediaLinkWrapper,
                        withoutWrapper: false,
                      }),
                    ],
                    {
                      canDisabled: false,
                      enumCode: EGqlIds.NOOP,
                      oneOfDescription: cmsui_general_methodWithLinkDescription,
                    },
                  ),
                  groupBlock(
                    cmsui_general_methodWithoutLink,
                    [
                      imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                    ],
                    {
                      canDisabled: false,
                      enumCode: EGqlIds.NOOP,
                      oneOfDescription: cmsui_general_methodWithLinkDescription,

                    },
                  ),
                ]),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.IMAGE_WITH_OR_WITHOUT_MEDIA_LINK,
              },
            ),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,
          },
        ),
        listBlock(
          {
            title: cmsui_general_gameProvidersList,
            maxCount: 100,
            block: oneOfGroup([
              groupBlock(
                cmsui_general_providerWithLink,
                [
                  imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                  linksBlock({
                    blockTitle: cmsui_general_mediaLinkWrapper,
                    withoutWrapper: false,
                  }),
                ],
                {
                  canDisabled: false,
                  enumCode: EGqlIds.NOOP,
                  oneOfDescription: cmsui_general_methodWithLinkDescription,
                },
              ),
              groupBlock(
                cmsui_general_providerWithoutLink,
                [
                  imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                ],
                {
                  canDisabled: false,
                  enumCode: EGqlIds.NOOP,
                  oneOfDescription: cmsui_general_methodWithLinkDescription,
                },
              ),
            ]),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.IMAGE_WITH_OR_WITHOUT_MEDIA_LINK,
          },
        ),
        groupBlock(
          cmsui_general_sectionWithLink,
          [
            groupBlock(
              cmsui_general_contactUs,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                textAreaWithVariables({ blockTitle: cmsui_general_description  }),
                listBlock(
                  {
                    title: cmsui_general_socialLinksList,
                    maxCount: 20,
                    block: groupBlock(
                      cmsui_general_socialLink,
                      [
                        imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                        simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
                      ],
                    ),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
                  },
                ),
              ],
            ),
            listBlock(
              {
                title: cmsui_general_linkListMap,
                maxCount: 30,
                block: groupBlock(
                  cmsui_general_blockWithLink,
                  [
                    textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
                    listBlock(
                      {
                        title: cmsui_general_linkList,
                        maxCount: 30,
                        block: linksBlock({ withoutWrapper: false, listChild: true }),
                      },
                      {
                        canDisabled: false,
                        enumCode: EGqlIds.LINKS_BLOCK_LIST,
                      },
                    ),
                  ],
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.NOOP,
                  },
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LINKS_BLOCK_LIST_WITH_TITLE,
              },
            ),
            groupBlock(
              cmsui_general_cryptoBlock,
              [
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_applications,
                  maxCount: 2,
                  block: groupBlock(
                    cmsui_general_application,
                    [
                      imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                      textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                      textAreaWithVariables({ blockTitle: cmsui_general_description  }),
                      simpleText({ blockTitle: cmsui_general_action_link  }),
                      apk({ blockTitle: cmsui_general_apk  }),
                    ],
                  ),
                }),
                textAreaWithVariables({ blockTitle: cmsui_general_description  }),
                listBlock(
                  {
                    title: cmsui_general_cryptos,
                    maxCount: 20,
                    block: groupBlock(
                      cmsui_general_crypto,
                      [
                        imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                        simpleText({ blockTitle: cmsui_general_action_link  }),
                      ],
                    ),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
                  },
                ),
              ],
            ),
          ],
        ),
        groupBlock(
          cmsui_general_sectionWithLicense,
          [
            licence({ blockTitle: cmsui_general_licenceBlock  }),
            textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,

          },
        ),
      ],
    ),
    [EPlatformBlockMap.CONTACT_US]: blockBuilder(
      4,
      true,
      [
        textAreaWithVariables({ blockTitle: cmsui_general_title  }),
        textAreaWithVariables({ blockTitle: cmsui_general_description  }),
        listBlock({
          title: cmsui_general_contactUsContent,
          maxCount: 2,
          block: oneOfGroup([
            groupBlock(
              cmsui_general_emailsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_emails,
                  maxCount: 10,
                  block: textAreaWithVariables({ required: true, blockTitle: cmsui_general_email  }),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
            groupBlock(
              cmsui_general_callUsContent,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                textAreaWithVariables({ blockTitle: cmsui_general_title  }),
                listBlock({
                  title: cmsui_general_callUsList,
                  maxCount: 10,
                  block: groupBlock(
                    cmsui_general_callUs,
                    [
                      imageWithTheme({ required: true, blockTitle: cmsui_general_logoImage  }),
                      textAreaWithVariables({ required: true, blockTitle: cmsui_general_title  }),
                      phone({ required: true, blockTitle: cmsui_general_phoneNumber  }),
                    ],
                  ),
                }),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,

              },
            ),
          ]),
        }),
      ],
      EGqlIds.CONTACT_US_PROFILE_BLOCK,
    ),
    [EPlatformBlockMap.TV_CHANNEL]: blockBuilder(
      2,
      true,
      [
        image({ required: true, blockTitle: cmsui_general_logoImage  }),
        textArea({ blockTitle: cmsui_general_title  }),
        simpleText({ blockTitle: cmsui_general_action_link  }),
      ],
    ),
  },
});

const testBlock = () => blockBuilder(
  2,
  true,
  [
    groupBlock(
      cmsui_general_testBlockOne,
      [
        richText({ required: true, blockTitle: cmsui_general_richText  }),
        textEditor({ blockTitle: cmsui_general_textEditor  }),
        image( { required: true, blockTitle: cmsui_general_imageInput  }),
        oneOfBlock([
          richText( {
            required: true,
            blockTitle: cmsui_general_richText,
            listChild: false,
          }),
          image( {
            required: true,
            blockTitle: cmsui_general_logoImage,
            listChild: false,
          }),
        ]),
        oneOfBlock([
          richText( {
            required: true,
            blockTitle: cmsui_general_richText,
            listChild: false,
          }),
          image( {
            required: true,
            blockTitle: cmsui_general_logoImage,
            listChild: false,
          }),
          faq( {
            required: true,
            blockTitle: cmsui_general_faq,
            listChild: false,
          }),
          linksBlock( {
            required: true,
            blockTitle: cmsui_general_linksBlock,
            listChild: false,
          }),
        ]),
      ],
    ),
    groupBlock(
      cmsui_general_testBlockTwo,
      [
        listBlock({
          title: cmsui_general_testListOne,
          maxCount: 3,
          block: image({ required: true, withoutWrapper: false }),
        }),
        listBlock({
          title: cmsui_general_testListTwo,
          maxCount: 3,
          block: linksBlock({ required: true, withoutWrapper: false }),
        }),
        listBlock({
          title: cmsui_general_testListThree,
          maxCount: 3,
          block: oneOfBlock([
            richText({ required: true, withoutWrapper: false, listChild: true }),
            image({ required: true, withoutWrapper: false, listChild: true }),
            faq({ required: true, withoutWrapper: false, listChild: true }),
            linksBlock({ required: true, withoutWrapper: false, listChild: true }),
          ]),
        }),
      ],
    ),
  ],
);

const zlotPlatformTaxonomy = (): TThemeSixTaxonomy => ({
  pages: pageBuilder({
    static: {
      [ERootPages.infoPageName]: staticPage({
        [VERSION]: 2,
        title: "Info",
        pageType: EPageType.infoPage,
        childPage: childPageBuilder({
          dynamic: listPage({
            maxCount: 30,
            page: simplePage({
              [VERSION]: 2,
              blocksMap: SIMPLE_BLOCKS_MAP_THEME_SIX,
              pageType: EPageType.childInfoPage,
            }),
          }),
        }),
      }),
      [ERootPages.termsConditionsPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 2,
        title: "Terms Conditions",
        pageType: EPageType.termsPage,
        blocksMap: SIMPLE_BLOCKS_MAP_THEME_SIX,
      }),
      [ERootPages.privacyPolicyPageName]: staticPage({
        metaContent: META_CONTENT,
        [VERSION]: 2,
        title: "Privacy Policy",
        pageType: EPageType.privacyPage,
        blocksMap: SIMPLE_BLOCKS_MAP_THEME_SIX,
      }),
      [ERootPages.promotionsPageName]: staticPage({
        [VERSION]: 2,
        title: "Promotions",
        pageType: EPageType.promoPage,
        blocksMap: PROMOTION_BLOCK_MAP_THEME_FOUR,
        metaContent: META_CONTENT,
      }),
    },
  }),
  [VARIABLES]: [
    variablesTable({ required: true, withoutWrapper: false, listChild: true }),
  ],
  [BLOCK_TYPE]: {
    [EPlatformBlockMap.LANDING]: blockBuilder(
      2,
      true,
      [
        listBlock(
          {
            title: cmsui_general_listWithLabelsOrGames,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_listWithLabels,
              [
                listBlock(
                  {
                    title: cmsui_general_labelOrGames,
                    maxCount: 1,
                    block: oneOfBlock([
                      gamesWithImage({
                        required: true,
                        blockTitle: cmsui_general_games,
                        listChild: true,
                      }),
                      gameLabelWithImage({
                        required: true,
                        blockTitle: cmsui_general_label,
                        listChild: true,
                      }),
                    ]),
                  },
                ),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LABELS_WITH_IMAGE_LIST_WRAPPER,
          },
        ),
        groupBlock(
          cmsui_general_vipTables,
          [
            gameLabel(
              {
                blockTitle: cmsui_general_label,
              },
            ),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.VIP_TABLES,
          },
        ),
      ],
    ),
    [EPlatformBlockMap.FOOTER]: blockBuilder(
      3,
      true,
      [
        listBlock(
          {
            title: cmsui_general_paymentMethodsList,
            maxCount: 20,
            block: groupBlock(
              cmsui_general_paymentMethod,
              [
                imageWithTheme({ blockTitle: cmsui_general_logoImage }),
                textAreaWithVariables({ blockTitle: cmsui_general_title }),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LIST_WITH_IMAGE_AND_MULTILANG_INPUT,
          },
        ),
        groupBlock(
          cmsui_general_logoWithSocialLinks,
          [
            imageWithTheme({ blockTitle: cmsui_general_logoImage }),
            textAreaWithVariables({ blockTitle: cmsui_general_title }),
            textAreaWithVariables({ blockTitle: cmsui_general_description }),
            listBlock(
              {
                title: cmsui_general_socialLinksList,
                maxCount: 5,
                block: groupBlock(
                  cmsui_general_socialLink,
                  [
                    imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                    simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
                  ],
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
              },
            ),
          ],
        ),
        groupBlock(
          cmsui_general_logoWithSocialLinks,
          [
            imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
            textAreaWithVariables({ blockTitle: cmsui_general_title  }),
            textAreaWithVariables({ blockTitle: cmsui_general_description  }),
            listBlock(
              {
                title: cmsui_general_socialLinksList,
                maxCount: 5,
                block: groupBlock(
                  cmsui_general_socialLink,
                  [
                    imageWithTheme({ blockTitle: cmsui_general_logoImage  }),
                    simpleText({ required: true,  blockTitle: cmsui_general_action_link  }),
                  ],
                ),
              },
              {
                canDisabled: false,
                enumCode: EGqlIds.LIST_WITH_IMAGE_AND_SIMPLE_INPUT,
              },
            ),
          ],
        ),
        groupBlock(
          cmsui_general_contactInfoGroup,
          [
            textAreaWithVariables({ blockTitle: cmsui_general_title  }),
            listBlock(
              {
                title: cmsui_general_contactInfoList,
                maxCount: 5,
                block: groupBlock(
                  cmsui_general_contactInfo,
                  [
                    simpleText({ required: true,  blockTitle: cmsui_general_action_link }),
                    imageWithTheme({ blockTitle: cmsui_general_logoImage }),
                    textAreaWithVariables({ blockTitle: cmsui_general_title }),
                  ],
                ),
              },
            ),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,
          },
        ),
        listBlock(
          {
            title: cmsui_general_linkListMap,
            maxCount: 30,
            block: groupBlock(
              cmsui_general_blockWithLink,
              [
                textAreaWithVariables({ blockTitle: cmsui_general_richText  }),
                listBlock(
                  {
                    title: cmsui_general_linkList,
                    maxCount: 30,
                    block: linksBlock({ withoutWrapper: false, listChild: true }),
                  },
                  {
                    canDisabled: false,
                    enumCode: EGqlIds.LINKS_BLOCK_LIST,
                  },
                ),
              ],
              {
                canDisabled: false,
                enumCode: EGqlIds.NOOP,
              },
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.LINKS_BLOCK_LIST_WITH_TITLE,
          },
        ),
        groupBlock(
          cmsui_general_sectionWithLicense,
          [
            licence({ blockTitle: cmsui_general_licenceBlock }),
            textAreaWithVariables({ blockTitle: cmsui_general_richText }),
          ],
          {
            canDisabled: false,
            enumCode: EGqlIds.NOOP,
          },
        ),
      ],
    ),
    [EPlatformBlockMap.TV_CHANNEL]: blockBuilder(
      1,
      true,
      [
        image({ required: true, blockTitle: cmsui_general_logoImage  }),
        textArea({ blockTitle: cmsui_general_title  }),
        simpleText({ blockTitle: cmsui_general_action_link  }),
      ],
    ),
    [EPlatformBlockMap.BANNERS]: blockBuilder(
      1,
      true,
      BANNERS_PAGES.map(bannerPage),
    ),
    [EPlatformBlockMap.HIGHLIGHTS]: blockBuilder(
      1,
      true,
      [
        select(
          {
            //blockTitle used as field in gql
            blockTitle: "duration",
            required: true,
            withoutWrapper: false,
            componentProps: {
              placeholder: cmsui_general_placeholder_choosePeriod,
              label: cmsui_general_duration,
              options: Object.keys(durationSelectValueMap).map((key) => ({ value: Number(key) })),
              titleMap: durationSelectValueMap,
              defaultValue: Object.values(durationSelectValueMap)[0],
            },
            valueType: "Int",
          },
        ),
        listBlock(
          {
            title: cmsui_general_highlights,
            maxCount: 20,
            block: groupBlock(
              //todo @DS block name why TKey?????
              "stories" as TKey,
              [
                colorPicker({
                  required: true,
                  blockTitle: "color",
                  componentProps: { label: cmsui_general_highlightColour, name: cmsui_general_chooseColor },
                }),
                fileField({
                  required: true,
                  blockTitle: "preview",
                  componentProps: {
                    multiple: false,
                    allowedTypes: ["image/png", "image/jpg", "image/jpeg"],
                    uploadTitle: cmsui_general_action_uploadImage,
                    fileType: "image",
                    label: cmsui_general_preview,
                  },
                }),
                textAreaWithVariables( { required: true, blockTitle: cmsui_general_title  }),
                listBlock(
                  {
                    title: cmsui_general_stories,
                    maxCount: 20,
                    block: fileField({
                      required: true,
                      blockTitle: "story",
                      componentProps: {
                        multiple: false,
                        allowedTypes: ["image/png", "image/jpg", "image/jpeg"],
                        uploadTitle: cmsui_general_action_uploadImage,
                        fileType: "image",
                        label: cmsui_general_image,
                      },
                      //todo @DS refactor this shit id1
                      inList: true,
                    }),
                  },
                  {
                    enumCode: EGqlIds.NOOP,
                    canDisabled: false,
                  },
                ),
              ],
            ),
          },
          {
            canDisabled: false,
            enumCode: EGqlIds.HIGHLIGHTS,
          },
        ),
      ],
    ),
  },
});

const durationSelectValueMap:Record<number, TKey> = {
  5000: cmsui_general_fiveSec,
  10000: cmsui_general_tenSec,
  15000: cmsui_general_fifteenSec,
};

const BANNERS_PAGES = [
  cmsui_puiPage_title_home,
  cmsui_puiPage_title_sportsLive,
  cmsui_puiPage_title_sportsPrelive,
  cmsui_puiPage_title_eSportsLive,
  cmsui_puiPage_title_eSportsPrelive,
  cmsui_puiPage_title_casino,
  cmsui_puiPage_title_liveCasino,
  cmsui_puiPage_title_games,
  cmsui_puiPage_title_bingo,
  cmsui_puiPage_title_vipClub,
  cmsui_puiPage_title_promos,
] as const;

const bannerPage = (title: TKey) => listBlock(
  {
    title: title,
    maxCount: 20,
    block: groupBlock(
      cmsui_block_title_banner,
      [
        textAreaWithVariables( { required: true, blockTitle: cmsui_general_title  }),
        textAreaWithVariables( { required: true, blockTitle: cmsui_general_description  }),
        textArea( { required: true, blockTitle: cmsui_general_buttonName  }),
        simpleText( { required: true, blockTitle: cmsui_general_url  }),
      ],
    ),
  },
  {
    canDisabled: false,
    enumCode: EGqlIds.BANNER,
  },
);

export {
  zlotPlatformTaxonomy,
  betPublicPlatformTaxonomy,
  byCasinoPlatformTaxonomy,
  starzBetPlatformTaxonomy,
  bayWinPlatformTaxonomy,
  betOrSpinPlatformTaxonomy,
  testBlock,
  affiliateTaxonomy,
};
