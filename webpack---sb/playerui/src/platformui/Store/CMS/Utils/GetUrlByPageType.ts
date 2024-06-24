import { isVoid, type TNullable } from "@sb/utils";
import type { TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import { type EPageType } from "@sb/cms-core";
import { EMPTY_URL } from "../Model/CmsConstants";

const getUrlByPageType = (pages: TNullable<TCms_Page_Fragment[]>, typeOfPage: EPageType) => {
  if (isVoid(pages)) {
    return EMPTY_URL;
  }
  const page = pages.find((page) => page.pageType === typeOfPage);

  return page ? page.url : EMPTY_URL;
};

export { getUrlByPageType };
