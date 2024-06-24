import { isVoid, type TNil, type TNullable } from "@sb/utils";
import { type EPagesDefaultThemeOne } from "../Model/CmsEnums";

const predefinedPageIdByTitle = (predefinedPages: TNullable<Record<string, string>>, title:EPagesDefaultThemeOne | TNil) => {
  if (isVoid(predefinedPages) || isVoid(title)) {
    return null;
  }

  return predefinedPages[title];
};

export { predefinedPageIdByTitle };
