import { isVoid, type TNullable } from "@sb/utils";
import type { TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import { type EPageType } from "@sb/cms-core";

const getPageByPageType = (pages: TNullable<TCms_Page_Fragment[]>, typeOfPage: EPageType):TNullable<TCms_Page_Fragment> =>
  isVoid(pages)
    ? null
    : pages.find((page) => page.pageType === typeOfPage);

export { getPageByPageType };
