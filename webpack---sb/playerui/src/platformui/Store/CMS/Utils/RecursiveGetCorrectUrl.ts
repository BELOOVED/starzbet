import { isNil, isNotNil, isVoid, type TNil } from "@sb/utils";
import type { TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";

const recursiveGetCorrectUrl = (pageMap: TCms_Page_Fragment[] | TNil, id: string): string => {
  if (isVoid(id) || isVoid(pageMap)) {
    return "";
  }
  const fn = (id: string, url = ""): string => {
    const page = pageMap.find((it) => it.id === id);
    if (isNil(page)) {
      return "";
    }

    const newUrl = `${page.url}${url}`;
    const parentId = page.parentPageId;

    if (isNotNil(parentId)) {
      return fn(parentId, newUrl);
    }

    return newUrl;
  };

  return fn(id);
};

export { recursiveGetCorrectUrl };
