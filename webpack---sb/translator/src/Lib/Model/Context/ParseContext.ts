import { contextDelimiter } from "./Context";

const keyReg = /\(([^()]+)\)/g;

const bracketReg = /[{()}]/g;

const parseContext = (translateKey: string) => {
  const [_, context] = translateKey.split(contextDelimiter);

  const result = {} as Record<string, string>;

  if (!context) {
    return {};
  }

  context.split("::").forEach((str) => {
    const matchedArr = str.match(keyReg);

    if (!matchedArr) {
      return;
    }

    const [first] = matchedArr as [string];

    const key = first.replace(bracketReg, "");

    result[key] = str.replace(`(${key})`, "");
  });

  return result;
};

export { parseContext };
