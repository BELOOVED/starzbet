import { isNotNil, isVoid, type TNullable } from "@sb/utils";
import type { TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import { EMPTY_URL } from "../Model/CmsConstants";
import { getChildPagesByPageId } from "./Helpers";

const getPath = (pathWithPrefix: string) => pathWithPrefix.slice((pathWithPrefix.lastIndexOf("/")));

const recursiveGetCorrectPage =
  (
    pages: TNullable<TCms_Page_Fragment[]>,
    pathWithPrefix: string,
  ): TCms_Page_Fragment | null => {
    if (pathWithPrefix === EMPTY_URL || isVoid(pages)) {
      return null;
    }

    let finalPage: TCms_Page_Fragment | null = null;

    const path = getPath(pathWithPrefix);

    const findPage = (pageArr: TCms_Page_Fragment[], childPath: string) => {
      for (const page of pageArr) {
        if (childPath.startsWith(page.url)) {
          if (childPath === page.url) {
            finalPage = page;

            break;
          }
          const childPages = getChildPagesByPageId(pages, page.id);
          if (isNotNil(childPages)) {
            findPage(childPages, path.replace(page.url, ""));
          }
        }
      }
    };

    findPage(pages, path);

    return finalPage;
  };

export { recursiveGetCorrectPage };
