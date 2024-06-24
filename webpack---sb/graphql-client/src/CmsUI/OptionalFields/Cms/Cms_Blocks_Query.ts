import {
  type TCms_ThemeSix_Banners_BlockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeSix_Banners_BlockContent_FragmentOptionalFields";
import { type TCms_Banner_Type_FragmentOptionalFields } from "../../Generated/Services/Cms/Types/TCms_Banner_Type_FragmentOptionalFields";
import {
  type TCms_ThemeOne_Landing_BlockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeOne_Landing_BlockContent_FragmentOptionalFields";
import {
  type TCms_ThemeSix_Landing_BlockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeSix_Landing_BlockContent_FragmentOptionalFields";
import {
  type TCms_ThemeTwo_Promotions_PageContent_BlockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeTwo_Promotions_PageContent_BlockContent_FragmentOptionalFields";
import {
  type TCms_ThemeFour_Info_Page_PageContent_BlockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeFour_Info_Page_PageContent_BlockContent_FragmentOptionalFields";
import {
  type TCms_ThemeOne_TermsConditions_pageContent_blockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeOne_TermsConditions_pageContent_blockContent_FragmentOptionalFields";
import {
  type TCms_ThemeTwo_Info_Page_PageContent_BlockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeTwo_Info_Page_PageContent_BlockContent_FragmentOptionalFields";
import { type TCms_Blocks_QueryOptionalFields } from "../../Generated/Services/Cms/Types/TCms_Blocks_QueryOptionalFields";
import {
  type TCms_ThemeFour_Promotions_PageContent_BlockContent_FragmentOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_ThemeFour_Promotions_PageContent_BlockContent_FragmentOptionalFields";

const themeOneSimplePages = (listElementName: boolean): TCms_ThemeOne_TermsConditions_pageContent_blockContent_FragmentOptionalFields => ({
  simplePageContent: {
    simplePageContentList: {
      content: {
        listElementName,
      },
    },
  },
});

const mediaLink = (withProperty: boolean) => ({
  cmsMediaLinkExternalLinkType: {
    listElementName: withProperty,
  },
  cmsMediaLinkEternalLinkType: {
    listElementName: withProperty,
  },
});

const themeTwoSimplePages = (listElementName: boolean): TCms_ThemeTwo_Info_Page_PageContent_BlockContent_FragmentOptionalFields => ({
  simplePageContent: {
    simplePageContentList: {
      content: {
        listElementName,
      },
    },
  },
});

const themeFourSimplePages = (listElementName: boolean): TCms_ThemeFour_Info_Page_PageContent_BlockContent_FragmentOptionalFields => ({
  simplePageContent: {
    simplePageContentList: {
      content: {
        listElementName,
      },
    },
  },
});

const themeTwoPromoPage = (listElementName: boolean): TCms_ThemeTwo_Promotions_PageContent_BlockContent_FragmentOptionalFields
  | TCms_ThemeFour_Promotions_PageContent_BlockContent_FragmentOptionalFields => ({
  promotionPageContent: {
    tags: {
      content: {
        listElementName,
      },
    },
    promoList: {
      content: {
        listElementName,
      },
    },
    promos: {
      content: {
        cmsPromoPageContentPromoWithBonusThemeTwoType: {
          listElementName,
        },
        cmsPromoPageContentPromoWithoutBonusThemeTwoType: {
          listElementName,
        },
      },
    },
  },
});

const landingBlockWithImages = (withProperty: boolean):
  TCms_ThemeOne_Landing_BlockContent_FragmentOptionalFields | TCms_ThemeSix_Landing_BlockContent_FragmentOptionalFields => ({
  listWithLabelsOrGames: {
    content: {
      listElementName: withProperty,
      labelOrGames: {
        content: {
          cmsGameIdsWithImageContentType: {
            listElementName: withProperty,
          },
          cmsLabelsListWithImageContentType: {
            listElementName: withProperty,
          },
        },
      },
    },
  },
});

const getBannerOptionalFields = (withProperty: boolean):TCms_Banner_Type_FragmentOptionalFields => ({
  content: {
    listElementName: withProperty,
  },
});

const getBannersFragmentOptionalFields = (withProperty: boolean):
  TCms_ThemeSix_Banners_BlockContent_FragmentOptionalFields => ({
  home: getBannerOptionalFields(withProperty),
  bingo: getBannerOptionalFields(withProperty),
  casino: getBannerOptionalFields(withProperty),
  liveCasino: getBannerOptionalFields(withProperty),
  eSportsLive: getBannerOptionalFields(withProperty),
  eSportsPrelive: getBannerOptionalFields(withProperty),
  sportsLive: getBannerOptionalFields(withProperty),
  sportsPrelive: getBannerOptionalFields(withProperty),
  vipClub: getBannerOptionalFields(withProperty),
  promos: getBannerOptionalFields(withProperty),
  games: getBannerOptionalFields(withProperty),
});

const cmsBlocksQueryOptionalFieldsFactory = (withProperty: boolean): TCms_Blocks_QueryOptionalFields => ({
  blockVersion: withProperty,
  updatedAt: withProperty,
  content: {
    cmsThemeSixHighlightsBlockContent: {
      highlights: {
        content: {
          stories: { content: { listElementName: withProperty } },
          listElementName: withProperty,
        },
      },
    },
    cmsThemeSixBannersBlockContent: getBannersFragmentOptionalFields(withProperty),
    cmsThemeSixLandingBlockContent: landingBlockWithImages(withProperty),
    cmsThemeOneLandingBlockContent: landingBlockWithImages(withProperty),
    cmsThemeSixPromotionsPageContentBlockContent: themeTwoPromoPage(withProperty),
    cmsThemeFourPromotionsPageContentBlockContent: themeTwoPromoPage(withProperty),
    cmsThemeFourInfoPagePageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeFourPrivacyPolicyPageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeFourTermsConditionsPageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeFivePromotionsPageContentBlockContent: themeTwoPromoPage(withProperty),
    cmsThemeFivePrivacyPolicyPageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeFiveTermsConditionsPageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeFiveInfoPagePageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeSixInfoPagePageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeSixPrivacyPolicyPageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeSixTermsConditionsPageContentBlockContent: themeFourSimplePages(withProperty),
    cmsThemeSixFooterBlockContent: {
      linkListMap: {
        content: {
          linkList: {
            content: {
              mediaLink: mediaLink(withProperty),
              listElementName: withProperty,
            },
          },
          listElementName: withProperty,
        },
      },
      paymentMethodsList: {
        content: {
          listElementName: withProperty,
        },
      },
      logoWithSocialLinks: {
        socialLinksList: {
          content: {
            listElementName: withProperty,
          },
        },
      },
    },
    cmsThemeFiveFooterBlockContent: {
      responsibleGamblingList: {
        content: {
          listElementName: withProperty,
        },
      },
      providers: {
        content: {
          listElementName: withProperty,
        },
      },
      sectionWithLink: {
        linkListMap: {
          content: {
            listElementName: withProperty,
            linkList: {
              content: {
                listElementName: withProperty,
                mediaLink: mediaLink(withProperty),
              },
            },
          },
        },
        contactUs: {
          socialLinksList: {
            content: {
              listElementName: withProperty,
            },
          },
        },
      },
    },
    cmsThemeFourFooterBlockContent: {
      paymentMethodsList: {
        content: {
          listElementName: withProperty,
        },
      },
      sectionWithLink: {
        linkListMap: {
          content: {
            listElementName: withProperty,
            linkList: {
              content: {
                listElementName: withProperty,
                mediaLink: mediaLink(withProperty),
              },
            },
          },
        },
      },
      logoWithSocialLinks: {
        responsibleGamblingList: {
          content: {
            listElementName: withProperty,
          },
        },
        socialLinksList: {
          content: {
            listElementName: withProperty,
          },
        },
      },
    },
    cmsThemeTwoLandingBlockContent: {
      listWithLabelsOrGames: {
        content: {
          labelOrGames: {
            content: {
              cmsGameIdsContentType: {
                listElementName: withProperty,
              },
              cmsLabelsListContentType: {
                listElementName: withProperty,
              },
            },
          },
          listElementName: withProperty,
        },
      },
    },
    cmsThemeTwoPromotionsPageContentBlockContent: themeTwoPromoPage(withProperty),
    cmsThemeTwoFooterBlockContent: {
      logoWithSocialLinks: {
        socialLinksList: {
          content: {
            listElementName: withProperty,
          },
        },
      },
      providers: {
        content: {
          listElementName: withProperty,
        },
      },
      responsibleGambling: {
        content: {
          listElementName: withProperty,
        },
      },
      paymentMethodsList: {
        content: {
          listElementName: withProperty,
        },
      },
      linkListMap: {
        content: {
          listElementName: withProperty,
          linkList: {
            content: {
              listElementName: withProperty,
              mediaLink: mediaLink(withProperty),
            },
          },
        },
      },
    },
    cmsThemeOnePromotionsPageContentBlockContent: {
      promotionPageContent: {
        tags: {
          content: {
            listElementName: withProperty,
          },
        },
        promoList: {
          content: {
            listElementName: withProperty,
          },
        },
        promos: {
          content: {
            cmsThemeOnePromotionsPageContentBlockContentPromotionPageContentPromosContentBlockSimplePromoWithBonus: {
              listElementName: withProperty,
            },
            cmsThemeOnePromotionsPageContentBlockContentPromotionPageContentPromosContentBlockSimplePromoWithoutBonus: {
              listElementName: withProperty,
            },
          },
        },
      },
    },
    cmsThemeOneTermsConditionsPageContentBlockContent: themeOneSimplePages(withProperty),
    cmsThemeOneInfoPagePageContentBlockContent: themeOneSimplePages(withProperty),
    cmsThemeOnePrivacyPolicyPageContentBlockContent: themeOneSimplePages(withProperty),
    cmsThemeTwoInfoPagePageContentBlockContent: themeTwoSimplePages(withProperty),
    cmsThemeTwoPrivacyPolicyPageContentBlockContent: themeTwoSimplePages(withProperty),
    cmsThemeTwoTermsConditionsPageContentBlockContent: themeTwoSimplePages(withProperty),
    cmsChooseUsBlockContent: {
      cardList: {
        content: {
          listElementName: withProperty,
        },
      },
    },
    cmsCommissionsBlockContent: {
      cardList: {
        content: {
          listElementName: withProperty,
        },
      },
    },
    cmsContactsBlockContent: {
      cardList: {
        content: {
          listElementName: withProperty,
        },
      },
    },
    cmsContactUsProfileBlockContent: {
      contactUsContent: {
        content: {
          cmsContactUsProfileBlockCallUsContentType: {
            listElementName: withProperty,
            callUsList: {
              content: {
                listElementName: withProperty,
              },
            },
          },
          cmsContactUsProfileBlockEmailsContentType: {
            emails: {
              content: {
                listElementName: withProperty,
              },
            },
            listElementName: withProperty,
          },
        },
      },
    },
    cmsSliderBlockContent: {
      cardList: {
        content: {
          listElementName: withProperty,
        },
      },
    },
    cmsThemeOneFooterBlockContent: {
      sectionWithLink: {
        cryptoBlock: {
          applications: {
            content: {
              listElementName: withProperty,
            },
          },
          cryptos: {
            content: {
              listElementName: withProperty,
            },
          },
        },
        contactUs: {
          socialLinksList: {
            content: {
              listElementName: withProperty,
            },
          },
        },
        linkListMap: {
          content: {
            listElementName: withProperty,
            linkList: {
              content: {
                listElementName: withProperty,
                mediaLink: mediaLink(withProperty),
              },
            },
          },
        },
      },
      gameProvidersList: {
        content: {
          cmsImageWithMediaLinkType: {
            listElementName: withProperty,
            mediaLinkWrapper: {
              mediaLink: mediaLink(withProperty),
            },
          },
          cmsImageWithoutMediaLinkType: {
            listElementName: withProperty,
          },
        },
      },
      payments: {
        cryptoBlock: {
          cryptos: {
            content: {
              listElementName: withProperty,
            },
          },
        },
        paymentMethodsList: {
          content: {
            cmsImageWithoutMediaLinkType: {
              listElementName: withProperty,
            },
            cmsImageWithMediaLinkType: {
              listElementName: withProperty,
              mediaLinkWrapper: {
                mediaLink: mediaLink(withProperty),
              },
            },
          },
        },
      },
    },
  },
});

const cmsBlocksQueryAdminUIOptionalFields = cmsBlocksQueryOptionalFieldsFactory(true);

const cmsBlocksQueryPlayerUIAffiliateUIOptionalFields = cmsBlocksQueryOptionalFieldsFactory(false);

export { cmsBlocksQueryAdminUIOptionalFields, cmsBlocksQueryPlayerUIAffiliateUIOptionalFields };
