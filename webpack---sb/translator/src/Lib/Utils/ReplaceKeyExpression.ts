// todo add memoize
import { Logger } from "./Logger";

const replaceKeyExpression = (key: string, expressions: Record<string, string>) => {
  const replacedKey = Object.entries(expressions).reduce(
    (acc, cur) => key.replace(`.$${cur[0]}$.`, `.${cur[1]}.`),
    key,
  );

  if (process.env.NODE_ENV === "development") {
    if (/\.\$[a-zA-Z]+\$\./.test(replacedKey)) {
      Logger.warn.translate(`Key expression was not replaced: ${key}`);
    }
  }

  return replacedKey;
};

const replaceKeyExpressions = <S extends Record<string, string>>(source: S, expressions: Record<string, string>) => Object
  .entries(source)
  .reduce(
    (acc, [key, value]) => {
      acc[replaceKeyExpression(key, expressions) as keyof S] = value as S[keyof S];

      return acc;
    },
    {} as S,
  );

export { replaceKeyExpression, replaceKeyExpressions };
