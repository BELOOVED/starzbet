import { type TExplicitAny } from "@sb/utils";
import { type TFieldPath } from "@sb/form-new";
import { type IMultilang } from "@sb/cms-core";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";

// not deep equals
const isArrayEquals = (a: TExplicitAny[], b: TExplicitAny[]) => Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((val, index) => val === b[index]);

const hasSubArray = (master: TFieldPath, sub: TFieldPath) =>
  sub.every(((i) =>
    (v: string | number) =>
      master.indexOf(v.toString(), i) + 1)(0,
  ));

const isListPathIncludesPath = (arrList: TFieldPath[], sub: TFieldPath) =>
  Boolean(arrList.find((it) => hasSubArray(it, sub) ||  isArrayEquals(it, sub)));

const getCorrectMultiLangValue = (value:  TTranslateRecord_Fragment[]):IMultilang[] => value.map((value) => ({
  translate: value.translate,
  locale: value.locale,
}));

export {
  isListPathIncludesPath,
  isArrayEquals,
  getCorrectMultiLangValue,
};
