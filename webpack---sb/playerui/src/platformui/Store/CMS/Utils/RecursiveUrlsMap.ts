import { isNotNil, isVoid, type TNullable } from "@sb/utils";
import type { TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import { getChildPagesByPageId } from "./Helpers";

const recursiveUrlsMap = (pages: TNullable<TCms_Page_Fragment[]>) => {
  const urlsMap: Record<string, string> = {};
  if (isVoid(pages)) {
    return urlsMap;
  }
  const fn = (page:  TCms_Page_Fragment, parentUrl = "") => {
    const url = parentUrl.concat(page.url);
    urlsMap[page.id] = url;
    const childPages = getChildPagesByPageId(pages, page.id);
    if (isNotNil(childPages)) {
      childPages.map((childValue) => fn(childValue, url));
    }
  };

  Object.values(pages).map((value) => fn(value));

  return urlsMap;
};

export { recursiveUrlsMap };
