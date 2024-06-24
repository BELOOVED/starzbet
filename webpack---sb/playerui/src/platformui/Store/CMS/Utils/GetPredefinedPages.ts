import type { TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import { EPageType } from "@sb/cms-core";

const getPredefinedPages = (pageList: TCms_Page_Fragment[]) =>
  pageList.reduce(
    (acc, value) => {
      if (
        value.pageType === EPageType.privacyPage ||
        value.pageType === EPageType.landingPage ||
        value.pageType === EPageType.termsPage
      ) {
        const pageType = value.pageType;

        return ({
          ...acc,
          [pageType]: value.id,
        });
      }

      return acc;
    },
    {},
  );

export { getPredefinedPages };
