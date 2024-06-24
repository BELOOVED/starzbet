import { translateItemsToTranslateRecord, type TTranslateItem, type TTranslateRecord } from "@sb/utils";

const isTranslateItemList = (value: TTranslateRecord | TTranslateItem[]): value is TTranslateItem[] => !!Array.isArray(value);

const normalizeTranslatedName = (name: TTranslateRecord | TTranslateItem[]) => {
  if(isTranslateItemList(name)){
    return translateItemsToTranslateRecord(name);
  }

  return name;
};

export { normalizeTranslatedName };
